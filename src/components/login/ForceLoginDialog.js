import React from "react";

const ForceLoginDialog = ({ onResult, onCancel }) => {
  const handleCancel = () => {
    onCancel(false);
    onResult("cancel");
    window.location.reload();
  };

  const handleContinue = () => {
    onResult("continue");
  };

  return (
    <div className="force-login-dialog">
      <div className="force-login-content">
        <p>
          VoiceCare is open in another window. Click "Use Here" to use VoiceCare in this window.
        </p>
        <div className="force-login-buttons">
          <button className="force-signin-btn" onClick={() => handleCancel()}>Cancel</button>
          <button className="force-signin-btn" onClick={() => handleContinue()}>Use Here</button>
        </div>
      </div>
    </div>
  );
};

export default ForceLoginDialog;
