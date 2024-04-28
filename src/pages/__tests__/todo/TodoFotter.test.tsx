import { fireEvent, render,screen } from '@testing-library/react';
import TodoFotter from '../../Todo/TodoFotter';
import { TODO_STATUS } from '../../../types/enum';
import { filterType } from '../../../dummy-data/dummyData';

const mockFn = jest.fn();
const props = {
    onActionHandler : mockFn,
    todoStatus : TODO_STATUS.ALL
}

test('Should render the component',()=>{
    render(
        <TodoFotter
           {...props}
        />
    )
    const fotterElement = screen.getByText(/all/i);
    expect(fotterElement).toBeInTheDocument();
})

test('Should render all items',()=>{
    render(
        <TodoFotter
           {...props}
        />
    )
    filterType.forEach(item=>{
        const fotterElement = screen.getByText(item.title);
        expect(fotterElement).toBeInTheDocument();
    })
    
})

test('Should able to chnage status',()=>{
    render(
        <TodoFotter
           {...props}
        />
    )
    const activeElement = screen.getByText(/active/i);
    fireEvent.click(activeElement);
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(TODO_STATUS.ACTIVE);
})


test('Should able to set active class',()=>{
    render(
        <TodoFotter
           {...props}
        />
    )
    const activeElement = screen.getByText(/active/i);
    fireEvent.click(activeElement);
    const divElement = screen.getByTestId('fotter-itemId-2');
    expect(divElement).toHaveClass('active')
    
})



