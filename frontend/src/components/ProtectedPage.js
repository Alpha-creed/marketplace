import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import { setUser } from "../redux/userSlice";

function ProtectedPage({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const layout = {
    padding: "25px",
  };
  const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#405138",
    padding: "25px",
  };
  const users = {
    background: "white",
    padding: "20px 30px",
    borderRadius: "20px",
    alignItems: "center",
  };
  const user_name = {
    textDecoration: "underline",
    cursor: "pointer",
    paddingRight: "20px",
    textTransform: "uppercase",
  };

  const validationToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validationToken();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <div>
        {/* header */}
        <div style={header}>
          <h1 style={{ fontSize: "25px", color: "white",cursor:"pointer" }}>ALMP</h1>
          <div style={users}>
            <i className="ri-shield-user-line"></i>
            <span style={user_name} onClick={() =>{ 
                if(user.role === "user"){
                    navigate("/profile");
                }else{
                    navigate("/admin");
                }}}>
              {user.name}
            </span>
            <i
              className="ri-logout-box-r-line"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        {/* body */}
        <div style={layout}>{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
