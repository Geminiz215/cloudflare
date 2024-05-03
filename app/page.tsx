"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Direct = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/getUserData");
        console.log(response.data.success);
        if (response.data.data) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching user data:", error.response?.data);
        }
        window.location.href = "/login";
      }
    };
    fetchData();
  });
  return <div className=""></div>;
};

export default Direct;
