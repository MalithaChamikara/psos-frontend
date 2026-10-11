import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import type { Product } from "../types";
import { formatMoney } from "../utils/format";

interface Props {
  products: Product[];
  quantities: Record<number, number>;
  isPlacing: boolean;
  onPlaceOrder: () => void;
  onClear: () => void;
}

export default function OrderSummary({
  products,
  quantities,
  isPlacing,
  onPlaceOrder,
  onClear,
}: Props) {
  const lines = products
    .filter((p) => (quantities[p.productId] ?? 0) > 0)
    .map((p) => ({ product: p, quantity: quantities[p.productId] }));

  const estimate = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        Your order
      </Typography>

      {lines.length === 0 ? (
        <Typography color="text.secondary" variant="body2">
          Choose a quantity on a product to start an order.
        </Typography>
      ) : (
        <>
          <Box sx={{ display: "grid", gap: 1 }}>
            {lines.map(({ product, quantity }) => (
              <Box key={product.productId} sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <Typography variant="body2">
                  {quantity} × {product.name}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                  {formatMoney(product.price * quantity)}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 600 }}>Estimated total</Typography>
            <Typography sx={{ fontWeight: 700 }}>{formatMoney(estimate)}</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            The final total is calculated by the server.
          </Typography>

          <Box sx={{ display: "grid", gap: 1, mt: 2 }}>
            <Button variant="contained" onClick={onPlaceOrder} disabled={isPlacing}>
              {isPlacing ? "Placing order..." : "Place order"}
            </Button>
            <Button variant="text" onClick={onClear} disabled={isPlacing}>
              Clear
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
}