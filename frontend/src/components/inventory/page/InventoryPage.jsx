import { Stack, Typography } from "@mui/material";
import InventroyProductListTable from "../ui/InventoryProductListTable";
import { useEffect, useState } from "react";
import inventoryService from "../../../services/inventory.service";

function InventoryPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await inventoryService.getAll();
        console.log(res.data);
        setData(res.data);
      } catch (error) {}
    })();
  }, []);

  const onRowDelete = (id) => {};

  const onRowClick = (id) => {};

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Product list</Typography>

      <InventroyProductListTable
        data={data}
        onRowOpenClick={onRowClick}
        onRowDeleteClick={onRowDelete}
      />
    </Stack>
  );
}
export default InventoryPage;
