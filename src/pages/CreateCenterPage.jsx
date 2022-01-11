import React, { useState } from "react";
import Swal from "sweetalert2";
import { statesAndLgas } from "../data/statesAndLGAs";
import { httpService } from "../services/services";

export default function CreateCenterPage({ GetCenters }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  function HandleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function CreateCenter(e) {
    e.preventDefault();
    setLoading(true);
    const path = "jamb/createCenter";
    const res = await httpService.post(path, formData);
    if (res) {
      setFormData({});
      setLoading(false);
      Swal.fire({
        icon: "success",
        titleText: "Success",
        text: "New Center Created",
        showConfirmButton: false,
        timer: 2000,
      });
      if (GetCenters) {
        GetCenters();
      }
    }
  }
  return (
    <div>
      <div className="border border-dark p-4">
        <div className=" h3 mb-4">Create Test Center</div>
        <form onSubmit={CreateCenter}>
          <div className="d-flex flex-wrap">
            <div className="form-group mb-2 me-3">
              <label htmlFor="centerName">Center Name:</label>
              <input
                type="text"
                name="centerName"
                onChange={HandleChange}
                value={formData.centerName}
                id="centerName"
                className="form-control"
                style={{ width: 300 }}
              />
            </div>
            <div className="form-group mb-2 me-3">
              <label htmlFor="centerName">State:</label>
              <select
                name="state"
                id=""
                className="form-control"
                style={{ width: 300 }}
                value={formData.state}
                onChange={HandleChange}
              >
                <option value="">Select a state</option>
                {statesAndLgas.map((s, index) => (
                  <option key={index} value={s.state}>
                    {s.state}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-2 me-3">
              <label htmlFor="centerName">Local Government Area:</label>
              <select
                disabled={formData.state ? false : true}
                name="localGovernmentArea"
                id=""
                className="form-control"
                style={{ width: 300 }}
                value={formData.localGovernmentArea}
                onChange={HandleChange}
              >
                <option value="">Select local govenment area</option>
                {formData.state
                  ? statesAndLgas
                      .find((s) => s.state === formData.state)
                      .lgas.map((lga, index) => (
                        <option key={index} value={lga}>
                          {lga}
                        </option>
                      ))
                  : ""}
              </select>
            </div>

            <div className="form-group mb-2 me-3">
              <label htmlFor="">Address:</label>
              <textarea
                name="address"
                id=""
                cols="30"
                rows="3"
                style={{ width: 300 }}
                onChange={HandleChange}
                className="form-control"
                value={formData.address}
              ></textarea>
            </div>
            <div className="form-group mb-2 me-3">
              <label htmlFor="centerName">Number of computers:</label>
              <input
                type="number"
                name="computers"
                id="centerName"
                className="form-control"
                style={{ width: 300 }}
                onChange={HandleChange}
                value={formData.computers}
              />
            </div>
            <div className="form-group mb-2 me-3">
              <label htmlFor="centerName">Number of Backup computers:</label>
              <input
                type="number"
                name="backupComputers"
                id="backupComputers"
                className="form-control"
                style={{ width: 300 }}
                onChange={HandleChange}
                value={formData.backupComputers}
              />
            </div>
            <div className="form-group mb-2 me-3">
              <label htmlFor="centerAdministrator">Center Administrator:</label>
              <input
                type="text"
                name="centerAdministrator"
                id="centerAdministrator"
                className="form-control"
                style={{ width: 300 }}
                onChange={HandleChange}
                value={formData.centerAdministrator}
              />
            </div>
            <div className="form-group mb-2 me-3">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                style={{ width: 300 }}
                onChange={HandleChange}
                value={formData.email}
              />
            </div>
            <div className="form-group mb-2 me-3">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="telephone"
                name="phoneNumber"
                id="phoneNumber"
                className="form-control"
                style={{ width: 300 }}
                onChange={HandleChange}
                value={formData.phoneNumber}
              />
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-success me-2" type="submit">
              {loading ? (
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Create Center"
              )}
            </button>
            <button className="btn btn-danger" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
