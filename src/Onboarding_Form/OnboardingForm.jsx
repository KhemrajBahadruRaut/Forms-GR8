import React, { useState, useEffect, useCallback } from "react";

import Business from "./Business";
import SocialMedia from "./SocialMedia";
import Target from "./Target";
import Goal from "./Goal";
import BrandVoice from "./BrandVoice";
import Content from "./Content";
import Workflow from "./Workflow";
import Marketing from "./Marketing";
import Additional from "./Additional";
import Navbar from "../Nav/Navbar";

const initialFormData = {
  socialAccountsExist: "",
  selectedPlatforms: [],
  otherPlatform: "",
  setupRedesign: "",
  setupDetails: "",
  businessName: "",
  location: "",
  zipCode: "",
  phoneNumber: "",
  email: "",
  website: "",
  contactName: "",
  contactNumber: "",
  selectedGoals: [],
  otherGoalDetails: "",
  selectedAges: [],
  selectedGenders: [],
  targetLocation: "",
  targetInterests: "",
  targetProfession: "",
  targetOtherDetails: "",
  targetIndustries: "",
  targetPainPoints: "",
  selectedVoices: [],
  otherVoice: "",
  brandPhrases: "",
  brandExclusions: "",
  selectedContentTypes: [],
  otherContentType: "",
  reviewerName: "",
  reviewerLocation: "",
  reviewerPhone: "",
  countryCode: "+1",
  preferredContactModes: [],
  otherContactMethod: "",
  reportFrequency: "",
  budget: "",
  selectedKPIs: [],
  otherKPI: "",
  expectedResults: "",
};

const initialAdditionalData = {
  admireAccounts: "",
  competitors: "",
  upcomingLaunches: "",
  otherInfo: "",
};

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepValidity, setStepValidity] = useState({});

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("onboardingFormData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  const [data, setData] = useState(initialAdditionalData);

  const updateData = useCallback((updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    localStorage.setItem("onboardingFormData", JSON.stringify(formData));
  }, [formData]);

  const setStepValidityForStep = (stepLabel, isValid) => {
    setStepValidity((prev) => ({ ...prev, [stepLabel]: isValid }));
  };

  const steps = [
    {
      label: "Business Info",
      component: (
        <Business
          data={formData}
          updateData={updateData}
          setStepValidity={(isValid) => setStepValidityForStep("Business Info", isValid)}
        />
      ),
    },
    {
      label: "Social Media Presence",
      component: (
        <SocialMedia
          data={formData}
          updateData={updateData}
          setStepValidity={(isValid) => setStepValidityForStep("Social Media Presence", isValid)}
        />
      ),
    },
    {
      label: "Goals & Objectives",
      component: (
        <Goal
          data={formData}
          updateData={updateData}
          setStepValidity={(isValid) => setStepValidityForStep("Goals & Objectives", isValid)}
        />
      ),
    },
    {
      label: "Target Audience",
      component: (
        <Target
          data={formData}
          updateData={updateData}
          setStepValidity={(isValid) => setStepValidityForStep("Target Audience", isValid)}
        />
      ),
    },
    {
      label: "Brand Voice",
      component: (
        <BrandVoice
          data={formData}
          updateData={updateData}
          setStepValidity={(isValid) => setStepValidityForStep("Brand Voice", isValid)}
        />
      ),
    },
    {
      label: "Content Preferences",
      component: (
        <Content
          data={formData}
          updateData={updateData}
          setStepValidity={(isValid) => setStepValidityForStep("Content Preferences", isValid)}
        />
      ),
    },
    {
      label: "Workflow & Communication",
      component: (
        <Workflow
          data={formData}
          updateData={updateData}
          setStepValidity={(isValid) => setStepValidityForStep("Workflow & Communication", isValid)}
        />
      ),
    },
    {
      label: "Marketing Budget & Expectations",
      component: (
        <Marketing
          data={formData}
          updateData={updateData}
          setStepValidity={(isValid) => setStepValidityForStep("Marketing Budget & Expectations", isValid)}
        />
      ),
    },
    {
      label: "Additional Information",
      component: (
        <Additional
          data={data}
          setData={setData}
          setStepValidity={(isValid) => setStepValidityForStep("Additional Information", isValid)}
        />
      ),
    },
  ];

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleBack = () => {
    if (!isFirstStep && !isSubmitting) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    const currentLabel = steps[currentStep].label;

    if (!stepValidity[currentLabel]) {
      alert(`Please complete "${currentLabel}" before proceeding.`);
      return;
    }

    if (!isLastStep && !isSubmitting) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!isLastStep || isSubmitting) return;

    // 🔹 Validate last step required fields
    const requiredFields = {
      admireAccounts: data.admireAccounts,
      // Add more required fields if necessary
    };

    const emptyFields = Object.entries(requiredFields).filter(
      ([key, value]) => !value || value.toString().trim() === ""
    );

    if (emptyFields.length > 0) {
      alert(
        `Please fill all required fields in the last step: ${emptyFields
          .map(([f]) => f)
          .join(", ")}`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const businessRes = await fetch(
        "https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_business_info/submit_business_info.php",
        // "http://localhost/gr8-onboardingform/submit_business_info/submit_business_info.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const businessResult = await businessRes.json();
      if (!businessResult.success) {
        alert(`Error submitting Business Info: ${businessResult.error || "Unknown error"}`);
        setIsSubmitting(false);
        return;
      }

      const businessId = businessResult.id;

      const stepsWithKeys = [
        { endpoint: "https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/social_media_info/submit_social_info.php", payload: { ...formData, gr8_key: businessId } },
        { endpoint: "https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_goals_info/submit_goals_info.php", payload: { ...formData, gr8_key: businessId } },
        { endpoint: "https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_target_info/submit_target_info.php", payload: { ...formData, gr8_key: businessId } },
        { endpoint: "https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_brand_voice/submit_brand_voice.php", payload: { ...formData, gr8_key: businessId } },
        { endpoint: "https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_content_info/submit_content_info.php", payload: { ...formData, gr8_key: businessId } },
        { endpoint: "https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_workflow_info/submit_workflow_info.php", payload: { ...formData, gr8_key: businessId } },
        { endpoint: "https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_marketing_info/submit_marketing_info.php", payload: { ...formData, gr8_key: businessId } },
        { endpoint: "https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_additional_info/submit_additional_info.php", payload: { ...data, gr8_key: businessId }},
      ]
// const stepsWithKeys = [
//         { endpoint: "http://localhost/gr8-onboardingform/social_media_info/submit_social_info.php", payload: { ...formData, gr8_key: businessId } },
//         { endpoint: "http://localhost/gr8-onboardingform/submit_goals_info/submit_goals_info.php", payload: { ...formData, gr8_key: businessId } },
//         { endpoint: "http://localhost/gr8-onboardingform/submit_target_info/submit_target_info.php", payload: { ...formData, gr8_key: businessId } },
//         { endpoint: "http://localhost/gr8-onboardingform/submit_brand_voice/submit_brand_voice.php", payload: { ...formData, gr8_key: businessId } },
//         { endpoint: "http://localhost/gr8-onboardingform/submit_content_info/submit_content_info.php", payload: { ...formData, gr8_key: businessId } },
//         { endpoint: "http://localhost/gr8-onboardingform/submit_workflow_info/submit_workflow_info.php", payload: { ...formData, gr8_key: businessId } },
//         { endpoint: "http://localhost/gr8-onboardingform/submit_marketing_info/submit_marketing_info.php", payload: { ...formData, gr8_key: businessId } },
//         { endpoint: "http://localhost/gr8-onboardingform/submit_additional_info/submit_additional_info.php", payload: { ...data, gr8_key: businessId } },
//       ];

      for (let i = 0; i < stepsWithKeys.length; i++) {
        const res = await fetch(stepsWithKeys[i].endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stepsWithKeys[i].payload),
        });
        const result = await res.json();
        if (!result.success) {
          alert(`Error submitting step ${i + 2}: ${result.error || "Unknown error"}`);
          setIsSubmitting(false);
          return;
        }
      }

      alert("Form submitted successfully!");
      localStorage.removeItem("onboardingFormData");
      setFormData(initialFormData);
      setData(initialAdditionalData);
      setCurrentStep(0);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong while submitting the form!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <div className="md:hidden overflow-x-auto whitespace-nowrap mb-4">
              <div className="flex space-x-2">
                {steps.map((step, index) => (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => !isSubmitting && setCurrentStep(index)}
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-sm rounded-full border ${
                      index === currentStep
                        ? "bg-blue-600 text-white border-blue-600"
                        : isSubmitting
                        ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            <nav className="hidden md:block space-y-2">
              {steps.map((step, index) => (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => !isSubmitting && setCurrentStep(index)}
                  disabled={isSubmitting}
                  className={`flex items-center w-full px-3 py-2 text-left rounded ${
                    index === currentStep
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : isSubmitting
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span
                    className={`w-6 h-6 mr-2 flex items-center justify-center rounded-full border ${
                      index === currentStep
                        ? "border-blue-600 bg-blue-600 text-white"
                        : isSubmitting
                        ? "border-gray-300 bg-gray-300 text-gray-500"
                        : "border-gray-300"
                    }`}
                  >
                    {index + 1}
                  </span>
                  {step.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="md:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              <span className="w-24 ml-4 text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            <div>{steps[currentStep].component}</div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                disabled={isFirstStep || isSubmitting}
                className={`px-4 py-2 rounded ${
                  isFirstStep || isSubmitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Back
              </button>
              {!isLastStep ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded flex items-center ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingForm;
