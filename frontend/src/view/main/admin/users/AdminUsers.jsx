import { Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MainCard from '../../../components/Card/MainCard'
import { SearchNormal, Trash } from 'iconsax-react';
import Swal from 'sweetalert2'
import { Input } from 'antd';
import ProtectedAppPage from '../../../pages/Protected';
import { useDispatch } from 'react-redux';
import { deleteUser, getUsers } from '../../../../redux/admin/adminActions';

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
        title: "Action",
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




const AdminUsers = () => {


    const [searchedUsers, setsearchedUsers] = useState();
    const [fetchedResults, setFetchedResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleGetUsers = async () => {
        setLoading(true)
        const res = await dispatch(getUsers());
        setsearchedUsers(res?.results);
        setFetchedResults(res?.results)
        setLoading(false)
    }
    useEffect(() => {
        handleGetUsers()
    }, [])

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
                                        <Box sx={{display:'flex', columnGap:'20px', justifyContent:'center', alignItems:'center'}}>
                                            <IconButton onClick={() => handleDeleteClick(row.id)}>
                                            <Trash size={22} />
                                            </IconButton>
                                        </Box>
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

export default AdminUsers