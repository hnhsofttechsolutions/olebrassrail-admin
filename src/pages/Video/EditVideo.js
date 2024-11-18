/* eslint-disable jsx-a11y/media-has-caption */
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

const EditVideo = ({ EditData, openedit, setOpenedit, handleCloseedit, user }) => {
    const [videoPreview, setVideoPreview] = useState(null);
    const [videoBinary, setVideoBinary] = useState(null);
    const [loader, setLoader] = useState(false);

    // Handle video upload
    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoPreview(URL.createObjectURL(file)); // Preview the video
            setVideoBinary(file); // Save binary for upload
        }
    };

    // Remove the selected video
    const handleRemoveVideo = () => {
        setVideoPreview(null);
        setVideoBinary(null);
    };

    // Submit updated video
    const handleSubmitVideo = async () => {
        const formData = new FormData();
        formData.append('video', videoBinary);

        setLoader(true);
        try {
            const response = await instance.post(`admin/video/process`, formData);
            const status = response?.data?.status;

            setLoader(false);
            if (status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Video Update successfully',
                    icon: 'success',
                    button: 'Ok',
                });
                user(); // Refresh parent data
                setOpenedit(false); // Close modal
                setVideoPreview(null);
                setVideoBinary(null);
            } else {
                Swal.fire({
                    title: 'Upload Failed',
                    text: 'Please try again!',
                    icon: 'error',
                });
            }
        } catch (error) {
            setOpenedit(false); // Close modal
            setLoader(false);
            Swal.fire({
                text: "Something Went Wrong",
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
                    <IconButton
                        onClick={handleCloseedit}
                        sx={{ position: 'absolute', top: 10, right: 10 }}
                    >
                       X
                    </IconButton>

                    {/* Modal Title */}
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Video
                    </Typography>

                    {/* Upload Button */}
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" component="label">
                            Select Video
                            <input
                                type="file"
                                accept="video/*"
                                hidden
                                onChange={handleVideoUpload}
                            />
                        </Button>
                    </Box>

                    {/* Video Preview */}
                    <Box sx={{ mt: 2 }}>
                        {videoPreview || EditData?.video ? (
                            <Box sx={{ position: 'relative', width: '100%', textAlign: 'center' }}>
                                <video
                                    src={videoPreview || EditData?.video}
                                    controls
                                    style={{ width: '100%', borderRadius: '8px' }}
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
                                    onClick={handleRemoveVideo}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ) : (
                            <Typography sx={{ mt: 2, color: 'gray' }}>
                                No video selected.
                            </Typography>
                        )}
                    </Box>

                    {/* Submit Button */}
                    <Button
                        disabled={loader || !videoBinary}
                        onClick={handleSubmitVideo}
                        variant="contained"
                        sx={{
                            backgroundColor: loader ? '#ccc' : '#D32D0B',
                            width: '100%',
                            paddingTop: '10px',
                            marginTop: '10px',
                        }}
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        {loader ? 'Uploading...' : 'Edit Video'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditVideo;
