import { useState, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { homePathBasedOnRole } from "../auth/paths";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
  const session = useAuthStore((s) => s.session);
  const location = useLocation();
  const login = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (session) {
    const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname;
    return <Navigate to={from ?? homePathBasedOnRole(session.role)} replace />;
  }

  const usernameError = submitted && username.trim() === "";
  const passwordError = submitted && password === "";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (username.trim() === "" || password === "") return;
    login.mutate({ username: username.trim(), password });
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="xs" disableGutters>
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <StorefrontIcon color="primary" sx={{ fontSize: 44 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              PSOS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Product Stock &amp; Order System
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "grid", gap: 2 }}>
            {login.isError && (
              <Alert severity="error" role="alert">
                {login.error.message}
              </Alert>
            )}

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
              helperText={usernameError ? "Username is required" : " "}
              autoComplete="username"
              autoFocus
              fullWidth
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError ? "Password is required" : " "}
              autoComplete="current-password"
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={login.isPending}
              startIcon={login.isPending ? <CircularProgress size={18} color="inherit" /> : undefined}
            >
              {login.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}