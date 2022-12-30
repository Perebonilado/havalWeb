import { NextPage } from 'next'

import Layout from '../../layout'
import Wallet from '../../@modules/wallets/components/Wallet'

const index:NextPage = () => {
  return (
    <Layout>
        <Wallet />
    </Layout>
  )
}

export default index