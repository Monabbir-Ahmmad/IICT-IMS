import AlertSnackbar from "./AlertSnackbar";
import { useSelector } from "react-redux";

function FloatingAlerts() {
  const profileUpdate = useSelector((state) => state.userProfileUpdate);

  const passwordUpdate = useSelector((state) => state.userPasswordUpdate);

  const procurementCreate = useSelector((state) => state.procurementCreate);

  const procurementDelete = useSelector((state) => state.procurementDelete);

  const quotationCreate = useSelector((state) => state.quotationCreate);

  return (
    <>
      <AlertSnackbar
        open={profileUpdate?.success}
        severity={"success"}
        message={"Profile updated successfully"}
      />
      <AlertSnackbar
        open={passwordUpdate?.success}
        severity={"success"}
        message={"Password updated successfully"}
      />
      <AlertSnackbar
        open={procurementCreate?.success}
        severity={"success"}
        message={"Procurement published successfully"}
      />
      <AlertSnackbar
        open={procurementDelete?.success}
        severity={"success"}
        message={"Procurement deleted successfully"}
      />
      <AlertSnackbar
        open={quotationCreate?.success}
        severity={"success"}
        message={"Quotation sent successfully"}
      />
      <AlertSnackbar
        open={procurementDelete?.error}
        severity={"error"}
        message={procurementDelete?.error}
      />
    </>
  );
}

export default FloatingAlerts;
