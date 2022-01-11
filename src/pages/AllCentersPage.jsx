import React, { useState, useEffect } from "react";
import { httpService } from "../services/services";
import CreateCenterPage from "./CreateCenterPage";

export default function AllCentersPage() {
  const [testCenters, setTestCenters] = useState([]);

  async function GetAllCenters() {
    const path = "jamb/getCenters";
    const res = await httpService.get(path);
    if (res) {
      setTestCenters(res.data.jambCenters);
    }
  }

  useEffect(() => {
    GetAllCenters();
  }, []);
  return (
    <div>
      <div className="p-4">
        <CreateCenterPage GetCenters={GetAllCenters} />
        <div className="mt-3">
          <div className="h3 text-center">ALL TEST CENTERS</div>
          <div className="mt-3">
            <table className="table table-bordered border-success">
              <thead className="">
                <tr>
                  <th>S/N</th>
                  <th>Center Name</th>
                  <th>Reference Number</th>
                  <th>State</th>
                  <th>Local Government Area</th>
                  <th>Address</th>
                  <th>Center Administator</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {testCenters.map((tc, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{tc.centerName}</td>
                      <td>{tc.referenceNumber.toUpperCase()}</td>
                      <td>{tc.state}</td>
                      <td>{tc.localGovernmentArea}</td>
                      <td>{tc.address}</td>
                      <td>{tc.centerAdministrator}</td>
                      <td>{tc.email}</td>
                      <td>{tc.phoneNumber}</td>
                      <td>
                        <button className="btn btn-link">View Center</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
