import { Button, Paper, Stack, Typography } from "@mui/material";
import { RiEdit2Line as EditIcon } from "react-icons/ri";
import moment from "moment";

function CategoryManagementItem({ category, onEdit }) {
  return (
    <Paper variant="outlined">
      <Stack spacing={2} p={2}>
        <Typography variant="h6">{category.name}</Typography>

        <Typography variant="body1">
          Created At:{" "}
          <strong>
            {moment(category.createdAt).format("MMMM Do YYYY, hh:mm a")}
          </strong>
        </Typography>

        <Typography variant="body1">
          Updated At:{" "}
          <strong>
            {moment(category.createdAt).format("MMMM Do YYYY, hh:mm a")}
          </strong>
        </Typography>

        <Typography variant="body1">Category Description:</Typography>
        <Typography variant="body1">
          <strong>{category.description}</strong>
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => onEdit(category)}
        >
          Edit Category
        </Button>
      </Stack>
    </Paper>
  );
}
export default CategoryManagementItem;
