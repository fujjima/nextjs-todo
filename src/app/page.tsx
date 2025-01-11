"use client";

// import Image from "next/image";
import { TextField, Button, List, ListItem, Box, ListItemText } from '@mui/material';
import { useState } from "react";

// NOTE: 参考
// https://reservoir.design/react-typescript-todo-app-01/

// TODO: 型定義の分離
type Todo = {
  id: number
  title: string
  text?: string
}

// NOTE: 実装参考
// https://zenn.dev/kentaroito/articles/24d9c7eb2afcce
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const handleAddTodo = () => {
    const trimed_title: string = title.trim()
    if (!trimed_title) return

    const newTodo: Todo = {
      id: new Date().getTime(),
      title: trimed_title,
      text: text.trim(),

    }
    setTodos([...todos, newTodo])
    setTitle('')
    setText('')
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <h1>Todo App</h1>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 800,
          margin: 'auto',
        }}
      >

        <TextField
          label="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="詳細"
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
        />
        <Button onClick={handleAddTodo}>Add Todo</Button>


        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2, // テキストとボタンの間隔を調整
              }}>
              <ListItemText
                primary={todo.title}
                sx={{ flexGrow: 1 }}
                secondary={todo.text ? todo.text : 'No additional details'}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </Button>
              {/* <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button> */}
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  )
}