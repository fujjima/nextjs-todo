"use client";

// import Image from "next/image";
import { TextField, Button, List, ListItem, Box, ListItemText } from '@mui/material';
import { Todo } from '@/app/types/Todo';
import EditTodo from './components/EditTodo'
import { useState } from "react";

// NOTE: 参考
// https://reservoir.design/react-typescript-todo-app-01/

// NOTE: ルーティング参考
// https://zenn.dev/mybest_dev/articles/c0570e67978673

// NOTE: ディレクトリ設計思想
// https://zenn.dev/mybest_dev/articles/c0570e67978673

// TODO: 型定義の分離

// NOTE: ルーティング参考
// https://zenn.dev/mybest_dev/articles/c0570e67978673

// NOTE: ディレクトリ設計思想
// https://zenn.dev/mybest_dev/articles/c0570e67978673

// NOTE: 実装参考
// https://zenn.dev/kentaroito/articles/24d9c7eb2afcce
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingId, setEditingId] = useState<number | null>(null);

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

  const handleEditStart = (id: number) => {
    setEditingId(id);
  };

  const handleEditSave = (id: number, updatedTitle: string, updatedText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: updatedTitle, text: updatedText } : todo
      )
    );
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

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
            editingId === todo.id ? (
              <EditTodo key={todo.id} todo={todo} onSave={handleEditSave} onCancel={handleEditCancel} />
            ) : (
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
                  color="primary"
                  onClick={() => handleEditStart(todo.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </ListItem>
            )
          ))}
        </List>
      </Box>
    </div>
  )
}
