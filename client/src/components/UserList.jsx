import { UserItem } from './UserItem'
import { useUsers } from '../hooks/useUsers.js';

export const UserList = () => {

    const userList = useUsers();

    return (
        <div className="h-full overflow-auto">
            <div className="flex flex-wrap gap-6 p-6 justify-center">
                { userList.map((user, index) =>
                    <UserItem key={index} user={user}/>
                )}
            </div>
        </div>
    )
}
