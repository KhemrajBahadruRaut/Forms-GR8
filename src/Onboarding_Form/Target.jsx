import React, { useEffect, useState } from "react";

const Target = ({ data, updateData, setStepValidity }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if (name === "selectedAges" && (!value || value.length === 0)) {
      error = "Please select at least one age range.";
    }
    if (name === "selectedGenders" && (!value || value.length === 0)) {
      error = "Please select at least one gender.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    // Step is valid if ages & genders have at least one selection
    const isValid =
      (name === "selectedAges"
        ? value.length > 0
        : data.selectedAges?.length > 0) &&
      (name === "selectedGenders"
        ? value.length > 0
        : data.selectedGenders?.length > 0);

    setStepValidity(isValid);
  };

  const handleAgeChange = (e) => {
    const { value, checked } = e.target;
    const currentAges = data.selectedAges || [];
    const updatedAges = checked
      ? [...currentAges, value]
      : currentAges.filter((v) => v !== value);
    updateData({ selectedAges: updatedAges });
    validateField("selectedAges", updatedAges);
  };

  const handleGenderChange = (e) => {
    const { value, checked } = e.target;
    const currentGenders = data.selectedGenders || [];
    const updatedGenders = checked
      ? [...currentGenders, value]
      : currentGenders.filter((v) => v !== value);
    updateData({ selectedGenders: updatedGenders });
    validateField("selectedGenders", updatedGenders);
  };

  const handleTextChange = (field) => (e) => {
    updateData({ [field]: e.target.value });
  };

  // Run validation on mount to restore localStorage values
  useEffect(() => {
    validateField("selectedAges", data.selectedAges || []);
    validateField("selectedGenders", data.selectedGenders || []);
  }, []);
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        if (!res.ok) throw new Error("Failed to fetch countries");

        const json = await res.json();
        const countryList = json
          .map((c) => c?.name?.common)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));

        setCountries(countryList);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setCountries([]); // fallback to empty array
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  const interestsList = [
    "Fitness",
    "Technology",
    "Business",
    "Travel",
    "Music",
    "Fashion",
    "Movies",
    "Sports",
    "Food",
    "Photography",
    "Gaming",
    "Education",
    "Self-Improvement",
  ];
  const handleChange = (e) => {
    updateData({ targetInterests: e.target.value });
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Target Audience</h2>
      <div className="space-y-6">
        {/* Age */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Who is your ideal customer? Age?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["18-30", "30-40", "40-50", "50+"].map((age) => (
              <label
                key={age}
                className="flex items-center p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={age}
                  checked={(data.selectedAges || []).includes(age)}
                  onChange={handleAgeChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">{age}</span>
              </label>
            ))}
          </div>
          {errors.selectedAges && (
            <p className="text-red-500 text-sm mt-1">{errors.selectedAges}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-2 text-sm font-medium">Gender</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Male", "Female", "Others"].map((gender) => (
              <label
                key={gender}
                className="flex items-center p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={gender}
                  checked={(data.selectedGenders || []).includes(gender)}
                  onChange={handleGenderChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">{gender}</span>
              </label>
            ))}
          </div>
          {errors.selectedGenders && (
            <p className="text-red-500 text-sm mt-1">
              {errors.selectedGenders}
            </p>
          )}
        </div>

        {/* Demographics & Interests */}
        <div className="space-y-4">
          <label className="block mb-1 text-sm font-medium">
            Who is your target audience? (Demographics, interests, etc.)
          </label>
          <div>
            <label className="block mb-1 text-sm font-medium">Location</label>
            {loadingCountries ? (
              <p className="text-gray-500 text-sm">Loading countries...</p>
            ) : countries.length > 0 ? (
              <select
                value={data.targetLocation || ""}
                onChange={(e) => updateData({ targetLocation: e.target.value })}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500 text-sm">Could not load countries</p>
            )}
          </div>
          {/* Interests */}
          <div>
            <label className="block mb-1 text-sm font-medium">Interests</label>
            <select
              value={data.targetInterests || ""}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select an interest</option>
              {interestsList.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </div>

          {/* Profession */}
          <div>
            <label className="block mb-1 text-sm font-medium">Profession</label>
            <select
              value={data.targetProfession || ""}
              onChange={(e) => updateData({ targetProfession: e.target.value })}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select profession</option>
              <option value="Students">Students</option>
              <option value="Entrepreneurs">Entrepreneurs</option>
              <option value="Engineers">Engineers</option>
              <option value="Doctors">Doctors</option>
              <option value="Freelancers">Freelancers</option>
              <option value="Teachers">Teachers</option>
              <option value="Managers">Managers</option>
              <option value="Designers">Designers</option>
              <option value="Developers">Developers</option>
              <option value="Marketers">Marketers</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Others, specify
            </label>
            <textarea
              rows="1"
              value={data.targetOtherDetails || ""}
              onChange={handleTextChange("targetOtherDetails")}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        </div>

        {/* Industries */}
        <div>
          <label className="block mb-1 text-sm font-medium">Industries</label>
          <select
            value={data.targetIndustries || ""}
            onChange={(e) => updateData({ targetIndustries: e.target.value })}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Retail">Retail</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Travel & Hospitality">Travel & Hospitality</option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="Logistics">Logistics</option>
          </select>
        </div>

        {/* Pain Points */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            What are some common pain points your audience experiences?
          </label>
          <textarea
            rows="1"
            value={data.targetPainPoints || ""}
            onChange={handleTextChange("targetPainPoints")}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
      </div>
    </section>
  );
};

export default Target;
