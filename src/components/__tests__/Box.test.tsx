
import { render, screen } from '@testing-library/react';
import Box from '../Box';
 
const props  = {
    child: <h2>Home</h2>,
    height:'20px', 
    width:'20px',
    className:'test'
}

test('Should component render',()=>{
    render(
        <Box {...props}/>
    )

    const header = screen.getByText('Home');
    expect(header).toBeInTheDocument();
})

test('Should child render',()=>{
    render(
        <Box {...props}/>
    )

    const header = screen.getByRole('heading',{name : 'Home'});
    expect(header).toBeInTheDocument();
})

test('Should load height and width',()=>{
    render(
        <Box {...props}/>
    )
    const boxElement = screen.getByTestId('box-component');
    expect(boxElement).toHaveStyle(`width: ${props.width}`);
    expect(boxElement).toHaveStyle(`height: ${props.height}`);
})

test('applies optional className when provided',()=>{
    render(
        <Box {...props}/>
    )
    const boxElement = screen.getByTestId('box-component');
    expect(boxElement).toHaveClass(props.className);
})


