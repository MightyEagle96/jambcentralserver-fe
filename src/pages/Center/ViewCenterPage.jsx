import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpService } from "../../services/services";

export default function ViewCenterPage() {
  const [jambCenter, setJambCenter] = useState({});
  const [results, setResults] = useState({});

  const { id } = useParams();

  async function GetCenter() {
    const path = `getCenters/${id}`;
    const res = await httpService.get(path);
    if (res) {
      setJambCenter(res.data.jambCenter);
    }
  }

  async function GetReports() {
    const path = `viewTestResults?center=${id}`;
    const res = await httpService.get(path);
    if (res) {
      setResults(res.data);
    }
  }

  useEffect(() => {
    GetCenter();
    GetReports();
  }, []);
  return (
    <div>
      <div className="p-3">
        <div className="shadow-lg p-5">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="h2">{jambCenter.centerName}</div>
              <div className="mt-2 h4">{jambCenter.referenceNumber}</div>
            </div>
            <div className="col-md-4">
              <div className="h4">
                <i class="fas fa-user"></i>:{" "}
                <span>{jambCenter.centerAdministrator}</span>
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
          <div className="col-md-4">
            {results.centerReports && results.centerReports.length > 0 ? (
              <table className="table table-condensed">
                <thead>
                  <tr>
                    <th>Date Conducted</th>
                  </tr>
                </thead>
                <tbody>
                  {results.centerReports.map((cr, index) => (
                    <tr>{cr.dateConducted}</tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h4">No test result uploaded yet</div>
            )}
          </div>
          <div className="col-md-8"></div>
        </div>
      </div>
    </div>
  );
}
