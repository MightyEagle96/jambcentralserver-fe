import React, { useState, useEffect } from "react";
import { getAllCenterApi } from "../redux/actions/centerActions";
import { httpService } from "../services/services";
import store from "store";
import { errorAlert } from "../components/alerts";
import PageHelmet from "../utils/PageHelmet";
import Loader from "../components/elements/Loader";

export default function AllCentersPage() {
  const [testCenters, setTestCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetAllCenters = async () => {
    setLoading(true);
    try {
      const response = await getAllCenterApi();
      setTestCenters(response.jambCenters);
      setLoading(false);
    } catch (error) {
      errorAlert(error);
    }
  };

  useEffect(() => {
    GetAllCenters();
  }, []);

  return (
    <>
      <PageHelmet title="All Test Centers" />
      <div className="p-4">
        <div className="mt-3">
          <div className="h3 text-center">ALL TEST CENTERS</div>
          <div className="mt-3">
            {loading && <Loader />}
            {testCenters.length !== 0 && (
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
                  {testCenters?.map((tc, index) => {
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
