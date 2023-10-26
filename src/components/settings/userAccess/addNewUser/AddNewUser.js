import "./AddNewUser.css";
import PersonalInfo from "./personalInfo/PersonalInfo";
import Popup from "react-animated-popup";
import { useEffect } from "react";
const AddNewUser = ({ visible, setVisible, setEditData, editData, mode, notifyMessage }) => {
  const handleClose = () => {
    setEditData({});
    setVisible(false);
  };
  return (
    <Popup
      visible={visible}
      className="add-new-user-div"
    >
      <button className="close-btn" onClick={() => handleClose()}>
        x
      </button>
      <PersonalInfo editData={editData} handleClose={handleClose} setVisible={setVisible} mode={mode} notifyMessage={notifyMessage} />
    </Popup>
  );
};

export default AddNewUser;
