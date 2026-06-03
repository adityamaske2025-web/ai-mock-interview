import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      window.location.replace("/dashboard");
    }
  }, []);

  return <h2>Logging you in...</h2>;
};

export default GoogleSuccess;