
import {screen,render, fireEvent, waitFor} from '@testing-library/react';
import TodoList from '../../Todo/TodoList';

const onCompMockFn = jest.fn();
const onDeleteMockFn = jest.fn();

const props = {
    items:[],
    onCompeletTodo:onCompMockFn,
    onDeleteTodo:onDeleteMockFn
}

test('should render the component',()=>{
    render(
        <TodoList
            {...props}
        />
    )

    const listElement = screen.getByText(/no items/i);
    expect(listElement).toBeInTheDocument();
})

test('should render empty message if no item is present',()=>{
    render(
        <TodoList
            {...props}
        />
    )

    const listElement = screen.getByText(/no items/i);
    expect(listElement).toBeInTheDocument();
})

test('should render items',()=>{
    const items = [{
        id : 1,
        title : 'test',
        description : 'description',
        isActive : true
    }]
    render(
        <TodoList
            {...props}
            items={items}
        />
    )

    const listElement = screen.getByText(items[0].title);
    expect(listElement).toBeInTheDocument();
})

test('should render title and description',()=>{
    const items = [{
        id : 1,
        title : 'test',
        description : 'description',
        isActive : true
    }]
    render(
        <TodoList
            {...props}
            items={items}
        />
    )

    items.forEach(item=>{
        const title  = screen.getByText(item.title);
        expect(title).toBeInTheDocument();
        const description = screen.getByText(item.description);
        expect(description).toBeInTheDocument();
    })
   
})

test('should render check box',()=>{
    const items = [{
        id : 1,
        title : 'test',
        description : 'description',
        isActive : true
    }]
    render(
        <TodoList
            {...props}
            items={items}
        />
    )

    const checkboxElement  = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();

})

test('should able to complete todo',()=>{
    const items = [{
        id : 1,
        title : 'test',
        description : 'description',
        isActive : true
    }]
    render(
        <TodoList
            {...props}
            items={items}
        />
    )

    items.forEach(async(item)=>{
        const checkboxElement  = screen.getByTestId(`todo-checkbox-${item.id}`);
        fireEvent.click(checkboxElement);
        expect(onCompMockFn).toHaveBeenCalled();
        expect(onCompMockFn).toHaveBeenCalledWith(item.id, true);

        const listElement = screen.getByRole('listitem');
        await waitFor(()=>{
            expect(listElement).toHaveClass('completeTodo')
        })
       


    })
 
})


test('should able to open delete confirmation box',async()=>{
    const items = [{
        id : 1,
        title : 'test',
        description : 'description',
        isActive : true
    }]
    render(
        <TodoList
            {...props}
            items={items}
        />
    )
    const trashIcon  = screen.getByTestId(`delete-icon-${items[0].id}`);
    expect(trashIcon).toBeInTheDocument();
    fireEvent.click(trashIcon);
    await waitFor(()=>{
        const alertMsg = screen.getByText(/are you sure you want to delete./i)
        expect(alertMsg).toBeInTheDocument();
    })

})

test('should able to delete todo',async()=>{
    const items = [{
        id : 1,
        title : 'test',
        description : 'description',
        isActive : true
    }]
    render(
        <TodoList
            {...props}
            items={items}
        />
    )
    const trashIcon  = screen.getByTestId(`delete-icon-${items[0].id}`);
    expect(trashIcon).toBeInTheDocument();
    fireEvent.click(trashIcon);
    let btnElement = null;
    await waitFor(()=>{
        btnElement = screen.getByRole('button',{name : /yes/i})
        expect(btnElement).toBeInTheDocument();
    })
    if(btnElement){
        fireEvent.click(btnElement);
    }
    expect(onDeleteMockFn).toBeCalled();
    expect(onDeleteMockFn).toBeCalledWith(items[0].id);

})

test('should able to close alert modal',async()=>{
    const items = [{
        id : 1,
        title : 'test',
        description : 'description',
        isActive : true
    }]
    render(
        <TodoList
            {...props}
            items={items}
        />
    )
    const trashIcon  = screen.getByTestId(`delete-icon-${items[0].id}`);
    expect(trashIcon).toBeInTheDocument();
    fireEvent.click(trashIcon);

    const alertMsg = screen.getByText(/are you sure you want to delete./i)
    expect(alertMsg).toBeInTheDocument();

    let btnElement = null;
    await waitFor(()=>{
        btnElement = screen.getByRole('button',{name : /close/i})
        expect(btnElement).toBeInTheDocument();
    })
    if(btnElement){
        fireEvent.click(btnElement);
    }

   expect(alertMsg).not.toBeInTheDocument();

})