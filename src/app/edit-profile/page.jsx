'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from 'next/navigation';


const EditProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const [initialData, setInitialData] = useState({});
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
      const fetchData = async () => {
        if (status === 'loading') {
          return;
        }
          try {
            setLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`, {
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
            });
            // Replace null fields with a message, including nested user_address
            const data = response.data;
            const dataWithDefaults = {
              ...data,
              full_name: data.full_name ?? "Not Provided",
              aadhaar_number: data.aadhaar_number ?? "Not Provided",
              dob: data.dob ?? "Not Provided",
              gender: data.gender ?? "Not Provided",
              mobile_number: data.mobile_number ?? "Not Provided",
              marital_status: data.marital_status ?? false,
              occupation: data.occupation ?? "Not Provided",
              annual_income: data.annual_income ?? 0,
              annual_family_income: data.annual_family_income ?? 0,
              bank_account_number: data.bank_account_number ?? "Not Provided",
              caste_category: data.caste_category ?? "Not Provided",
              is_disable: data.is_disable ?? false,
              bpl: data.bpl ?? "Not Provided",
              user_address: {
                aadhaar_number: data.user_address?.aadhaar_number ?? "Not Provided",
                state: data.user_address?.state ?? "Not Provided",
                district: data.user_address?.district ?? "Not Provided",
                village_or_city: data.user_address?.village_or_city ?? "Not Provided",
                exact_address: data.user_address?.exact_address ?? "Not Provided",
                pincode: data.user_address?.pincode ?? "Not Provided",
              }
            };
            setFormData(dataWithDefaults);
            setInitialData(dataWithDefaults);
          } catch (err) {
            console.error('Error fetching schemes:', err);
            if (err.response && err.response.status === 401) {
              console.log('Token expired or invalid, redirecting to login...');
              router.push('/login');
            }
          } finally {
            setLoading(false);
          }
      };
      fetchData();
  }, [status, session]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name.includes('user_address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        user_address: {
          ...prev.user_address,
          [addressField]: addressField === 'pincode' ? parseInt(value) || 0 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target).checked :
                type === 'number' ? parseInt(value) || 0 : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    setLoading(true);
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/edit`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    router.push('/profile');
  } catch (err) {
    console.error('Error updating profile:', err);
    if (err.response && err.response.status === 401) {
      console.log('Token expired or invalid, redirecting to login...');
      router.push('/login');
    }
  } finally {
    setLoading(false);
  }
  };

  const handleCancel = () => {
    setFormData(initialData);
    console.log('Form cancelled');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
    {(loading || status === 'loading') ? (
        <Spinner />
      ) : (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600 mt-2">Update your personal information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name} // Required field, keep as-is
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob} // Required field, keep as-is
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender === "Not Provided" ? "" : formData.gender} // Non-required, show empty if "Not Provided"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option> {/* Add empty option for non-required */}
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile_number"
                    value={formData.mobile_number} // Required field, keep as-is
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation === "Not Provided" ? "" : formData.occupation} // Non-required, show empty if "Not Provided"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caste Category
                  </label>
                  <select
                    name="caste_category"
                    value={formData.caste_category === "Not Provided" ? "" : formData.caste_category} // Non-required, show empty if "Not Provided"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Caste Category</option> {/* Add empty option for non-required */}
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BPL Status
                  </label>
                  <select
                    name="bpl"
                    value={formData.bpl === "Not Provided" ? "" : formData.bpl} // Non-required, show empty if "Not Provided"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select BPL Status</option> {/* Add empty option for non-required */}
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="bank_account_number"
                    value={formData.bank_account_number === "Not Provided" ? "" : formData.bank_account_number} // Non-required, show empty if "Not Provided"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="marital_status"
                    checked={formData.marital_status} // Checkbox, no "Not Provided" handling needed
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Married
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_disable"
                    checked={formData.is_disable} // Checkbox, no "Not Provided" handling needed
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Person with Disability
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800">Financial Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income (₹)
                  </label>
                  <input
                    type="number"
                    name="annual_income"
                    value={formData.annual_income === 0 ? "" : formData.annual_income} // Non-required, show empty if 0
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Family Income (₹)
                  </label>
                  <input
                    type="number"
                    name="annual_family_income"
                    value={formData.annual_family_income === 0 ? "" : formData.annual_family_income} // Non-required, show empty if 0
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800">Address Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="user_address.state"
                    value={formData.user_address.state === "Not Provided" ? "" : formData.user_address.state} // Non-required, show empty if "Not Provided"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <input
                    type="text"
                    name="user_address.district"
                    value={formData.user_address.district === "Not Provided" ? "" : formData.user_address.district} // Non-required, show empty if "Not Provided"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Village/City
                  </label>
                  <input
                    type="text"
                    name="user_address.village_or_city"
                    value={formData.user_address.village_or_city === "Not Provided" ? "" : formData.user_address.village_or_city} // Non-required, show empty if "Not Provided"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="number"
                    name="user_address.pincode"
                    value={formData.user_address.pincode === "Not Provided" ? "" : formData.user_address.pincode} // Non-required, show empty if "Not Provided"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    name="user_address.aadhaar_number"
                    value={formData.user_address.aadhaar_number} // Required field, keep as-is
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exact Address
                </label>
                <textarea
                  name="user_address.exact_address"
                  value={formData.user_address.exact_address === "Not Provided" ? "" : formData.user_address.exact_address} // Non-required, show empty if "Not Provided"
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      )}
    </div>
  );
};

export default EditProfilePage;