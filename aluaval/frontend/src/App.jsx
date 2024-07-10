import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm.jsx";
import Homepage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Questionnaire from "./pages/Questionnaire.jsx";
import GroupCreation from "./pages/GroupCreation.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/evaluation/:type" element={<Questionnaire />} />
          <Route path="/group-creation" element={<GroupCreation />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
