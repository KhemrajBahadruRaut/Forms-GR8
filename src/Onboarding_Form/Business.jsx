import React, { useState, useEffect } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Business = ({ data, updateData, setStepValidity }) => {
  const [errors, setErrors] = useState({});

  // Validation rules
  const validateField = (name, value) => {
    let error = "";

    if (name === "businessName") {
      if (!value) error = "Business name is required";
      else if (!/^[A-Za-z\s.,&'-]+$/.test(value)) {
        error = "Only letters are allowed";
      }
    }

    if (name === "location") {
      if (!value) error = "Location is required";
      else if (!/^[A-Za-z0-9\s.,&'-]+$/.test(value)) {
        error = "Only letters, numbers & , . & - allowed";
      }
    }

    if (name === "zipCode") {
      if (!value) error = "Zip code is required";
      else if (!/^\d{1,10}$/.test(value)) {
        error = "Zip code must be digits only (max 10)";
      }
    }

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email format";
      }
    }

    if (name === "phoneNumber" || name === "contactNumber") {
      if (!value) error = "Phone number is required";
      else if (!isValidPhoneNumber(value)) {
        error = "Invalid phone number format";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Check overall validity whenever data or errors change
  useEffect(() => {
    const requiredFields = [
      "businessName",
      "location",
      "zipCode",
      "phoneNumber",
      "email",
      "contactName",
      "contactNumber",
    ];

    const isValid = requiredFields.every(
      (field) => data[field] && !errors[field]
    );

    setStepValidity(isValid);
  }, [data, errors, setStepValidity]);

  const handleChange = (name, value) => {
    updateData({ [name]: value });
    validateField(name, value);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Business Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Name */}
        <div className="md:col-span-2">
          <label htmlFor="businessName" className="block mb-1 text-sm font-medium">
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            value={data.businessName || ""}
            onChange={(e) => handleChange("businessName", e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="Business Name"
          />
          {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block mb-1 text-sm font-medium">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={data.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full border rounded-md p-2"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        {/* Zip Code */}
        <div>
          <label htmlFor="zipCode" className="block mb-1 text-sm font-medium">
            Zip Code
          </label>
          <input
            id="zipCode"
            type="text"
            value={data.zipCode || ""}
            onChange={(e) => handleChange("zipCode", e.target.value)}
            className="w-full border rounded-md p-2"
          />
          {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium">
            Phone Number
          </label>
          <PhoneInput
            placeholder="Phone number"
            value={data.phoneNumber || ""}
            onChange={(value) => handleChange("phoneNumber", value)}
            defaultCountry="NP"
            className="border rounded-md p-2"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={data.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="abc@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Website (optional) */}
        <div>
          <label htmlFor="website" className="block mb-1 text-sm font-medium">
            Website
          </label>
          <input
            id="website"
            type="text"
            value={data.website || ""}
            onChange={(e) => updateData({ website: e.target.value })}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Contact Name */}
        <div>
          <label htmlFor="contactName" className="block mb-1 text-sm font-medium">
            Primary Contact Name
          </label>
          <input
            id="contactName"
            type="text"
            value={data.contactName || ""}
            onChange={(e) => handleChange("contactName", e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label htmlFor="contactNumber" className="block mb-1 text-sm font-medium">
            Primary Contact No.
          </label>
          <PhoneInput
            placeholder="Contact number"
            value={data.contactNumber || ""}
            onChange={(value) => handleChange("contactNumber", value)}
            defaultCountry="NP"
            className="border rounded-md p-2"
          />
          {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
        </div>
      </div>
    </section>
  );
};

export default Business;
