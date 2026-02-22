"use client";

import React from "react";
import { List, Typography, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { reorderTasks } from "@/store/tasksSlice";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const filter = useAppSelector((state) => state.tasks.filter);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // Map filtered indices back to original indices
    const sourceTask = filteredTasks[result.source.index];
    const destinationTask = filteredTasks[result.destination.index];

    const sourceIndex = tasks.findIndex((t) => t.id === sourceTask.id);
    const destinationIndex = tasks.findIndex((t) => t.id === destinationTask.id);

    if (sourceIndex !== -1 && destinationIndex !== -1) {
      dispatch(reorderTasks({ sourceIndex, destinationIndex }));
    }
  };

  if (filteredTasks.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          color: "text.secondary",
        }}
      >
        <AssignmentIcon sx={{ fontSize: 64, mb: 2, opacity: 0.4 }} />
        <Typography variant="h6" color="text.secondary">
          وظیفه‌ای یافت نشد
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {filter === "all"
            ? "یک وظیفه جدید اضافه کنید!"
            : filter === "completed"
            ? "هنوز وظیفه انجام شده‌ای وجود ندارد."
            : "هنوز وظیفه فعالی وجود ندارد."}
        </Typography>
      </Box>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ p: 0 }}
          >
            {filteredTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => <TaskItem task={task} provided={provided} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

