import { useState, useEffect } from "react";
import axios from "axios";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const addNewUser = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.post(
        "/api/private/user",
        {
          username,
          email,
        },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div>REGISTER USERS</div>
      <div className="register-screen">
        <form onSubmit={addNewUser} className="register-screen__form">
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              required
              id="name"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add New User
          </button>
        </form>
      </div>
    </>
  );
};

export default PrivateScreen;
