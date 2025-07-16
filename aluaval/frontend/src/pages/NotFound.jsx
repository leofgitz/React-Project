import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w3-display-middle w3-center w3-container">
      <h1>Wait a second... This page doesn’t exist.</h1>
      <p>We’re sending you back home in 3 seconds...</p>
    </div>
  );
}
