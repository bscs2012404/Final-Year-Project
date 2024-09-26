import React from 'react'
import { Box, Divider } from '@mui/material'


const MainCard = ({title, sx, children, p}) => {
  return (
    <Box sx={{fontFamily: "sans-serif",display:'flex', flexDirection: 'column', backgroundColor:'white', borderRadius:'10px', ...sx}}>
        <Box px={3} py={!p ?3 :p} sx={{display:'flex', flexDirection: 'row', alignItems:'center'}}>
        {title}
        </Box>
        {/* <Divider /> */}
        <Box  px={3} py={!p ?3 :p} sx={{fontFamily: "sans-serif"}}>
            {children}
        </Box>
    </Box>
  )
}

export default MainCard