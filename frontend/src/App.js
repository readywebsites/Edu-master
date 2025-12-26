import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// ⭐ MAIN PAGES
import Home from "./pages/Home/Home";
import CoursesPage from "./pages/Courses/Courses";
import Admissions from "./pages/Admissions/Admissions";
import Resources from "./pages/Resources/Resources";
import Faculty from "./pages/Faculty/Faculty";
import Placements from "./pages/Placements/Placements";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";

// ⭐ AUTH PAGES
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RoleSelection from "./pages/Auth/RoleSelection";

// ⭐ RESOURCES INNER PAGES
import NotesPage from "./pages/Resources/NotesPage";
import PapersPage from "./pages/Resources/PapersPage";
import TestsPage from "./pages/Resources/TestsPage";
import LecturesPage from "./pages/Resources/LecturesPage";
import DoubtsPage from "./pages/Resources/DoubtsPage";
import AssignmentsPage from "./pages/Resources/AssignmentsPage";
import FilePreview from "./pages/Resources/FilePreview";

// ⭐ PROGRAM & COURSE DETAILS
import ProgramDetails from "./pages/Admissions/ProgramDetails";
import CourseDetails from "./pages/Courses/CourseDetails";

// ⭐ BLOG DETAILS PAGE
import BlogDetails from "./pages/Blog/BlogDetails";

// ⭐ TEACHER ADMIN
import TeacherAdmin from "./components/teacheradmin";

// ⭐ DASHBOARD LAYOUTS & PAGES
import DashboardLayout from "./layouts/DashboardLayout";
import StudentDashboard from "./pages/Dashboards/Student/StudentDashboard";
import PlaceholderPage from "./pages/Dashboards/Student/PlaceholderPage";
import ChangePassword from "./pages/Dashboards/Student/ChangePassword";
import AccountSettings from "./pages/Dashboards/Student/AccountSettings";
import Syllabus from "./pages/Dashboards/Student/Syllabus";
import Discussions from "./pages/Dashboards/Student/Discussions";
import StudentAssignments from "./pages/Dashboards/Student/Assignments";
import Exams from "./pages/Dashboards/Student/Exams";
import Project from "./pages/Dashboards/Student/Project";
import ProgressReport from "./pages/Dashboards/Student/ProgressReport";
import Enrollment from "./pages/Dashboards/Student/Enrollment";
import TeacherDashboard from "./pages/Dashboards/Teacher/TeacherDashboard";
import TeacherCourses from "./pages/Dashboards/Teacher/TeacherCourses";
import TeacherStudents from "./pages/Dashboards/Teacher/TeacherStudents";
import TeacherCourseDetails from "./pages/Dashboards/Teacher/TeacherCourseDetails";
import TeacherDiscussions from "./pages/Dashboards/Teacher/TeacherDiscussions";
import TeacherMessenger from "./pages/Dashboards/Teacher/TeacherMessenger";
import TeacherAssignments from "./pages/Dashboards/Teacher/TeacherAssignments";
import TeacherProjects from "./pages/Dashboards/Teacher/TeacherProjects";
import AdminDashboard from "./pages/Dashboards/Admin/AdminDashboard";
import AdminTeachers from "./pages/Dashboards/Admin/AdminTeachers";
import AdminStudents from "./pages/Dashboards/Admin/AdminStudents";
import AdminCourses from "./pages/Dashboards/Admin/AdminCourses";
import AdminAnnouncements from "./pages/Dashboards/Admin/AdminAnnouncements";

function AppRoutes() {
  const location = useLocation();
  // Hide navbar on teacher-admin AND all dashboard routes
  const hideNavbar = location.pathname.startsWith("/teacher-admin") || location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ⭐ MAIN ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        {/* ⭐ AUTH ROUTES */}
        <Route path="/login" element={<RoleSelection />} />
        <Route path="/authenticate" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🎯 RESOURCES SUB ROUTES */}
        <Route path="/resources/notes" element={<NotesPage />} />
        <Route path="/resources/papers" element={<PapersPage />} />
        <Route path="/resources/tests" element={<TestsPage />} />
        <Route path="/resources/lectures" element={<LecturesPage />} />
        <Route path="/resources/doubts" element={<DoubtsPage />} />
        <Route path="/resources/assignments" element={<AssignmentsPage />} />

        {/* 📌 UNIVERSAL FILE PREVIEW */}
        <Route path="/resources/preview/:id" element={<FilePreview />} />

        {/* 📌 DETAILS */}
        <Route path="/program-details/:course" element={<ProgramDetails />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* 🧑‍🏫 TEACHER ADMIN */}
        <Route
          path="/teacher-admin"
          element={
            <ProtectedRoute>
              <TeacherAdmin />
            </ProtectedRoute>
          }
        />

        {/* 🎓 STUDENT DASHBOARD */}
        <Route path="/dashboard/student" element={
          <ProtectedRoute>
            <DashboardLayout role="student" />
          </ProtectedRoute>
        }>
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<Syllabus />} />
          <Route path="discussions" element={<Discussions />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="exams" element={<Exams />} />
          <Route path="project" element={<Project />} />
          <Route path="progress-report" element={<ProgressReport />} />

          {/* 👤 ACCOUNT & PROFILE - Refactored */}
          <Route path="contact" element={<Enrollment />} /> {/* Using Enrollment COMPONENT for Personal Profile */}
          <Route path="settings" element={<AccountSettings />} />

          <Route path="change-password" element={<ChangePassword />} />
          <Route path="*" element={<PlaceholderPage title="Not Found" />} />
        </Route>

        {/* 🧑‍🏫 TEACHER DASHBOARD */}
        <Route path="/dashboard/teacher" element={
          <ProtectedRoute>
            <DashboardLayout role="teacher" />
          </ProtectedRoute>
        }>
          <Route index element={<TeacherDashboard />} />
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="courses/:courseId" element={<TeacherCourseDetails />} />
          <Route path="exam-builder" element={<TeacherAdmin />} /> {/* RESUSING EXISTING COMPONENT */}
          <Route path="students" element={<TeacherStudents />} />
          <Route path="assignments" element={<TeacherAssignments />} />
          <Route path="projects" element={<TeacherProjects />} />
          <Route path="discussions" element={<TeacherDiscussions />} />
          <Route path="messenger" element={<TeacherMessenger />} />
        </Route>

        {/* 🛡️ ADMIN DASHBOARD */}
        <Route path="/dashboard/admin" element={
          <ProtectedRoute>
            <DashboardLayout role="admin" />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="settings" element={<PlaceholderPage title="Admin Settings" />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
