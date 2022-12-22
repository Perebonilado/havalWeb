import React, { FC } from 'react'

import { Skeleton, Stack } from "@mui/material"

const SkeletonLoader:FC = () => {
  return (
    <Stack spacing={.2}>
        <Skeleton animation="pulse" sx={{borderRadius: "6px"}} variant="rectangular" width={103} height={160}/>
        <Skeleton animation="pulse" variant="text" sx={{ fontSize: '5px' }} width={60}/>
        <Skeleton animation="pulse" variant="text" sx={{ fontSize: '5px' }} width={40}/>
        <Skeleton animation="pulse" variant="text" sx={{ fontSize: '5px' }} width={20}/>
    </Stack>
  )
}

export default SkeletonLoader