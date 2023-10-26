import Popup from "react-animated-popup";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { updateUserRole, addUserRole } from "../../../../utils/CustomerUiAPI";
import Button from "../../../common/button/Button";
export const UserRole = ({
  visible,
  editData,
  setEditData,
  setVisible,
  mode,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    setSelectedOptions([]);
    if (editData.permissions) {
      setSelectedOptions(editData.permissions);
    }
  }, [visible]);

  const handleClose = () => {
    setEditData({});
    setVisible(false);
  };

  const permissionsData = [
    {
      value: "view_process_automation",
      label: "View Process Automation",
    },
    {
      value: "update_process_automation",
      label: "Update Process Automation",
    },
    {
      value: "view_call_automation",
      label: "View Call Automation",
    },
    {
      value: "update_call_automation",
      label: "Update Call Automation",
    },
    {
      value: "view_call_history",
      label: "View Call History",
    },
    {
      value: "update_call_history",
      label: "Update Call History",
    },
    {
      value: "view_call_status",
      label: "View Call Status",
    },
    {
      value: "update_call_status",
      label: "Update Call Status",
    },
    {
      value: "view_call_metrics",
      label: "View Call Metrics",
    },
    {
      value: "update_call_metrics",
      label: "Update Call Metrics",
    },
    {
      value: "view_user_access",
      label: "View User Access",
    },
    {
      value: "update_user_access",
      label: "Update User Access",
    },
    {
      value: "view_batch_history",
      label: "View Batch History",
    },
    {
      value: "update_batch_history",
      label: "Update Batch History",
    },
  ];

  const handleCheckboxChange = (event) => {
    const option = event.target.value;
    const newSelectedOptions = [...selectedOptions];

    if (event.target.checked) {
      newSelectedOptions.push(option);
    } else {
      const index = newSelectedOptions.indexOf(option);
      newSelectedOptions.splice(index, 1);
    }
    setSelectedOptions(newSelectedOptions);
  };

  const notifyMessage = (message) => {
    toast.info(message);
  };

  const handleSave = () => {
    const data = {
      role: editData.role || role,
      permissions: selectedOptions,
    };
    if (!role) {
      return;
    }
    if (mode === "edit") {
      notifyMessage("Editing User Roles!");
      updateUserRole(data, "hunnurji@voicecare.ai", "test-session-id").then(
        (res) => {
          notifyMessage("Succesfully Edited Roles!");
          handleClose();
        }
      );
    } else {
      notifyMessage("Saving User Roles!");
      addUserRole(data, "hunnurji@voicecare.ai", "test-session-id").then(
        (res) => {
          notifyMessage("Succesfully Saved Roles!");
          handleClose();
        }
      );
    }
  };

  return (
    <Popup
      visible={visible}
      onClose={() => handleClose()}
      className="add-new-user-div"
    >
      <button
        className="close-btn"
        style={{ color: "#fff" }}
        onClick={() => handleClose()}
      >
        x
      </button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        Role Name:{" "}
        <input
          type="text"
          placeholder="role name"
          style={{
            width: "20vw",
            marginTop: "2vh",
            padding: "1vh",
            marginBottom: "2vh",
            backgroundColor: "#535167",
            border: "none",
            borderRadius: "1vh",
            color: "#fff"

          }}
          value={editData.role}
          onChange={(e) => setRole(e.target.value)}
        />
        {!role && !editData.role && (
          <span style={{ color: "red" }}>role name is mandatory</span>
        )}
        <br />
        Permissions:
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "2vh",
          }}
        >
          {permissionsData.map((permission) => (
            <span key={permission.value}>
              <input
                type="checkbox"
                value={permission.value}
                checked={selectedOptions.includes(permission.value)}
                onChange={(e) => handleCheckboxChange(e)}
              />
              {permission.label}
            </span>
          ))}
        </div>
        <Button
            label={"Save"}
            onClick={handleSave}
            color={"#ff4e3a"}
            width={"14vh"}
            height={"4vh"}
          />
      </div>
    </Popup>
  );
};
