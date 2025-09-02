import React, { useState, useEffect } from "react";

const Content = ({ data, updateData, setStepValidity }) => {
  const [selectedTypes, setSelectedTypes] = useState(data?.selectedContentTypes || []);
  const [otherContent, setOtherContent] = useState(data?.otherContentType || "");
  const [errors, setErrors] = useState({});

  // Update parent data whenever selections change
  useEffect(() => {
    updateData({
      selectedContentTypes: selectedTypes,
      otherContentType: otherContent,
    });

    // Validation: at least one type must be selected
    const isValid =
      selectedTypes.length > 0 &&
      (!selectedTypes.includes("Others") || (otherContent?.trim().length > 0));

    setStepValidity(isValid);

    setErrors({
      selectedTypes: selectedTypes.length === 0 ? "Please select at least one content type." : "",
      otherContent:
        selectedTypes.includes("Others") && otherContent.trim() === ""
          ? "Please specify the other content type."
          : "",
    });
  }, [selectedTypes, otherContent, updateData, setStepValidity]);

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTypes((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
  };

  const handleOtherChange = (e) => {
    setOtherContent(e.target.value);
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

        {errors.selectedTypes && <p className="text-red-500 text-sm">{errors.selectedTypes}</p>}

        {selectedTypes.includes("Others") && (
          <div className="mt-3">
            <label className="block mb-1 text-sm font-medium">Please specify other content types:</label>
            <textarea
              rows={1}
              value={otherContent}
              onChange={handleOtherChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.otherContent && <p className="text-red-500 text-sm">{errors.otherContent}</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default Content;
