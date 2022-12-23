import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AUTH_TOKEN } from "../@shared/constants";
import { useRouter } from "next/router";

const useToken = () => {
  const [token, setToken] = useState<string>("");
  const router = useRouter()

  useEffect(() => {
    const tokenValue = Cookies.get(`${AUTH_TOKEN}`);
    if (tokenValue) setToken(tokenValue);
    else router.push("/auth")
  }, []);

  return { token };
};

export default useToken;
