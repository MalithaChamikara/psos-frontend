import { Alert, AlertTitle, Box, Dialog, DialogContent, Typography } from "@mui/material";
import type { apiError } from "../api/apiError";

interface Props {
  error: apiError;
  onClose: () => void;
}

export default function StockErrorAlert({ error, onClose }: Props) {
  const isStock = error.isInsufficientStock;

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 0 }}>
        <Alert severity={isStock ? "warning" : "error"} onClose={onClose} role="alert">
          <AlertTitle>{isStock ? "Not enough stock" : "Order failed"}</AlertTitle>

          {isStock && error.shortages.length > 0 ? (
            <>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Your order was not placed since the a item stock was changed.
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 3 }}>
                {error.shortages.map((s) => (
                  <li key={s.productId}>
                    <strong>{s.productName}</strong>: you asked for {s.requested},{" "}
                    {s.available === 0 ? "none are available" : `only ${s.available} available`}.
                  </li>
                ))}
              </Box>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Please Try again later.
              </Typography>
            </>
            
          ) : (
            error.message
          )}
        </Alert>
      </DialogContent>
    </Dialog>
  );
}