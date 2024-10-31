import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm.jsx";
import Homepage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Questionnaire from "./pages/Questionnaire.jsx";
import GroupCreation from "./pages/GroupCreation.jsx";
import EvalHistory from "./pages/EvalHistory.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import { AuthProvider, useAuth } from "./context/authProvider.jsx";
import GroupsPage from "./pages/GroupsPage.jsx";
import Notifications from "./pages/Notifications.jsx";

function App() {
  const { user } = useAuth();
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            {user ? (
              <Route path="/login" element={<Navigate to="/" />} />
            ) : (
              <Route path="/login" element={<LoginForm />} />
            )}
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/evaluation/:id/:group/" element={<Questionnaire />} />
            <Route
              path="/evaluation-history/:group"
              element={<EvalHistory />}
            />
            <Route path="/group-creation" element={<GroupCreation />} />
            <Route path="/groups-page" element={<GroupsPage />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
