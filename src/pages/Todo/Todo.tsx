import { FC, Fragment, useRef, useState ,memo, useCallback, useEffect} from "react";
import SearchTodo from "./SearchTodo";
import TodoList from "./TodoList";
import { TodoType } from "../../types/type";
import Modal from "../../components/Modal";
import AddTodo from "./add-todo/AddTodo";
import TodoFotter from "./TodoFotter";
import { TODO_STATUS } from "../../types/enum";


let firstRender = true;
const Todo : FC = ()=>{

    const btnRef = useRef<HTMLButtonElement>(null);

    const [openModal,setOpenModal] = useState<boolean>(false);
    const [todoStatus,setTodoStatus] = useState<TODO_STATUS>(TODO_STATUS.ALL);
    const [filterTodo,setFilterTodo] = useState<TodoType[]>([]);
    
    const [todoItems,setTodoItems] = useState<TodoType[]>([{
        description : 'Test Description',
        id : 1,
        isActive : true,
        title : "Test Todo"
    }]);


    //Function is used to add item in todo
    const onAddTodo = useCallback((todo : TodoType)=>{
        todo.id = todoItems.length + 1;
        setTodoItems((prev)=>([...prev,todo]));
        setTodoStatus(TODO_STATUS.ALL)
    },[setTodoItems,todoItems.length])

    //Function is used to call child form submit
    const onAddAction = useCallback(()=>{
        btnRef?.current?.click();
    },[btnRef])

    //Function is used to delete the todo item
    const onDeleteTodo = useCallback((todoId : number)=>{
        setTodoItems((prev)=>([...prev].filter(item=>item.id !== todoId)));
    },[setTodoItems])


    //Function is used to compelete the todo item
    const onCompeletTodo = useCallback((todoId : number,response : boolean)=>{
        setTodoItems((prev)=>([...prev].map(item=>({
                ...item,
                isActive : item.id === todoId ? !response : item.isActive
            }
        ))));
    },[setTodoItems])

    //* Function is used to search todo items.
    const onSearchHandler = useCallback((searchField: string) => {
        let filteredTodos = todoItems.filter(item => 
            item.title.toLowerCase().includes(searchField.toLowerCase()) || 
            item.description.toLowerCase().includes(searchField.toLowerCase())
        );
    
        if (todoStatus === TODO_STATUS.ACTIVE)
            filteredTodos = filteredTodos.filter(item => item.isActive);
        else if (todoStatus === TODO_STATUS.COMPLETED)
            filteredTodos = filteredTodos.filter(item => !item.isActive);
    
        setFilterTodo(filteredTodos);

    }, [setFilterTodo, todoItems, todoStatus]);


    const onFilterByType = useCallback((todoStatus : TODO_STATUS)=>{
        setTodoStatus(todoStatus);
        if(todoStatus === TODO_STATUS.ACTIVE)
            setFilterTodo(todoItems.filter(item=>item.isActive));
        else if(todoStatus === TODO_STATUS.COMPLETED)
            setFilterTodo(todoItems.filter(item=>!item.isActive));
        else
            setFilterTodo(todoItems);
    },[todoItems])

    useEffect(()=>{
        setFilterTodo(todoItems);
        onFilterByType(todoStatus);

        if(!firstRender)
            localStorage.setItem('todo-items',JSON.stringify(todoItems))
          
    },[todoItems,onFilterByType,todoStatus])


    useEffect(()=>{
        const localStorageItems = localStorage.getItem('todo-items');
        if(localStorageItems)
            setTodoItems(JSON.parse(localStorageItems))
           
        firstRender = false;
    },[])


    return(
        <Fragment>
            <div>
                <h2 className="text-center">TODO APP</h2>
                <div className="row">
                    <SearchTodo 
                        setShowAddTodo={setOpenModal}
                        onSearchHandler={onSearchHandler}
                    />
                </div>
                <hr/>
                <div className="row mt-3 ">
                    <TodoList 
                        items={filterTodo} 
                        onDeleteTodo={onDeleteTodo}
                        onCompeletTodo={onCompeletTodo}
                    />
                </div>
                <div>
                    <TodoFotter onActionHandler={onFilterByType} todoStatus={todoStatus}/>
                </div>
            
            </div>
            {openModal &&   
                <Modal
                    actionName="Add Todo"
                    className="addTodoModal"
                    child={
                        <AddTodo 
                            ref={btnRef} 
                            onAddTodo={onAddTodo} 
                            itemCount={todoItems.length}
                            setOpenModal={setOpenModal}
                        />
                    }
                    onAction={onAddAction}
                    onCancel={()=>setOpenModal(false)}
                    title="Add Todo"
                    height="380px"
                    noSecondaryAction={true}
                />
            }
            
        </Fragment>
       
    )
}
export default memo(Todo);