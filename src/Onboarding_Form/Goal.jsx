import axios from "axios";
import React from "react";

const Goal = ({ data, updateData }) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const currentGoals = data.selectedGoals || [];
    
    const updatedGoals = checked
      ? [...currentGoals, value]
      : currentGoals.filter((goal) => goal !== value);

    updateData({
      selectedGoals: updatedGoals,
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost/gr8-onboardingform/submit_goals_info/submit_goals_info.php",
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

          {(data.selectedGoals || []).includes("Others") && (
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium">
                Please specify other goals:
              </label>
              <textarea
                rows="3"
                value={data.otherGoalDetails || ""}
                onChange={(e) => updateData({ otherGoalDetails: e.target.value })}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Describe your goals..."
              ></textarea>
            </div>
          )}
        </div>
        <button
        onClick={handleSubmit}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
      </div>
    </section>
  );
};

export default Goal;