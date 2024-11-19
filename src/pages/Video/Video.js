/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/self-closing-comp */
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
import EditVideo from './EditVideo';

export default function Video() {


  const [USERLIST, setUSERLIST] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loader, setLoader] = useState(false);

  // edit
  const [openedit, setOpenedit] = useState(false);
  const [EditData, setEditData] = useState(null);
  const handleCloseedit = () => setOpenedit(false);
  const handleOpenedit = (e) => {
    setEditData(e)
    setOpenedit(true);
  }

  const token = localStorage.getItem('accessToken');

  const user = useCallback(() => {
    setLoader(true);

    instance
      .get('user/view/video')
      .then((response) => {
        setLoader(false);
        setUSERLIST(response?.data?.data.video);
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




  return (
    <>
      <Helmet>
        <title>Video | Ole brass rail </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Video
          </Typography>
          <Button onClick={handleOpenedit} variant="contained" sx={{ backgroundColor: '#D32D0B' }} startIcon={<Iconify icon="eva:plus-fill" />}>
            Edit Video
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-around" mb={5}>
          <video
            src={USERLIST}
            controls
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Stack>


        {/* edit */}
        <EditVideo EditData={EditData} openedit={openedit} setOpenedit={setOpenedit} handleCloseedit={handleCloseedit} user={user} />
      </Container>
    </>
  );
}