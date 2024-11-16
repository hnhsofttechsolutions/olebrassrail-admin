/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-key */
import { Helmet } from 'react-helmet-async';
import { useEffect, useState, useCallback } from 'react';
import {
  Card,
  Stack,
  Grid,
  MenuItem,
  Container,
  Typography,
  CardActions,
  CardMedia,
  Button,
} from '@mui/material';
import Swal from 'sweetalert2';
import Iconify from '../../components/iconify';
import { instance } from '../../config/Http';
import GalleryModal from './GalleryModal';

export default function Gallery() {


  const [USERLIST, setUSERLIST] = useState([]);
  const [loader, setLoader] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const token = localStorage.getItem('accessToken');

  const user = useCallback(() => {
    setLoader(true);

    instance
      .get('admin/gallery/view')
      .then((response) => {
        setLoader(false);
        setUSERLIST(response?.data?.data);
        localStorage.setItem('lenderLength', response?.data?.data?.length);
        console.log(response, 'user api');
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
    console.log(token);
  }, [token]);

  useEffect(() => {
    user();
  }, [user]);

  const delet = (id) => {
    setLoader(true);
    try {
      instance.get(`admin/gallery/delete/${id}`).then((response) => {
        if (response?.data.status === true) {
          setLoader(false);
          Swal.fire({
            title: 'Good job! ',
            text: 'Image deleted successFully',
            icon: 'success',
            button: 'Ok',
          });
          user();
        } else {
          setLoader(false);
        }
      });
    } catch (error) {
      setLoader(false);
      Swal.fire({
        title: 'Some Thing Went Wrong! ',
        text: error?.message,
        icon: 'danger',
        button: 'Ok',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title> gallery | The Company </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Gallery
          </Typography>
          <Button onClick={handleOpen} variant="contained"  sx={{ backgroundColor: '#D32D0B' }} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Iamge
          </Button>
        </Stack>

  <Stack direction="row" alignItems="center" justifyContent="space-around" mb={5}>
  <Grid container spacing={2}>
    {USERLIST.map((e, i) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={e?.images}
            title="green iguana"
          />
          <CardActions>
            <Button size="small">{e?.created_at?.slice(0, 10)}</Button>
            <MenuItem sx={{ color: 'error.main' }} onClick={() => delet(e?.id)}>
              <Iconify icon={'eva:trash-2-outline'} />
            </MenuItem>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
</Stack>



<GalleryModal open={open} setOpen={setOpen} handleClose={handleClose} user={user}/>
      </Container>
    </>
  );
}





