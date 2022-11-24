import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RiAddLine as AddIcon } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../../redux/actions/alertSnackbar.actions";
import productCategoryService from "../../../services/productCategory.service";
import CategoryMakerDialog from "../ui/CategoryMakerDialog";
import CategoryManagementItem from "../ui/CategoryManagementItem";

function CategoryManagementPage() {
  const disptach = useDispatch();

  const [openDialog, setOpenDialog] = useState({ open: false, category: null });

  const [categories, setCategories] = useState({
    data: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setCategories({ ...categories, loading: true, error: null });
    try {
      const { data } = await productCategoryService.getAll();
      setCategories({ ...categories, data, loading: false });
    } catch (error) {
      setCategories({ ...categories, loading: false, error: error.message });
    }
  };

  const onAddCategory = () => {
    setOpenDialog({ open: true, category: null });
  };

  const onEditCategory = (category) => {
    setOpenDialog({ open: true, category });
  };

  const onDialogClose = () => {
    setOpenDialog(false);
  };

  const onDialogSubmit = (data) => {
    if (data.editMode) {
      updateCategory(data);
    } else {
      createCategory(data);
    }
  };

  const createCategory = async (data) => {
    try {
      await productCategoryService.create(data);
      getCategories();
      setOpenDialog({ open: false, category: null });
      disptach(showSuccessAlert("Category Created Successfully"));
    } catch (error) {
      disptach(showErrorAlert(error.message));
    }
  };

  const updateCategory = async (data) => {
    try {
      await productCategoryService.update(data);
      getCategories();
      setOpenDialog({ open: false, category: null });
      disptach(showSuccessAlert("Category Updated Successfully"));
    } catch (error) {
      disptach(showErrorAlert(error.message));
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Category Management</Typography>

      <CategoryMakerDialog
        open={openDialog.open}
        category={openDialog.category}
        onCancel={onDialogClose}
        onSubmit={onDialogSubmit}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ alignSelf: "start" }}
        startIcon={<AddIcon />}
        onClick={onAddCategory}
      >
        Add New Category
      </Button>

      <Stack spacing={2}>
        {categories.data?.map((category) => (
          <CategoryManagementItem
            key={category.id}
            category={category}
            onEdit={onEditCategory}
          />
        ))}
      </Stack>
    </Stack>
  );
}
export default CategoryManagementPage;
