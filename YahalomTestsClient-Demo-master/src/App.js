import "./App.css";
import Reports from "./components/Reports/Reports";
import ManagePage from "./components/PrincipalPage";
import QuestionsForm from "./components/QuestionsComponents/questionsForm";
import QuestionsTable from "./components/QuestionsComponents/questionsTable";
import QuestionsToShow from "./components/QuestionsComponents/QuestionShow";
import TestForm from "./components/TestComponents/TestForm";
import TestTable from "./components/TestComponents/TestTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Exam from "./components/Exam/ExamForm";
import UserData from "./components/Exam/UserDataExam";
import ReportByExam from "./components/Reports/ReportByExam";
import ReportByStudent from "./components/Reports/ReportByStudent";
import EndOfExam from "./components/Exam/EndOfExam";


const App = () => {
  return (
    
      <BrowserRouter >
        <Routes className="center">
          <Route path="/" exact element={<ManagePage />} />
          <Route path="/Questions/Form/:id" element={<QuestionsForm />} />
          <Route path="/Questions/Table" element={<QuestionsTable />} />
          <Route path="/Test/Form/:id" element={<TestForm />} />
          <Route path="/Test/Table" element={<TestTable />} />
          <Route path="/Questions/Edit/:id" element={<Reports />} />
          <Route path="/Questions/Show/:id" element={<QuestionsToShow />} />
          <Route path="/Exam/:id" element={<Exam />} />
          <Route path="/Exam/end" element={<EndOfExam />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/User" element={<UserData />} />
          <Route path="/Reports/ByExam/:startDate/:endDate/:examId" element={<ReportByExam />} />
          <Route path="/Reports/ByStudent" element={<ReportByStudent />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
