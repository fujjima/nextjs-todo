"use client";

import { useState } from "react";
import { Todo } from "@/app/types/Todo";
import { TextField, Button, ListItem } from '@mui/material';


type EditTodoProps = {
  todo: Todo;
  onSave: (id: number, updatedTitle: string, updatedText: string) => void;
  onCancel: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo, onSave, onCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const [text, setText] = useState(todo.text || '');

  const handleSave = () => {
    onSave(todo.id, title, text);
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <TextField
        label="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        sx={{ flexGrow: 1 }}
      />
      <TextField
        label="詳細"
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="outlined"
        multiline
        rows={2}
        sx={{ flexGrow: 1 }}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="outlined" color="error" onClick={onCancel}>
        Cancel
      </Button>
    </ListItem>
  )
};

export default EditTodo;
