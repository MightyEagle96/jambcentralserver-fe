import React, { useState, useEffect } from "react";
import { httpService } from "../../services/services";
import CreateSubject from "./CreateSubject";

export default function UtmeSubjectsView() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  async function GetSubjects() {
    setLoading(true);
    const path = "viewSubjects";
    const res = await httpService.get(path);

    if (res) {
      console.log(res.data);
      setSubjects(res.data.subjects);
      setLoading(false);
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
              {loading ? (
                <div className="text-center mb-3">
                  <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                ""
              )}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Subject</th>
                    <th>Set Exam Question</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((sub, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{sub.title}</td>
                        <td>
                          <a
                            href={`/questions/${sub._id}`}
                            className="btn btn-outline-success"
                          >
                            Set Question
                          </a>
                        </td>
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
