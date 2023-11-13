import { useEffect, useState } from 'react';
import { Layout, Menu, theme } from 'antd'
import { Link } from "react-router-dom"
import { TeamOutlined, HomeOutlined, BarChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Outlet } from "react-router-dom"
const { Header, Content, Sider } = Layout;
const items: MenuProps['items'] = [
    {
        label: <Link to="/">Home</Link>,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link to="/users">Users</Link>,
        key: 'users',
        icon: <TeamOutlined />,
    },
    {
        label: <Link to="/tracks">Tracks</Link>,
        key: 'tracks',
        icon: <BarChartOutlined />,
    }
];
const LayoutAdmin = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };
    useEffect(() => {
        handleLogin()
    }, [])
    const handleLogin = async () => {
        const data = {
            username: 'hoidanit@gmail.com', password: '123456'
        }
        const response1 = await fetch(`http://localhost:8000/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const data1 = await response1.json()
        if (data1.data) {
            localStorage.setItem("access_token", data1.data.access_token)
        }
    }
    return (
        <Layout style={{ minHeight: window.innerHeight }}>
            <Sider
                breakpoint="md"
                collapsedWidth="0"
            >
                <Menu
                    style={{ marginTop: 24 }}
                    selectedKeys={[current]}
                    onClick={onClick}
                    theme="dark"
                    mode="vertical"
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: colorBgContainer }}><Outlet /></div>
                </Content>
            </Layout>
        </Layout>
    )
}
export default LayoutAdmin