import { NextPage } from 'next'
import React from 'react'

import Auth from "../@modules/auth/Auth"

const auth:NextPage = () => {
  return (
    <>
    <Auth />
    </>
  )
}

export default auth