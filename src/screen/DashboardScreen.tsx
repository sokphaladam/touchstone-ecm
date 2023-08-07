"use client";
import { UserContext } from "@/context/UserContext";
import { WithAuth } from "@/hook/WithAuth";
import React, { useContext } from "react";

export function DashboardLayout() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div>{user?.name}</div>
      <div>{user?.mainRole}</div>
      <button onClick={()=>{
        localStorage.removeItem('token');
      }}>logout</button>
    </div>
  );
}

export const DashboardScreen = () => WithAuth(DashboardLayout, 'SELLER');