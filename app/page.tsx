"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Chip,
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AddTaskForm from "@/components/AddTaskForm";
import TaskFilter from "@/components/TaskFilter";
import TaskList from "@/components/TaskList";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "grey.100" }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <ChecklistIcon sx={{ ml: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            مدیریت وظایف
          </Typography>
          <Chip
            label={`${completedCount}/${tasks.length} انجام شده`}
            color="default"
            size="small"
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 600,
            }}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <AddTaskForm />
        <TaskFilter />
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          وظایف
        </Typography>
        <TaskList />
      </Container>
    </Box>
  );
}

