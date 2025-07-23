import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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
import SubjectCreation from "./pages/SubjectCreation.jsx";
import NotFound from "./pages/NotFound.jsx";

function RedirectIfLoggedIn({ element }) {
  const { user } = useAuth();

  // If the user is already logged in, redirect to homepage
  if (user) {
    return <Navigate to="/" />;
  }

  return element;
}

function ProtectedRoute({ element, allowedRoles }) {
  const { user, loading } = useAuth();
  console.log("ProtectedRoute - User:", user, "Loading:", loading);
  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth
  }

  if (!user) {
    return <Navigate to="/login" />;
  } else if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="*" replace />;
  }
  return element;
}

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const APP_NAME = "AluAval";

    const pathTitleMap = {
      "/": "Homepage",
      "/login": "Login",
      "/register": "Register",
      "/group-creation": "Dashboard",
      "/groups-page": "Dashboard",
      "/notifications": "Notifications",
      "/evaluation": "Evaluation",
      "/eval-history": "Evaluation History",
      "/subject-creation": "Subject Management",
    };

    const pageTitle = pathTitleMap[location.pathname];
    document.title = pageTitle ? `${APP_NAME} - ${pageTitle}` : APP_NAME;
  }, [location]);

  return null; // This component does not render anything
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <TitleManager />
        <Navbar />
        <div
          className="w3-container"
          style={{ width: "75%", display: "flex", margin: "auto" }}
        >
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
              path="/evaluation"
              element={<ProtectedRoute element={<Questionnaire />} />}
            />
            <Route
              path="/eval-history"
              element={<ProtectedRoute element={<EvalHistory />} />}
            />
            <Route
              path="/group-creation"
              element={
                <ProtectedRoute
                  element={<GroupCreation />}
                  allowedRoles={"Teacher"}
                />
              }
            />
            <Route
              path="/subject-creation"
              element={
                <ProtectedRoute
                  element={<SubjectCreation />}
                  allowedRoles={"Teacher"}
                />
              }
            />
            <Route
              path="/groups-page"
              element={
                <ProtectedRoute
                  element={<GroupsPage />}
                  allowedRoles={"Student"}
                />
              }
            />
            <Route
              path="/notifications"
              element={<ProtectedRoute element={<Notifications />} />}
            />
            <Route
              path="*"
              element={<ProtectedRoute element={<NotFound />} />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
