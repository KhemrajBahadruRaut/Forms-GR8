import axios from "axios";
import React, { useState, useEffect } from "react";

const Content = ({ data, updateData }) => {
  const [selectedTypes, setSelectedTypes] = useState(data?.selectedContentTypes || []);
  const [otherContent, setOtherContent] = useState(data?.otherContentType || "");

  
  useEffect(() => {
    updateData({
      selectedContentTypes: selectedTypes,
      otherContentType: otherContent,
    });
  }, [selectedTypes, otherContent, updateData]);

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost/gr8-onboardingform/submit_content_info/submit_content_info.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Server response:", response.data);
      alert("Business information submitted successfully!");
    } catch (error) {
      console.error("Error submitting business info:", error.response?.data || error.message);
      alert("Error submitting the form.");
    }
  };
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Content Preferences</h2>

      <div className="space-y-4">
        <label className="block mb-2 text-sm font-medium">
          What type of content would you like to focus on? (Select all that apply)
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Educational",
            "Promotional",
            "Articles",
            "Infographics",
            "Client Testimonials",
            "Product Highlights",
            "Industry News",
            "Memes / Relatable content",
            "Video / Reels / Stories",
            "Polls/Quizzes",
            "Others",
          ].map((type) => (
            <label
              key={type}
              className="flex items-center p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={handleTypeChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">{type}</span>
            </label>
          ))}
        </div>

        {selectedTypes.includes("Others") && (
          <div className="mt-3">
            <label className="block mb-1 text-sm font-medium">
              Please specify other content types:
            </label>
            <textarea
              rows={1}
              value={otherContent}
              onChange={(e) => setOtherContent(e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </section>
  );
};

export default Content;
