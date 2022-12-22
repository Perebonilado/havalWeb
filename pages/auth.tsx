import { NextPage } from 'next'
import React from 'react'

import Auth from "../@modules/auth/auth"

const auth:NextPage = () => {
  return (
    <>
    <Auth />
    </>
  )
}

export default auth