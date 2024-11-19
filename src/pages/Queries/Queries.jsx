/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState, useCallback } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  // Avatar,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button,
  Box,
  // Button,
} from '@mui/material';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
// components
import Swal from 'sweetalert2';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { instance } from '../../config/Http';
// sections
import { UserListHead } from '../../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Id', label: 'Id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email' },
  { id: 'message', label: 'Message', alignRight: false },
  { id: 'phone_no', label: 'Phone Number', alignRight: false },
//   { id: 'Desc', label: 'Description', alignRight: false },
//   { id: 'action', label: 'Action', alignCenter: true },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  // console.log(array, 'abdullah ki gand maro');
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Queries = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [USERLIST, setUSERLIST] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const token = localStorage.getItem('accessToken');

  const viewpackage = useCallback(() => {
    setLoader(true);

    instance
      .get('admin/view/contact/info')
      .then((response) => {
        setLoader(false);
        setUSERLIST(response?.data?.data);
        console.log(response, 'series api');
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
    console.log(token);
  }, [token]);

  useEffect(() => {
    viewpackage();
  }, [viewpackage]);

//   const delet = (id) => {
//     setLoader(true);
//     try {
//       instance.delete(`package/${id}`).then((response) => {
//         // setMovie(response.data);
//         console.log(response, 'user =======');
//         if (response?.data.status === true) {
//           setLoader(false);
//           Swal.fire({
//             title: 'Good job! ',
//             text: 'Your User deleted successFully',
//             icon: 'success',
//             button: 'Ok',
//           });
//           viewpackage();
//         } else {
//           setLoader(false);
//         }
//       });
//     } catch (error) {
//       setLoader(false);
//       console.log(error, ' user error');
//       Swal.fire({
//         title: 'Some Thing Went Wrong! ',
//         text: error?.message,
//         icon: 'danger',
//         button: 'Ok',
//       });
//     }
//   };

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [Modalmessage, setmodalmessage] = useState([]);

const handleMessageOpen = (data)=>{
    handleOpen(true)
    setmodalmessage(data)
}

  return (
    <>
      <Helmet>
        <title> Queries | Ole brass rail </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Queries
          </Typography>
          {/* <Button variant="contained" sx={{ backgroundColor: '#D32D0B' }} startIcon={<Iconify icon="eva:plus-fill" />} onClick={()=>navigate('/dashboard/createpackage')}>
            Create Package
          </Button> */}
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, backgroundColor: 'white' }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  onRequestSort={handleRequestSort}
                />


                <TableBody>
                  <Backdrop sx={{ color: 'red', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, email, message, phone_no } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell style={{ width: '10%' }}>
                          <Typography variant="subtitle2">{id}</Typography>
                        </TableCell>

                        <TableCell align="left" style={{ width: '10%' }}>
                          {name}
                        </TableCell>

                        <TableCell align="left" style={{ width: '10%' }}>
                          {email}
                        </TableCell>
                        <TableCell align="left" style={{ width: '20%' ,position:'relative'}}>
                          {message?.slice(0,20)}....
                          <Button onClick={()=>handleMessageOpen(row)} style={{
                            position:'absolute',
                            right:'0',
                            top:"25%",
                          }}>
                          view
                          </Button>
                        </TableCell>
                        <TableCell align="left" style={{ width: '13%' }}>
                          {phone_no}
                        </TableCell>
                        {/* <TableCell align="left" style={{ width: '30%' }}>
                          {desc}
                        </TableCell> */}
                        {/* <TableCell style={{ width: '10%', display: 'flex' }}>
                          <MenuItem sx={{ color: 'error.main' }} onClick={() => navigate(`/dashboard/edit/${id}`)}>
                            <Iconify icon={'eva:eye-outline'} color="#D32D0B" sx={{}} />
                          </MenuItem>
                          <MenuItem sx={{ color: 'error.main' }} onClick={() => delet(id)}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{}} />
                          </MenuItem>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
          
            
            <Box sx={style}>
            <Box onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}>
                X
            </Box>
            <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  onRequestSort={handleRequestSort}
                />

<TableBody>
                  <Backdrop sx={{ color: 'red', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                 
                      <TableRow hover key={"id"} tabIndex={-1}>
                        <TableCell style={{ width: '10%' }}>
                          <Typography variant="subtitle2">{Modalmessage.id}</Typography>
                        </TableCell>

                        <TableCell align="left" style={{ width: '10%' }}>
                          {Modalmessage.name}
                        </TableCell>

                        <TableCell align="left" style={{ width: '10%' }}>
                          {Modalmessage.email}
                        </TableCell>
                        <TableCell align="left" style={{ width: '20%'}}>
                          {Modalmessage.message}
                        </TableCell>
                        <TableCell align="left" style={{ width: '13%' }}>
                          {Modalmessage.phone_no}
                        </TableCell>
                      </TableRow>
                </TableBody>
        </Box>

    </Modal>
    </>
  );



};

export default Queries;
