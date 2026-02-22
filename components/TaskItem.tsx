"use client";

import React, { useRef, useEffect, useCallback } from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useAppDispatch } from "@/store/hooks";
import { toggleTask, deleteTask, Task } from "@/store/tasksSlice";
import { DraggableProvided } from "@hello-pangea/dnd";

interface TaskItemProps {
  task: Task;
  provided: DraggableProvided;
}

export default function TaskItem({ task, provided }: TaskItemProps) {
  const dispatch = useAppDispatch();
  const paperRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paperRef.current) {
      provided.innerRef(paperRef.current);
    }
    return () => {
      provided.innerRef(null);
    };
  }, [provided]);

  useEffect(() => {
    const handle = dragHandleRef.current;
    if (handle && provided.dragHandleProps) {
      const { onDragStart, ...rest } = provided.dragHandleProps;
      Object.entries(rest).forEach(([key, value]) => {
        if (typeof value === "string") {
          handle.setAttribute(key, value);
        }
      });
      if (onDragStart) {
        handle.addEventListener("dragstart", onDragStart as unknown as EventListener);
      }
      return () => {
        if (onDragStart) {
          handle.removeEventListener("dragstart", onDragStart as unknown as EventListener);
        }
      };
    }
  }, [provided.dragHandleProps]);

  const getDraggableProps = useCallback(() => {
    const { style, ...rest } = provided.draggableProps;
    return { style, ...rest };
  }, [provided.draggableProps]);

  return (
    <Paper
      ref={paperRef}
      {...getDraggableProps()}
      elevation={1}
      sx={{
        mb: 1,
        transition: "box-shadow 0.2s, background-color 0.2s",
        backgroundColor: task.completed ? "action.hover" : "background.paper",
        "&:hover": {
          elevation: 4,
          boxShadow: 3,
        },
      }}
    >
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="حذف"
            onClick={() => dispatch(deleteTask(task.id))}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
        sx={{ px: 1 }}
      >
        <Box
          ref={dragHandleRef}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "grab",
            ml: 1,
            color: "text.secondary",
          }}
        >
          <DragIndicatorIcon />
        </Box>
        <Checkbox
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
          color="success"
        />
        <ListItemText
          primary={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "text.secondary" : "text.primary",
                }}
              >
                {task.title}
              </Typography>
              <Chip
                label={task.completed ? "انجام شده" : "فعال"}
                size="small"
                color={task.completed ? "success" : "primary"}
                variant="outlined"
              />
            </Box>
          }
          secondary={
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.description}
            </Typography>
          }
        />
      </ListItem>
    </Paper>
  );
}

