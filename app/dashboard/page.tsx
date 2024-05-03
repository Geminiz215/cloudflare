"use client";
import DnsTable from "@/components/DnsList";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ChangeEvent, Fragment, useState } from "react";
import style from "./page.module.scss";
import axios from "axios";
const test1 = () => {
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [input, setInput] = useState("");
  const [ErrorZone, setErrorZone] = useState("");

  const confirmationDialogFooter = (
    <>
      <Button
        type="button"
        label="No"
        icon="pi pi-times"
        onClick={() => setDisplayConfirmation(false)}
        text
      />
      <Button
        type="button"
        label="Yes"
        icon="pi pi-check"
        onClick={() => submitZone()}
        text
        autoFocus
      />
    </>
  );

  const basicDialogFooter = (
    <Button
      type="button"
      label="OK"
      onClick={() => setDisplayBasic(false)}
      icon="pi pi-check"
      outlined
    />
  );

  const submitZone = async () => {
    setDisplayConfirmation(false);
    try {
      const response = await axios.post("/api/zone", {
        name: input,
        jump_start: false,
      });
      setInput("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setInput("");
        setErrorZone(error.response?.data.data.errors[0].message);
        setDisplayBasic(true);
      }
    }
  };

  return (
    <Fragment>
      <div className="col-12 xl:col-6 max-w-full xl:flex  ">
        <DnsTable />
      </div>
      <div className="col-12 xl:col-6 flex ">
        <div className="card ">
          <h5>Create New Zone</h5>
          <div className={"field p-fluid"}>
            <label htmlFor="username">example : thif.id</label>
            <InputText
              id="username"
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <Button
              icon="pi pi-check"
              label="submit"
              className={style.btn1}
              onClick={() => setDisplayConfirmation(true)}
            />
            <Dialog
              header="Confirmation"
              visible={displayConfirmation}
              onHide={() => setDisplayConfirmation(false)}
              style={{ width: "350px" }}
              modal
              footer={confirmationDialogFooter}
            >
              <div className="flex align-items-center justify-content-center">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: "2rem" }}
                />
                <span>Are you sure you want to proceed?</span>
              </div>
            </Dialog>
            <Dialog
              header="Error"
              visible={displayBasic}
              style={{ width: "30vw", minWidth: "300px" }}
              modal
              footer={basicDialogFooter}
              onHide={() => setDisplayBasic(false)}
            >
              <p>{ErrorZone}</p>
            </Dialog>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default test1;
