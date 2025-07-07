import axios from "axios";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";

const Workflow = ({ data, updateData }) => {
  const [reviewerName, setReviewerName] = useState(data?.reviewerName || "");
  const [reviewerLocation, setReviewerLocation] = useState(
    data?.reviewerLocation || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(data?.reviewerPhone || "");
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    data?.countryCode || "+1"
  );
  const [selectedContacts, setSelectedContacts] = useState(
    data?.preferredContactModes || []
  );
  const [otherContact, setOtherContact] = useState(
    data?.otherContactMethod || ""
  );
  const [reportFrequency, setReportFrequency] = useState(
    data?.reportFrequency || ""
  );
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  // Simple country list for demonstration
  const countryCodes = [
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "+971", name: "UAE", flag: "🇦🇪" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
  ];

  const filteredCountries = countryCodes.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Update parent state when anything changes
  useEffect(() => {
    updateData({
      reviewerName,
      reviewerLocation,
      reviewerPhone: phoneNumber,
      countryCode: selectedCountryCode,
      preferredContactModes: selectedContacts,
      otherContactMethod: otherContact,
      reportFrequency,
    });
  }, [
    reviewerName,
    reviewerLocation,
    phoneNumber,
    selectedCountryCode,
    selectedContacts,
    otherContact,
    reportFrequency,
    updateData,
  ]);

  const handleContactChange = (e) => {
    const { value, checked } = e.target;
    setSelectedContacts((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost/gr8-onboardingform/submit_workflow_info/submit_workflow_info.php",
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
      console.error(
        "Error submitting business info:",
        error.response?.data || error.message
      );
      alert("Error submitting the form.");
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Approvals & Workflow</h2>

      <div className="space-y-4">
        <label className="block mb-2 text-md font-medium">
          Who will be reviewing and approving content?
        </label>

        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label
              htmlFor="phoneNumber"
              className="block mb-1 text-sm font-medium"
            >
              Phone Number
            </label>

            <div>
              <PhoneInput
                placeholder="Phone number"
                value={phoneNumber} // ← This should come from the correct state
                onChange={(value) => setPhoneNumber(value)} // ← Also update state correctly
                defaultCountry="NP"
                className="border rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Location</label>
            <input
              type="text"
              value={reviewerLocation}
              onChange={(e) => setReviewerLocation(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <label className="block mb-2 text-md font-medium">
          Preferred mode of contact for communication and feedback:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {["Whats App", "Viber", "Mail", "Messenger", "Phone", "Others"].map(
            (platform) => (
              <label
                key={platform}
                className="flex items-center p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={platform}
                  checked={selectedContacts.includes(platform)}
                  onChange={handleContactChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">{platform}</span>
              </label>
            )
          )}
        </div>

        {selectedContacts.includes("Others") && (
          <div className="mt-3">
            <label className="block mb-1 text-sm font-medium">
              Please specify other contact methods:
            </label>
            <textarea
              rows={1}
              value={otherContact}
              onChange={(e) => setOtherContact(e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium">
            How frequently would you like updates and performance reports?
          </label>
          <div className="flex flex-wrap mt-2 gap-4">
            {["Weekly", "Bi-weekly", "Monthly", "Quarterly"].map((freq) => (
              <label key={freq} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="report-frequency"
                  value={freq}
                  checked={reportFrequency === freq}
                  onChange={(e) => setReportFrequency(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">{freq}</span>
              </label>
            ))}
          </div>
        </div>
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

export default Workflow;
