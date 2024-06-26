import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

export default function AddRecord() {
  return (
    <div className="col-12">
      <div className="card">
        <h5>Advanced</h5>
        <div className="p-fluid formgrid grid">
          <div className="field col-12 md:col-6">
            <label htmlFor="firstname2">Firstname</label>
            <InputText id="firstname2" type="text" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="lastname2">Lastname</label>
            <InputText id="lastname2" type="text" />
          </div>
          <div className="field col-12">
            <label htmlFor="address">Address</label>
            <InputTextarea id="address" rows={4} />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="city">City</label>
            <InputText id="city" type="text" />
          </div>
          {/* <div className="field col-12 md:col-3">
              <label htmlFor="state">State</label>
              <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
          </div> */}
          <div className="field col-12 md:col-3">
            <label htmlFor="zip">Zip</label>
            <InputText id="zip" type="text" />
          </div>
        </div>
        <Button label="Submit"></Button>
      </div>
    </div>
  );
}
