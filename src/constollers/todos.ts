import { RequestHandler } from 'express';
import { Todo } from '../models/todos';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({message: 'Create the todo.', createTodo: newTodo});
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({todos: TODOS});
};

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const id = req.params.id;
    const updateText = (req.body as {text: string}).text;

    const index = TODOS.findIndex(todo => todo.id === id);
    if (index < 0) {
        throw new Error("Could not find todo!");
    }

    TODOS[index] = new Todo(TODOS[index].id,  updateText);

    res.json({
        message: "Update!", updatedTodo : TODOS[index] 
    });
};

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const id = req.params.id;
    const index = TODOS.findIndex(todo => todo.id === id);
    if (index < 0) {
        throw new Error("Could not find todo!");
    }

    TODOS.splice(index, 1);

    res.json({ message: "Todo delted!!" });
};