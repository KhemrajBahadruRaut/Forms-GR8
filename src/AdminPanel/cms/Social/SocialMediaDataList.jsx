import { useEffect, useState } from "react";
import axios from "axios";

const SocialMediaDataList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/social_media_info/get_social_info.php")
    // axios.get("http://localhost/gr8-onboardingform/social_media_info/get_social_info.php")
    // axios.get("https://gr8nepal.com/gr8-onboardingform/social_media_info/get_social_info.php")
      .then(res => setList(res.data))
      .catch(err => console.error("Fetch error", err));
  }, []);
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border table-auto text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Has Account</th>
            <th className="border px-3 py-2">Platforms</th>
            <th className="border px-3 py-2">Other</th>
            <th className="border px-3 py-2">Needs Setup</th>
            <th className="border px-3 py-2">Setup Details</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(list) && list.map((item, index) => (
            <tr key={index}>
              <td className="border px-3 py-2">{item.social_accounts_exist}</td>
              <td className="border px-3 py-2">{JSON.parse(item.selected_platforms).join(", ")}</td>
              <td className="border px-3 py-2">{item.other_platform}</td>
              <td className="border px-3 py-2">{item.setup_redesign}</td>
              <td className="border px-3 py-2">{item.setup_details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SocialMediaDataList;
