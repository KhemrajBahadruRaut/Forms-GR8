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
      (name === "selectedAges" ? value.length > 0 : data.selectedAges?.length > 0) &&
      (name === "selectedGenders" ? value.length > 0 : data.selectedGenders?.length > 0);

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
            <p className="text-red-500 text-sm mt-1">{errors.selectedGenders}</p>
          )}
        </div>

        {/* Demographics & Interests */}
        <div className="space-y-4">
          <label className="block mb-1 text-sm font-medium">
            Who is your target audience? (Demographics, interests, etc.)
          </label>
          <div>
            <label className="block mb-1 text-sm font-medium">Location</label>
            <textarea
              rows="1"
              value={data.targetLocation || ""}
              onChange={handleTextChange("targetLocation")}
              placeholder="E.g., United States, Europe..."
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Interests</label>
            <textarea
              rows="1"
              value={data.targetInterests || ""}
              onChange={handleTextChange("targetInterests")}
              placeholder="E.g., fitness, technology..."
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Profession</label>
            <textarea
              rows="1"
              value={data.targetProfession || ""}
              onChange={handleTextChange("targetProfession")}
              placeholder="E.g., entrepreneurs, students..."
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Others, specify</label>
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
          <label className="block mb-1 text-sm font-medium">
            Are there specific industries or niches you're targeting?
          </label>
          <textarea
            rows="1"
            value={data.targetIndustries || ""}
            onChange={handleTextChange("targetIndustries")}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          />
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
