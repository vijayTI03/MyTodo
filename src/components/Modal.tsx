import { FC, ReactNode } from "react";
import Button from "./Button";
import { Color } from "../types/enum";

interface IModal{
    title : string
    child : ReactNode
    actionName : string
    onAction : ()=>void
    onCancel : ()=>void
    className? : string
    height? : string
    width? : string
    noSecondaryAction? : boolean
    secondaryBtnLabel? : string
}

const Modal : FC<IModal> = (props)=>{

    const {child,actionName,onAction,onCancel,title,width,height,noSecondaryAction,secondaryBtnLabel} = props;

    return(
        <div className="modal-overlay">
            <div data-testid='modal-div' className="modal" style={{width : width || '', height : height || ''}}>
                <div className="d-flex justify-content-between">
                    <h4>{title}</h4>
                    <Button
                        color={Color.SECONDARY}
                        label=""
                        className="btn-close"
                        onClick={onCancel}
                    />
                </div>
                <div className="mt-2">
                    {child}
                </div>
                <div className="mt-4 modal-footer">
                    <Button
                        color={Color.PRIMARY}
                        label={actionName}
                        onClick={onAction}
                    />
                    {!noSecondaryAction && 
                        <Button
                            color={Color.DANGER}
                            label={secondaryBtnLabel || 'Close'}
                            onClick={onCancel}
                        />
                    }
                   
                </div>
            </div>
      </div>
    )
}
export default Modal