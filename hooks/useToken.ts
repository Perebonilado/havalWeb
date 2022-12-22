import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AUTH_TOKEN } from "../@shared/constants";

const useToken = () => {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const tokenValue = Cookies.get(`${AUTH_TOKEN}`);
    if (tokenValue) setToken(tokenValue);
  }, []);

  return { token };
};

export default useToken;
