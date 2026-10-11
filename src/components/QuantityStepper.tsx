import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  value: number;
  max: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export default function QuantityStepper({ value, max, disabled, onChange }: Props) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      <IconButton
        size="small"
        aria-label="Decrease quantity"
        disabled={disabled || value <= 0}
        onClick={() => onChange(value - 1)}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>

      <Typography sx={{ minWidth: 24, textAlign: "center", fontWeight: 600 }}>
        {value}
      </Typography>

      <IconButton
        size="small"
        aria-label="Increase quantity"
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}