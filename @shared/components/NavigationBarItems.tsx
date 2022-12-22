import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";

import {
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";

import { useSelector, useDispatch } from 'react-redux'

import { RootState } from "../../config/store";
import { handleActiveItem } from "../../config/features/sidebar"

const NavigationBarItems: FC = () => {
  
  const router = useRouter()
  const dispatch = useDispatch()
  const { data:NavigationItems } = useSelector((state: RootState) => state.sideBar)

  useEffect(()=>{
    dispatch(handleActiveItem({path: router.pathname}))
  },[router.pathname])

  return (
    <List>
      {NavigationItems.map((item) => {
        return (
          <ListItemButton key={item.id} selected={item.isActive} sx={{borderRadius: "6px", marginBottom: 1}} onClick={()=>{
            router.push(item.link)
          }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default NavigationBarItems;
