import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { clearSelectedUser } from "../src/redux/userSlice";
const AdminUserPanel = ({ isOpen, onClose ,user}) => {
    console.log(user)
   if(user ==null){
    return null;
   }
    const dispatch = useDispatch();
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Selected User">
        
            <table className="table-container">
                 <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td>UserId</td>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                    </tr>
                </tbody> 
            </table>
            <div className="edit-butonlari">
                <button onClick={() => dispatch(clearSelectedUser())}>ClearSelectedUser</button>
            </div>
         
      </Modal>
    );
  };
  
  export default AdminUserPanel;