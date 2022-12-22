import { NextPage } from 'next'
import React from 'react'

import Layout from '../../layout'
import Upload from '../../@modules/upload/Upload'

const upload:NextPage = () => {
  return (
    <Layout>
      <Upload />
    </Layout>
  )
}

export default upload