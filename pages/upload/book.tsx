import { NextPage } from 'next'
import React from 'react'

import Layout from '../../layout'
import UploadBookForm from '../../@modules/upload/components/UploadBookForm'

const book:NextPage = () => {
  return (
    <Layout>
        <UploadBookForm />
    </Layout>
  )
}

export default book