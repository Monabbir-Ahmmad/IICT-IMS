import { Divider, Link, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import { IMAGE_HOST_URL } from "../../../constants/apiLinks";
import { currencyFormatter } from "../../../utils/utilities";
import ImageViewer from "../../shared/imageViewer/ImageViewer";

function InventoryProductDirectPurchaseDetails({ purchase }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        Direct Purchase{" "}
        <Link
          component={RouterLink}
          to={"/direct-purchases/" + purchase?.id}
          underline="hover"
        >
          #{purchase?.id}
        </Link>
      </Typography>

      {purchase?.voucher && (
        <ImageViewer
          image={IMAGE_HOST_URL + purchase?.voucher?.fileName}
          buttonText="View Voucher"
          title="Voucher"
        />
      )}

      <Stack width={1} spacing={3} direction={{ xs: "column", lg: "row" }}>
        <Paper variant="outlined" sx={{ flex: 1 }}>
          <Stack p={3} spacing={3}>
            <Typography variant="h6">Purchase Details</Typography>

            <Divider />

            <Typography variant={"body1"}>
              Purchase Title: <strong>{purchase?.title}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Purchase Category: <strong>{purchase?.category}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Purchasing Date:{" "}
              <strong>
                {moment(purchase?.purchaseDate).format("MMM Do, YYYY")}
              </strong>
            </Typography>

            <Typography variant={"body1"}>
              Total Price:{" "}
              <strong>
                {currencyFormatter().format(purchase?.totalPrice)}
              </strong>
            </Typography>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1 }}>
          <Stack p={3} spacing={3}>
            <Typography variant={"h6"}>Supplier Info</Typography>
            <Divider />

            <Typography variant={"body1"}>
              Supplier Name: <strong>{purchase?.supplierName}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Contact Number: <strong>{purchase?.supplierContact}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Address: <strong>{purchase?.supplierAddress}</strong>
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}
export default InventoryProductDirectPurchaseDetails;
