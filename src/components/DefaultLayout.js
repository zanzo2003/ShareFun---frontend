import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  UsergroupDeleteOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import './DefaultLayout.css'

const { Header, Sider, Content } = Layout;


const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let navigate = useNavigate();
  const selectedKey = useLocation().pathname

  const highlight = () => {
    if (selectedKey === '/') {
      return ['1'];
    } else if (selectedKey === `/profile/${user._id}`) {
      return ['2'];
    }
    else if (selectedKey === '/editprofile') {
      return ['2'];
    }
    else if (selectedKey === '/addpost') {
      return ['3'];
    }
    else if (selectedKey === '/allusers') {
      return ['4'];
    }
  }

  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Layout>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className='position-static'
        >
          <div className='d-flex justify-content-between align-items-center layout'>
            <h4 id='user-name'>{user.username}</h4>
            <h2 id='app-name'>Share Fun</h2>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </div>
        </Header>
        <Content
          style={{
            marginTop: "8px",
            background: colorBgContainer,
          }}
        >
          {props.children}
        </Content>
      </Layout>

      <Sider trigger={null} collapsible collapsed={collapsed} style={{position: 'sticky', top: 0, bottom: 0, overflow: 'auto', height: '100vh'}}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={highlight()}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Home',
              onClick: () => { navigate('/') }
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Profile',
              onClick: () => { navigate(`/profile/${user._id}`) }
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Add Post',
              onClick: () => { navigate('/addpost') }
            },
            {
              key: '4',
              icon: <UsergroupDeleteOutlined />,
              label: 'All users',
              onClick: () => { navigate('/allusers') }
            },
            {
              key: '5',
              icon: <LogoutOutlined />,
              label: 'Logout',
              onClick: () => { localStorage.removeItem(('user'), window.location.reload()) }
            },
          ]}
        />
      </Sider>
    </Layout>
  );
};
export default DefaultLayout;