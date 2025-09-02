// src/components/cms/BusinessDataList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BusinessDataList = () => {
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchBusinessData = async () => {
    try {
      const response = await axios.get(
        "https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_business_info/get_business_info.php"
        // "http://localhost/gr8-onboardingform/submit_business_info/get_business_info.php"
        // "https://gr8nepal.com/gr8-onboardingform/submit_business_info/get_business_info.php"
      );
      console.log("API Response:", response.data); // 👈 Add this line
      setBusinessList(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching business data:", error);
      setLoading(false);
    }
  };

  fetchBusinessData();
}, []);


  if (loading) return <p>Loading business entries...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border table-auto text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Business Name</th>
            <th className="border px-3 py-2">Location</th>
            <th className="border px-3 py-2">Zip</th>
            <th className="border px-3 py-2">Phone</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Website</th>
            <th className="border px-3 py-2">Contact Name</th>
            <th className="border px-3 py-2">Contact No.</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(businessList) && businessList.length > 0 ? (
    businessList.map((item, index) => (
      <tr key={index}>
        <td className="border px-3 py-2">{item.business_name}</td>
        <td className="border px-3 py-2">{item.location}</td>
        <td className="border px-3 py-2">{item.zip_code}</td>
        <td className="border px-3 py-2">{item.phone_number}</td>
        <td className="border px-3 py-2">{item.email}</td>
        <td className="border px-3 py-2">{item.website}</td>
        <td className="border px-3 py-2">{item.contact_name}</td>
        <td className="border px-3 py-2">{item.contact_number}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" className="text-center text-gray-500 py-4">
        No business data found.
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default BusinessDataList;
