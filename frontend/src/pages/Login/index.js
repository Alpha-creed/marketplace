import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Divider from '../../components/Divider'
import { LoginUser } from '../../apicalls/users'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../redux/loadersSlice'

const rules=[
  {
  required:true,
  message:"required",
  }
]
const Login = () => {
  const navigate = useNavigate("/");
  const dispatch = useDispatch();
  const onFinish = async(values)=>{
    try {
      dispatch(setLoader(true))
      const response = await LoginUser(values);
      dispatch(setLoader(false))
      if(response.success){
        message.success(response.message);
        localStorage.setItem("token",response.data);
        window.location.href='/';
      }else{
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message)
    }
}
useEffect(()=>{
  if(localStorage.getItem("token")){
    navigate("/")
  }
},[])
  return (
    <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:'#405138',minHeight:'100vh'}}>
    <div className='bg-white p-5 rounded w-25'>
    <h3  style={{color:"#9E9E9E"}}>
    AlMP -
      <span style={{color:"#405138",fontSize:"25px"}}> LOGIN</span>
    </h3>
    <Divider />
      <Form
          layout='vertical'
          onFinish={onFinish}
      >
          <Form.Item 
              label="Email" 
              name="email"
              rules={rules}>
              <Input placeholder='Email'/>
          </Form.Item>
          <Form.Item 
              label="Password" 
              name="password"
              rules={rules}>
              <Input 
                  type='password'
                  placeholder='Password'/>
          </Form.Item>
          <Button type='primary' htmlType='submit' block className='mt-2'>
              Login
          </Button>
          <div className='mt-3 text-center'>
          <span style={{color:"#9E9E9E"}}>
              Don't have an Account?<Link to="/register" style={{color:"#405138",textDecoration:'none'}}>Register</Link>
          </span>
          </div>
      </Form>
  </div>
    </div>
  )
}

export default Login
