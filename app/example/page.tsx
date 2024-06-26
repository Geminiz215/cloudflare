/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductService } from "../../demo/service/ProductService";
import { LayoutContext } from "../../layout/context/layoutcontext";
import Link from "next/link";
import { Demo, DnsList } from "../../types/demo";
import { ChartData, ChartOptions } from "chart.js";
import axios from "axios";

const lineData: ChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: "#2f4860",
      borderColor: "#2f4860",
      tension: 0.4,
    },
    {
      label: "Second Dataset",
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: "#00bb7e",
      borderColor: "#00bb7e",
      tension: 0.4,
    },
  ],
};

const Dashboard = () => {
  return <div className="w-10 h-9 bg-slate-700">sasa</div>;
};

export default Dashboard;
