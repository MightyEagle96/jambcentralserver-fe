import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { httpService } from "../../services/services";
import QuestionsCreate from "./QuestionsCreate";
import { useAlert } from "react-alert";

export default function QuestionsView() {
  const [subjectData, setSubjectData] = useState({});
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const { id } = useParams();

  async function GetSubjectData() {
    setLoading(true);
    const path = `viewSubjects?slug=${id}`;
    const res = await httpService.get(path);

    if (res && res.data.subjects.length > 0) {
      setSubjectData(res.data.subjects[0]);
      setLoading(false);
    } else {
      setLoading(false);
      alert.error("Cannot get questions");
    }
  }
  useEffect(() => {
    GetSubjectData();
  }, []);
  return (
    <div>
      <QuestionsCreate
        subjectData={subjectData}
        getSubjectData={GetSubjectData}
      ></QuestionsCreate>
      {loading ? (
        <div className="text-center">
          <div
            className="spinner-border text-success"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className=" p-3">
        <div className="card p-3">
          <div className="card-title">
            <div className="h3">{subjectData.title}</div>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Question</th>
                  <th>Option A</th>
                  <th>Option B</th>
                  <th>Option C</th>
                  <th>Option D</th>
                  <th>Correct Answer</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {subjectData && subjectData.questions
                  ? subjectData.questions.map((sub, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{sub.question}</td>
                        <td>{sub.optionA}</td>
                        <td>{sub.optionB}</td>
                        <td>{sub.optionC}</td>
                        <td>{sub.optionD}</td>
                        <td>{sub.correctAnswer}</td>
                        <td>
                          <button className="btn btn-light text-warning">
                            <i class="fas fa-edit    "></i>
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-light text-danger">
                            <i class="fas fa-trash    "></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
