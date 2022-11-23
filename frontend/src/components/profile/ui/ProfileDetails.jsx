import { Grid } from "@mui/material";
import { UserRoles } from "../../../constants/enums";

function UserDetails({ user }) {
  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={{ xs: 2, sm: 5 }}
      columns={{ xs: 1, sm: 2 }}
    >
      <Grid item xs={1}>
        User ID:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.id}</strong>
      </Grid>
      <Grid item xs={1}>
        Username:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.username}</strong>
      </Grid>
      <Grid item xs={1}>
        Email Address:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.email}</strong>
      </Grid>
      <Grid item xs={1}>
        Contact Number:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.contactNumber}</strong>
      </Grid>
      <Grid item xs={1}>
        User Role:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.role}</strong>
      </Grid>
      <Grid item xs={1}>
        User Designation:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.designation}</strong>
      </Grid>
    </Grid>
  );
}

function SupplierDetails({ user }) {
  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={{ xs: 2, sm: 5 }}
      columns={{ xs: 1, sm: 2 }}
    >
      <Grid item xs={1}>
        Supplier ID:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.id}</strong>
      </Grid>
      <Grid item xs={1}>
        Company Name:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.companyName}</strong>
      </Grid>
      <Grid item xs={1}>
        Email Address:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.email}</strong>
      </Grid>
      <Grid item xs={1}>
        Supplier Category:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.category}</strong>
      </Grid>
      <Grid item xs={1}>
        Supplier BIN:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.bin}</strong>
      </Grid>
      <Grid item xs={1}>
        Contact Number:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.contactNumber}</strong>
      </Grid>
      <Grid item xs={1}>
        Address:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.address}</strong>
      </Grid>
      <Grid item xs={1}>
        Website:
      </Grid>
      <Grid item xs={1}>
        <strong>{user?.website}</strong>
      </Grid>
    </Grid>
  );
}

function ProfileDetails({ profile, role }) {
  return role === UserRoles.SUPPLIER ? (
    <SupplierDetails user={profile} />
  ) : (
    <UserDetails user={profile} />
  );
}

export default ProfileDetails;
