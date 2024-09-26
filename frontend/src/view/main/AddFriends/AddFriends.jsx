import { Box, Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AddCircle, SearchNormal, Trash, UserAdd } from 'iconsax-react';
import Swal from 'sweetalert2'
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from '../../components/Card/MainCard';
import { deleteUser, getUsers } from '../../../redux/admin/adminActions';
import ProtectedAppPage from '../../pages/Protected';
import axios from 'axios';
import { Delete } from '@mui/icons-material';

const columns = [
    {
        title: "First Name",
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: "Last Name",
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email"
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone"
    },
    {
        title: "Send request",
        align: 'center',

    }
];

const rows = [
    {
        fistName: "Muneeb",
        lastName: "khan",
        email: "muneeb1@gmail.com"
    },
    {
        fistName: "Muneeb",
        lastName: "khan",
        email: "muneeb1@gmail.com"
    },
    {
        fistName: "Muneeb",
        lastName: "khan",
        email: "abc@gmail.com"
    }
]




const AddFriends = () => {

    const user = useSelector((state) => state.auth?.user);

    const [userFriends, setUserFriends] = useState(user?.friends);
    const [searchedUsers, setsearchedUsers] = useState();
    const [fetchedResults, setFetchedResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleGetUsers = async () => {
        setLoading(true)
        const res = await dispatch(getUsers());
        setsearchedUsers(res?.results);
        
        // setUserFriends(res?.results?.map(user => user.id));
        // console.log(res?.results?.map(user => user.id), "RESULTS");
        setFetchedResults(res?.results)
        setLoading(false)
    }
    useEffect(() => {
        handleGetUsers()
    }, [])


    const token = localStorage.getItem('token');

    useEffect(() => {
        handleGetUsers();
        axios.get('http://localhost:3001/v1/users/friends', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUserFriends(response.data);
        })
        .catch(error => {
            // setError(error.response.data.message);
            console.log(error);
        });
    }, []);




    const handleAddFriend = async (id) => {
        try {
            await axios.post(`http://localhost:3001/v1/users/friends/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserFriends([...userFriends, id]);
            handleGetUsers();
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
            });
        }
    };

    const handleDeleteFriend = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/v1/users/friends/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserFriends(userFriends.filter(friendId => friendId !== id));
            handleGetUsers();
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
            });
        }
    };

    const handleSearchUser = (e) => {
        const value = e.target.value;
        if (value.trim().length > 0) {
            const foundUsers = searchedUsers?.filter(user => user?.email.includes(value))
            setsearchedUsers(foundUsers)
        } else {
            setsearchedUsers(fetchedResults)
        }
    };

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteUser(id))
                handleGetUsers()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    };

    
    
  return (
    <MainCard title={<h3>Users</h3>}>
      {  loading ?
        <Box p={2} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <CircularProgress size={40}  />
        </Box>
        :
        <>
      <Input placeholder="Search user by email" onChange={handleSearchUser} prefix={<SearchNormal/>} />
        <br />
    <br />
        <TableContainer
        component={Paper}
         >
            <Table  sx={{minWidth:'500px'}}>
                <TableHead>
                    <TableRow>
                        {
                            columns?.map((item, i) => (
                                <TableCell align={item?.align || 'left'} key={i}>{item.title}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                        {
                            searchedUsers?.map((row, i) => (
                                <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={row.id}>
                                    <TableCell>
                                        {row?.firstName}
                                    </TableCell>
                                    <TableCell>
                                        {row?.lastName}
                                    </TableCell>
                                    <TableCell>
                                        {row?.email}
                                    </TableCell>
                                    <TableCell>
                                        {row?.phoneNumber || '---'}
                                    </TableCell>
                                    <TableCell>
                                    {userFriends.includes(row.id) ? (
                                                <Button variant="contained" color="error"  onClick={() => handleDeleteFriend(row.id)}>Unfriend</Button>
                                            ) : (
                                                <Button variant="contained" startIcon={<UserAdd />} onClick={() => handleAddFriend(row.id)}>Add Friend</Button>
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                </TableBody>
            </Table>
        </TableContainer>
        </>}
        <ProtectedAppPage />
    </MainCard>
  )
}

export default AddFriends