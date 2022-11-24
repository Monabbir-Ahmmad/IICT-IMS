import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function DialogWrapper({
  children,
  open,
  onClose,
  onConfirm,
  title,
  maxWidth = "sm",
}) {
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      scroll={"paper"}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { bgcolor: "background.paper", backgroundImage: "none" },
      }}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onConfirm}>Confirm Print</Button>
      </DialogActions>
    </Dialog>
  );
}
export default DialogWrapper;
