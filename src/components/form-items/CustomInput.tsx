import { FC } from "react";

interface ICustomInput{
    className? : string
    placeholder? : string
    type : string
    onChange? : (value : string)=>void
}

const CustomInput : FC<ICustomInput> = (props)=>{

    const {type,className,placeholder,onChange} = props;

    return(
        <input
            type={type}
            className={`form-control ${className || ''}`}
            placeholder={placeholder || ''}
            onChange={onChange ? (e)=>onChange(type === ('text' || 'email') ? e.target.value.trim() : e.target.value) : (()=>{})}
        />
    )
}
export default CustomInput