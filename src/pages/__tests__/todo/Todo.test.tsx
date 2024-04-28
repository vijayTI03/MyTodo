
import {screen,render, fireEvent, waitFor} from '@testing-library/react';
import Todo from '../../Todo/Todo';

test('should render the component',()=>{
    
    render(<Todo/>)
    const titleElement = screen.getByText(/Todo app/i);
    expect(titleElement).toBeInTheDocument();
})

test('should able to add todo', () => {
    render(<Todo />);
    const addButton = screen.getByRole('button');
    fireEvent.click(addButton);

    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });

    const descriptionInput = screen.getByPlaceholderText('Please enter description');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    // eslint-disable-next-line testing-library/no-node-access
    const formElement = titleInput.closest('form'); 
    if(formElement){
        fireEvent.submit(formElement);
    }
    const listElements = screen.getAllByRole('listitem');
    expect(listElements).toHaveLength(2);

});

test('should able to delete todo', async() => {

    render(<Todo />);
    const trashIcon  = screen.getByTestId(`delete-icon-1`);
    fireEvent.click(trashIcon);
    await waitFor(()=>{
        const alertMsg = screen.getByText(/are you sure you want to delete./i)
        expect(alertMsg).toBeInTheDocument();
    })
    let btnElement = null;
    await waitFor(()=>{
        btnElement = screen.getByRole('button',{name : /yes/i})
    })
    if(btnElement){
        fireEvent.click(btnElement);
    }
    const todoItem = screen.queryByText('Test Todo');
    expect(todoItem).not.toBeInTheDocument();
});


test('should able to complete todo', () => {
    render(<Todo />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveClass('activeTodo');

    const todoCheckbox = screen.getByTestId('todo-checkbox-1');
    fireEvent.click(todoCheckbox);

    expect(todoCheckbox).toBeTruthy();
    expect(listItems[0]).toHaveClass('completeTodo');
})


test('should able to search todo item', () => {
    render(<Todo />);
    const searchInput = screen.getByPlaceholderText(/search/i); 
    
    fireEvent.change(searchInput, { target: { value: 'Test' } });
  
    expect(screen.getByText('Test Todo')).toBeInTheDocument(); 
    expect(screen.queryByText('Another Todo')).not.toBeInTheDocument(); 

    fireEvent.change(searchInput, { target: { value: 'not exists' } });
    expect(screen.getByText('No items..')).toBeInTheDocument(); 
});