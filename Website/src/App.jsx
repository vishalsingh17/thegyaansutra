import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Common from "./courses/Common";
import Semester from "./semester/Common";
// import SemPage from "./courses/semester/SemPage";
import TermsAndConditions from "./Terms&Condition";
// import Login from "./authenication/Login";
import SidebarDemo from './Sidebar';
import EnrolledCourses from "./EnrolledCourses";
import ExploreCourses from "./ExploreCourses";
import ProfilePage from "./Profile";
import Logout from "./Logout";
import NotFound from "./NotFound";
import LoginPage from "./LoginPage";
import CourseDashboard from "./CourseDashboard"
import Explore from "./ExploreCourse"
import RefundPolicy from "./RefundPolicy";
import PrivacyPolicy from "./PrivacyPolicy";
import Support from "./Support";
const App = () => {
  
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf-token/', {
          credentials: 'include', // Ensures cookies are included in the request
        });
      } catch (error) {
        console.error("Error fetching CSRF token");
      }
    };
    getCsrfToken();
  })
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseName" element={<Common />} />
        <Route path="/course/:courseName/:semester" element={<Semester />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/RefundPolicy" element={<RefundPolicy />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/video/:subjectId" element={<CourseDashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="" element={<SidebarDemo />}>
          <Route path="/dashboard/enrolledcourses" element={<EnrolledCourses />} />
          <Route path="/dashboard/explorecourses" element={<ExploreCourses />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/support" element={<Support/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
