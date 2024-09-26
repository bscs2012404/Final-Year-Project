import { Box, Button, Divider, FormHelperText, Modal, Paper, Typography } from '@mui/material'
import { Avatar } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { User } from 'iconsax-react'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../../../redux/newsfeed/newsfeedAction'

const CreatePostCard = ({handleGetPost}) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true)
    };
    const modalProps = {
        open,
        handleClose,
        handleGetPost
    }
    return (
        <Paper elevation={1} sx={{ p: 2, display: 'flex', columnGap: '10px', width: '100%', flexDirection: 'column' }}>
            <Typography variant='subtitle1' fontWeight={600}>Create Post</Typography>
            <Box mt={1} sx={{ display: 'flex', columnGap: '10px' }}>
                <Avatar shape="circle" icon={<User />} />
                <Box onClick={handleOpen} py={1} px={1.5} sx={{ display: 'flex', backgroundColor: '#f0f2f5', borderRadius: '15px', width: '100%', cursor: 'pointer', alignItems: 'center', '&:hover': { backgroundColor: '#e4e6e9' } }}>
                    <Typography variant='subtitle2' sx={{ color: '#6f7175' }}>What's on your mind</Typography>
                </Box>
            </Box>
            <CreatePostModal {...modalProps} />
        </Paper>
    );
}

export default CreatePostCard;


const CreatePostModal = ({ open, handleClose, handleGetPost }) => {
    const [content, setContent] = useState('');
    const [error, seterror] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const submit = async () => {
        if (content.trim() === '') {
            seterror("Some content is required")
            return
        }
        const payload = {
            content,
            user: user.id
        }
        const res = await dispatch(createPost(payload));
        setContent('')
        handleClose()
        handleGetPost();

    };

    const checkError = () => {
        if (content.trim() === '') {
            seterror("Some content is required")
            return
        }
    }

    return (
        <Modal open={open} onClose={handleClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 0 }}>
            <Box p={2} sx={{ display: 'flex', backgroundColor: 'white', borderRadius: '12px', flexDirection: 'column', width: '450px' }}>
                <Typography variant='body1' fontWeight={600} textAlign={'center'}>Create Post</Typography>
                <Divider sx={{ my: 1, mb: 3 }} />
                <TextArea
                    placeholder='Write Post'
                    rows={5}
                    value={content}
                    onFocus={() => seterror('')}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={checkError}
                />
                {error && (
                    <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                    >
                        {error}
                    </FormHelperText>
                )}
                <Button sx={{ mt: 3 }} onClick={submit} fullWidth variant='contained'>Post</Button>
            </Box>
        </Modal>
    );
};