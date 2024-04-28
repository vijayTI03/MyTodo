import { FC } from "react";

interface ICustomTextArea{
    className? : string
    placeholder? : string
    width : string
    height : string
    onChange? : (value : string)=>void
}

const CustomTextArea : FC<ICustomTextArea> = (props)=>{

    const {className,placeholder,width,height,onChange} = props;

    return(
        <textarea
            className={`form-control ${className || ''}`}
            placeholder={placeholder || ''}
            style={{width : width, height : height}}
            onChange={onChange ? (e)=>onChange(e.target.value.trim()) : (()=>{})}
        />
    )
}
export default CustomTextArea