import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { clearSelectedUser, getAllUser } from "../src/redux/userSlice";
import { useEffect, useState } from "react";
import { updateUserA } from "../src/redux/userSlice";
import ConfirmPanel from "./ConfirmPanel";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { closeUPanel } from "../src/redux/panelSlice";
import { setSelectedEUser, clearSelectedEUser } from "../src/redux/userSlice";
const AdminUserPanel = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [username , setUsername] = useState('');
    const [name , setName] = useState('');
    const [surname , setSurname] = useState('');
    const [email , setEmail] = useState('');
    const [isConfirmPanelOpen, setIsConfirmPanelOpen] = useState(false);
    const [confirmResolve, setConfirmResolve] = useState(null); // Promise'i çözmek için
    const isOpenU = useSelector((state) => state.panel.isOpenU);
    const user = useSelector((state) => state.user.selectedEUser);
    const showConfirm = () => {
      return new Promise((resolve) => {
          setConfirmResolve(() => resolve);
          setIsConfirmPanelOpen(true);
      });
  };
  const handleConfirmResult = (result) => {
      if (confirmResolve) {
          confirmResolve(result); // Promise'i çöz
          setConfirmResolve(null); // Temizle
      }
      setIsConfirmPanelOpen(false);
  };
    useEffect(() => {
        if (!user) return;
        setUsername(user.username);
        setName(user.name);
        setSurname(user.surname);
        setEmail(user.email);
    }, [user]);
    console.log("showing user",user)
   
    const dispatch = useDispatch();
    const handleDelete = () => {
        console.log("Delete button clicked");
    }
    const handleEdit = () => {
        console.log("Edit button clicked");
        setIsEditing(true);
    };
    const handleCancelEdit = () => {
        toast.info("Edit cancelled!");
        setIsEditing(false);
        setUsername(user.username);
        setName(user.name);
        setEmail(user.email);

    }
    const onClose = () => {
        dispatch(closeUPanel())
        dispatch (clearSelectedEUser());
        dispatch (clearSelectedUser());
    }
    const handleEditSave = async() => {
      console.log("Save button clicked");
      const userConfirmed = await showConfirm();
      if (!userConfirmed) {
        handleCancelEdit();
        return; // Kullanıcı işlemi iptal ettiyse çık
      }
      setIsEditing(false);
      const updatedUser = {
        ...user,
        username: username,
        name: name,
        surname: surname,
        email: email,
      };
      
      dispatch(updateUserA({userId:user.id,data:updatedUser}));
      toast.success("User updated successfully!");
      dispatch(getAllUser());
    } 
 
    if(user ==null){
        return null;
       }
    return (
      <>
          <Modal isOpen={isOpenU} onClose={onClose} title="Selected User">
          <table className="table-container">
            {!isEditing ? (
              <tbody>
                <tr>
                  <td>UserId</td>
                  <td>{user.id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Surname</td>
                  <td>{surname}</td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>{username}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{email}</td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td>UserId</td>
                  <td>{user.id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td><input type="text" value={name} onChange={(e) => setName(e.target.value)}/></td>
                </tr>
                <tr>
                  <td>Surname</td>
                  <td><input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/></td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td><input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/></td>
                </tr>
              </tbody>
            )}
          </table>
        
          <div className="edit-butonlari">
            {isEditing ? (
              <>
                <button className="save-btn" onClick={handleEditSave}>Save</button>
                <button className="close-btn" onClick={handleCancelEdit}>Cancel Edit</button>
                
              </>
            ) : (
              <>
              <button className="save-btn" onClick={handleEdit}>Edit</button>
              
              <button className="delete-btn" onClick={handleDelete}>Delete</button>
              </>
            )}
            
            
            
          </div>
        </Modal>
        <ConfirmPanel
                  isOpen={isConfirmPanelOpen}
                  onClose={() => setIsConfirmPanelOpen(false)}
                  onConfirm={(value) => handleConfirmResult(value)}                
              />
        </>
    );
  };
  
  export default AdminUserPanel;