import { Dispatch, FC, SetStateAction,memo } from "react";
import Button from "../../components/Button";
import { Color } from "../../types/enum";
import CustomInput from "../../components/form-items/CustomInput";


interface ISearchTodo{
    setShowAddTodo : Dispatch<SetStateAction<boolean>>
    onSearchHandler : (search : string)=>void
}

const SearchTodo : FC<ISearchTodo> = (props)=>{

    const {setShowAddTodo,onSearchHandler} = props;

    const onAddTodo = ()=>{
        setShowAddTodo(true)
    }

    return(
        <div className='search-container'>
            <div className="d-flex content-justify-between">
                <CustomInput
                    type="text"
                    onChange={onSearchHandler}
                    className="search-input"
                    placeholder="Search Items"
                />
                <Button
                    color={Color.SUCCESS}
                    icon={ <i className="fa fa-plus"></i>}
                    label=""
                    onClick={onAddTodo}
                    className="circle-button ms-3"
                />
            </div>
        </div>
    )
}
export default memo(SearchTodo);  