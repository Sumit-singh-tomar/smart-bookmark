"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "@/lib/axios";
import { setUser } from "@/redux/slices/userSlices";

export default function GetUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");

        if (res.data?.status === true && res.data?.user) {
          dispatch(setUser(res.data.user));
        }
      } catch (err) {
        console.log("No user found");
      }
    };

    fetchUser();
  }, [dispatch]);

  return null;
}
