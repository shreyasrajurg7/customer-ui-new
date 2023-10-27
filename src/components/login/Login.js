import TextBox from "../common/textBox/TextBox";
import "./Login.css";
import { useState } from "react";
import Button from "../common/button/Button";
import {
  getAuth,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
} from "firebase/auth";

import { auth, passwordResetEmail } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = ({setIsAuthenticated}) => {
  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);
  const [error, setError] = useState("");
  const backgroundStyle = {
    background: 'url("/icons/background.png")',
    backgroundSize: "cover", // You can use other values like 'contain' or specific dimensions
    backgroundPosition: "center center", // You can adjust this as needed
  };
  const notify = (msg) =>
    toast.info(msg, {
      autoClose: loginStatus ? true : 2000,
    });
  const handleEmailChange = (value) => {
    setUserMail(value);
  };

  function validateEmail(userMail) {
    const emailRegex = /^.{1,64}@[^\s@]+(\.[^\s@]+){1,255}$/;
    if (!emailRegex.test(userMail)) {
      return "Please enter a valid email address with the following constraints:\n1. Local part (before @) should be 1 to 64 characters.\n2. Domain part (after @) should be 1 to 255 characters.";
    }
    return null; // Return null if the email is valid.
  }

  const handlePasswordResetEmail = async (email) => {
    if (email) {
      try {
        await passwordResetEmail(auth, email);
        console.log("Password reset email sent successfully!");
        notify("Password reset email sent successfully!");
      } catch (error) {
        console.error("Error sending password reset email:", error);
      }
    } else {
      setError("Email is required for reset password email")
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = (triggerCount) => {
    // Clear previous errors
    setError("");

    if (!userMail) {
      setError("Please enter your email address.");
      return;
    }

    const error = validateEmail(userMail);
    if (error) {
      setError(error); // Set the error message if validation fails.
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    // Add password length validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password.length > 20) {
      setError("Password cannot exceed 20 characters.");
      return;
    }

    const authentication = getAuth();

    sessionStorage.setItem("mail", userMail);
    notify("Signing In!");
    setSignInClicked(true);
    signInWithEmailAndPassword(authentication, userMail, password)
      .then((response) => {
        console.log("user", response);
        const sessionId = response.user.accessToken;
        setLoginStatus(true);
        sessionStorage.setItem("mail", userMail);
        // Check if loginValidate has already been executed
        // if (!validateExecuted || triggerCount === 2) {
        //   loginValidate(
        //     userMail,
        //     "loginTime",
        //     triggerCount === 1 ? "False" : "True",
        //     sessionId
        //   );

        //   // Set the flag to indicate that loginValidate has been executed
        //   setValidateExecuted(true);
        // }
        // else
        {
          setLoginStatus(false);
          navigate("/home");
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        setLoginStatus(false);
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/user-not-found"
        ) {
          setError("Invalid email");
        } else if (error.code === "auth/wrong-password") {
          setError("Incorrect password.");
        } else {
          setError("An error occurred during sign-in.");
        }
      });
    setSignInClicked(false);
  };
  return (
    <div className="login-root">
      <div className="login-left" style={backgroundStyle}></div>
      <div className="login-right" style={{ backgroundColor: "#04002b" }}>
        <span className="login-logo">
          <img src="/icons/voice-care-logo.svg" />
        </span>
        <span className="login-sigin-text">Sign In</span>
        <span className="login-email-section">
          <span>
            <span style={{ display: "flex", justifyContent: "left" }}>
              Email ID
            </span>
            <TextBox
              type="text"
              value={userMail}
              iconUrl={"/icons/login-user.svg"}
              style={{ width: "45vh", padding: "1vh" }}
              onChange={handleEmailChange}
            />
          </span>
        </span>
        <span className="login-password-section">
          <span>
            <span style={{ display: "flex", justifyContent: "left" }}>
              Password
            </span>
            <TextBox
              value={password}
              type="password"
              iconUrl={"/icons/login-lock.svg"}
              style={{ width: "45vh", padding: "1vh" }}
              onChange={handlePasswordChange}
            />
          </span>
        </span>
        <span className="login-forgot-password-section">
          <span className="login-fp-text">Forgot Password?</span>
        </span>
        <span className="login-btn-section">
          <Button
            label={"Login"}
            color={"#ff4e3a"}
            width={"47vh"}
            height={"4vh"}
            style={{padding: "1vh", margin: "2vh"}}
            onClick={() => handleLogin(1)}
          />
        </span>
      </div>
    </div>
  );
};

export default Login;
