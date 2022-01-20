import React, { useState } from "react";
import Swal from "sweetalert2";
import { httpService } from "../../services/services";

export default function CreateSubject({ getSubjects }) {
  const [subject, setSubject] = useState("");
  function CreateSubject(e) {
    e.preventDefault();
    Swal.fire({
      icon: "question",
      titleText: "Create Subject",
      text: "Do you wish to create this subject?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = "createSubject";
        const res = await httpService.post(path, { subject });
        if (res) {
          Swal.fire({ icon: "success", titleText: res.data.message });
          if (getSubjects) {
            getSubjects();
          }
        }

        setSubject("");
      }
    });
  }
  return (
    <div className="card">
      <div className="p-3">
        <form onSubmit={CreateSubject}>
          <input
            type="text"
            name=""
            id=""
            className="form-control"
            placeholder="Subject Name"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            required
            value={subject}
          />
          <div className="mt-3">
            <button className="btn btn-success" type="submit">
              Create Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
