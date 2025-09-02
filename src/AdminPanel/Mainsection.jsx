import React from "react";
import BusinessDataList from "./cms/business/BusinessDataList";
import GoalDataList from "./cms/goal/GoalDataList";
import TargetDataList from "./cms/target/TargetDataList";
import BrandVoiceList from "./cms/brand-voice/BrandVoiceList";
import ContentDataList from "./cms/content/ContentDataList";
import WorkflowList from "./cms/workflow/WorkflowList";
import MarketingList from "./cms/marketing/MarketingList";
import AdditionalInfoList from "./cms/additional/AdditionalInfoList";
import SocialMediaDataList from "./cms/Social/SocialMediaDataList";

const Mainsection = () => {
  return (
    <div className="flex-1 p-6 space-y-10 overflow-y-auto ">
      <div>
        Business Data List:
        <BusinessDataList />
      </div>
      {/* <SocialMedia/> */}
      <div>
        Social Media Data List:
      <SocialMediaDataList/>
      </div>
      <div>
        Goal Data List:
        <GoalDataList />
      </div>
      <div>
        Target Data List:
        <TargetDataList />
      </div>
      <div>
        Brand Voice List:
        <BrandVoiceList />
      </div>
      <div>
        Content Data List:
        <ContentDataList />
      </div>
      <div>
        Workflow Data List:
        <WorkflowList />
      </div>
      <div>
        Marketing Data List:
        <MarketingList />
      </div>
      <div>
        Additional Info List:
        <AdditionalInfoList />
      </div>
    </div>
  );
};

export default Mainsection;
