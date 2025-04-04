import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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

function ProtectedRoute({ element }) {
  const { user, loading } = useAuth();
  console.log("ProtectedRoute - User:", user, "Loading:", loading);
  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth
  }
  return user ? element : <Navigate to="/login" />;
}

function RedirectIfLoggedIn({ element }) {
  const { user } = useAuth();

  // If the user is already logged in, redirect to homepage
  if (user) {
    return <Navigate to="/" />;
  }

  return element;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route
              path="/login"
              element={<RedirectIfLoggedIn element={<LoginForm />} />}
            />
            <Route
              path="/register"
              element={<RedirectIfLoggedIn element={<RegisterForm />} />}
            />
            <Route
              path="/"
              element={<ProtectedRoute element={<Homepage />} />}
            />
            <Route
              path="/evaluation/:id/:group/"
              element={<ProtectedRoute element={<Questionnaire />} />}
            />
            <Route
              path="/evaluation-history/:group"
              element={<ProtectedRoute element={<EvalHistory />} />}
            />
            <Route
              path="/group-creation"
              element={<ProtectedRoute element={<GroupCreation />} />}
            />
            <Route
              path="/groups-page"
              element={<ProtectedRoute element={<GroupsPage />} />}
            />
            <Route
              path="/notifications"
              element={<ProtectedRoute element={<Notifications />} />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
