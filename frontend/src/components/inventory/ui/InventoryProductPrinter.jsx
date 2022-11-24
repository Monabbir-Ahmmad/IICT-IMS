import { Box, Button, Divider, Typography } from "@mui/material";
import moment from "moment";
import { useRef, useState } from "react";
import { RiPrinterLine as PrintIcon } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";
import { QRCodeCanvas } from "qrcode.react";
import { currencyFormatter } from "../../../utils/utilities";
import DialogWrapper from "../../shared/dialogWrapper/DialogWrapper";
import { PRODUCT_QR_CODE_BASE } from "../../../constants/apiLinks";
import styled from "@emotion/styled";

const pageStyle = `
@media all {
  .page-break {
    display: none;
  }
}

@media print {
  html, body {
    height: initial !important;
    overflow: initial !important;
    -webkit-print-color-adjust: exact;
  }
}

@media print {
  .page-break {
    margin-top: 1rem;
    display: block;
    page-break-before: auto;
  }
}

@page {
  size: auto;
  margin: 15mm;
}
`;

const Header = styled.header`
  display: block;
  text-align: center;
`;

function InventoryProductPrinter({ inventoryProduct }) {
  const [open, setOpen] = useState(false);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle,
  });

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<PrintIcon />}
      >
        Print
      </Button>

      <DialogWrapper
        open={open}
        onClose={onClose}
        onConfirm={handlePrint}
        title="Print Product"
      >
        <Box ref={componentRef} p={2}>
          <Header>
            <Typography variant="body1">
              Institute of Information and Communication Technology
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Shahjalal University of Science & Technology
            </Typography>
          </Header>
          <Typography variant="h4" align="center" sx={{ py: 3 }}>
            Product Information
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Name:</strong> {inventoryProduct?.name}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Category:</strong> {inventoryProduct?.category}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Manufacturer:</strong> {inventoryProduct?.manufacturer}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Price:</strong>{" "}
            {currencyFormatter().format(inventoryProduct?.price)}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Warranty Expiry Date:</strong>{" "}
            {inventoryProduct?.warrantyExpiryDate
              ? moment(inventoryProduct?.warrantyExpiryDate).format(
                  "Do MMMM, YYYY"
                )
              : "No Warranty"}
          </Typography>

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Purchase Method:</strong>{" "}
            {inventoryProduct?.purchaseOrder
              ? "Purchase Order"
              : "Direct Purchase"}
          </Typography>

          {inventoryProduct?.purchaseOrder && (
            <Typography variant={"body1"} sx={{ mt: 2 }}>
              <strong>Purchase Order ID:</strong>{" "}
              {inventoryProduct?.purchaseOrder?.id}
            </Typography>
          )}

          {inventoryProduct?.directPurchase && (
            <Typography variant={"body1"} sx={{ mt: 2 }}>
              <strong>Direct Purchase ID:</strong>{" "}
              {inventoryProduct?.directPurchase?.id}
            </Typography>
          )}

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Details:</strong> {inventoryProduct?.details}
          </Typography>

          <Typography variant={"h6"} sx={{ mt: 5 }}>
            <strong>Cutout for product identification</strong>
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography variant={"body1"} sx={{ my: 2 }}>
              Product QR Code
            </Typography>

            <QRCodeCanvas value={PRODUCT_QR_CODE_BASE + inventoryProduct?.id} />

            <Typography variant={"body1"} sx={{ mt: 2 }}>
              Product ID: <strong>{inventoryProduct?.id}</strong>
            </Typography>

            <Typography variant={"body1"} sx={{ mt: 2 }}>
              Product Name: <strong>{inventoryProduct?.name}</strong>
            </Typography>
          </Box>
        </Box>
      </DialogWrapper>
    </div>
  );
}
export default InventoryProductPrinter;
