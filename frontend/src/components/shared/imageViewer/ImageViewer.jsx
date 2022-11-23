import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

function ImageViewer({ image, buttonText = "Button", title = "Title" }) {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const onClick = () => setOpen(true);

  return (
    <div>
      <Button variant="contained" onClick={onClick}>
        {buttonText}
      </Button>

      <Dialog
        open={open}
        scroll={"paper"}
        maxWidth={"sm"}
        fullWidth
        onClose={onClose}
        PaperProps={{
          sx: { bgcolor: "background.paper", backgroundImage: "none" },
        }}
      >
        <DialogTitle>{title} </DialogTitle>

        <DialogContent dividers>
          <img
            alt={title}
            src={image}
            style={{
              objectFit: "cover",
              width: "100%",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ImageViewer;
