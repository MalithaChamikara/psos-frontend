import { Chip } from "@mui/material";

export default function OrderStatus({ status }: { status: string }) {
  const color = status === "Placed" ? "success" : status === "Cancelled" ? "default" : "info";
  return <Chip label={status} color={color} size="small" />;
}