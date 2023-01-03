import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Grid } from "@mui/material";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import WalletCard from "./WalletCard";
import { useGetWalletInfoQuery } from "../../../config/features/api";
import useToken from "../../../hooks/useToken";
import Modal from "../../../@shared/components/Modal";
import FundWalletCard from "./FundWalletCard";
import SkeletonWalletCard from "./SkeletonWalletCard";
import { openDrawer } from "../../../config/features/drawer";
import Withdrawal from "./Withdrawal";

const Wallet: FC = () => {
  const { token } = useToken();
  const [isFundWallet, setIsFundWallet] = useState<boolean>(false);
  const router = useRouter()
  const { wallet_fund_success } = router.query

  const dispatch = useDispatch()

  const {
    data: wallets,
    isLoading: walletsLoading,
    isError: walletsError,
  } = useGetWalletInfoQuery({ token: token }, { skip: !token });

  useEffect(()=>{
    if(wallet_fund_success && wallet_fund_success==="true"){
      toast.success("Wallet Funded Successfully")
    }
  },[router.query])

  return (
    <>
      <Modal
        open={isFundWallet}
        handleClose={() => {
          setIsFundWallet(false);
        }}
      >
        <FundWalletCard />
      </Modal>
      {!walletsError && !walletsLoading && wallets && (
        <Grid container spacing={2} wrap="wrap">
          <Grid item>
            <WalletCard
              title="Revenue Wallet"
              bgColor="linear-gradient(135deg, rgba(108,111,255) 70%, rgba(190,191,245))"
              amount={wallets.revenueWallet.amount}
              buttonText="Withdraw"
              handleWalletAction={()=>{
                dispatch(openDrawer({content: <Withdrawal />}))
              }}
            />
          </Grid>
          <Grid item>
            <WalletCard
              handleWalletAction={() => {
                setIsFundWallet(true);
              }}
              title="Token Wallet"
              bgColor="linear-gradient(135deg, rgba(82,199,202) 70%, rgba(169,217,218))"
              amount={wallets.tokenWallet.amount}
              buttonText="Fund Wallet"
            />
          </Grid>
        </Grid>
      )}
      {!walletsError && walletsLoading && !wallets && (
        <Grid container spacing={2} wrap="wrap">
          <Grid item>
            <SkeletonWalletCard />
          </Grid>
          <Grid item>
            <SkeletonWalletCard />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Wallet;
