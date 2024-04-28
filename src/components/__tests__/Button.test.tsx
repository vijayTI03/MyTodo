
import {fireEvent, render,screen,} from "@testing-library/react";
import Button from "../Button";
import { Color } from "../../types/enum";

const mockFn = jest.fn();
const props = {
    color : Color.PRIMARY,
    label:"Add",
    onClick:mockFn,
    className:"class",
}

test('Should button component render',()=>{
    render(
        <Button {...props}/>
    )
    const buttonElement = screen.getByRole('button',{name : /add/i});
    expect(buttonElement).toBeInTheDocument();
})

test('should render button color',()=>{
    render(
        <Button {...props}/>
    )
    const buttonElement = screen.getByRole('button',{name : /add/i});
    expect(buttonElement).toHaveClass(`btn btn-${props.color}`);
})

test('should able to click',()=>{
    render(
        <Button {...props}/>
    )
    const buttonElement = screen.getByRole('button',{name : /add/i});
    fireEvent.click(buttonElement);
    expect(mockFn).toBeCalled();
})

test('should able to set class',()=>{
    render(
        <Button {...props}/>
    )
    const buttonElement = screen.getByRole('button',{name : /add/i});
    expect(buttonElement).toHaveClass(props.className);
})

test('should able to set label',()=>{
    render(
        <Button {...props} label="Add Todo"/>
    )
    const buttonElement = screen.getByRole('button',{name : /add/i});
    expect(buttonElement).toHaveTextContent(/add todo/i);
})