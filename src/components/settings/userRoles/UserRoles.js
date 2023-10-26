import "./UserRoles.css";
import Button from "../../common/button/Button";
import Table from "../../common/table/Table";
import { useEffect, useState } from "react";
import {
  getAllCustomerUiRbca,
  deleteUserRole,
} from "../../../utils/CustomerUiAPI";
import { ToastContainer, toast } from "react-toast";
import { UserRole } from "./addUserRole/UserRole";

const UserRoles = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [mode, setMode] = useState("add");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      getAllCustomerUiRbca("hunnurji@voicecare.ai", "test-session-id")
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

  const convertStringArrayToArray = (data) => {
    // Remove the first and last single quotation marks
    const stringWithoutQuotes = data.substring(1, data.length - 1);

    // Split the modified string into an array
    const arrayOfPermissions = stringWithoutQuotes
      .split(", ")
      .map((permission) => JSON.parse(`"${permission.replace(/'/g, "")}"`));
    debugger;
    // const resultArray = arrayOfPermissions[0].split(',');

    // Return the array
    return arrayOfPermissions;
  };

  const columns = [
    {
      label: "Role",
      name: "Role",
      width: "35vw",
      selector: (row) => row.role,
    },
    {
      label: "Permissions",
      name: "Action",
      width: "35vw",
      render: (row) => (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ float: "left",}}>
            {convertStringArrayToArray(row.permissions).length}
          </div>
          <div style={{ float: "right" }}>
            <img
              className="add-user-icon"
              alt=""
              src="./icons/edit.svg"
              onClick={() => handleEdit(row)}
            />
            <img
              className="add-user-icon"
              alt=""
              src="./icons/delete.svg"
              onClick={() => handleDeleteUser(row.role)}
            />
          </div>
        </div>
      ),
    },
  ];

  const notifyMessage = (msg) =>
    toast(msg, {
      backgroundColor: "#f54f3b",
      color: "#ffffff",
    });
  const handleEdit = (row) => {
    setVisible(true);
    const data = {
      role: row.role,
      permissions: convertStringArrayToArray(row.permissions),
    };
    setEditData(data);
  };

  const handleAdd = () => {
    setVisible(true);
    setMode("add");
  }

  const handleDeleteUser = (role) => {
    const data = {
      role: role,
    };
    notifyMessage("Deleting Role!");
    deleteUserRole(data, "hunnurji@voicecare.ai", "test-session-id")
      .then((res) => notifyMessage("Deleted Role!"))
      .then(() => setEditData([]));
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
                label={"Add New Role"}
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
            columns={columns}
            data={data}
            itemsPerPageOptions={[5, 10, 20]}
            defaultItemsPerPage={10}
            maxHeight={"75vh"}
          />
        </div>
      )}
      <UserRole
        visible={visible}
        editData={editData}
        setVisible={setVisible}
        setEditData={setEditData}
        mode={mode}
      />
      <ToastContainer />
    </div>
  );
};

export default UserRoles;
