import "./UserAccess.css";
import Button from "../../common/button/Button";
import Table from "../../common/table/Table";
import { useEffect, useState } from "react";
import {
  getCustomerUiUser,
  deleteCustomerUiUser,
} from "../../../utils/CustomerUiAPI";
import { ToastContainer, toast } from "react-toast";
import { useTheme } from "../../../ThemeContext";

const UserAccess = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  
  const {getSelectedTheme} = useTheme();
  const theme = getSelectedTheme();
  useEffect(() => {
    async function fetchData() {
      getCustomerUiUser("hunnurji@voicecare.ai", "test-session-id")
        .then((res) => setData(res.response))
        .catch((res) => console.log(res));
    }
    fetchData();
  }, [editData, visible]);

  const userTableColumns = [
    {
      name: "User Name",
      selector: (row) => row.first_name + " " + row.last_name,
      width: "35vh",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      width: "20vh",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "35vh",
    },
    {
      name: "Actions",
      selector: (row) => row.locations,
      width: "25vw",
      render: (row) => (
        <div style={{ display: "flex" }}>
          <img
            className="add-user-icon"
            alt=""
            src="./icons/edit.svg"
            onClick={() => handleEdit(row.email)}
          />
          <img
            className="add-user-icon"
            alt=""
            src="./icons/delete.svg"
            onClick={() => handleDeleteUser(row)}
          />
        </div>
      ),
    },
  ];

  const handleEdit = (email) => {
    setEditData(data.find((val) => val.email === email));
    setVisible(true);
  };

  const notifyMessage = (msg) =>
    toast(msg, {
      backgroundColor: "#8329C5",
      color: "#ffffff",
    });
  const handleDeleteUser = (data) => {
    notifyMessage("Deleting User Details!");
    deleteCustomerUiUser(data.email, "hunnurji@voicecare.ai", "test-session-id")
      .then((res) => notifyMessage("Deleted User!"))
      .then(() => setEditData({}));
  };

  return (
    <div>
      {data.length > 0 && <Table
        headerColor={"#302d4c"}
        dataColor={"#252244"}
        columns={userTableColumns}
        data={data}
        itemsPerPageOptions={[5, 10, 20]}
        defaultItemsPerPage={10}
        maxHeight={"75vh"}
      />}
      <ToastContainer />
    </div>
  );
};

export default UserAccess;
