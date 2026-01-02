import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { verificationToken } = useParams();
  console.log(verificationToken)
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/auth/verify-email/${verificationToken}`
        );
        // setStatus("success");
        console.log(res);

        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [verificationToken, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {status === "verifying" && <h2>Verifying your email...</h2>}
      {status === "success" && <h2>Email verified successfully ✅</h2>}
      {status === "error" && <h2>Verification link expired or invalid ❌</h2>}
    </div>
  );
};

export default VerifyEmail;
