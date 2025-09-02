import React, { useEffect, useState } from "react";
import axios from "axios";

const BrandVoiceList = () => {
  const [brandList, setBrandList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_brand_voice/get_brand_voice.php")
      // .get("http://localhost/gr8-onboardingform/submit_brand_voice/get_brand_voice.php")
      // .get("https://gr8nepal.com/gr8-onboardingform/submit_brand_voice/get_brand_voice.php")
      .then((res) => {
        setBrandList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading brand voice entries...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border table-auto text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Voices</th>
            <th className="border px-3 py-2">Other Voice</th>
            <th className="border px-3 py-2">Phrases / Hashtags</th>
            <th className="border px-3 py-2">Exclusions</th>
            <th className="border px-3 py-2">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(brandList) &&
  brandList.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{(item.selected_voices || []).join(", ")}</td>
              <td className="border px-3 py-2">{item.other_voice}</td>
              <td className="border px-3 py-2">{item.brand_phrases}</td>
              <td className="border px-3 py-2">{item.brand_exclusions}</td>
              <td className="border px-3 py-2">{item.submitted_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandVoiceList;
