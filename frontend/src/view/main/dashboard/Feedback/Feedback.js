import React, { useEffect } from 'react'
import FeedbackCards from './FeedbackCards'
import { Box, Divider, Paper, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { getFeedbacks } from '../../../../redux/feedback/feedbackActions'
import { useState } from 'react'
import ProtectedAppPage from '../../../pages/Protected'

const Feedbacks = () => {
    const dispatch = useDispatch();
    const [feedbacks, setFeedbacks] = useState([]);

    const handleGetFeedbacks = async () => {
        const res = await dispatch(getFeedbacks());
        setFeedbacks(res?.feedbacks)
    }
    useEffect(() => {
        handleGetFeedbacks();
    }, []);


    return (
        <Paper sx={{padding:'30px'}} elevation={1} darkTitle={true}>
            <Typography fontWeight={600} variant='h6'>Feedbacks</Typography>
            <Divider sx={{mt:1, mb:3}} />
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '30px' }}>
                {
                    feedbacks?.length > 0
                    &&
                    feedbacks?.map(feedback => (
                        <FeedbackCards key={feedback?.id} feedback={{description:feedback?.content, subject:feedback?.subject, creator:{email:feedback?.user?.email, name: `${feedback?.user?.firstName} ${feedback?.user?.lastName}`},  createdAt:feedback?.createdAt}} />
                    ))
                }
            </Box>
            <ProtectedAppPage />
        </Paper>
    )
}

export default Feedbacks