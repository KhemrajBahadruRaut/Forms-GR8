import React, { useEffect, useState } from "react";
import axios from "axios";

const ContentDataList = () => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/gr8-onboardingform/submit_content_info/get_content_info.php")
      .then((res) => {
        setContentList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching content data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading content preferences...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border table-auto text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Selected Content Types</th>
            <th className="border px-3 py-2">Other Content Type</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(contentList) &&
            contentList.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-3 py-2">
                  {JSON.parse(item.selected_content_types).join(", ")}
                </td>
                <td className="border px-3 py-2">{item.other_content_type}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentDataList;
