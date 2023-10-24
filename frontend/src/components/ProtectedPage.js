import { Avatar, Badge, message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import { setUser } from "../redux/userSlice";
import Notice from "./notice";
import { GetAllNotice, ReadAllNotice } from "../apicalls/notice";

function ProtectedPage({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [notifications=[],setNotifications]=useState([])
  const [showNotifications,setShowNotifications]=useState(false)
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
    padding: "20px 40px",
    borderRadius: "20px",
    alignItems: "center",
    display:"flex"
  };
  const user_name = {
    textDecoration: "underline",
    cursor: "pointer",
    padding: "2px",
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

  const getNotifcation=async()=>{
    try {
      const response = await GetAllNotice();
      if(response.success){
        setNotifications(response.data);
      }else{
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const readNotice = async()=>{
    try {
      const response = await ReadAllNotice();
      if(response.success){
        getNotifcation();
      }else{
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validationToken();
      getNotifcation()
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        {/* header */}
        <div style={header}>
          <h1
            style={{ fontSize: "25px", color: "white", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            ALMP
          </h1>
          <div style={users}>
            {/* <i className="ri-shield-user-line"></i> */}
            <span
              style={user_name}
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span>
            <span style={{marginRight:"15px" ,cursor:"pointer"}}>
            <Badge count={notifications?.filter((notice)=>!notice.read).length}
            onClick={()=>{
              readNotice();
              setShowNotifications(true);
            }}>
                <Avatar
                  shape="circle"
                  size="medium"
                  icon={<i className="ri-notification-2-line" ></i>}
                />
              </Badge>
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

        {/* notification body */}
        {
          <Notice
          notifications={notifications}
          reloadNotifications={getNotifcation}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          />
        }
      </div>
    )
  );
}

export default ProtectedPage;
