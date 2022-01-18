import React, { useState, useEffect } from "react";
import { httpService } from "../services/services";

export default function AllCentersPage() {
  const [testCenters, setTestCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  async function GetAllCenters() {
    setLoading(true);
    const path = "getCenters";
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setTestCenters(res.data.jambCenters);
    }
  }

  useEffect(() => {
    GetAllCenters();
  }, []);
  return (
    <div>
      <div className="p-4">
        <div className="mt-3">
          <div className="h3 text-center">ALL TEST CENTERS</div>
          <div className="mt-3">
            {loading ? (
              <div className="text-center mb-3">
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              ""
            )}
            <table className="table table-bordered border-success">
              <thead className="text-center">
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
              <tbody className="text-center">
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
                        <a
                          href={`/viewCenter/${tc._id}`}
                          className="btn btn-link"
                        >
                          View
                        </a>
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
