import { FC, useState,memo, useCallback } from "react";
import { TodoType } from "../../types/type";
import Modal from "../../components/Modal";

interface ITodoList{
    items : TodoType[]
    onDeleteTodo : (todoId : number)=>void
    onCompeletTodo : (todoId : number,response : boolean)=>void
}

const TodoList : FC<ITodoList> = (props)=>{

    const {items,onDeleteTodo,onCompeletTodo} = props;
    const [selectedTodoId,setSelectedTodoId] = useState<number>(0);

    const [openModal,setOpenModal] = useState<boolean>(false);


    //Function is used to open Delete Alert popup.
    const onDeleteAlertHandler = (todoId : number)=>{
        setSelectedTodoId(todoId)
        setOpenModal(true);
    }

    //Function is used to invoke action on modal actionBtn.
    const onModalActionHandler = useCallback(()=>{
        onDeleteTodo(selectedTodoId);
        setOpenModal(false)
    },[selectedTodoId,onDeleteTodo])



    return (
        <div className="todo-list-container">
            <ul className="list-group">
                {items.length === 0 &&
                    <p className="text-center">No items..</p>
                }
                {items.map((item)=>(
                    <li key={item.id} className={` ${item.isActive ? 'activeTodo' : 'completeTodo'} todo-list-item list-group-item `}>
                        <div className="d-flex w-100">
                            <input 
                                type="checkbox" 
                                id={`todo-checkbox-${item.id}`} 
                                data-testid={`todo-checkbox-${item.id}`}
                                className="todo-checkbox" 
                                checked={!item.isActive}
                                onChange={(e : React.ChangeEvent<HTMLInputElement>)=>onCompeletTodo(item.id,e.target.checked)} 
                            />
                            <h6 className="mb-1 ms-2">{item.title}</h6>
                            <span className="ms-3">{item.description}</span>
                        </div>
                       
                        <span className=" ms-2 cursor-pointer">
                            <i data-testid={`delete-icon-${item.id}`} className="fa fa-trash text-danger" onClick={()=>onDeleteAlertHandler(item.id)}></i>
                        </span>
                    </li>
                    
                ))}
            </ul>
            {openModal &&
                <Modal
                    actionName="Yes"
                    child={<p>Are you sure you want to delete.</p>}
                    onAction={onModalActionHandler}
                    onCancel={()=>setOpenModal(false)}
                    title="Alert"
                    height="220px"
                />
            }
            
        </div>
        
    )
}
export default memo(TodoList);