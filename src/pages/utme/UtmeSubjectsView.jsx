import React, { useState, useEffect } from "react";
import { httpService } from "../../services/services";
import CreateSubject from "./CreateSubject";

export default function UtmeSubjectsView() {
  const [subjects, setSubjects] = useState([]);

  async function GetSubjects() {
    const path = "viewSubjects";
    const res = await httpService.get(path);

    if (res) {
      setSubjects(res.data.subjects);
    }
  }

  useEffect(() => {
    GetSubjects();
  }, []);
  return (
    <div>
      <div className="mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="p-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((sub, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{sub.subject}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3">
              <CreateSubject getSubjects={GetSubjects}></CreateSubject>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
