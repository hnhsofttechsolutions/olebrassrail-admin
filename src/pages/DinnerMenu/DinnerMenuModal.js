/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/order */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { instance } from '../../config/Http';
import Swal from 'sweetalert2';
import Iconify from '../../components/iconify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const DinnerMenuModal = ({ open,setOpen, handleClose,user }) => {
    const [images, setImages] = useState([]);
    const [imagesBainary, setImagesBainary] = useState([]);
    const [loader, setLoader] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Get the first selected file
        if (file) {
            const newImage = {
                file,
                url: URL.createObjectURL(file),
            };
            setImages([newImage]); // Replace previous images with the new one
            setImagesBainary(file); // Set the single file as binary
        }
    };

    const handleRemoveImage = (index) => {
        setImages([]);
        setImagesBainary([]);
    };

    const UpcomingEvent = () => {
        setLoader(true);
        try {
          const Data = new FormData();
          Data.append("tag_name","Lunch & Dinner Menu")
            Data.append("image",imagesBainary)
          instance.post(`admin/upcoming/store`, Data).then((response) => {
            const status = response?.data?.status;
            setLoader(false);
            if (status === true) {
              Swal.fire({
                title: 'Good job!',
                text: 'Dinner Menu Successfully Created',
                icon: 'success',
                button: 'Ok',
              });
              user()
              setOpen(false);
              setLoader(false);
              setImages([])
              setImagesBainary([])
            } else {
              setLoader(false);
            }
          });
        } catch (error) {
          setLoader(false);
          Swal.fire({
            title: 'Something Went Wrong',
            text: error?.message,
            icon: 'error',
            dangerMode: true,
          });
        }
      };

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box>
            
            <Box sx={style}>
            <Box onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}>
                X
            </Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Upload Image
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" component="label">
                        Select Image
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            hidden
                            onChange={handleImageUpload}
                        />
                    </Button>
                </Box>
                {images.length > 0 && (
                    <ImageList sx={{ mt: 2 }} cols={3} rowHeight={120}>
                        {images.map((image, index) => (
                            <ImageListItem key={index}>
                                <img
                                    src={image.url}
                                    alt={`Selected ${index + 1}`}
                                    loading="lazy"
                                />
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        color: 'white',
                                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                                    }}
                                    size="small"
                                    onClick={() => handleRemoveImage()}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ImageListItem>
                        ))}
                    </ImageList>
                )}
                {images.length === 0 && (
                    <Typography sx={{ mt: 2, color: 'gray' }}>
                        No images selected.
                    </Typography>
                )}
              
                <Button disabled={loader} onClick={UpcomingEvent} variant="contained"  sx={{ backgroundColor: '#D32D0B',width:'100%',paddingTop:'10px' ,marginTop:'10px' }} startIcon={<Iconify icon="eva:plus-fill" />}>
               {loader ? "Loading..." : "Add Dinner Menu"} 
          </Button>
            </Box>
        </Box>
    </Modal>
    
    );
};

export default DinnerMenuModal;
