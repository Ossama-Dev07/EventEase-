import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  axios.defaults.withCredentials = true;
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch user data on component mount
    axios
      .get("http://localhost:30084/user")
      .then((response) => {
        const { email, username, phone, profileImage } = response.data.user;
        setUserData({ email, username, phone });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("username", userData.username);
    formData.append("phone", userData.phone);
    formData.append("password", userData.password);

    if (image) {
      formData.append("image", image); 
    }
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.put(
        "http://localhost:30084/user",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error updating user profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone: </label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Leave empty if you don't want to change"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Profile Image: </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Home;
