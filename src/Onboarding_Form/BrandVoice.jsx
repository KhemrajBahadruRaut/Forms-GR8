import React, { useEffect, useState } from "react";

const BrandVoice = ({ data, updateData, setStepValidity }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    // Require at least one voice selection
    if (name === "selectedVoices" && (!value || value.length === 0)) {
      error = "Please select at least one tone/voice.";
    }

    // If "Others" is selected, require non-empty input
    if (name === "otherVoice" && (data.selectedVoices || []).includes("Others")) {
      if (!value || value.trim() === "") {
        error = "Please specify the other tone/voice.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    // Step is valid if selectedVoices has at least one selection and otherVoice is filled if "Others" is selected
    const isValid =
      (data.selectedVoices?.length > 0) &&
      (!data.selectedVoices.includes("Others") || (data.otherVoice?.trim() || "").length > 0);

    setStepValidity(isValid);
  };

  const handleVoiceChange = (e) => {
    const { value, checked } = e.target;
    const currentVoices = data.selectedVoices || [];
    const updatedVoices = checked
      ? [...currentVoices, value]
      : currentVoices.filter((v) => v !== value);

    updateData({ selectedVoices: updatedVoices });
    validateField("selectedVoices", updatedVoices);
  };

  const handleTextChange = (field) => (e) => {
    updateData({ [field]: e.target.value });
    validateField(field, e.target.value);
  };

  // Run validation on mount to restore localStorage values
  useEffect(() => {
    validateField("selectedVoices", data.selectedVoices || []);
    if ((data.selectedVoices || []).includes("Others")) {
      validateField("otherVoice", data.otherVoice || "");
    }
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Brand Voice and Identity</h2>

      <div className="space-y-6">
        {/* Tone / Voice */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            What tone/voice should be used in your content?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {["Friendly", "Professional", "Humorous", "Inspirational", "Informative", "Others"].map(
              (voice) => (
                <label
                  key={voice}
                  className="flex items-center p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={voice}
                    checked={(data.selectedVoices || []).includes(voice)}
                    onChange={handleVoiceChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">{voice}</span>
                </label>
              )
            )}
          </div>
          {errors.selectedVoices && (
            <p className="text-red-500 text-sm mt-1">{errors.selectedVoices}</p>
          )}

          {(data.selectedVoices || []).includes("Others") && (
            <div className="mt-3">
              <label className="block mb-1 text-sm font-medium">
                Please specify other tone/voice:
              </label>
              <textarea
                rows={1}
                value={data.otherVoice || ""}
                onChange={handleTextChange("otherVoice")}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
              />
              {errors.otherVoice && (
                <p className="text-red-500 text-sm mt-1">{errors.otherVoice}</p>
              )}
            </div>
          )}
        </div>

        {/* Phrases */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Are there specific phrases, slogans, or hashtags you use?
          </label>
          <textarea
            rows={1}
            value={data.brandPhrases || ""}
            onChange={handleTextChange("brandPhrases")}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="e.g., #YourBrandHashtag, 'Your slogan here'"
          />
        </div>

        {/* Exclusions */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Are there things you do NOT want us to say or promote?
          </label>
          <textarea
            rows={1}
            value={data.brandExclusions || ""}
            onChange={handleTextChange("brandExclusions")}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="e.g., competitor names, sensitive topics..."
          />
        </div>
      </div>
    </section>
  );
};

export default BrandVoice;
