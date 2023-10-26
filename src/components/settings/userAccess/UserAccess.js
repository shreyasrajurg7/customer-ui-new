import "./UserAccess.css";
import AddNewUser from "./addNewUser/AddNewUser";
import Table from "../../common/table/Table";
import { useEffect, useState } from "react";
import {
  getCustomerUiUser,
  deleteCustomerUiUser,
} from "../../../utils/CustomerUiAPI";
import { ToastContainer, toast } from "react-toast";
import { useTheme } from "../../../ThemeContext";
import Button from "../../common/button/Button";

const UserAccess = ({}) => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("add");
  const [loading, setLoading] = useState(false);
  const { getSelectedTheme } = useTheme();
  const theme = getSelectedTheme();
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      getCustomerUiUser("hunnurji@voicecare.ai", "test-session-id")
        .then((res) => {
          setLoading(false);
          setData(res.response);
        })
        .catch((res) => {
          setLoading(false);
          console.log(res);
        });
    }
    fetchData();
  }, [editData, visible]);

  const userTableColumns = [
    {
      name: "User Name",
      label: "User Name",
      selector: (row) => row.first_name + " " + row.last_name,
      width: "35vh",
    },
    {
      name: "Role",
      label: "Role",
      selector: (row) => row.role,
      width: "20vh",
    },
    {
      name: "Email",
      label: "Email",
      selector: (row) => row.email,
      width: "35vh",
    },
    {
      name: "Action",
      label: "Action",
      width: "25vw",
      render: (row) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
      backgroundColor: "#f54f3b",
      color: "#ffffff",
    });
  const handleDeleteUser = (data) => {
    notifyMessage("Deleting User Details!");
    deleteCustomerUiUser(data.email, "hunnurji@voicecare.ai", "test-session-id")
      .then((res) => notifyMessage("Deleted User!"))
      .then(() => setEditData({}));
  };

  const handleAdd = () => {
    setVisible(true);
    setMode("add");
  };

  return (
    <div>
      {loading ? (
        <img className="loader" src="/icons/loader_white.gif" />
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{ margin: "1vh" }}>
              <Button
                label={"Add New User"}
                color={"#ff4e3a"}
                width={"24vh"}
                height={"4vh"}
                onClick={handleAdd}
              />
            </span>
          </div>
          <Table
            headerColor={"#302d4c"}
            dataColor={"#252244"}
            columns={userTableColumns}
            data={data}
            itemsPerPageOptions={[5, 10, 20]}
            defaultItemsPerPage={10}
            maxHeight={"75vh"}
          />
        </div>
      )}
      <AddNewUser
        editData={editData}
        mode={mode}
        visible={visible}
        setEditData={setEditData}
        setVisible={setVisible}
        notifyMessage={notifyMessage}
      />
      <ToastContainer />
    </div>
  );
};

export default UserAccess;
