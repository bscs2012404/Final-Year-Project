import { Box, Typography } from '@mui/material'
import React from 'react'

const FeedbackCards = ({ feedback }) => {

  return (
    <Box p={2} sx={{display:'flex', flexDirection:'column',  borderRadius:'15px', border:'1px solid silver'}}>
        <Typography variant='body2' fontWeight={600}>{`Subject: ${feedback?.subject}`} </Typography>
      <Box sx={{ display: 'flex', }}>
        <Typography variant="caption" sx={{ color: 'grey.500', }}>Date: </Typography>
        <Typography variant="caption" sx={{ color: 'grey.500', ml: 1 }}>{new Date(feedback?.createdAt).toLocaleDateString()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', }}>
        <Typography variant="caption" sx={{ color: 'grey.500', }}>From: </Typography>
        <Typography variant="caption" sx={{ color: 'grey.500', ml: 1 }}>{(feedback?.creator?.name && feedback?.creator?.email) ? `${feedback?.creator?.name} (${feedback?.creator?.email})` : '---'}</Typography>
      </Box>
      <Box mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='body1' fontWeight={600} sx={{ alignSelf: 'flex-start' }}>Feedback:</Typography>
        <Typography variant='caption' sx={{ ml: 1, wordWrap: 'break-word', overflow: 'auto' }}>{feedback?.description}</Typography>
      </Box>
    </Box>
  )
}

export default FeedbackCards