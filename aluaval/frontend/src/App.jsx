import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm.jsx";
import Homepage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Questionnaire from "./pages/Questionnaire.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Homepage />} />
          <Route
            path="/evaluation/peer"
            element={<Questionnaire key="peer" evaluationType="peer" />}
          />
          <Route
            path="/evaluation/self"
            element={<Questionnaire key="self" evaluationType="self" />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
