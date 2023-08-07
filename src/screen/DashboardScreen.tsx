"use client";
import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";

export function DashboardScreen() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div>{user?.name}</div>
      <div>{user?.mainRole}</div>
    </div>
  );
}
