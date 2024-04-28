

import { fireEvent, render, screen } from '@testing-library/react';
import CustomTextArea from '../../form-items/CustomTextArea';
 
const mockFn = jest.fn();

const props = {
    height : '100px',
    width : '100px'
}

test('Should render the text area component',()=>{
    render(
        <CustomTextArea
            {...props}

        />
    )
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
})


test('Should able to set height and width',()=>{
    render(
        <CustomTextArea
            {...props}
        />
    )
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveStyle({width : `${props.width}`});
    expect(inputElement).toHaveStyle({height : `${props.height}`});
})


test('Should able to set class',()=>{
    const className = 'testClass'
    render(
        <CustomTextArea
            {...props}
            className={className}
        />
    )
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass(className);
})

test('Should able to call event',()=>{
    const inputValue = 'test value'
    render(
        <CustomTextArea
            {...props}
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
        <CustomTextArea
            {...props}
            onChange={mockFn}
            placeholder={placeholder}
        />
    )
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument()
})



