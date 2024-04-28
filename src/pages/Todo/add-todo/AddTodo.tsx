import { Dispatch, Fragment, SetStateAction, forwardRef, useState,memo } from "react";
import CustomInput from "../../../components/form-items/CustomInput";
import CustomTextArea from "../../../components/form-items/CustomTextArea";
import { TodoInfo, TodoType } from "../../../types/type";

interface IAddTodo{
    onAddTodo : (item : TodoType)=>void
    itemCount : number
    setOpenModal : Dispatch<SetStateAction<boolean>>
}

const AddTodo = forwardRef((props: IAddTodo,ref : any)=>{

    const {onAddTodo,itemCount,setOpenModal} = props

    const [error,setError] = useState<{titleError? : string}>({});
    const [todoData,setTodoData] = useState<TodoInfo>({
        description : '',
        title : ''
    });

    const onSubmitHandler = (evet : any)=>{
        evet.preventDefault();
        let todoObj : TodoType = {
            id : itemCount + 1, 
            description : todoData.description,
            isActive : true,
            title : todoData.title
        }
        if(todoData.title === ''){
            setError((prev)=>({...prev,titleError : "Title can't be empty"}))
        }
        else{
            if(error?.titleError){
                delete error.titleError;
                setError(error);
            }
            onAddTodo(todoObj);
            setOpenModal(false);
        }
       
    }

    return(
        <Fragment>
            <form onSubmit={onSubmitHandler}>
                <div className="mt-2">
                    <label>Title</label>
                    <CustomInput
                        type="text"
                        placeholder="Title"
                        onChange={(value)=>setTodoData((prev)=>({...prev,title : value}))}
                    />
                    { error.titleError && <p className="text-danger">{error.titleError}</p>}
                </div>
                <div className="mt-2">
                    <label>Description</label>
                    <CustomTextArea
                        height="80px"
                        width="410px"
                        placeholder="Please enter description"
                        onChange={(value)=>setTodoData((prev)=>({...prev,description : value}))}
                    />
                </div>
                <button ref={ref} style={{display : 'none'}} type="submit"></button>
            </form>
        </Fragment>
    )
})
export default memo(AddTodo);