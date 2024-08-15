import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm.jsx";
import Homepage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Questionnaire from "./pages/Questionnaire.jsx";
import GroupCreation from "./pages/GroupCreation.jsx";
import { AuthProvider, useAuth } from "./context/authProvider.jsx";

function App() {
  const { user } = useAuth();
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            {user ? (
              <Navigate to="/" /> // Redirect to homepage if already logged in
            ) : (
              <Route path="/login" element={<LoginForm />} /> // Show login form if not logged in
            )}
            <Route path="/" element={<Homepage />} />
            <Route
              path="/evaluation/:id/:group/:evaluation"
              element={<Questionnaire />}
            />
            <Route path="/group-creation" element={<GroupCreation />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
