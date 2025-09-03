import React, { useState, useEffect, useRef } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Business = ({ data, updateData, setStepValidity }) => {
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef(null);

  // ✅ Validation
  const validateField = (name, value) => {
    let error = "";

    if (name === "businessName") {
      if (!value) error = "Business name is required";
      else if (!/^[A-Za-z\s.,&'-]+$/.test(value)) {
        error = "Only letters are allowed";
      }
    }

    if (name === "location" && !value) {
      error = "Location is required";
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

    if (name === "contactName" && !value) {
      error = "Contact name is required";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ✅ Step validity check
  useEffect(() => {
    const required = [
      "businessName",
      "location",
      "phoneNumber",
      "email",
      "contactName",
      "contactNumber",
    ];
    const isValid = required.every((f) => data[f] && !errors[f]);
    setStepValidity(isValid);
  }, [data, errors, setStepValidity]);

  const handleChange = (name, value) => {
    updateData({ [name]: value });
    validateField(name, value);
  };

  // ✅ Fetch location suggestions (debounced)
  const fetchLocations = (query) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&addressdetails=1&limit=8`
        );
        const data = await res.json();
        setSuggestions(data);
        setActiveIndex(-1);
      } catch (err) {
        console.error("Location fetch error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  // ✅ Keyboard navigation for location dropdown
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectLocation(suggestions[activeIndex]);
    }
  };

  // ✅ Select a location
  const selectLocation = (place) => {
    handleChange("location", place.display_name);
    updateData({
      latitude: place.lat,
      longitude: place.lon,
    });
    setSuggestions([]);
  };

  // ✅ Highlight matches in suggestions
  const highlightMatch = (text, query) => {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.substring(0, idx)}
        <b>{text.substring(idx, idx + query.length)}</b>
        {text.substring(idx + query.length)}
      </>
    );
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Business Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Name */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium">Business Name</label>
          <input
            type="text"
            value={data.businessName || ""}
            onChange={(e) => handleChange("businessName", e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="Business Name"
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm">{errors.businessName}</p>
          )}
        </div>

        {/* Location */}
        <div className="md:col-span-2 relative">
          <label className="block mb-1 text-sm font-medium">Location</label>
          <input
            type="text"
            value={data.location || ""}
            onChange={(e) => {
              handleChange("location", e.target.value);
              fetchLocations(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            className="w-full border rounded-md p-2"
            placeholder="Search worldwide..."
          />
          {loading && <div className="text-sm text-gray-500">Searching...</div>}

          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded-md shadow-lg w-full max-h-56 overflow-y-auto mt-1">
              {suggestions.map((place, idx) => (
                <li
                  key={place.place_id}
                  onClick={() => selectLocation(place)}
                  className={`p-2 cursor-pointer ${
                    idx === activeIndex ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                >
                  {highlightMatch(place.display_name, data.location)}
                </li>
              ))}
            </ul>
          )}

          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number</label>
          <PhoneInput
            placeholder="Phone number"
            value={data.phoneNumber || ""}
            onChange={(val) => handleChange("phoneNumber", val)}
            defaultCountry="NP"
            className="border rounded-md p-2"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
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
          <label className="block mb-1 text-sm font-medium">Website</label>
          <input
            type="text"
            value={data.website || ""}
            onChange={(e) => updateData({ website: e.target.value })}
            className="w-full border rounded-md p-2"
            placeholder="https://example.com"
          />
        </div>

        {/* Contact Name */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Primary Contact Name
          </label>
          <input
            type="text"
            value={data.contactName || ""}
            onChange={(e) => handleChange("contactName", e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="John Doe"
          />
          {errors.contactName && (
            <p className="text-red-500 text-sm">{errors.contactName}</p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Primary Contact No.
          </label>
          <PhoneInput
            placeholder="Contact number"
            value={data.contactNumber || ""}
            onChange={(val) => handleChange("contactNumber", val)}
            defaultCountry="NP"
            className="border rounded-md p-2"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm">{errors.contactNumber}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Business;
