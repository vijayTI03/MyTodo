
import {screen,render, fireEvent} from '@testing-library/react';
import AddTodo from '../../../Todo/add-todo/AddTodo';

const addTodoMockFn = jest.fn();
const setOpenMockFn = jest.fn();

const props = {
    itemCount: 1,
    onAddTodo: addTodoMockFn,
    setOpenModal:setOpenMockFn
}

test('Should render component',()=>{
    render(
        <AddTodo
            {...props}
        />
    )
    const titleLabel = screen.getByText('Title')
    expect(titleLabel).toBeInTheDocument();
})

test('updates input fields with entered values', () => {
    render(
        <AddTodo
            {...props}
        />
    );
  
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    expect(titleInput).toHaveValue('Test Title');
  
    const descriptionInput = screen.getByPlaceholderText('Please enter description');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    expect(descriptionInput).toHaveValue('Test Description');
});

test('calls onAddTodo function on form submission', () => {
    render(
        <AddTodo
            {...props}
        />
    );
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });

    const descriptionInput = screen.getByPlaceholderText('Please enter description');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    // eslint-disable-next-line testing-library/no-node-access
    const formElement = titleInput.closest('form'); // Assuming titleInput is within the form
    if(formElement){
        fireEvent.submit(formElement);
    }
    
    expect(addTodoMockFn).toHaveBeenCalledWith({
        id: 2, // Assuming itemCount is initially 0
        title: 'Test Title',
        description: 'Test Description',
        isActive: true // Assuming it's always true for new todos
    });
    expect(setOpenMockFn).toHaveBeenCalledWith(false);
});

test('displays error message for empty title on form submission', () => {
    render(
        <AddTodo
            {...props}
        />
    );
  
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: '' } });
    // eslint-disable-next-line testing-library/no-node-access
    const formElement = titleInput.closest('form'); // Assuming titleInput is within the form
    if(formElement){
        fireEvent.submit(formElement);
    }

    const errorElement = screen.getByText("Title can't be empty");
    expect(errorElement).toBeInTheDocument();
});

test('forwards ref to the button element', () => {
    const ref = { current: document.createElement('button') };
    render(
        <AddTodo
            onAddTodo={() => {}}
            itemCount={0}
            setOpenModal={() => {}}
            ref={ref}
        />
    );
    expect(ref.current.tagName).toBe('BUTTON')
   
});

