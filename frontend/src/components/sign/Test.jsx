import axios from "axios";
import React from "react";

export default function Test() {
      axios.defaults.withCredentials = true;
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:30084/test");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Fetch User Data</button>
    </div>
  );
}
