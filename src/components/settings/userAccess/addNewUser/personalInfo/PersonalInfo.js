import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./PersonalInfo.css";
import {
  getCustomerUiRbca,
  addCustomerUiUser,
  updateCustomerUiUser,
} from "../../../../../utils/CustomerUiAPI";
import Button from "../../../../common/button/Button";

const PersonalInfo = ({ editData, setVisible, handleClose, mode, notifyMessage}) => {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobilePrompt, setMobilePrompt] = useState(true);
  const [emailPrompt, setEmailPrompt] = useState(true);
  const [textPrompt, setTextPrompt] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const auth = getAuth();

  // State variables for validation errors
  const [roleError, setRoleError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    reset();
    if (editData) {
      setEmail(editData.email);
      setEmailPrompt(editData.email_message);
      setFirstName(editData.first_name);
      setLastName(editData.last_name);
      setMobilePrompt(editData.mobile_prompt);
      setPhoneNumber(editData.phone);
      setRole(editData.role);
      setTextPrompt(editData.text_message);
    }
    getCustomerUiRbca("", "hunnurji@voicecare.ai", "test-session-id").then(
      (res) => {
        if ("supervisor" === "supervisor") {
          setRoles(res.response.map((data) => data.role));
        } else {
          setRoles(
            res.response
              .map((data) => data.role)
              .filter((res) => res !== "super_admin")
          );
        }
      }
    );
  }, []);

  const reset = () => {
    setRole("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    setMobilePrompt(true);
    setEmailPrompt(true);
    setTextPrompt(true);
  };

  const validateName = (name) => {
    if (name) {
      const alphabetsOnlyRegex = /^[a-zA-Z\s]*$/;

      // Check if it contains only alphabets and spaces
      if (!alphabetsOnlyRegex.test(name)) {
        return "Only alphabets and spaces are allowed.";
      }

      // Check for recurring alphabets
      for (let i = 0; i < name.length - 1; i++) {
        if (name[i] === name[i + 1]) {
          return "Recurring alphabets are not allowed.";
        }
      }

      // Check for sequential alphabets
      for (let i = 0; i < name.length - 2; i++) {
        if (
          name.charCodeAt(i) === name.charCodeAt(i + 1) - 1 &&
          name.charCodeAt(i) === name.charCodeAt(i + 2) - 2
        ) {
          return "Sequential alphabets are not allowed.";
        }
      }

      // Check length (adjust the maximum length as needed)
      if (name.length > 50) {
        return "Name is too long (maximum 50 characters).";
      }

      // If all validations pass, return an empty string (no error)
      return "";
    }
  };

  const handleSave = () => {
    const data = {
      email: email,
      role: role,
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
      // password: password,
      mobile_prompt: mobilePrompt,
      text_message: textPrompt,
      email_message: emailPrompt,
      locations: [],
    };
    if (mode === "edit") {
      notifyMessage("Editing User Details!");
      debugger;
      updateCustomerUiUser(
        data,
        "hunnurji@voicecare.ai",
        "test-session-id"
      ).then((res) => {
        notifyMessage("Successfully Edited!");
        handleClose();
      });
    } else {
      notifyMessage("Saving User Details!");
      addCustomerUiUser(data, "hunnurji@voicecare.ai", "test-session-id").then(
        (res) => {
          createUserWithEmailAndPassword(auth, email, password);
          notifyMessage("Successfully Saved!");
          handleClose();
        }
      );
    }
  };

  const validateRole = () => {
    if (!role) {
      setRoleError("Role is required");
      return false;
    }
    setRoleError("");
    return true;
  };

  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setPhoneNumberError("Phone Number is required");
      return false;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneNumberError("Invalid phone number");
      return false;
    }

    setPhoneNumberError("");
    return true;
  };

  const validateFirstName = () => {
    const nameRegex = /^[A-Za-z\s]+$/; // Regular expression to match alphabets and spaces

    if (!firstName) {
      setFirstNameError("First Name is required");
      return false;
    }

    if (!nameRegex.test(firstName)) {
      setFirstNameError("First Name can only contain alphabets and spaces");
      return false;
    }

    setFirstNameError("");
    return true;
  };

  const validateLastName = () => {
    const nameRegex = /^[A-Za-z\s]+$/; // Regular expression to match alphabets and spaces

    if (!lastName) {
      setLastNameError("Last Name is required");
      return false;
    }

    if (!nameRegex.test(lastName)) {
      setLastNameError("Last Name can only contain alphabets and spaces");
      return false;
    }

    setLastNameError("");
    return true;
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 8 || password.length > 20) {
      setPasswordError("Password must be between 8 and 20 characters");
      return false;
    }

    // Password should contain a combination of alphabet, special character, number,
    // lowercase, and uppercase characters
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password should contain at least one lowercase, one uppercase, one number, one special character"
      );
      return false;
    }

    // Check if the password is the same as the first name, last name, or email
    const lowerFirstName = firstName.toLowerCase();
    const lowerLastName = lastName.toLowerCase();
    const lowerEmail = email.toLowerCase();
    const lowerPassword = password.toLowerCase();

    if (
      lowerPassword.includes(lowerFirstName) ||
      lowerPassword.includes(lowerLastName) ||
      lowerPassword.includes(lowerEmail)
    ) {
      setPasswordError(
        "Password cannot contain your first name, last name, or email"
      );
      return false;
    }

    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }

    setConfirmPasswordError("");
    return true;
  };

  const handleNextClick = () => {
    // Update state variables before performing validation
    setRoleError("");
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPhoneNumberError("");

    const isRoleValid = validateRole();
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();

    const isEmailValid = validateEmail();
    const isPhoneNumberValid = validatePhoneNumber();
    // const isPasswordValid = validatePassword();
    // const isConfirmPasswordValid = validateConfirmPassword();

    if (
      isRoleValid &&
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPhoneNumberValid
    ) {
      handleSave();
    }
  };

  return (
    <div className="personal-info-div">
      <div className="personal-info-title">
        {pageNumber === 1 ? "Personal User Information" : "Practice Location"}
      </div>
      {pageNumber === 1 && (
        <div className="page1">
          <div className="personal-info-description">
            You can add/update the basic information of your own account here.
          </div>
          <div className="role-parent">
            <div className="personal-info-role">
              Role <span style={{ color: "red" }}>*</span>
            </div>
            <select
              className="personal-info-text-box"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onBlur={validateRole}
            >
              <option value="" disabled hidden>
                Select Role
              </option>
              {roles.map((res) => (
                <option value={res}>{res}</option>
              ))}
            </select>
            {roleError && <div className="error-message">{roleError}</div>}
          </div>
          <div style={{ display: "flex" }}>
            <div className="first-name-parent">
              <div className="personal-info-role">
                First Name <span style={{ color: "red" }}>*</span>
              </div>
              <input
                type={"text"}
                className="personal-info-text-box"
                placeholder="Type here your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => setFirstNameError(validateName(firstName))}
              />
              {firstNameError && (
                <div className="error-message">{firstNameError}</div>
              )}
            </div>
            <div className="last-name-parent">
              <div className="personal-info-role">
                Last Name <span style={{ color: "red" }}>*</span>
              </div>
              <input
                type={"text"}
                className="personal-info-text-box"
                placeholder="Type here your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => setLastNameError(validateName(lastName))}
              />
              {lastNameError && (
                <div className="error-message">{lastNameError}</div>
              )}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="email-parent">
              <div className="personal-info-role">
                Email ID <span style={{ color: "red" }}>*</span>
              </div>
              <input
                type={"text"}
                className="personal-info-text-box"
                placeholder="Type here your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
            <div>
              <div className="personal-info-role">
                Phone Number <span style={{ color: "red" }}>*</span>
              </div>
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry="US"
                flagsOnly={true}
                required
              />
              {phoneNumberError && (
                <div className="error-message">{phoneNumberError}</div>
              )}
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "2vh" }}>
            <div className="new-password-parent">
              <div className="personal-info-role">
                Password <span style={{ color: "red" }}>*</span>
              </div>
              <input
                type={"password"}
                className="personal-info-text-box"
                placeholder="Type your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
              />
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
            </div>
            <div className="confirm-password-parent">
              <div className="personal-info-role">
                Confirm Password <span style={{ color: "red" }}>*</span>
              </div>
              <input
                type={"password"}
                className="personal-info-text-box"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={validateConfirmPassword}
              />
              {confirmPasswordError && (
                <div className="error-message">{confirmPasswordError}</div>
              )}
            </div>
          </div>
          <Button
            label={"Save"}
            onClick={handleNextClick}
            color={"#ff4e3a"}
            width={"24vh"}
            height={"4vh"}
          />
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
