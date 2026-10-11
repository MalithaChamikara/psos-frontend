import {
  AppBar, Box, Button, Chip, Container, IconButton, Toolbar, Tooltip, Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const customerLinks = [
  { to: "/products", label: "Products" },
  { to: "/orders", label: "My orders" },
];
const adminLinks = [{ to: "/admin", label: "Orders & stock" }];

export default function AppLayout() {
  const session = useAuthStore((s) => s.session);
  const signOut = useAuthStore((s) => s.signOut);

  if (!session) return null; 

  const links = session.role === "Administrator" ? adminLinks : customerLinks;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 1, flexWrap: "wrap" }}>
          <StorefrontIcon sx={{ mr: 0.5 }} />
          <Typography variant="h6" sx={{ mr: 2, fontWeight: 700 }}>
            PSOS
          </Typography>

          <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
            {links.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                color="inherit"
                sx={{ "&.active": { bgcolor: "rgba(255,255,255,0.2)" } }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <Chip
            label={`${session.username} · ${session.role}`}
            size="small"
            sx={{
              color: "inherit",
              bgcolor: "rgba(255,255,255,0.15)",
              display: { xs: "none", sm: "flex" },
            }}
          />
          <Tooltip title="Sign out">
            <IconButton color="inherit" onClick={signOut} aria-label="Sign out">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Outlet />
      </Container>
    </Box>
  );
}