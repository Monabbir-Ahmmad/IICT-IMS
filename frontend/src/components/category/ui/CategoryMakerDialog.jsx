import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

function CategoryMakerDialog({ open, onSubmit, onCancel, category }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      id: category?.id,
      name: category?.name,
      description: category?.description,
      editMode: !!category,
    },
  });

  useEffect(() => {
    reset({
      id: category?.id,
      name: category?.name,
      description: category?.description,
      editMode: !!category,
    });
  }, [category, open, reset]);

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      scroll={"paper"}
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: { bgcolor: "background.paper", backgroundImage: "none" },
      }}
    >
      <DialogTitle>
        {category?.id ? "Edit Category" : "Add New Category"}
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)} id="category-form">
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  placeholder="Enter Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  placeholder="Enter Category Description"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" form="category-form">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CategoryMakerDialog;
