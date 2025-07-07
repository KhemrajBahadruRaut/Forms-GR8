import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";

const Business = ({ data, updateData }) => {
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost/gr8-onboardingform/submit_business_info/submit_business_info.php",
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
            onChange={(e) => updateData({ businessName: e.target.value })}
            className="w-full border rounded-md p-2"
            placeholder="Business Name"
          />
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
            onChange={(e) => updateData({ location: e.target.value })}
            className="w-full border rounded-md p-2"
          />
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
            onChange={(e) => updateData({ zipCode: e.target.value })}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium">
            Phone Number
          </label>
          <PhoneInput
            placeholder="Phone number"
            value={data.phoneNumber || ""}
            onChange={(value) => updateData({ phoneNumber: value })}
            defaultCountry="NP"
            className="border rounded-md p-2"
          />
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
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full border rounded-md p-2"
            placeholder="abc@example.com"
          />
        </div>

        {/* Website */}
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
            onChange={(e) => updateData({ contactName: e.target.value })}
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
            onChange={(value) => updateData({ contactNumber: value })}
            defaultCountry="NP"
            className="border rounded-md p-2"
          />
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

export default Business;
