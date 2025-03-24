"use client";

import CircularProgress from "@mui/material/CircularProgress";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <CircularProgress size={60} thickness={4} color="primary" />
    </div>
  );
}
