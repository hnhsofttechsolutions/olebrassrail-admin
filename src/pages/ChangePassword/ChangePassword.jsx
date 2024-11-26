import {
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { instance } from '../../config/Http';

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchEmail = watch("email");
  const watchNewPassword = watch("new_password");

  const onSubmit = async(data) => {
    try{
        const formdata = new FormData()
        if(data.email){
            formdata.append('email',data.email)
        }
        if(data.email){
            formdata.append('new_password',data.new_password)
        }
        formdata.append('current_password',data.current_password)

        const response = await instance.post(`admin/update/credentials`, formdata);
        console.log(response,'response');
        if(response.data.status){
        console.log(response,'response');
        Swal.fire({
            title: 'Good job!',
            text: response.data.message,
            icon: 'success',
          });
        }else{
        alert(response.data.message,'response');
        Swal.fire({
            title: 'Something Went Wrong',
            text: response.data.message,
            icon: 'error',
          });
        }

    }catch(error){
console.log(error);

    }


  };

  return (

<>
<Helmet>
        <title>Update Email/Password | Ole brass rail </title>
      </Helmet>
    <Typography variant="h4" gutterBottom>
    Update Email/Password
  </Typography>
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >

      {/* Email Field */}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          validate: {
            requiredWhenNoPassword: (value) =>
              value || watchNewPassword
                ? true
                : "Email or New Password is required",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      {/* Current Password Field */}
      <Controller
        name="current_password"
        control={control}
        defaultValue=""
        rules={{ required: "Current Password is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Current Password"
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.current_password}
            helperText={errors.current_password?.message}
          />
        )}
      />

      {/* New Password Field */}
      <Controller
        name="new_password"
        control={control}
        defaultValue=""
        rules={{
          validate: {
            requiredWhenNoEmail: (value) =>
              value || watchEmail
                ? true
                : "Email or New Password is required",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.new_password}
            helperText={errors.new_password?.message}
          />
        )}
      />

<Button
  type="submit"
  variant="contained"
  fullWidth
  sx={{
    mt: 2,
    backgroundColor: "#D32D28",
    "&:hover": {
      backgroundColor: "#D32D28", // Same color as default to disable hover effect
    },
  }}
>
  Submit
</Button>

</Box>
</>
  );
};

export default ChangePassword;
