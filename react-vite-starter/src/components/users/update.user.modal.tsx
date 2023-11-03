import { useEffect, useState } from 'react'
import { Modal, Input, notification, message, Form, InputNumber, Select, Flex, Row, Col } from 'antd';

import { IUsers } from './users.table';
interface IProps {
    access_token: string,
    getData: () => Promise<void>,
    isUpdateModalOpen: boolean,
    SetIsUpdateModalOpen: (value: boolean) => void,
    dataUpdate: null | IUsers,
    setDataUpdate: (value: null | IUsers) => void
}
const UpdateUserModal = (props: IProps) => {
    let { access_token, getData, isUpdateModalOpen, SetIsUpdateModalOpen, dataUpdate, setDataUpdate } = props
    const { Option } = Select;
    const [form] = Form.useForm();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState("")
    const [_id, set_id] = useState("")
    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
                address: dataUpdate.address,
                age: dataUpdate.age,
                gender: dataUpdate.gender,
                role: dataUpdate.role,
                _id: dataUpdate._id
            })
        }
        console.log(dataUpdate)
    }, [dataUpdate])
    const handleOk = async () => {
        form.submit()

    }

    const handleCancel = () => {
        setName("")
        setEmail("")
        setAddress("")
        setAge("")
        setGender("")
        setRole("")
        set_id("")
        setDataUpdate(null)
        SetIsUpdateModalOpen(false);
    }

    const onFinish = async (values: any) => {
        const { _id, name, email, age, gender, address, role } = values
        const data = { _id, name, email, age, gender, address, role }

        const response = await fetch('http://localhost:8000/api/v1/users', {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        if (result.data) {
            //success
            getData()
            message.success('Cập nhật thành công')
            handleCancel()
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(result.message)
            })
        }
    }
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    }
    return (<>
        <Modal title="Update User" okText={"Submit"} maskClosable={false} open={isUpdateModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                layout='vertical'
                name="update-modal"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item hidden name="_id"></Form.Item>
                <Form.Item
                    style={{ marginBottom: 8 }}
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 8 }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email' }]}
                >
                    <Input type='email' />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 8 }}
                    label="Age"
                    name="age"
                    rules={[{ required: true, type: 'number', min: 0, max: 99 }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 8 }}
                    label="Address"
                    name="address"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Flex>
                    <Row gutter={[8, 0]} style={{ display: 'contents' }}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                style={{ width: '100%', marginBottom: 8 }}
                                name="gender" label="Gender" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                >
                                    <Option value="MALE">Male</Option>
                                    <Option value="FEMALE">Female</Option>
                                    <Option value="OTHER">Other</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                style={{ width: '100%', marginBottom: 8 }}
                                name="role" label="Role" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                >
                                    <Option value="ADMIN">Admin</Option>
                                    <Option value="USER">User</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Flex>
            </Form>
        </Modal></>)
}
export default UpdateUserModal