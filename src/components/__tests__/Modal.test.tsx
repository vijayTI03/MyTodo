

import { fireEvent, render,screen,} from "@testing-library/react";
import Modal from "../Modal";

const mockFn = jest.fn();
const cancelMockFn = jest.fn();

const props = {
    child : <h2>Test</h2>,
    onAction:mockFn,
    onCancel:cancelMockFn,
    title: 'Modal',
    actionName : 'Add'
}

test('should render Modal',()=>{
    render(
        <Modal {...props} />
    )  
    const modalElement = screen.getByText('Test');
    expect(modalElement).toBeInTheDocument();
})

test('should render the title',()=>{
    render(
        <Modal {...props} />
    )  
    const titleElement = screen.getByText(props.title);
    expect(titleElement).toBeInTheDocument();
})

test('should render the child',()=>{
    render(
        <Modal {...props} />
    )  
    const childElement = screen.getByRole('heading',{name : 'Test'});
    expect(childElement).toBeInTheDocument();
})

test('should render the action button',()=>{
    render(
        <Modal {...props} />
    )  
    const actionBtn = screen.getByRole('button',{name : 'Add'});
    expect(actionBtn).toBeInTheDocument();
})

test('should able to click action btn',()=>{
    render(
        <Modal {...props} />
    )  
    const actionBtn = screen.getByRole('button',{name : 'Add'});
    fireEvent.click(actionBtn);
    expect(mockFn).toBeCalled();
})

test('should able to set height and width',()=>{
    const height = '100px';
    const width = '100px';
    render(
        <Modal {...props} height={height} width={width}/>
    )  
    const modalElement = screen.getByTestId('modal-div');
    expect(modalElement).toHaveStyle(`width: ${width}`);
    expect(modalElement).toHaveStyle(`height: ${height}`);
})

test('should able to render secondary action',()=>{
    const btnLabel = 'Cancel'
    render(
        <Modal {...props} secondaryBtnLabel={btnLabel}/>
    )  
    const modalElement = screen.getByRole('button',{name : btnLabel});
    expect(modalElement).toBeInTheDocument();
})

test('should not render secondary action',()=>{
    const btnLabel = 'Cancel'
    render(
        <Modal {...props} secondaryBtnLabel={btnLabel} noSecondaryAction={true}/>
    )  
    const modalElement = screen.queryByRole('button',{name : btnLabel});
    expect(modalElement).not.toBeInTheDocument();
})


