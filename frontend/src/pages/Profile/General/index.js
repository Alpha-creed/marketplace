import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

function UserProfile() {
  const { user } = useSelector((state) => state.users);
  const overLay = {
    display: "flex",
    flexDirection: "column",
    width: "30%",
  };
  const detDesc = {
    color: "#4A3F3F",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
  };
  return (
    <div style={overLay}>
      <span style={detDesc}>
        Name:<b style={{ fontSize: "15px" }}>{user.name}</b>
      </span>
      <span style={detDesc}>
        Email:<b style={{ fontSize: "15px" }}>{user.email}</b>
      </span>
      <span style={detDesc}>
        CreatedAt:{" "}
        <b style={{ fontSize: "15px" }}>
          {moment(user.createdAt).format("MMM D,YYYY hh:mm A")}
        </b>
      </span>
    </div>
  );
}

export default UserProfile;
