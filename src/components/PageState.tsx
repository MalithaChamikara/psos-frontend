import type { ReactNode } from "react";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import type { apiError } from "../api/apiError";

interface Props {
  isLoading: boolean;
  error: apiError | null;
  isEmpty: boolean;
  emptyMessage: string;
  onRetry: () => void;
  children: ReactNode;
}

export default function PageState({
  isLoading,
  error,
  isEmpty,
  emptyMessage,
  onRetry,
  children,
}: Props) {
  if (isLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", py: 8 }} role="status" aria-label="Loading">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={onRetry}>
            Retry
          </Button>
        }
      >
        {error.message}
      </Alert>
    );
  }

  if (isEmpty) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: "center", py: 6 }}>
        {emptyMessage}
      </Typography>
    );
  }

  return <>{children}</>;
}