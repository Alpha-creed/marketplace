import { Tabs } from 'antd'
import React from 'react'
import Product from './Products'
import UserBids from './UserBids'
import UserProfile from './General'

function Profile() {
  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Products" key="1">
            <Product/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Bids" key="2">
            <UserBids/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
            <UserProfile/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Profile
