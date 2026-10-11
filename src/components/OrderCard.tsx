import {
  Box,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { Order } from "../types";
import { formatDate, formatMoney } from "../utils/format";
import OrderStatus from "./OrderStatus";

interface Props {
  order: Order;
  showCustomer?: boolean;
}

export default function OrderCard({ order, showCustomer = false }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Order #{order.orderId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(order.orderDate)}
              {showCustomer && order.username ? ` · ${order.username}` : ""}
            </Typography>
          </Box>
          <OrderStatus status={order.status} />
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ overflowX: "auto" }}>
          <Table size="small" aria-label={`Items in order ${order.orderId}`}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Unit price</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{formatMoney(item.unitPrice)}</TableCell>
                  <TableCell align="right">{formatMoney(item.unitPrice * item.quantity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 1.5 }}>
          <Typography sx={{ fontWeight: 600 }}>Total</Typography>
          <Typography sx={{ fontWeight: 700 }}>{formatMoney(order.totalAmount)}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}