"use client";
import { Button } from "primereact/button";
import { DnsList, Result } from "../types/demo";
import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Menu } from "primereact/menu";
import { InputText } from "primereact/inputtext";
import AddRecord from "./Record";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";

export default function DnsTable() {
  const [products, setProducts] = useState<DnsList | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [dropdownValue, setDropdownValue] = useState(null);

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">List Zone</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const dropdownValues: any[] = [
    { name: "off", code: "off" },
    { name: "flexible", code: "flexible" },
    { name: "full", code: "full" },
    { name: "strict", code: "strict" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/zone");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const statusBodyTemplate = (rowData: Result) => {
    return (
      <>
        <Dropdown
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.value)}
          options={dropdownValues}
          optionLabel="name"
          placeholder="Select"
        />
      </>
    );
  };

  if (products == null) {
    return <></>;
  } else {
    return (
      <div className="card">
        <DataTable
          value={products?.result}
          rows={4}
          paginator
          header={header}
          responsiveLayout="scroll"
        >
          <Column header="id" field="id" sortable style={{ width: "35%" }} />
          <Column
            field="name"
            header="name"
            sortable
            style={{ width: "35%" }}
          />
          <Column
            field="status"
            header="status"
            sortable
            style={{ width: "35%" }}
          />
          <Column
            field="created_on"
            header="created_on"
            sortable
            style={{ width: "35%" }}
          />
          <Column
            field="type"
            header="type"
            sortable
            style={{ width: "35%" }}
          />
          <Column header="ssl setting" body={statusBodyTemplate} />
        </DataTable>
      </div>
    );
  }
}
