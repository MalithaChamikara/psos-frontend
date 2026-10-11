import { Box, Typography } from "@mui/material";
import OrderSuccessSnackbar from "../components/OrderSuccessSnackBar";
import OrderSummary from "../components/OrderSummary";
import PageState from "../components/PageState";
import ProductCard from "../components/ProductCard";
import StockErrorAlert from "../components/StockErrorAlert";
import { usePlaceOrder } from "../hooks/usePlaceOrder";
import { useProducts } from "../hooks/useProducts";
import { useCartStore } from "../stores/cartStore";

export default function ProductsPage() {
  const { data, isLoading, error, refetch } = useProducts();
  const quantities = useCartStore((s) => s.quantities);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const clear = useCartStore((s) => s.clear);
  const order = usePlaceOrder();

  function handlePlaceOrder() {
    const items = Object.entries(quantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({ productId: Number(productId), quantity }));

    if (items.length === 0) return;
    order.mutate({ items });
  }

  function handleClear() {
    clear();
    order.reset(); 
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Products
      </Typography>

      {order.isError && <StockErrorAlert error={order.error} onClose={() => order.reset()} />}

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={data?.length === 0}
        emptyMessage="No products available."
        onRetry={() => refetch()}
      >
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", md: "1fr 320px" },
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            }}
          >
            {data?.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                quantity={quantities[product.productId] ?? 0}
                onQuantityChange={setQuantity}
              />
            ))}
          </Box>

          <Box sx={{ position: { md: "sticky" }, top: { md: 88 } }}>
            <OrderSummary
              products={data ?? []}
              quantities={quantities}
              isPlacing={order.isPending}
              onPlaceOrder={handlePlaceOrder}
              onClear={handleClear}
            />
          </Box>
        </Box>
      </PageState>

      <OrderSuccessSnackbar result={order.data} onClose={() => order.reset()} />
    </>
  );
}