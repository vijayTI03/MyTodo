

import { fireEvent, render, screen } from '@testing-library/react';
import CustomInput from '../../form-items/CustomInput';
 
const mockFn = jest.fn();

test('Should render the Custom Input component',()=>{
    render(
        <CustomInput
            type='text'
        />
    )
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();

})

test('Should able to chage type',()=>{
    render(
        <CustomInput
            type='number'
        />
    )
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toBeInTheDocument();
})

test('Should able to set class',()=>{
    const className = 'testClass'
    render(
        <CustomInput
            type='text'
            className={className}
        />
    )
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass(className);
})

test('Should able to call event',()=>{
    const inputValue = 'test value'
    render(
        <CustomInput
            type='text'
            onChange={mockFn}
        />
    )
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: inputValue } });
    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledWith(inputValue)
})

test('Should able to set placeholder',()=>{
    const placeholder = 'please enter'
    render(
        <CustomInput
            type='text'
            onChange={mockFn}
            placeholder={placeholder}
        />
    )
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument()
})



