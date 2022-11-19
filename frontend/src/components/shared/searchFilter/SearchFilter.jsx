import {
  Box,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { RiFilter2Fill as FilterIcon } from "react-icons/ri";
import { useEffect } from "react";
import { useState } from "react";

function SearchFilter({ filterDef = [], onApply, onClear }) {
  const [selectedColumn, setSelectedColumn] = useState(filterDef[0] || null);

  const [column, setColumn] = useState(filterDef[0]?.field || "");
  const [operator, setOperator] = useState("");
  const [value, setValue] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (column) {
      setOperator("");
      setValue("");
    }
  }, [column]);

  const onColumnChange = (e) => {
    setSelectedColumn(filterDef.find((f) => f.field === e.target.value));
    setColumn(e.target.value);
  };

  const onFilterApply = () => {
    onApply({
      searchColumn: selectedColumn.key,
      searchOperator: operator,
      searchValue: value,
    });
  };

  const onFilterClear = () => {
    setSelectedColumn(filterDef[0] || null);
    setColumn(filterDef[0]?.field || "");
    setOperator("");
    setValue("");

    onClear();
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<FilterIcon />}
        sx={{ mb: 2 }}
        onClick={() => setOpen(!open)}
      >
        Filter
      </Button>
      <Collapse orientation="vertical" in={open}>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Stack spacing={2} width={1} direction={{ md: "row", xs: "column" }}>
            <FormControl fullWidth size="small">
              <InputLabel>Column</InputLabel>
              <Select value={column} label="Column" onChange={onColumnChange}>
                {filterDef.map((option) => (
                  <MenuItem key={option?.field} value={option?.field}>
                    {option?.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Operator</InputLabel>
              <Select
                value={operator}
                label="Operator"
                onChange={(e) => setOperator(e.target.value)}
              >
                {selectedColumn?.operators?.map((option) => (
                  <MenuItem key={option?.value} value={option?.value}>
                    {option?.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Value"
              type={selectedColumn?.type || "search"}
              fullWidth
              size="small"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Stack>
          <Stack
            direction={"row"}
            mt={2}
            justifyContent={"flex-start"}
            spacing={2}
          >
            <Button
              variant="contained"
              size="small"
              disabled={!column || !value || !operator}
              onClick={onFilterApply}
            >
              Apply Filter
            </Button>
            <Button variant="outlined" size="small" onClick={onFilterClear}>
              Clear Filter
            </Button>
          </Stack>
        </Paper>
      </Collapse>
    </Box>
  );
}
export default SearchFilter;
