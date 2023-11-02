import React, { useEffect, useState } from 'react'
// import '../../styles/users.scss'
import { Button, Table, notification, Popconfirm, message, Space, Flex } from 'antd';
import { UserAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';
export interface IUsers {
    _id: string,
    email: string,
    name: string,
    role: string,
    address: string,
    gender: string,
    phone: string,
    age: string
}
const UsersTable = () => {
    const [users, setUsers] = useState([])
    const [isCreateModalOpen, SetIsCreateModalOpen] = useState(false)
    const [isUpdateModalOpen, SetIsUpdateModalOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null)
    const access_token = localStorage.getItem('access_token') as string
    const [meta, setMeta] = useState({
        current: 1, // trang hiện tại muốn hiển thị
        pageSize: 2, // số records trong 1 trang
        pages: 0, // tổng số trang
        total: 0 // tổng số record
    })
    const confirm = (_id: string) => {
        deleteUser(_id)
    };
    const columns: ColumnsType<IUsers> = [
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Role',
            dataIndex: 'role'
        }, {
            title: 'Actions',
            render: (value, record) => {
                return (<div>
                    <Space>
                        <Button icon={<EditOutlined />} onClick={() => {
                            setDataUpdate(record)
                            SetIsUpdateModalOpen(true)
                        }}>Edit</Button>
                        <Popconfirm
                            title="Delete the user"
                            description={`Are you sure to delete ${record.name} user?`}
                            onConfirm={() => confirm(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon={<DeleteOutlined />} danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                </div>)
            }
        },
    ];
    useEffect(() => {
        getData()
    }, [])
    const deleteUser = async (_id: string) => {
        const response1 = await fetch(`http://localhost:8000/api/v1/users/${_id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${access_token}`, // notice the Bearer before your token
            },
        })
        const data1 = await response1.json()
        if (!data1.data) {
            notification.error({
                message: "Không thể xóa user",
                description: JSON.stringify(data1.message)
            })
        }
        else {
            message.success("Xóa user thành công")
            getData()
        }
    }
    const getData = async () => {
        const response1 = await fetch(`http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`, // notice the Bearer before your token
            },
        })
        const data1 = await response1.json()
        if (!data1.data) {
            notification.error({
                message: "Hết phiên đăng nhập",
                description: JSON.stringify(data1.message)
            })
        } else {
            setUsers(data1.data.result)
            setMeta({
                current: data1.data.meta.current,
                pageSize: data1.data.meta.pageSize,
                pages: data1.data.meta.pages,
                total: data1.data.meta.total
            })
        }
    }
    const showModal = () => {
        SetIsCreateModalOpen(true);
    }
    const handleOnChangePage = async (page: number, pageSize: number) => {
        const response1 = await fetch(`http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`, // notice the Bearer before your token
            },
        })
        const data1 = await response1.json()
        if (!data1.data) {
            notification.error({
                message: "Hết phiên đăng nhập",
                description: JSON.stringify(data1.message)
            })
        } else {
            setUsers(data1.data.result)
            setMeta({
                current: data1.data.meta.current,
                pageSize: data1.data.meta.pageSize,
                pages: data1.data.meta.pages,
                total: data1.data.meta.total
            })
        }
    }
    return (<>
        <Flex justify='space-between' align='center'>
            <h2>Users Table</h2>
            <div><Button onClick={showModal} type='primary' icon={<UserAddOutlined />}>Add New</Button></div>
        </Flex>
        <Table
            pagination={{
                current: meta.current,
                pageSize: meta.pageSize,
                total: meta.total,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                onChange: (page: number, pageSize: number) => handleOnChangePage(page, pageSize),
                pageSizeOptions: [2, 5, 10],
                showSizeChanger: true,
            }}
            columns={columns} dataSource={users} rowKey={"_id"} />

        <CreateUserModal
            access_token={access_token}
            getData={getData}
            isCreateModalOpen={isCreateModalOpen}
            SetIsCreateModalOpen={SetIsCreateModalOpen} />
        <UpdateUserModal
            setDataUpdate={setDataUpdate}
            dataUpdate={dataUpdate}
            access_token={access_token}
            getData={getData}
            isUpdateModalOpen={isUpdateModalOpen}
            SetIsUpdateModalOpen={SetIsUpdateModalOpen} />
    </>)
}
export default UsersTable