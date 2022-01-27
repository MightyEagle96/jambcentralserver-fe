import React, { useState, useEffect } from "react";
import { httpService } from "../../services/services";

export default function CandidatesView() {
  const [candidates, setCandidates] = useState([]);
  async function FetchCandidates() {
    const path = "viewCandidates";
    const res = await httpService.get(path);

    if (res) {
      console.log(res.data);
      setCandidates(res.data.candidates);
    }
  }

  useEffect(() => {
    FetchCandidates();
  }, []);

  return (
    <div>
      <div className="m-3">
        <div className="d-flex justify-content-between">
          <div className="h3">Registered Candidates</div>
          <div>
            <a href="/createCandidate" className="btn btn-success">
              Create New Candidate
            </a>
          </div>
        </div>
        <div className="mt-2">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S/N</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Registration Number</th>
                <th>Seat Number</th>
                <th>Center</th>
                <th>Subject Combinations</th>

                <th>Taken Exam</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length > 0 ? (
                candidates.map((candidate, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{candidate.firstName}</td>
                    <td>{candidate.lastName}</td>
                    <td>{candidate.registrationNumber.toUpperCase()}</td>
                    <td>{candidate.seatNumber}</td>
                    <td>{candidate.center.centerName}</td>
                    <td>
                      {candidate.subjectCombinations
                        .map((sub) => sub.subject.title)
                        .join(", ")}
                    </td>
                    <td>NO</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>NO CANDIDTATES REGISTERED</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
