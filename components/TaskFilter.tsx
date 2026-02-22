"use client";

import React from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilter } from "@/store/tasksSlice";

export default function TaskFilter() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.tasks.filter);

  const handleFilterChange = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: "all" | "completed" | "active" | null
  ) => {
    if (newFilter !== null) {
      dispatch(setFilter(newFilter));
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          فیلتر:
        </Typography>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          size="small"
          color="primary"
        >
          <ToggleButton value="all">همه</ToggleButton>
          <ToggleButton value="active">فعال</ToggleButton>
          <ToggleButton value="completed">انجام شده</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
}

