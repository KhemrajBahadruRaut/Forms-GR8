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

  const steps = [
    { label: "Business Info", component: <Business data={formData} updateData={updateData} /> },
    { label: "Social Media Presence", component: <SocialMedia data={formData} updateData={updateData} /> },
    { label: "Goals & Objectives", component: <Goal data={formData} updateData={updateData} /> },
    { label: "Target Audience", component: <Target data={formData} updateData={updateData} /> },
    { label: "Brand Voice", component: <BrandVoice data={formData} updateData={updateData} /> },
    { label: "Content Preferences", component: <Content data={formData} updateData={updateData} /> },
    { label: "Workflow & Communication", component: <Workflow data={formData} updateData={updateData} /> },
    { label: "Marketing Budget & Expectations", component: <Marketing data={formData} updateData={updateData} /> },
    { label: "Additional Information", component: <Additional data={data} setData={setData} /> },
  ];

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = (e) => {
    e.preventDefault();
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("onboardingFormData");
    setFormData(initialFormData);
    setData(initialAdditionalData);
    setCurrentStep(0);
    alert("Form submitted successfully!");
  };

  return (
    <>
      <Navbar />
      <form className="max-w-6xl mx-auto p-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Responsive Step Navigation */}
          <aside className="md:col-span-1">
            {/* Mobile: Horizontal step nav */}
            <div className="md:hidden overflow-x-auto whitespace-nowrap mb-4">
              <div className="flex space-x-2">
                {steps.map((step, index) => (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    className={`px-4 py-2 text-sm rounded-full border ${
                      index === currentStep
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: Vertical step nav */}
            <nav className="hidden md:block space-y-2">
              {steps.map((step, index) => (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  className={`flex items-center w-full px-3 py-2 text-left rounded ${
                    index === currentStep
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span
                    className={`w-6 h-6 mr-2 flex items-center justify-center rounded-full border ${
                      index === currentStep
                        ? "border-blue-600 bg-blue-600 text-white"
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

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="w-24 ml-4 text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            {/* Current Step Component */}
            <div>{steps[currentStep].component}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                disabled={isFirstStep}
                className={`px-4 py-2 rounded ${
                  isFirstStep
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
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default OnboardingForm;
