"use client";

// import Image from "next/image";
import { TextField, Button, List, ListItem } from '@mui/material';
import { useState } from "react";

// NOTE: 参考
// https://reservoir.design/react-typescript-todo-app-01/

type Todo = {
  id: number
  text: string
}

// NOTE: 実装参考
// https://zenn.dev/kentaroito/articles/24d9c7eb2afcce
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    if (!inputValue) return
    const newTodo: Todo = {
      id: new Date().getTime(),
      text: inputValue,
    }
    setTodos([...todos, newTodo])
    setInputValue('')
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <h1>Todo App</h1>
      <TextField label="TODOを追加" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Button onClick={handleAddTodo}>Add Todo</Button>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </ListItem>
        ))}
      </List>
    </div>
  )
}