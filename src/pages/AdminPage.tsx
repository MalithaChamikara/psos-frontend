import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import LowStockTable from "../components/LowStockTable";
import OrderCard from "../components/OrderCard";
import PageState from "../components/PageState";
import { useAllOrders } from "../hooks/useAllOrders";
import { useLowStock } from "../hooks/useLowStock";

function AllOrdersTab() {
  const { data, isLoading, error, refetch } = useAllOrders();

  return (
    <PageState
      isLoading={isLoading}
      error={error}
      isEmpty={data?.length === 0}
      emptyMessage="No orders have been placed yet."
      onRetry={() => refetch()}
    >
      <Box sx={{ display: "grid", gap: 2 }}>
        {data?.map((order) => (
          <OrderCard key={order.orderId} order={order} showCustomer />
        ))}
      </Box>
    </PageState>
  );
}

function LowStockTab() {
  const { data, isLoading, error, refetch } = useLowStock();

  return (
    <PageState
      isLoading={isLoading}
      error={error}
      isEmpty={data?.length === 0}
      emptyMessage="No products are low on stock."
      onRetry={() => refetch()}
    >
      <LowStockTable products={data ?? []} />
    </PageState>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Orders &amp; stock
      </Typography>

      <Tabs
        value={tab}
        onChange={(_, value: number) => setTab(value)}
        variant="scrollable"
        allowScrollButtonsMobile
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="All orders" />
        <Tab label="Low stock" />
      </Tabs>

      {tab === 0 ? <AllOrdersTab /> : <LowStockTab />}
    </>
  );
}