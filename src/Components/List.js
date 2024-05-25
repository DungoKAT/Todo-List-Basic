import { BsPencilSquare, BsCheckCircle, BsTrash3 } from "react-icons/bs";

const List = ({id, title, isEdit, editItem, updateItem, removeItem, editTaskText}) => {

    return (
        <div className='list-item'>
            {isEdit ? 
            <input className={isEdit ? 'edit-input title' : 'title'} value={title} onChange={(e) => editTaskText(e.target.value, id)}/> : 
            <input className={isEdit ? 'edit-input title' : 'title'} value={title} onChange={(e) => editTaskText(e.target.value, id)} disabled/>}
            <div className="button-container">
                <button className="edit-task-button" onClick={() => isEdit ? updateItem(id) : editItem(id)}>{isEdit ? <BsCheckCircle/> : <BsPencilSquare/>}</button>
                <button className="delete-task-button" onClick={() => removeItem(id)}><BsTrash3/></button>
            </div>
        </div>
    );
};

export default List;