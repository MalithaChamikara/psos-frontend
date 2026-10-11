import { Alert, Snackbar } from "@mui/material";
import type { PlaceOrderResult } from "../types";
import { formatMoney } from "../utils/format";

interface Props {
  result: PlaceOrderResult | undefined;
  onClose: () => void;
}

export default function OrderSuccessSnackbar({ result, onClose }: Props) {
  return (
    <Snackbar
      open={result !== undefined}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="success" variant="filled" onClose={onClose}>
        Order #{result?.orderId} placed. Total {result ? formatMoney(result.totalAmount) : ""}
      </Alert>
    </Snackbar>
  );
}