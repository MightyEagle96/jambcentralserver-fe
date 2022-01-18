import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpService } from "../../services/services";

export default function ViewCenterPage() {
  const [jambCenter, setJambCenter] = useState(null);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  async function GetCenter() {
    setLoading(true);
    const path = `getCenters/${id}`;
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      document.title = res.data.jambCenter.centerName;
      setJambCenter(res.data.jambCenter);
    }
  }

  async function GetReports() {
    setLoading(true);
    const path = `viewTestResults?center=${id}`;
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setResults(res.data);
      console.log(res.data);
    }
  }

  useEffect(() => {
    GetCenter();
    GetReports();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="text-center mb-3 mt-5">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        ""
      )}
      {jambCenter ? (
        <div className="p-3">
          <div className="shadow-lg p-5">
            <div className="row text-center">
              <div className="col-md-6">
                <div className="h2">{jambCenter.centerName.toUpperCase()}</div>
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
                  {results.centerReports && results.centerReports.length > 0 ? (
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
      )}
    </div>
  );
}
