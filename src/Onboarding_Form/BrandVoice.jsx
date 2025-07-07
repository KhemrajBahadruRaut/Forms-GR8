import axios from "axios";

const BrandVoice = ({ data, updateData }) => {
  const handleVoiceChange = (e) => {
    const { value, checked } = e.target;
    const currentVoices = data.selectedVoices || [];
    const updatedVoices = checked
      ? [...currentVoices, value]
      : currentVoices.filter((v) => v !== value);
    updateData({ selectedVoices: updatedVoices });
  };

  const handleTextChange = (field) => (e) => {
    updateData({ [field]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost/gr8-onboardingform/submit_brand_voice/submit_brand_voice.php",
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
      <h2 className="text-2xl font-semibold mb-4">Brand Voice and Identity</h2>

      <div className="space-y-6">
        {/* Tone / Voice */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            What tone/voice should be used in your content?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Friendly",
              "Professional",
              "Humorous",
              "Inspirational",
              "Informative",
              "Others",
            ].map((voice) => (
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
            ))}
          </div>

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

export default BrandVoice;