import styled from "@emotion/styled";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { currencyFormatter } from "../../../utils/utilities";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = [
  {
    field: "name",
    headerName: "Product Name",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "details",
    headerName: "Product Details",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "estimatedPrice",
    headerName: "Estimated Price",
    headerAlign: "center",
    align: "center",
    valueFormatter: ({ value }) => currencyFormatter().format(value),
  },
  {
    field: "quantity",
    headerName: "Quantity",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "estimatedTotalPrice",
    headerName: "Estimated Total Price",
    headerAlign: "center",
    align: "center",
    valueFormatter: ({ value }) => currencyFormatter().format(value),
  },
];

function QuotationOfferProductTable({ data = [] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell key={col.field} align={col.headerAlign}>
                {col.headerName}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 &&
            data.map((row) => (
              <StyledTableRow key={row.id}>
                {columns.map((col) => (
                  <StyledTableCell key={col.field + row.id} align={col.align}>
                    {!!col.valueFormatter
                      ? col.valueFormatter({ value: row[col.field] })
                      : row[col.field]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default QuotationOfferProductTable;
