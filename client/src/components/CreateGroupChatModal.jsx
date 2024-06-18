import React, { useState } from 'react'
import { Modal, Checkbox } from 'antd';
import { useUsers } from '../hooks/useUsers';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GroupChatUserItem } from './GroupChatUserItem';

export const CreateGroupChatModal = (props) => {
    
    const [checkedUsers, setCheckedUsers] = useState([])

    const userList = useUsers();
    
    const { currentUser } = useSelector(state => state.user)

    const navigate = useNavigate();

    const handleModalSubmit = async () => {

        if (checkedUsers.length == 0) {
            alert("No users selected");
            return
        }
        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/conversation`
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    users: [
                        currentUser._id,
                        ...checkedUsers
                    ]
                })
            })

            if (res.ok) {
                res = await res.json();
                console.log("Successfully create conversation")
                console.log(res)
                navigate(`/conversations/${res._id}`)
            } else {
                if (res.status == 401) {
                    navigate("/signin")
                }                
                console.log("Failed to create conversation")
            }
        } catch (e) {   
            console.log(e);
            console.log("Failed to create conversation")
        }
    }

    const onCheckboxChange = (checkedValues) => {
        setCheckedUsers(checkedValues)
    }

    return (
        <>
            <Modal title="Create Group Chat" open={props.isOpen} onCancel={props.cancelModal} onOk={handleModalSubmit} okText="Create" centered="true">
                <Checkbox.Group value={checkedUsers} className="flex flex-col gap-3 mt-5" onChange={onCheckboxChange}>
                    {userList.map((user, index) => (
                            <Checkbox className="uppercase" value={user._id} key={index}>
                                <GroupChatUserItem user={user}/>
                            </Checkbox>
                        )
                    )}
                </Checkbox.Group>
            </Modal>        
        </>
    )
}
