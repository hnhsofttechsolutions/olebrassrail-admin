import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { instance } from '../../config/Http';

const Contact = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [imageB1, setImageB1] = useState(null);
  const [imageB2, setImageB2] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleImageChange = (e, setImage, setImageFile) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Display image preview
      setImageFile(file); // Store the file object
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const formData = new FormData();
      if(imageB1){
          formData.append('image_1', imageB1);
      }
      if(imageB2){
          formData.append('image_2', imageB2);
      }
      formData.append('address', address);
      formData.append('phone_no', phoneNo);
      formData.append('email', email);

      const response = await instance.post(`admin/contact/process`, formData);

      const { status } = response?.data || {};

      setLoader(false);

      if (status === true) {
        Swal.fire({
          title: 'Good job!',
          text: 'Contact updated successfully',
          icon: 'success',
        });
        user()

        // Reset form after successful submission
        setEmail('');
        setPhoneNo('');
        setAddress('');
        setImage1(null);
        setImage2(null);
        setImageB1(null);
        setImageB2(null);
      } else {
        console.error(response?.data);
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong. Please try again later.',
          icon: 'error',
        });
      }
    } catch (error) {
      setLoader(false);
      console.error('Error submitting form:', error);
      Swal.fire({
        title: 'Something Went Wrong',
        text: error?.message || 'An unexpected error occurred.',
        icon: 'error',
      });
    }
  };




  
  const user = useCallback(() => {
    setLoader(true);
    instance
      .get('user/view/contact')
      .then((response) => {
    setLoader(false);
        console.log(response?.data?.data,'response');
        setEmail(response?.data?.data?.email)
        setPhoneNo(response?.data?.data?.phone_no)
        setAddress(response?.data?.data?.address)
        setImage2(response?.data?.data?.image_2)
        setImage1(response?.data?.data?.image_1)
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    user();
  }, [user]);

  return (
    <>
        <Helmet>
        <title>Contact | The Company </title>
      </Helmet>
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Contact Form Edit
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Image 1 */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="contained" component="label" sx={{ backgroundColor: '#D32D0B' }}>
              Upload Image 1
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, setImage1, setImageB1)}
              />
            </Button>
            {image1 && <img src={image1} alt="Preview 1" style={{ width: '40%', marginTop: 10 }} />}
          </Grid>

          {/* Image 2 */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="contained" component="label" sx={{ backgroundColor: '#D32D0B' }}>
              Upload Image 2
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, setImage2, setImageB2)}
              />
            </Button>
            {image2 && <img src={image2} alt="Preview 2" style={{ width: '40%', marginTop: 10 }} />}
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button disabled={loader} variant="contained" sx={{ backgroundColor: '#D32D0B' }} type="submit" fullWidth>
              {loader ? 'Updating....' : 'Edit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    </>

  );
};

export default Contact;
