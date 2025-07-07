import axios from "axios";
import React, { useState } from "react";

const SocialMedia = ({ data, updateData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handlePlatformToggle = (platform) => {
    const selected = data.selectedPlatforms.includes(platform)
      ? data.selectedPlatforms.filter((p) => p !== platform)
      : [...data.selectedPlatforms, platform];
    updateData({ selectedPlatforms: selected });
  };

  const platforms = [
    "Facebook",
    "Instagram",
    "Twitter",
    "LinkedIn",
    "TikTok",
    "Pinterest",
    "Twitter/X",
    "Youtube",
    "Others",
  ];

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost/gr8-onboardingform/social_media_info/submit_social_info.php",
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
      <h2 className="text-2xl font-semibold mb-4">Social Media Presence</h2>
      <div className="space-y-6">
        {/* Question 1 */}
        <div>
          <label className="block text-sm font-medium">
            Do you currently have social media accounts?
          </label>
          <div className="flex mt-2">
            {["yes", "no"].map((val) => (
              <div className="flex items-center pr-6" key={val}>
                <input
                  id={`social-existing-${val}`}
                  type="radio"
                  name="social-existing"
                  value={val}
                  checked={data.socialAccountsExist === val}
                  onChange={(e) =>
                    updateData({ socialAccountsExist: e.target.value })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300"
                />
                <label
                  htmlFor={`social-existing-${val}`}
                  className="ml-2 text-sm font-medium"
                >
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Please select your active social media platforms:
          </label>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full justify-between text-left text-sm bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 flex items-center"
          >
            {data.selectedPlatforms.length > 0
              ? `Selected: ${data.selectedPlatforms.join(", ")}`
              : "Select Platforms"}
            <svg
              className="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-sm max-h-64 overflow-y-auto">
              <ul className="p-3 space-y-1 text-sm">
                {platforms.map((platform) => (
                  <li key={platform}>
                    <div className="flex items-center p-2 hover:bg-gray-100 rounded">
                      <input
                        id={`platform-${platform}`}
                        type="checkbox"
                        checked={data.selectedPlatforms.includes(platform)}
                        onChange={() => handlePlatformToggle(platform)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`platform-${platform}`}
                        className="ml-2 text-sm font-medium"
                      >
                        {platform}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.selectedPlatforms.includes("Others") && (
            <div className="mt-2">
              <label className="block mb-1 text-sm font-medium">
                Other platform name:
              </label>
              <input
                type="text"
                value={data.otherPlatform}
                onChange={(e) =>
                  updateData({ otherPlatform: e.target.value })
                }
                className="w-full border rounded-md p-2"
                placeholder="Enter platform name"
              />
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div>
          <label className="block text-sm font-medium">
            Are there any accounts that need to be set up or redesigned?
          </label>
          <div className="flex mt-2">
            {["yes", "no"].map((val) => (
              <div className="flex items-center pr-6" key={val}>
                <input
                  id={`social-setup-${val}`}
                  type="radio"
                  name="social-setup"
                  value={val}
                  checked={data.setupRedesign === val}
                  onChange={(e) => updateData({ setupRedesign: e.target.value })}
                  className="w-4 h-4 text-blue-600 border-gray-300"
                />
                <label
                  htmlFor={`social-setup-${val}`}
                  className="ml-2 text-sm font-medium"
                >
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </label>
              </div>
            ))}
          </div>
          {data.setupRedesign === "yes" && (
            <div className="mt-2">
              <label className="block mb-1 text-sm font-medium">
                If yes, please specify:
              </label>
              <input
                type="text"
                value={data.setupDetails}
                onChange={(e) =>
                  updateData({ setupDetails: e.target.value })
                }
                className="w-full border rounded-md p-2"
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
      </div>
    </section>
  );
};

export default SocialMedia;
