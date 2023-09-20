import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { useNavigate } from 'react-router-dom'

function ProtectedPage({children}){
    const navigate = useNavigate();
    const [user,setUser] = useState(null)
    const layout={
        padding:"25px"
    }
    const header={
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        background:"#405138",
        padding:"25px"

    }
    const users={
        background:"white",
        padding:"20px 30px",
        borderRadius:"20px",
        alignItems:"center"
    }
    const user_name={
        textDecoration:"underline",
        cursor:"pointer",
        paddingRight:"20px",
        textTransform:"uppercase"
    }
    
    const validationToken=async()=>{
        try {
            const response = await GetCurrentUser();
            if(response.success){
                setUser(response.data);
            }else{
                navigate("/login")
                message.error(response.message)
            }
        } catch (error) {
            navigate("/login")
            message.error(error.message);
        }
    }
    
    useEffect(()=>{
        if(localStorage.getItem("token")){
            validationToken()
        }else{
            navigate("/login")
        }
    },[])
  return (
    
      user && (
        <div>
            {/* header */}
        <div style={header}>
            <h1 style={{fontSize:"25px",color:"white"}}>
                ALMP
            </h1>
            <div style={users}>
            <i className="ri-shield-user-line"></i>
            <span style={user_name}>{user.name}</span>
            <i className="ri-logout-box-r-line"
                onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
            ></i>
            </div>
        </div>
        {/* body */}
        <div style={layout}>
            {children}
        </div>
        </div>
      )
   
  )
}

export default ProtectedPage
