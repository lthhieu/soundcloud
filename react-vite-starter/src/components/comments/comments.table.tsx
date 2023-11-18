import { useEffect, useState } from 'react'
import { Button, Table, notification, Popconfirm, message, Space, Flex, Tooltip, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
export interface IComments {
    "_id": string,
    "content": string,
    "moment": number,
    "user": {
        "_id": string,
        "email": string,
        "name": string,
        "role": string,
        "type": string
    },
    "track": {
        "_id": string,
        "title": string,
        "description": string,
        "trackUrl": string
    },
    "isDeleted": boolean,
    "__v": number,
    "createdAt": string,
    "updatedAt": string
}
const CommentsTable = () => {
    const [comments, setComments] = useState([])
    const access_token = localStorage.getItem('access_token') as string
    const [meta, setMeta] = useState({
        current: 1, // trang hiện tại muốn hiển thị
        pageSize: 3, // số records trong 1 trang
        pages: 0, // tổng số trang
        total: 0 // tổng số record
    })
    const confirm = (_id: string) => {
        deleteComment(_id)
    };
    const columns: ColumnsType<IComments> = [
        {
            title: '#',
            dataIndex: '_id',
            render: (value, record, index) => {
                return (<>{((meta.current - 1) * meta.pageSize) + index + 1}</>)
            }
        },
        {
            title: 'Content',
            dataIndex: 'content',
        },
        {
            title: 'Track',
            dataIndex: ['track', 'title'],
            responsive: ['md']
        },
        {
            title: 'User',
            dataIndex: ['user', 'email'],
            responsive: ['sm']
        }, {
            title: 'Action',
            render: (value, record) => {
                return (<div>
                    <Tooltip title="Delete">
                        <Popconfirm
                            title="Delete this comment"
                            description={`Are you sure to delete this comment?`}
                            onConfirm={() => confirm(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon={<DeleteOutlined />} danger></Button>
                        </Popconfirm>
                    </Tooltip>
                </div>)
            }
        }
    ];
    useEffect(() => {
        getData()
    }, [])
    const deleteComment = async (_id: string) => {
        const response1 = await fetch(`http://localhost:8000/api/v1/comments/${_id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${access_token}`, // notice the Bearer before your token
            },
        })
        const data1 = await response1.json()
        if (!data1.data) {
            notification.error({
                message: "Không thể xóa comment",
                description: JSON.stringify(data1.message)
            })
        }
        else {
            message.success("Thao tác thành công")
            getData()
        }
    }
    const getData = async () => {
        const response1 = await fetch(`http://localhost:8000/api/v1/comments?current=${meta.current}&pageSize=${meta.pageSize}`, {
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
            setComments(data1.data.result)
            setMeta({
                current: data1.data.meta.current,
                pageSize: data1.data.meta.pageSize,
                pages: data1.data.meta.pages,
                total: data1.data.meta.total
            })
        }
    }
    const handleOnChangePage = async (page: number, pageSize: number) => {
        const response1 = await fetch(`http://localhost:8000/api/v1/comments?current=${page}&pageSize=${pageSize}`, {
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
            setComments(data1.data.result)
            setMeta({
                current: data1.data.meta.current,
                pageSize: data1.data.meta.pageSize,
                pages: data1.data.meta.pages,
                total: data1.data.meta.total
            })
        }
    }
    return (<>
        <Flex justify='flex-start' align='center'>
            <h2>Tracks Table</h2>
        </Flex>
        <Table
            pagination={{
                current: meta.current,
                pageSize: meta.pageSize,
                total: meta.total,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                onChange: (page: number, pageSize: number) => handleOnChangePage(page, pageSize),
                pageSizeOptions: [3, 5, 10],
                showSizeChanger: true,
            }}
            columns={columns} dataSource={comments} rowKey={"_id"} />

    </>)
}
export default CommentsTable