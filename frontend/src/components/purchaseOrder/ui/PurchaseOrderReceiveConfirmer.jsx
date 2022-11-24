import {
  Box,
  Button,
  Stack,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FiImage as AddPhotoIcon, FiTrash as DeleteIcon } from "react-icons/fi";

function PurchaseOrderReceiveConfirmer({ open, onClose, onConfirm }) {
  const theme = useTheme();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (open) {
      setImage(null);
    }
  }, [open]);

  const onImageSelect = (imageFile) => {
    if (imageFile) {
      setImage({
        file: imageFile,
        image: URL.createObjectURL(imageFile),
      });
    }
  };

  const onImageRemove = () => {
    setImage(null);
  };

  const onConfirmClick = () => {
    onConfirm(image.file);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      scroll={"paper"}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { bgcolor: "background.paper", backgroundImage: "none" },
      }}
    >
      <DialogTitle>Attach Voucher Image</DialogTitle>
      <DialogContent dividers>
        <Stack w={1} direction={{ xs: "column", md: "row" }} spacing={2} py={2}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            startIcon={<AddPhotoIcon />}
            sx={{ backgroundColor: theme.palette.background.paper }}
          >
            <input
              type={"file"}
              name="image"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => onImageSelect(e.target.files[0])}
              hidden
            />
            {image ? "Change voucher image" : "Add voucher image"}
          </Button>

          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<DeleteIcon />}
            sx={{
              display: image ? "flex" : "none",
              backgroundColor: theme.palette.background.paper,
            }}
            onClick={onImageRemove}
          >
            Remove voucher image
          </Button>
        </Stack>
        <Box
          sx={{
            display: image ? "flex" : "none",
            width: "100%",
          }}
        >
          <img
            alt="CoverImage"
            src={image?.image}
            style={{
              objectFit: "cover",
              width: "100%",
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button disabled={!image} onClick={onConfirmClick}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default PurchaseOrderReceiveConfirmer;
