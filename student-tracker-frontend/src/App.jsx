import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MyContext } from "./MyContext";
import LandingPage from "./pages/LandingPage";
// teacher
import TeacherLogin from "./component/Teacher/TeacherLogin";
import TeacherSignUp from "./component/Teacher/TeacherSignUp";
import TeacherPage from "./pages/TeacherPage";
// student
import StudentLogin from "./component/students/StudentLogin";
import StudentSignup from "./component/students/StudentSignup";
import StudentPage from "./pages/StudentPage";
//admin
import AdminLogin from "./component/admin/AdminLogin";
import AdminPage from "./pages/AdminPage";
import AdminDashboard from "./component/admin/AdminDashboard";
import NavBar from "./component/NavBar";
import { useState } from "react";

import TeacherDashboard from "./component/Teacher/TeacherDashboard";
import SingleAnswer from "./component/Teacher/SingleAnswer";
import Studentdashboard from "./component/students/Studentdashboard";
import SingleAnswerStudent from "./component/students/SingleAnswerStudent";
import CreateHomework from "./component/Teacher/CreateHomework";
import AnswersList from "./component/Teacher/AnswersList";
import HomeworksComponent from "./component/Teacher/HomeworksComponents";

function App() {
  // Teacher States
  const [homeworks, setHomeworks] = useState([]);

  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState();

  return (
    <>
      <MyContext.Provider
        value={{ user, setUser, homeworks, setHomeworks, answers, setAnswers }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Teacher Routes */}
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/signup" element={<TeacherSignUp />} />
          <Route path="/teacher" element={<TeacherPage />}>
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="create-homework" element={<CreateHomework />} />
            <Route path="all-homework" element={<HomeworksComponent />} />
            <Route path="students-homework" element={<AnswersList />} />
            <Route path="answer/:answerId" element={<SingleAnswer />} />
          </Route>
          {/* Students Routes */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/student" element={<StudentPage />}>
            <Route index path="dashboard" element={<Studentdashboard />} />
            <Route
              path="answer/:homeworkId"
              element={<SingleAnswerStudent />}
            />
          </Route>
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route index path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </MyContext.Provider>
    </>
  );
}

export default App;
