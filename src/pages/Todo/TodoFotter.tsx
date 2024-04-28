import { FC, useEffect, useState } from "react";
import { filterType } from "../../dummy-data/dummyData";
import { TODO_STATUS } from "../../types/enum";

interface ITodoFotter{
    onActionHandler : (type : TODO_STATUS)=>void
    todoStatus : TODO_STATUS
}

const TodoFotter : FC<ITodoFotter> = (props)=>{

    const {onActionHandler,todoStatus} = props;

    const [selectedItem,setSelectedItem] = useState<number>(0);

    const onFilterTodoHandler = (id : number,type : TODO_STATUS)=>{
        setSelectedItem(id);
        onActionHandler(type)
    }

    useEffect(()=>{
        setSelectedItem(filterType.find(item=>item.type === todoStatus)?.id || 0);
    },[todoStatus])

    return(
        <div className="d-flex justify-content-center">
            {filterType.map(item=>(
                <div key={item.id} 
                    className={` ${selectedItem === item.id ? 'active' : 'fotterItem'} me-3 cursor-pointer`}
                    data-testid={`fotter-itemId-${item.id}`}          
                >
                    <p  onClick={()=>onFilterTodoHandler(item.id,item.type)}>{item.title}</p>
                </div>
            ))}
        </div>
    )
}
export default TodoFotter