import React, { useState, useEffect } from "react";

const Goal = ({ data, updateData, setStepValidity }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (name === "selectedGoals") {
      if (value.length === 0) {
        error = "Please select at least one goal.";
      }
    }

    if (name === "otherGoalDetails") {
      if (value && !/^[A-Za-z\s]+$/.test(value)) {
        error = "Only letters and spaces are allowed.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    // 🔹 Determine if whole step is valid
    let isValid = true;

    if ((data.selectedGoals || []).length === 0) {
      isValid = false;
    }

    if ((data.selectedGoals || []).includes("Others")) {
      if (!data.otherGoalDetails || !/^[A-Za-z\s]+$/.test(data.otherGoalDetails)) {
        isValid = false;
      }
    }

    if (error) {
      isValid = false;
    }

    setStepValidity(isValid);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const currentGoals = data.selectedGoals || [];

    const updatedGoals = checked
      ? [...currentGoals, value]
      : currentGoals.filter((goal) => goal !== value);

    updateData({ selectedGoals: updatedGoals });
    validateField("selectedGoals", updatedGoals);
  };

  const handleChange = (name, value) => {
    updateData({ [name]: value });
    validateField(name, value);
  };

  // ✅ Run validation on mount (helps restore localStorage data)
  useEffect(() => {
    validateField("selectedGoals", data.selectedGoals || []);
    if ((data.selectedGoals || []).includes("Others")) {
      validateField("otherGoalDetails", data.otherGoalDetails || "");
    }
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Goals & Objectives</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-4 text-sm font-medium">
            What are your primary goals for social media marketing? (Select all that apply)
          </label>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Brand Awareness",
              "Lead generation",
              "Increase Sales",
              "Website Traffic",
              "Engagement",
              "Customer Support",
              "Others",
            ].map((goal) => (
              <div
                key={goal}
                className="flex items-center p-2 border rounded-md hover:bg-gray-50"
              >
                <input
                  id={`goal-${goal}`}
                  type="checkbox"
                  value={goal}
                  checked={(data.selectedGoals || []).includes(goal)}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`goal-${goal}`}
                  className="ml-2 text-sm font-medium"
                >
                  {goal}
                </label>
              </div>
            ))}
          </div>

          {errors.selectedGoals && (
            <p className="text-red-500 text-sm mt-1">{errors.selectedGoals}</p>
          )}

          {(data.selectedGoals || []).includes("Others") && (
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium">
                Please specify other goals:
              </label>
              <textarea
                rows="3"
                value={data.otherGoalDetails || ""}
                onChange={(e) => handleChange("otherGoalDetails", e.target.value)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Describe your goals..."
              ></textarea>
              {errors.otherGoalDetails && (
                <p className="text-red-500 text-sm mt-1">{errors.otherGoalDetails}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Goal;
