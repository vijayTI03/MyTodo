import {fireEvent, render,screen} from '@testing-library/react';
import SearchTodo from '../../Todo/SearchTodo';

const searchMockFn = jest.fn();
const setShowAddTodo = jest.fn();

const props = {
    onSearchHandler : searchMockFn,
    setShowAddTodo : setShowAddTodo
}

test('Should render the component',()=>{
    render(
        <SearchTodo
           {...props}
        />
    )

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
})

test('should render the search input field and placeholder',()=>{
    render(
        <SearchTodo
           {...props}
        />
    )
    const inputElement = screen.getByPlaceholderText('Search Items');
    expect(inputElement).toBeInTheDocument();
})

test('should render the add button',()=>{
    render(
        <SearchTodo
           {...props}
        />
    )
    const addBtnElement = screen.getByRole('button');
    expect(addBtnElement).toBeInTheDocument();
})

test('should able to click on add btn',()=>{
    render(
        <SearchTodo
           {...props}
        />
    )
    const addBtnElement = screen.getByRole('button');
    fireEvent.click(addBtnElement);
    expect(setShowAddTodo).toBeCalled();
})
