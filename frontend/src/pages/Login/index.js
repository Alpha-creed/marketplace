import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Divider from '../../components/Divider'
import { LoginUser } from '../../apicalls/users'

const rules=[
  {
  required:true,
  message:"required",
  }
]
const Login = () => {
  const onFinish = async(values)=>{
    try {
      const response = await LoginUser(values);
      if(response.success){
        message.success(response.message);
        localStorage.setItem("token",response.data);
      }else{
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message)
    }
}
  return (
    <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:'#405138',minHeight:'100vh'}}>
    <div className='bg-white p-5 rounded w-25'>
    <h3  style={{color:"#9E9E9E"}}>
    AlMP -
      <span style={{color:"#405138"}}> LOGIN</span>
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
