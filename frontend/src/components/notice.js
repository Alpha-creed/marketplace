import { Modal, message } from "antd";
import React from "react";
import Divider from "./Divider";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DeleteNotice } from "../apicalls/notice";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadersSlice";


function Notice({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const DeleteNotification=async(id)=>{
        try {
            dispatch(setLoader(true));
            const response = await DeleteNotice(id);
            dispatch(setLoader(false))
            if(response.success){
                message.success(response.message);
                reloadNotifications()
            }else{
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message);
        }
    }
  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {notifications.map((notice)=>(
                <div style={{cursor:"pointer",display:"flex",flexDirection:"column",gap:5, padding:"5px",border:"1px solid #989393"}}
                key={notice._id}
               
                >
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div
                             onClick={()=>{
                                navigate(notice.onClick)
                                setShowNotifications(false)
                            }}>
                            <h4 style={{color:"#666363"}}>
                            {notice.title}
                        </h4>
                        <span style={{color:"#989393"}}>{notice.message}</span>
                          <h5 style={{color:"#989393"}}>
                            {moment(notice.createdAt).fromNow()}
                          </h5>
                            </div>
                            <i
              className="ri-delete-bin-line"
              onClick={() => {
//TODO:write a delete function
DeleteNotification(notice._id)
            }}
            ></i>
                        </div>
                </div>
            ))}
        </div>
    </Modal>
  );
}

export default Notice;
