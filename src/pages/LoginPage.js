import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Container, Typography } from '@mui/material';
// hooks
// import useResponsive from '../hooks/useResponsive';
import image from '../components/logo/logo.png';
// components

// sections
import { LoginForm } from '../sections/auth/login';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    backgroundImage:"url('./assets/images/login.webp')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
}));

// const StyledSection = styled('div')(({ theme }) => ({
//   width: '100%',
//   maxWidth: '50%',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   boxShadow: theme.customShadows.card,
//   backgroundColor: 'black',
// }));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(1, 5),
  // backgroundColor: 'black',
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  // const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | The Company </title>
      </Helmet>

      <StyledRoot>
       
        <Container maxWidth="sm">
          <StyledContent>
        <Box sx={{ height: 'auto', width: "100%"}}>
        <img src={image} alt="" style={{
          margin:"auto",
          height:'auto',
          width:"100%",
          objectFit:"cover"
        }}/>
      </Box>

            <Typography variant="h3" sx={{  mt: 5, mb: 5, mx: 'auto', color: 'white' }}>
              Welcome To Admin Login
            </Typography>
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
