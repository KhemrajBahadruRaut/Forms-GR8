import { BrowserRouter, Route, Routes } from "react-router-dom";
import OnboardingForm from '../Onboarding_Form/OnboardingForm';
import AdminPanel from '../../AdminPanel/AdminPanel';

const MyRoutes = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<OnboardingForm />} />
   <Route path='/admin' element={<AdminPanel/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default MyRoutes
