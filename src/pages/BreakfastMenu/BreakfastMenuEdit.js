/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/order */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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

const BreakfastMenuEdit = ({ EditData, openedit, setOpenedit, handleCloseedit, user }) => {
    const [image, setImage] = useState(null);
    const [imageBinary, setImageBinary] = useState(null);
    const [loader, setLoader] = useState(false);

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Preview the image
            setImageBinary(file); // Save binary for upload
        }
    };

    // Remove the selected image
    const handleRemoveImage = () => {
        setImage(null);
        setImageBinary(null);
    };

    // Submit updated image
    const UpcomingEvent = async () => {
        setLoader(true);
        try {
            const formData = new FormData();
            formData.append('tag_name', 'Breakfast Menu');
            formData.append('image', imageBinary);

            const response = await instance.post(`admin/upcoming/update/${EditData?.id}`, formData);
            const status = response?.data?.status;

            setLoader(false);
            if (status) {
                Swal.fire({
                    title: 'Good job!',
                    text: 'Breakfast Menu Successfully Updated',
                    icon: 'success',
                    button: 'Ok',
                });
                user(); // Refresh parent data
                setOpenedit(false); // Close modal
                setImage(null);
                setImageBinary(null);
            } else {
                Swal.fire({
                    title: 'Update Failed',
                    text: 'Please try again!',
                    icon: 'error',
                });
            }
        } catch (error) {
            setLoader(false);
            Swal.fire({
                title: 'Something Went Wrong',
                text: error?.message,
                icon: 'error',
            });
        }
    };

    return (
        <Modal
            open={openedit}
            onClose={handleCloseedit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <Box sx={style}>
                    {/* Close Modal */}
                    <Box
                        onClick={handleCloseedit}
                        sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                    >
                        X
                    </Box>

                    {/* Modal Title */}
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Image
                    </Typography>

                    {/* Upload Button */}
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" component="label">
                            Select Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </Button>
                    </Box>

                    {/* Image Preview */}
                    <Box sx={{ mt: 2 }}>
                        {image || EditData?.image ? (
                            <Box sx={{ position: 'relative', width: '100%', textAlign: 'center' }}>
                                <img
                                    src={image || EditData?.image}
                                    alt="Selected"
                                    style={{ width: '30%', borderRadius: '8px' }}
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
                                    onClick={handleRemoveImage}
                                >
                                   <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg>
                                </IconButton>
                            </Box>
                        ) : (
                            <Typography sx={{ mt: 2, color: 'gray' }}>
                                No image selected.
                            </Typography>
                        )}
                    </Box>

                    {/* Submit Button */}
                    <Button
                        disabled={loader || !imageBinary}
                        onClick={UpcomingEvent}
                        variant="contained"
                        sx={{
                            backgroundColor: loader ? '#ccc' : '#D32D0B',
                            width: '100%',
                            paddingTop: '10px',
                            marginTop: '10px',
                        }}
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        {loader ? 'Loading...' : 'Update Breakfast Menu'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default BreakfastMenuEdit;
