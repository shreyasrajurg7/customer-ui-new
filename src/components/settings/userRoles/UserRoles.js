import "./UserRoles.css";
import Button from "../../common/button/Button";
import Table from "../../common/table/Table";
import { useEffect, useState } from "react";
import {
  getAllCustomerUiRbca,
  deleteUserRole,
} from "../../../utils/CustomerUiAPI";
import { ToastContainer, toast } from "react-toast";

const UserRoles = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  useEffect(() => {
    async function fetchData() {
      getAllCustomerUiRbca("hunnurji@voicecare.ai", "test-session-id")
        .then((res) => setData(res.response))
        .catch((res) => console.log(res));
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
      name: "Role",
      selector: (row) => row.role,
      reorder: true,
    },
    {
      name: "Permissions",
      selector: (row) => row.permissions,
      reorder: true,
      cell: (row) => (
        <div style={{ display: "flex" }}>
          <div style={{ float: "left", width: "15vw", overflow: "hidden" }}>
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
      backgroundColor: "#8329C5",
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

  const handleDeleteUser = (role) => {
    const data = {
      role: role,
    };
    notifyMessage("Deleting Role!");
    deleteUserRole(data, "hunnurji@voicecare.ai", "test-session-id")
      .then((res) => toast.info("Deleted Role!"))
      .then(() => setEditData([]));
  };

  return (
    <div>
      {data.length > 0 && <Table
        headerColor={"#302d4c"}
        dataColor={"#252244"}
        columns={columns}
        data={data}
        itemsPerPageOptions={[5, 10, 20]}
        defaultItemsPerPage={10}
        maxHeight={"75vh"}
      />}
      <ToastContainer />
    </div>
  );
};

export default UserRoles;
