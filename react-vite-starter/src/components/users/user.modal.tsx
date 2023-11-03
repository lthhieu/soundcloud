import { useEffect } from 'react'
import { Modal, Input, notification, message, Form, InputNumber, Select, Flex, Row, Col } from 'antd';
import { IUsers } from './users.table';
interface IProps {
    access_token: string,
    getData: () => Promise<void>,
    isModalOpen: boolean,
    SetIsModalOpen: (value: boolean) => void,
    status: string,
    setStatus: (value: string) => void,
    //update
    dataUpdate: null | IUsers,
    setDataUpdate: (value: null | IUsers) => void
}
const UserModal = (props: IProps) => {
    let { access_token, getData, isModalOpen, SetIsModalOpen, status, setStatus, dataUpdate, setDataUpdate } = props
    const { Option } = Select;
    const [form] = Form.useForm()
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
    }, [dataUpdate])
    const handleOk = () => {
        form.submit()
    }

    const handleCancel = () => {
        form.resetFields();
        setStatus("")
        setDataUpdate(null)
        SetIsModalOpen(false)
    };
    const onFinish = async (values: any) => {
        const { name, email, age, gender, address, role } = values
        const response = await fetch('http://localhost:8000/api/v1/users', {
            method: status === "CREATE" ? "POST" : "PATCH",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: status === "CREATE" ?
                JSON.stringify({ name, email, password: values?.password, age, gender, address, role })
                : JSON.stringify({ name, email, _id: dataUpdate?._id, age, gender, address, role })
        })
        const result = await response.json()
        if (result.data) {
            //success
            getData()
            message.success("Thao tác thành công")
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
        <Modal title={status === "CREATE" ? "Create new user" : "Update user"} okText={"Submit"} maskClosable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                layout='vertical'
                name="user-modal"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
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

                {status === "CREATE" ? <Form.Item
                    style={{ marginBottom: 8 }}
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
                </Form.Item> : <></>}

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
                                name="gender" label="Gender" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select gender"
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
                                name="role" label="Role" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select one role"
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
export default UserModal