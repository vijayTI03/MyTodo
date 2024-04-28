import { FC, ReactNode } from "react";
import { Color } from "../types/enum";

interface IButton{
    label : string
    color : Color
    onClick : ()=>void
    className? : string
    icon? : ReactNode
}

const Button : FC<IButton> = (props)=>{

    const {color,className,onClick,label,icon} = props;

    return(
        <button 
            className={`btn btn-${color} ${className}`} 
            onClick={onClick}
        >
            {icon && icon}{label}    
        </button>
    )
}
export default Button