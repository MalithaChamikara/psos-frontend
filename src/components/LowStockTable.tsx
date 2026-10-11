import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Product } from "../types";
import { formatMoney } from "../utils/format";
import { stockStatus } from "../utils/stock";

export default function LowStockTable({ products }: { products: Product[] }) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" aria-label="Low stock products">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => {
            const out = stockStatus(p.stockQuantity) === "out";
            return (
              <TableRow key={p.productId}>
                <TableCell>{p.name}</TableCell>
                <TableCell align="right">{formatMoney(p.price)}</TableCell>
                <TableCell align="right">{p.stockQuantity}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color={out ? "error" : "warning"}
                    label={out ? "Out of stock" : "Low stock"}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}