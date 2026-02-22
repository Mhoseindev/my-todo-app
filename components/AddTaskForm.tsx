"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "@/store/hooks";
import { addTask } from "@/store/tasksSlice";

export default function AddTaskForm() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = "عنوان الزامی است";
    }
    if (!description.trim()) {
      newErrors.description = "توضیحات الزامی است";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(addTask(title.trim(), description.trim()));
    setTitle("");
    setDescription("");
    setErrors({});
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        افزودن وظیفه جدید
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="عنوان وظیفه"
          variant="outlined"
          size="small"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          error={!!errors.title}
          helperText={errors.title}
          fullWidth
        />
        <TextField
          label="توضیحات وظیفه"
          variant="outlined"
          size="small"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
          }}
          error={!!errors.description}
          helperText={errors.description}
          multiline
          rows={2}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ alignSelf: "flex-start" }}
        >
          افزودن وظیفه
        </Button>
      </Box>
    </Paper>
  );
}

