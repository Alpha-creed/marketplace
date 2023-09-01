import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Divider from '../../components/Divider'

const rules=[
    {
    required:true,
    message:"required",
    }
]
const Register = () => {
    const onFinish = (values)=>{
        console.log("Success ",values);
    }
  return (
    <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:'#405138',minHeight:'100vh'}}>
      <div className='bg-white p-5 rounded w-25'>
      <h3  style={{color:"#9E9E9E"}}>
      AlMP -
        <span style={{color:"#405138"}}> Register</span>
      </h3>
      <Divider />
        <Form
            layout='vertical'
            onFinish={onFinish}
        >
            <Form.Item 
                label="Name" 
                name="name"
                rules={rules}>
                <Input placeholder='Name'/>
            </Form.Item>
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
                Register
            </Button>
            <div className='mt-3 text-center'>
            <span style={{color:"#9E9E9E"}}>
                Already have an account?<Link to="/login" style={{color:"#405138",textDecoration:'none'}}>Login</Link>
            </span>
            </div>
        </Form>
    </div>
    </div>
  )
}

export default Register
