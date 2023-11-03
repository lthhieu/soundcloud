import { Modal, Input, notification, message, Form, InputNumber, Select, Flex, Row, Col } from 'antd';
interface IProps {
    access_token: string,
    getData: () => Promise<void>,
    isCreateModalOpen: boolean,
    SetIsCreateModalOpen: (value: boolean) => void
}
const CreateUserModal = (props: IProps) => {
    let { access_token, getData, isCreateModalOpen, SetIsCreateModalOpen } = props
    const { Option } = Select;
    const [form] = Form.useForm();
    const handleOk = () => {
        form.submit()
    }

    const handleCancel = () => {
        form.resetFields();
        SetIsCreateModalOpen(false);
    };
    const onFinish = async (values: any) => {
        const { name, email, password, age, gender, address, role } = values
        const response = await fetch('http://localhost:8000/api/v1/users', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, age, gender, address, role })
        })
        const result = await response.json()
        if (result.data) {
            //success
            getData()
            message.success("Tạo user thành công")
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
        <Modal title="Add New User" okText={"Submit"} maskClosable={false} open={isCreateModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                layout='vertical'
                name="create-modal"
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

                <Form.Item
                    style={{ marginBottom: 8 }}
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
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
export default CreateUserModal