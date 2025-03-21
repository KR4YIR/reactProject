import '../style/StopEditButton.css'
import { onEdit, offEdit } from './redux/editSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
export const StopEditButton = () => {
    const dispatch = useDispatch();
    const visibility = useSelector(state => state.Edit.edit)
    const handleEdit = () => {
        dispatch(offEdit())
        
      }
    return(
        visibility && (<div className="stop-editing-container">
            <button className="stop-editing" onClick={handleEdit}>Stop Editing</button>
        </div>)
        
    )}