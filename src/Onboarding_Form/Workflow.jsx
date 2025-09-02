import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";

const Workflow = ({ data, updateData, setStepValidity }) => {
  const [reviewerName, setReviewerName] = useState(data?.reviewerName || "");
  const [reviewerLocation, setReviewerLocation] = useState(data?.reviewerLocation || "");
  const [phoneNumber, setPhoneNumber] = useState(data?.reviewerPhone || "");
  const [selectedContacts, setSelectedContacts] = useState(data?.preferredContactModes || []);
  const [otherContact, setOtherContact] = useState(data?.otherContactMethod || "");
  const [reportFrequency, setReportFrequency] = useState(data?.reportFrequency || "");
  const [errors, setErrors] = useState({});

  // Update parent data and validate step
  useEffect(() => {
    updateData({
      reviewerName,
      reviewerLocation,
      reviewerPhone: phoneNumber,
      preferredContactModes: selectedContacts,
      otherContactMethod: otherContact,
      reportFrequency,
    });

    const isValid =
      reviewerName.trim() &&
      reviewerLocation.trim() &&
      phoneNumber &&
      selectedContacts.length > 0 &&
      (!selectedContacts.includes("Others") || otherContact.trim()) &&
      reportFrequency;

    setStepValidity(isValid);

    setErrors({
      reviewerName: reviewerName.trim() ? "" : "Reviewer name is required.",
      reviewerLocation: reviewerLocation.trim() ? "" : "Location is required.",
      phoneNumber: phoneNumber ? "" : "Phone number is required.",
      selectedContacts:
        selectedContacts.length > 0 ? "" : "Select at least one preferred contact mode.",
      otherContact:
        selectedContacts.includes("Others") && !otherContact.trim()
          ? "Specify other contact method."
          : "",
      reportFrequency: reportFrequency ? "" : "Please select report frequency.",
    });
  }, [
    reviewerName,
    reviewerLocation,
    phoneNumber,
    selectedContacts,
    otherContact,
    reportFrequency,
    updateData,
    setStepValidity,
  ]);

  const handleContactChange = (e) => {
    const { value, checked } = e.target;
    setSelectedContacts((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Approvals & Workflow</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            className="w-full border rounded-md p-2"
          />
          {errors.reviewerName && <p className="text-red-500 text-sm">{errors.reviewerName}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Phone Number</label>
            <PhoneInput
              placeholder="Phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              defaultCountry="NP"
              className="border rounded-md p-2"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Location</label>
            <input
              type="text"
              value={reviewerLocation}
              onChange={(e) => setReviewerLocation(e.target.value)}
              className="w-full border rounded-md p-2"
            />
            {errors.reviewerLocation && (
              <p className="text-red-500 text-sm">{errors.reviewerLocation}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <label className="block mb-2 text-md font-medium">
          Preferred mode of contact for communication and feedback:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {["Whats App", "Viber", "Mail", "Messenger", "Phone", "Others"].map((platform) => (
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
          ))}
        </div>
        {errors.selectedContacts && (
          <p className="text-red-500 text-sm">{errors.selectedContacts}</p>
        )}

        {selectedContacts.includes("Others") && (
          <div className="mt-3">
            <label className="block mb-1 text-sm font-medium">Specify other contact method:</label>
            <textarea
              rows={1}
              value={otherContact}
              onChange={(e) => setOtherContact(e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.otherContact && <p className="text-red-500 text-sm">{errors.otherContact}</p>}
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
          {errors.reportFrequency && (
            <p className="text-red-500 text-sm">{errors.reportFrequency}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
