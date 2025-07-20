'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Spinner } from "@/components/ui/spinner";

const ProfilePage = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const [criteria, setCriteria] = useState([]);
  const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);
  const [newCriteria, setNewCriteria] = useState({ criteria_name: '', criteria_value: '' });

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'loading') {
        return;
      }
      try {
        setLoading(true);
        const profilePromise = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        const criteriaPromise = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/criteria`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        const [response, criteriaResponse] = await Promise.all([profilePromise, criteriaPromise]);
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
        setProfileData(dataWithDefaults);
        setCriteria(criteriaResponse.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const handleAddCriteria = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/add_criteria`,
        newCriteria,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        // Refetch criteria data
        const criteriaResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/criteria`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        setCriteria(criteriaResponse.data || []);
        setNewCriteria({ criteria_name: '', criteria_value: '' });
        setShowAddCriteriaModal(false);
      } else {
        console.error('Failed to add criteria');
      }
    } catch (error) {
      console.error('Error adding criteria:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {(loading || status === 'loading') ? (
        <Spinner />
      ) : (
        <div className="max-w-6x1 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
            <button
              onClick={handleEditProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800">Personal Details</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Full Name:
                    </label>
                    <p className="text-gray-900 font-medium">{profileData.full_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Aadhaar Number:
                    </label>
                    <p className="text-gray-900 font-medium">{profileData.aadhaar_number}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Date of Birth:
                    </label>
                    <p className="text-gray-900 font-medium">{formatDate(profileData.dob)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Gender:
                    </label>
                    <p className="text-gray-900 font-medium">{profileData.gender}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Phone Number:
                    </label>
                    <p className="text-gray-900 font-medium">{profileData.mobile_number}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Marital Status:
                    </label>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      profileData.marital_status 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {profileData.marital_status ? 'Married' : 'Unmarried'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Occupation:
                    </label>
                    <p className="text-gray-900 font-medium">{profileData.occupation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Caste Category:
                    </label>
                    <p className="text-gray-900 font-medium">{profileData.caste_category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Disability Status:
                    </label>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      profileData.is_disable 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {profileData.is_disable ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      BPL Status:
                    </label>
                    <p className="text-gray-900 font-medium">{profileData.bpl}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800">Financial Details</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Annual Income:
                  </label>
                  <p className="text-xl font-bold text-black">{formatCurrency(profileData.annual_income)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Annual Family Income:
                  </label>
                  <p className="text-xl font-bold text-black">{formatCurrency(profileData.annual_family_income)}</p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Bank Account Number:
                  </label>
                  <p className="text-gray-900 font-medium font-mono bg-gray-50 px-3 py-2 rounded border">
                    {profileData.bank_account_number}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800">Address Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    State:
                  </label>
                  <p className="text-gray-900 font-medium">{profileData.user_address.state}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    District:
                  </label>
                  <p className="text-gray-900 font-medium">{profileData.user_address.district}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Village/City:
                  </label>
                  <p className="text-gray-900 font-medium">{profileData.user_address.village_or_city}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Pincode:
                  </label>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    {profileData.user_address.pincode}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Exact Address:
                </label>
                <p className="text-gray-900 font-medium bg-gray-50 px-3 py-2 rounded border">
                  {profileData.user_address.exact_address}
                </p>
              </div>
            </div>
          </div>

          {/* Criteria Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
            <div className="border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Criteria Information</h2>
              <button
                onClick={() => setShowAddCriteriaModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Add Criteria
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {criteria && criteria.map((criterion, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      {criterion.criteria_name}:
                    </label>
                    <p className="text-gray-900 font-medium">{criterion.criteria_value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Criteria Modal */}
          {showAddCriteriaModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Add New Criteria</h2>
                  <button
                    onClick={() => setShowAddCriteriaModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Criteria Name
                    </label>
                    <input
                      type="text"
                      value={newCriteria.criteria_name}
                      onChange={(e) => setNewCriteria({ ...newCriteria, criteria_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter criteria name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Value
                    </label>
                    <input
                      type="text"
                      value={newCriteria.criteria_value}
                      onChange={(e) => setNewCriteria({ ...newCriteria, criteria_value: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter value"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowAddCriteriaModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddCriteria}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      Add Criteria
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;