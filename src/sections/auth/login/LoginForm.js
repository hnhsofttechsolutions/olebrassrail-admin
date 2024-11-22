import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, createTheme, ThemeProvider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Swal from 'sweetalert2';
import { instance } from '../../../config/Http';
import Iconify from '../../../components/iconify';
// import Swal from 'sweetalert2';

// ----------------------------------------------------------------------

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '2px solid white', // Replace 'red' with your desired border color
            },
            '&:hover fieldset': {
              borderColor: '#D32D0B', // Replace 'blue' with your desired hover color
            },
          },
        },
      },
    },
  },
});

export default function LoginForm() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const currentprotocol = window.location.protocol;

  const Navigate = useNavigate();
  const landlogin = () => {
    setLoader(true);
    try {
      const login = new FormData();
      login.append('email', email);
      login.append('password', password);

      instance.post(`admin/login`, login).then((response) => {
        console.log(response, 'working');
        //  setToken(response?.data?.accessToken)
        const status = response?.data?.status;
        console.log(response?.data?.token, '========================');
        localStorage.setItem('accessToken',response?.data?.token);
        setLoader(false);

        if (status === true) {
          Swal.fire({
            title: 'Good job!',
            text: 'Admin Login SuccessFully!',
            icon: 'success',
            button: 'Ok',
          });
          Navigate('/dashboard/app');
          setLoader(false);
        } else {
          setLoader(false);
        }
      });
    } catch (error) {
      setLoader(false);
      console.log(error?.message);
      Swal.fire({
        title: 'Something Went Wrong',
        text: error?.message,
        icon: 'error',
        dangerMode: true,
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3}>
        <ThemeProvider theme={theme}>
        <TextField
  name="email"
  label="Email"
  color="success"
  onChange={(e) => setEmail(e.target.value)}
  variant="outlined"
  InputLabelProps={{
    style: { color: 'white' }, // Change label color to white by default
  }}
  InputProps={{
    style: { color: 'white' }, // Change input text color to white by default
  }}
  sx={{
    '& .MuiInputLabel-root': {
      color: 'white', // Default label color
      '&.Mui-focused': {
        color: 'white', // Label color on focus
      },
    },
    '& .MuiInputBase-root': {
      color: 'white', // Default input text color
      '&:hover': {
        color: 'white', // Input text color on hover
      },
      '&.Mui-focused': {
        color: 'white', // Input text color on focus
      },
    },
  }}
/>

        </ThemeProvider>
        {/* <TextField name="email" label="Email" color="success"  onChange={(e)=>setEmail(e.target.value)} sx={{ input: { color: 'success' }  }} /> */}
        <ThemeProvider theme={theme}>
        <TextField
  name="password"
  label="Password"
  color="success"
  onChange={(e) => setPassword(e.target.value)}
  variant="outlined"
  type={showPassword ? 'text' : 'password'}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
        </IconButton>
      </InputAdornment>
    ),
    style: { color: 'white' }, // Change input text color to white by default
  }}
  InputLabelProps={{
    style: { color: 'white' }, // Change label color to white by default
  }}
  sx={{
    '& .MuiInputLabel-root': {
      color: 'white', // Default label color
      '&.Mui-focused': {
        color: 'white', // Label color on focus
      },
    },
    '& .MuiInputBase-root': {
      color: 'white', // Default input text color
      '&:hover': {
        color: 'white', // Input text color on hover
      },
      '&.Mui-focused': {
        color: 'white', // Input text color on focus
      },
    },
    '& .MuiIconButton-root': {
      color: 'white', // Change icon button color to white
    },
  }}
/>

        </ThemeProvider>
      </Stack>

      {/* <LoadingButton
        loading={loader}
        loadingPosition="start"
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="success"
        sx={{ marginTop: 5, color: 'white' }}
        onClick={landlogin}
      >
        Login
      </LoadingButton> */}
      <LoadingButton
  loading={loader}
  loadingPosition="start"
  fullWidth
  size="large"
  type="submit"
  variant="contained"
  color="success"
  sx={{
    marginTop: 5,
    color: 'white',
    '&.MuiLoadingButton-loading': {
      backgroundColor: '#D32D0B', // Green color for success
      color: 'white', // Ensure the text color is white
    },
  }}
  onClick={landlogin}
>
  Login
</LoadingButton>

    </>
  );
}
