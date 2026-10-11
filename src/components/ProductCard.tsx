import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import type { Product } from "../types";
import { formatMoney } from "../utils/format";
import { stockStatus } from "../utils/stock";
import QuantityStepper from "./QuantityStepper";

interface Props {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export default function ProductCard({ product, quantity, onQuantityChange }: Props) {
  const status = stockStatus(product.stockQuantity);
  const outOfStock = status === "out";

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5, height: "100%" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3, opacity: outOfStock ? 0.6 : 1 }}>
          {product.name}
        </Typography>

        <Typography variant="h5" color="primary" sx={{ opacity: outOfStock ? 0.6 : 1 }}>
          {formatMoney(product.price)}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {status === "out" && <Chip label="Out of stock" color="error" size="small" />}
          {status === "low" && (
            <Chip label={`Only ${product.stockQuantity} left`} color="warning" size="small" />
          )}
          {status === "ok" && (
            <Chip label={`${product.stockQuantity} in stock`} color="success" variant="outlined" size="small" />
          )}

          <QuantityStepper
            value={quantity}
            max={product.stockQuantity}
            disabled={outOfStock}
            onChange={(q) => onQuantityChange(product.productId, q)}
          />
        </Box>
      </CardContent>
    </Card>
  );
}