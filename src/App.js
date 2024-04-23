import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './features/login';
import Home from './features/home';
import Register from './features/register';
import UserProfile from './features/userProfile';
import ResetPassword from './features/resetpassword';
import NewPassword from './features/newpassword';
import ForgotPassword from './features/forgotpassword';
import CompanyProfile from './features/companyProfile';
import AdminProfile from './features/adminProfile';
import UserDashboard from './features/userDashboard';
import CompanyDashboard from './features/companyDashboard';
import AdminDashboard from './features/adminDashboard';
import Terms from './features/terms';
import CreateProject from './features/createproject';
import LogProgress from './features/logprogress';
import FindWorkUser from './features/findWorkUser';
import CreateWorkCompany from './features/createWorkCompany';
import FindProfessional from './features/findProfessional';
import CurrentProjects from './features/currentprojects';
import UpdateProject from './features/updateProject';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}></Route>
        <Route path="/userDashboard" element={<UserDashboard />}></Route>
        <Route path="/companyDashboard" element={<CompanyDashboard />}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
        <Route path="/userProfile" element={<UserProfile />}></Route>
        <Route path="/companyProfile" element={<CompanyProfile />}></Route>
        <Route path="/adminProfile" element={<AdminProfile />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        <Route path="/newpassword" element={<NewPassword />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/createProject" element={<CreateProject />}></Route>
        <Route path="/logProgress" element={<LogProgress />}></Route>
        <Route path="/findWorkUser" element={<FindWorkUser />}></Route>
        <Route path="/createWorkCompany" element={<CreateWorkCompany />}></Route>
        <Route path="/findProfessional" element={<FindProfessional />}></Route>
        <Route path="/CurrentProjects" element={<CurrentProjects />}></Route>
        <Route path="/updateProject" element={<UpdateProject />}></Route>
        
        {/* <Route path="/myprofile" element={< />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;