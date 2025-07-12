'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {

  const router = useRouter()

  // Sample data
  const profileData = {
    aadhaar_number: "1234 5678 9012",
    full_name: "John Doe",
    dob: "1990-01-15",
    gender: "Male",
    mobile_number: "+91 9876543210",
    marital_status: true,
    occupation: "Software Engineer",
    annual_income: 800000,
    annual_family_income: 1200000,
    bank_account_number: "1234567890123456",
    caste_category: "General",
    is_disable: false,
    bpl: "No",
    user_address: {
      aadhaar_number: "1234 5678 9012",
      state: "Bihar",
      district: "Patna",
      village_or_city: "Patna",
      exact_address: "123 Main Street, Boring Road",
      pincode: 800001
    }
  };

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
    // durgesh bhai do something here 
    // maybe send existing data as route params
    // for isko pre-fill kar dena so user doesn't need to fill up everything
    router.push("/edit-profile")
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
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
      </div>
    </div>
  );
};

export default ProfilePage;