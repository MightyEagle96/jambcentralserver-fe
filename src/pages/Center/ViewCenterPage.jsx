import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { errorAlert } from "../../components/alerts";
import Loader from "../../components/elements/Loader";
import {
  getCenterByIdApi,
  getCenterReportsApi,
} from "../../redux/actions/centerActions";
import PageHelmet from "../../utils/PageHelmet";

export default function ViewCenterPage() {
  const [jambCenter, setJambCenter] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const columns = [
    {
      name: "Exam Date",
      selector: "dateConducted",
      sortable: true,
    },
    {
      name: "Network Test No.",
      selector: "networkTestDuration",
      sortable: true,
    },
    {
      name: "Exam Date",
      selector: "overallTestPerformance",
      sortable: true,
    },
    {
      name: "Time Started",
      selector: (row) => <div>{`${row.timeStarted.split(" ")[0]}`}</div>,
      sortable: true,
    },
    {
      name: "Time Ended",
      selector: (row) => <div>{`${row.timeStopped.split(" ")[0]}`}</div>,
      sortable: true,
    },
    {
      name: "Connected Computers",
      selector: (row) => <div>{`${row.connectedComputers.length}`}</div>,
      sortable: true,
    },
  ];

  const GetCenterDetails = async (id) => {
    setLoading(true);
    try {
      const response = await getCenterByIdApi(id);
      setJambCenter(response.jambCenter);
      setLoading(false);
    } catch (error) {
      errorAlert(error);
    }
  };

  const GetCenterReport = async () => {
    setLoading(true);
    try {
      const response = await getCenterReportsApi(id);
      setResults(response);
    } catch (error) {
      errorAlert(error);
    }
  };

  useEffect(() => {
    GetCenterReport();
    GetCenterDetails(id);
  }, []);

  return (
    <>
      <PageHelmet title={jambCenter.centerName || "Profile Records"} />
      <div className="container">
        {/* {loading && <Loader />} */}
        <div className="row py-5">
          <div className="col-md-4">
            {jambCenter !== "" && (
              <div className="card card-custom">
                <div className="card-body">
                  <div className="row py-5">
                    <h3 className="h3">{jambCenter.centerName}</h3>
                    <p>{jambCenter.referenceNumber}</p>
                    <p>{jambCenter.centerAdministrator}</p>
                    <p>{jambCenter.email}</p>
                    <p>{jambCenter.phoneNumber}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col md-8">
            <DataTable
              title={
                `${jambCenter.centerName}`
                  ? `${jambCenter.centerName} Details`
                  : "Center Details"
              }
              columns={columns}
              data={results.centerReports}
              highlightOnHover
              pointerOnHover
              progressPending={loading}
              progressComponent={<Loader />}
              pagination
              paginationServer
            />
          </div>
        </div>
        {/* {jambCenter ? (
          <div className="p-3">
            <div className="shadow-lg p-5">
              <div className="row text-center">
                <div className="col-md-6">
                  <div className="h2">
                    {jambCenter.centerName.toUpperCase()}
                  </div>
                  <div className="mt-2 h4">
                    {jambCenter.referenceNumber.toUpperCase()}
                  </div>
                </div>

                <div className="col-md-4">
                  Total Number of tests conducted:{" "}
                  <span className="me-2">
                    <strong>{results.reports}</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">
                      <div className="h3 mb-3">Tests Conducted</div>
                    </div>
                    {results.centerReports &&
                    results.centerReports.length > 0 ? (
                      <table className="table table-bordered">
                        <thead className="text-center">
                          <tr>
                            <th>S/N</th>
                            <th>Date Conducted</th>
                            <th>Network Test Duration</th>
                            <th>Time Started</th>
                            <th>Time Stopped</th>
                            <th>Number of Systems Tested</th>
                            <th>Overall Test Performance</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {results.centerReports.map((cr, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{cr.dateConducted}</td>
                              <td>{cr.networkTestDuration} Minutes</td>
                              <td>{cr.timeStarted.split(" ")[0] || "-"}</td>
                              <td>{cr.timeStopped.split(" ")[0] || "-"}</td>
                              <td>{cr.connectedComputers.length}</td>
                              <td>{cr.overallTestPerformance}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="h4">No test result uploaded yet</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6"></div>
            </div>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </>
  );
}
