import React, { useState, useEffect } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const Workflow = ({ data, updateData, setStepValidity }) => {
  const [reviewerName, setReviewerName] = useState(data?.reviewerName || "");
  const [reviewerLocation, setReviewerLocation] = useState(data?.reviewerLocation || "");
  const [phoneNumber, setPhoneNumber] = useState(data?.reviewerPhone || "");
  const [selectedContacts, setSelectedContacts] = useState(data?.preferredContactModes || []);
  const [otherContact, setOtherContact] = useState(data?.otherContactMethod || "");
  const [reportFrequency, setReportFrequency] = useState(data?.reportFrequency || "");
  const [errors, setErrors] = useState({});

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const json = await res.json();
        const countryList = json
          .map((c) => c?.name?.common)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));
        setCountries(countryList);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setCountries([]);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  // Update parent + validation
  useEffect(() => {
  // Validation
  const nameError = reviewerName.trim()
    ? /^[A-Za-z\s]+$/.test(reviewerName)
      ? ""
      : "Name can only contain letters and spaces."
    : "Reviewer name is required.";

  const phoneError = phoneNumber
    ? isValidPhoneNumber(phoneNumber)
      ? ""
      : "Enter a valid phone number."
    : "Phone number is required.";

  const locationError = reviewerLocation.trim() ? "" : "Location is required.";

  setErrors({
    reviewerName: nameError,
    phoneNumber: phoneError,
    reviewerLocation: locationError,
    // other fields
  });

  const isValid =
    !nameError &&
    !phoneError &&
    !locationError &&
    selectedContacts.length > 0 &&
    (!selectedContacts.includes("Others") || otherContact.trim()) &&
    reportFrequency;

  setStepValidity(isValid);

  // Only update parent if values changed
  updateData((prev) => {
    if (
      prev.reviewerName === reviewerName &&
      prev.reviewerLocation === reviewerLocation &&
      prev.reviewerPhone === phoneNumber &&
      JSON.stringify(prev.preferredContactModes) === JSON.stringify(selectedContacts) &&
      prev.otherContactMethod === otherContact &&
      prev.reportFrequency === reportFrequency
    )
      return prev;

    return {
      ...prev,
      reviewerName,
      reviewerLocation,
      reviewerPhone: phoneNumber,
      preferredContactModes: selectedContacts,
      otherContactMethod: otherContact,
      reportFrequency,
    };
  });
}, [reviewerName, reviewerLocation, phoneNumber, selectedContacts, otherContact, reportFrequency, updateData, setStepValidity]);


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
        {/* Name */}
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

        {/* Phone + Location */}
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
            {loadingCountries ? (
              <p className="text-gray-500 text-sm">Loading countries...</p>
            ) : (
              <select
                value={reviewerLocation}
                onChange={(e) => setReviewerLocation(e.target.value)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            )}
            {errors.reviewerLocation && (
              <p className="text-red-500 text-sm">{errors.reviewerLocation}</p>
            )}
          </div>
        </div>

        {/* Preferred Contact Modes */}
        <div className="mt-6">
          <label className="block mb-2 text-md font-medium">
            Preferred mode of contact:
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
        </div>

        {/* Report Frequency */}
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
