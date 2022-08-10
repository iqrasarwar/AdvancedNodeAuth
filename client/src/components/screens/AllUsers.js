import { useState, useEffect } from "react";
import axios from "axios";

const AllUsers = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      console.log("trying to get private data");
      try {
        const { data } = await axios.get("/api/private/users", config);
        setPrivateData(data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);
  let objected = Object.keys(privateData).map((key) => {
    return (
      <>
        <tr>
          <td>{privateData[key]._id}</td>
          <td>{privateData[key].username}</td>
          <td>{privateData[key].email}</td>
          <td>{privateData[key].password}</td>
        </tr>
      </>
    );
  });
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div>REGISTERED USERS</div>
      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
        </thead>
        <tbody>{objected}</tbody>
      </table>
    </>
  );
};

export default AllUsers;
