import { Box, Typography } from "@mui/material";
import OrderCard from "../components/OrderCard";
import PageState from "../components/PageState";
import { useMyOrders } from "../hooks/useMyOrders";

export default function OrdersPage() {
  const { data, isLoading, error, refetch } = useMyOrders();

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        My orders
      </Typography>

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={data?.length === 0}
        emptyMessage="You have not placed any orders yet."
        onRetry={() => refetch()}
      >
        <Box sx={{ display: "grid", gap: 2 }}>
          {data?.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </Box>
      </PageState>
    </>
  );
}