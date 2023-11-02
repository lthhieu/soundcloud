import { useState } from 'react'
import { Modal, Input, notification, message } from 'antd';
interface IProps {
    access_token: string,
    getData: () => Promise<void>,
    isCreateModalOpen: boolean,
    SetIsCreateModalOpen: (value: boolean) => void
}
const CreateUserModal = (props: IProps) => {
    let { access_token, getData, isCreateModalOpen, SetIsCreateModalOpen } = props
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState("")
    const handleOk = async () => {
        const data = { name, email, password, age, gender, address, role }

        const response = await fetch('http://localhost:8000/api/v1/users', {
            method: "POST",
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
            message.success("Tạo user thành công")
            handleCancel()
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(result.message)
            })
        }
    }

    const handleCancel = () => {
        setName("")
        setEmail("")
        setPassword("")
        setAddress("")
        setAge("")
        setGender("")
        setRole("")
        SetIsCreateModalOpen(false);
    };
    return (<>
        <Modal title="Add New User" okText={"Submit"} maskClosable={false} open={isCreateModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div><label>Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="name" /></div>
            <div><label>Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /></div>
            <div><label>Password</label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></div>
            <div> <label>Age</label>
                <Input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" /></div>
            <div><label>Gender</label>
                <Input value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" /></div>
            <div><label>Address</label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" /></div>
            <div><label>Role</label>
                <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" /></div>
        </Modal></>)
}
export default CreateUserModal