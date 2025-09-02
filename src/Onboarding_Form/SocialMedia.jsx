import React, { useState, useEffect } from "react";

const SocialMedia = ({ data, updateData, setStepValidity }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const platforms = [
    "Facebook",
    "Instagram",
    "LinkedIn",
    "TikTok",
    "Pinterest",
    "Twitter/X",
    "Youtube",
    "Others",
  ];

  // Validation rules
  const validateField = (name, value) => {
    let error = "";

    if (name === "otherPlatform" || name === "setupDetails") {
      if (value && !/^[A-Za-z\s]+$/.test(value)) {
        error = "Only letters and spaces are allowed";
      }
    }

    if (name === "selectedPlatforms") {
      if (data.socialAccountsExist === "yes" && value.length === 0) {
        error = "Please select at least one platform";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlePlatformToggle = (platform) => {
    const selected = data.selectedPlatforms.includes(platform)
      ? data.selectedPlatforms.filter((p) => p !== platform)
      : [...data.selectedPlatforms, platform];

    updateData({ selectedPlatforms: selected });
    validateField("selectedPlatforms", selected);
  };

  const handleChange = (name, value) => {
    updateData({ [name]: value });
    validateField(name, value);
  };

  // 🔑 Step validity checker
  useEffect(() => {
    let isValid = true;

    // Rule 1: Must answer Q1
    if (!data.socialAccountsExist) isValid = false;

    // Rule 2: If "yes", must select at least one platform
    if (data.socialAccountsExist === "yes") {
      if (data.selectedPlatforms.length === 0 || errors.selectedPlatforms) {
        isValid = false;
      }

      // If "Others" chosen, validate input
      if (data.selectedPlatforms.includes("Others")) {
        if (!data.otherPlatform || errors.otherPlatform) {
          isValid = false;
        }
      }
    }

    // Rule 3: Must answer Q2
    if (!data.setupRedesign) isValid = false;

    // Rule 4: If "yes", validate setup details
    if (data.setupRedesign === "yes") {
      if (!data.setupDetails || errors.setupDetails) {
        isValid = false;
      }
    }

    setStepValidity(isValid);
  }, [data, errors, setStepValidity]);

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
                  onChange={(e) => handleChange("socialAccountsExist", e.target.value)}
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
        {data.socialAccountsExist === "yes" && (
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

            {errors.selectedPlatforms && (
              <p className="text-red-500 text-sm">{errors.selectedPlatforms}</p>
            )}

            {data.selectedPlatforms.includes("Others") && (
              <div className="mt-2">
                <label className="block mb-1 text-sm font-medium">
                  Other platform name:
                </label>
                <input
                  type="text"
                  value={data.otherPlatform}
                  onChange={(e) => handleChange("otherPlatform", e.target.value)}
                  className="w-full border rounded-md p-2"
                  placeholder="Enter platform name"
                />
                {errors.otherPlatform && (
                  <p className="text-red-500 text-sm">{errors.otherPlatform}</p>
                )}
              </div>
            )}
          </div>
        )}

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
                  onChange={(e) => handleChange("setupRedesign", e.target.value)}
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
                onChange={(e) => handleChange("setupDetails", e.target.value)}
                className="w-full border rounded-md p-2"
              />
              {errors.setupDetails && (
                <p className="text-red-500 text-sm">{errors.setupDetails}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
