import React, { useState, useEffect } from "react";
import { GiCheckedShield } from "react-icons/gi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { printBusinessInfo } from './BusinessPrintUtils';

const AdminBusinessList = () => {
  const [businessList, setBusinessList] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("business");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all business names
  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = () => {
    setLoading(true);
    fetch(
      "https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_business_info/get_business_info.php",
      // "http://localhost/gr8-onboardingform/submit_business_info/get_business_info.php",
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // Filter out deleted businesses
        const deletedBusinesses = JSON.parse(localStorage.getItem('deletedBusinesses') || '[]');
        const filteredData = data.filter(business => !deletedBusinesses.includes(business.id));
        setBusinessList(filteredData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleClick = (id) => {
    setLoading(true);
    fetch(
      `https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_business_info/get_full_business_info.php?id=${id}`,
      // `http://localhost/gr8-onboardingform/submit_business_info/get_full_business_info.php?id=${id}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSelectedBusiness(data);
        setShowModal(true);
        setActiveTab("business");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const toggleStatus = (businessId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'pending' : 'active';
    
    // Show confirmation toast
    toast.info(
      <div>
        <p>Are you sure you want to change status to {newStatus}?</p>
        <div className="flex justify-center gap-4 mt-2">
          <button 
            className="px-3 py-1 bg-green-500 text-white rounded"
            onClick={() => {
              toast.dismiss();
              confirmStatusChange(businessId, newStatus);
            }}
          >
            Yes
          </button>
          <button 
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const confirmStatusChange = (businessId, newStatus) => {
    // Update the status locally first for immediate UI feedback
    setBusinessList(prevList => 
      prevList.map(business => 
        business.id === businessId 
          ? { ...business, status: newStatus } 
          : business
      )
    );

    // Show success message
    toast.success(`Status changed to ${newStatus}`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const deleteBusiness = (businessId, businessName) => {
    // Show confirmation toast with business name
    toast.error(
      <div>
        <p className="font-semibold">Delete Business</p>
        <p className="text-sm mb-3">Are you sure you want to delete "{businessName}"? This action cannot be undone.</p>
        <div className="flex justify-center gap-3">
          <button 
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition-colors"
            onClick={() => {
              toast.dismiss();
              confirmDeleteBusiness(businessId, businessName);
            }}
          >
            Delete
          </button>
          <button 
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium transition-colors"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        className: "custom-delete-toast"
      }
    );
  };

  const confirmDeleteBusiness = (businessId, businessName) => {
    // Store deleted business ID in localStorage
    const deletedBusinesses = JSON.parse(localStorage.getItem('deletedBusinesses') || '[]');
    deletedBusinesses.push(businessId);
    localStorage.setItem('deletedBusinesses', JSON.stringify(deletedBusinesses));
    
    // Remove business from local state
    setBusinessList(prevList => 
      prevList.filter(business => business.id !== businessId)
    );

    // Close modal if the deleted business was being viewed
    if (selectedBusiness && selectedBusiness.id === businessId) {
      setShowModal(false);
      setSelectedBusiness(null);
    }

    // Show success message
    toast.success(
      <div>
        <p className="font-semibold">Business Deleted</p>
        <p className="text-sm">"{businessName}" has been successfully deleted.</p>
      </div>,
      {
        position: "top-right",
        autoClose: 4000,
      }
    );
  };

  // Print function - now uses the external utility
  const handlePrint = () => {
    if (!selectedBusiness) return;
    printBusinessInfo(selectedBusiness);
  };

  // Filter businesses based on search term
  const filteredBusinesses = businessList.filter((business) =>
    business.business_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Business Directory</h1>
          <p className="text-gray-600">Manage and view all business submissions in one place</p>
        </div>

        {/* Search and Stats Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-slide-down">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search businesses..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg flex items-center">
                <span className="text-2xl font-bold mr-2">{businessList.length}</span>
                <span>Total</span>
              </div>
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg flex items-center">
                <span className="text-2xl font-bold mr-2">{businessList.filter(b => b.status === 'active').length}</span>
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Business List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in-up">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Business Listings</h2>
          </div>
          
          {loading ? (
            <div className="p-12 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredBusinesses.map((business) => (
                <div 
                  key={business.id} 
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden transform hover:-translate-y-1 relative group"
                >
                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBusiness(business.id, business.business_name);
                    }}
                    className="absolute top-3 right-3 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110 shadow-lg"
                    title="Delete Business"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4 pr-8">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{business.business_name}</h3>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{business.location || 'No location provided'}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm">{business.phone_number || 'No phone provided'}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleClick(business.id)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      View Details
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredBusinesses.length === 0 && !loading && (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No businesses found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search term or check back later.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedBusiness && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <h2 className="text-2xl font-bold truncate">
                {selectedBusiness.business_name || "Unnamed Business"}
              </h2>
              <div className="flex items-center gap-2">
                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-200 flex items-center"
                  title="Print Business Information"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </button>
                {/* Delete button in modal header */}
                <button
                  onClick={() => deleteBusiness(selectedBusiness.id, selectedBusiness.business_name)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
                  title="Delete Business"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="transition-colors duration-200 text-xl bg-opacity-0 hover:bg-opacity-10 rounded-full p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex border-b">
              {[
                { id: "business", label: "Business", icon: "🏢" },
                { id: "social", label: "Social Media", icon: "📱" },
                { id: "target", label: "Target", icon: "🎯" },
                { id: "brand", label: "Brand", icon: "🌟" },
                { id: "content", label: "Content", icon: "📝" },
                { id: "workflow", label: "Workflow", icon: "⚙️" },
                { id: "additional", label: "Additional", icon: "📊" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-3 font-medium text-sm transition-colors duration-200 flex items-center ${activeTab === tab.id ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="overflow-y-auto p-6">
              {/* Business Info Tab */}
              {activeTab === "business" && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Business Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem label="Location" value={selectedBusiness.location} icon="📍" />
                    <InfoItem label="ZIP Code" value={selectedBusiness.zip_code} icon="📮" />
                    <InfoItem label="Phone Number" value={selectedBusiness.phone_number} icon="📞" />
                    <InfoItem label="Email" value={selectedBusiness.email} icon="✉️" />
                    <InfoItem label="Website" value={selectedBusiness.website} icon="🌐" />
                    <InfoItem label="Contact Name" value={selectedBusiness.contact_name} icon="👤" />
                    <InfoItem label="Contact Number" value={selectedBusiness.contact_number} icon="📱" />
                  </div>
                </div>
              )}
              
              {/* Social Media Tab */}
              {activeTab === "social" && selectedBusiness.social_media_info && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Social Media Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem label="Accounts Exist" value={selectedBusiness.social_media_info.social_accounts_exist} />
                    <InfoItem 
                      label="Selected Platforms" 
                      value={selectedBusiness.social_media_info.selected_platforms?.join(", ") || "None"} 
                    />
                    <InfoItem label="Other Platform" value={selectedBusiness.social_media_info.other_platform} />
                    <InfoItem label="Setup/Redesign" value={selectedBusiness.social_media_info.setup_redesign} />
                    <InfoItem 
                      label="Setup Details" 
                      value={selectedBusiness.social_media_info.setup_details} 
                      fullWidth
                    />
                  </div>
                </div>
              )}
              
              {/* Other tabs would follow the same pattern */}
              {/* Target Info Tab */}
              {activeTab === "target" && selectedBusiness.target_info && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Target Audience Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem 
                      label="Selected Ages" 
                      value={selectedBusiness.target_info.selected_ages?.join(", ")} 
                    />
                    <InfoItem 
                      label="Selected Genders" 
                      value={selectedBusiness.target_info.selected_genders?.join(", ")} 
                    />
                    <InfoItem label="Target Location" value={selectedBusiness.target_info.target_location} />
                    <InfoItem label="Target Interests" value={selectedBusiness.target_info.target_interests} />
                    <InfoItem label="Target Profession" value={selectedBusiness.target_info.target_profession} />
                    <InfoItem label="Other Details" value={selectedBusiness.target_info.target_other_details} />
                    <InfoItem label="Industries" value={selectedBusiness.target_info.target_industries} />
                    <InfoItem label="Pain Points" value={selectedBusiness.target_info.target_pain_points} />
                  </div>
                </div>
              )}
              
              {/* Brand Voice Tab */}
              {activeTab === "brand" && selectedBusiness.brand_voice && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0 0l-2.828 2.829m2.828-2.829l2.829 2.829" />
                    </svg>
                    Brand Voice
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem 
                      label="Selected Voices" 
                      value={selectedBusiness.brand_voice.selected_voices?.join(", ")} 
                    />
                    <InfoItem label="Other Voice" value={selectedBusiness.brand_voice.other_voice} />
                    <InfoItem label="Brand Phrases" value={selectedBusiness.brand_voice.brand_phrases} fullWidth />
                    <InfoItem label="Brand Exclusions" value={selectedBusiness.brand_voice.brand_exclusions} fullWidth />
                  </div>
                </div>
              )}
              
              {/* Content Preferences Tab */}
              {activeTab === "content" && selectedBusiness.content_preferences && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Content Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem 
                      label="Selected Content Types" 
                      value={selectedBusiness.content_preferences.selected_content_types?.join(", ")} 
                    />
                    <InfoItem 
                      label="Other Content Type" 
                      value={selectedBusiness.content_preferences.other_content_type} 
                    />
                  </div>
                </div>
              )}
              
              {/* Workflow Info Tab */}
              {activeTab === "workflow" && selectedBusiness.workflow_info && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.350 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Workflow Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem label="Reviewer Name" value={selectedBusiness.workflow_info.reviewer_name} />
                    <InfoItem label="Reviewer Location" value={selectedBusiness.workflow_info.reviewer_location} />
                    <InfoItem label="Reviewer Phone" value={selectedBusiness.workflow_info.reviewer_phone} />
                    <InfoItem label="Country Code" value={selectedBusiness.workflow_info.country_code} />
                    <InfoItem 
                      label="Preferred Contact Modes" 
                      value={selectedBusiness.workflow_info.preferred_contact_modes?.join(", ")} 
                    />
                    <InfoItem 
                      label="Other Contact Method" 
                      value={selectedBusiness.workflow_info.other_contact_method} 
                    />
                    <InfoItem label="Report Frequency" value={selectedBusiness.workflow_info.report_frequency} />
                  </div>
                </div>
              )}
              
              {/* Additional Info Tab */}
              {activeTab === "additional" && selectedBusiness.additional_info && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem label="Admire Accounts" value={selectedBusiness.additional_info.admire_accounts} />
                    <InfoItem label="Competitors" value={selectedBusiness.additional_info.competitors} />
                    <InfoItem label="Upcoming Launches" value={selectedBusiness.additional_info.upcoming_launches} />
                    <InfoItem label="Other Information" value={selectedBusiness.additional_info.other_info} fullWidth />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slide-down {
          animation: slideDown 0.5s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        .custom-delete-toast {
          background-color: #fee2e2 !important;
          color: #991b1b !important;
        }
        .custom-delete-toast .Toastify__toast-body {
          padding: 0 !important;
        }
      `}</style>
    </div>
  );
};

// Helper component for consistent info display
const InfoItem = ({ label, value, icon, fullWidth = false }) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <p className="text-sm font-medium text-gray-500 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </p>
    <p className="mt-1 text-gray-900 break-words bg-gray-50 p-3 rounded-lg">
      {value || "None"}
    </p>
  </div>
);

export default AdminBusinessList;