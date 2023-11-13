import { useEffect, useState } from 'react'
import { Button, Table, notification, Popconfirm, message, Space, Flex, Tooltip, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
export interface ITracks {
    _id: string,
    title: string,
    description: string,
    category: string,
    imgUrl: string,
    trackUrl: string,
    countLike: number,
    countPlay: number
}
const TracksTable = () => {
    const [tracks, setTracks] = useState([])
    const access_token = localStorage.getItem('access_token') as string
    const [meta, setMeta] = useState({
        current: 1, // trang hiện tại muốn hiển thị
        pageSize: 3, // số records trong 1 trang
        pages: 0, // tổng số trang
        total: 0 // tổng số record
    })
    const confirm = (_id: string) => {
        deleteTrack(_id)
    };
    const columns: ColumnsType<ITracks> = [
        {
            title: '#',
            dataIndex: '_id',
            render: (value, record, index) => {
                return (<>{((meta.current - 1) * meta.pageSize) + index + 1}</>)
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            responsive: ['md']
        },
        {
            title: 'Category',
            dataIndex: 'category',
            responsive: ['sm'],
            render: (_, { category }) => (
                <><Tag color={category === 'CHILL' ? 'green' :
                    category === 'WORKOUT' ? 'geekblue' :
                        'magenta'} key={category}>{category}</Tag>
                </>
            ),
        }, {
            title: 'Filename',
            dataIndex: 'trackUrl'
        },
        {
            title: 'Uploader',
            dataIndex: ['uploader', 'name']
        }, {
            title: 'Action',
            render: (value, record) => {
                return (<div>
                    <Tooltip title="Delete">
                        <Popconfirm
                            title="Delete this track"
                            description={`Are you sure to delete ${record.title} track?`}
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
    const deleteTrack = async (_id: string) => {
        const response1 = await fetch(`http://localhost:8000/api/v1/tracks/${_id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${access_token}`, // notice the Bearer before your token
            },
        })
        const data1 = await response1.json()
        if (!data1.data) {
            notification.error({
                message: "Không thể xóa track",
                description: JSON.stringify(data1.message)
            })
        }
        else {
            message.success("Xóa track thành công")
            getData()
        }
    }
    const getData = async () => {
        const response1 = await fetch(`http://localhost:8000/api/v1/tracks?current=${meta.current}&pageSize=${meta.pageSize}`, {
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
            setTracks(data1.data.result)
            setMeta({
                current: data1.data.meta.current,
                pageSize: data1.data.meta.pageSize,
                pages: data1.data.meta.pages,
                total: data1.data.meta.total
            })
        }
    }
    const handleOnChangePage = async (page: number, pageSize: number) => {
        const response1 = await fetch(`http://localhost:8000/api/v1/tracks?current=${page}&pageSize=${pageSize}`, {
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
            setTracks(data1.data.result)
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
            columns={columns} dataSource={tracks} rowKey={"_id"} />

    </>)
}
export default TracksTable