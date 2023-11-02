import { useEffect, useState } from 'react'
import { Modal, Input, notification, message } from 'antd';
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
            setName(dataUpdate.name)
            setEmail(dataUpdate.email)
            set_id(dataUpdate._id)
            setAddress(dataUpdate.address)
            setAge(dataUpdate.age)
            setGender(dataUpdate.gender)
            setRole(dataUpdate.role)
        }
        console.log(dataUpdate)
    }, [dataUpdate])
    const handleOk = async () => {
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
    };
    return (<>
        <Modal title="Update  User" okText={"Submit"} maskClosable={false} open={isUpdateModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div><label>Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="name" /></div>
            <div><label>Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /></div>
            <div><label>Password</label>
                <Input disabled value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></div>
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
export default UpdateUserModal