import React, { useState } from "react";
import Swal from "sweetalert2";
import { httpService } from "../../services/services";
import ControlledEditor from "../../components/elements/Editor";

export default function CreateSubject({ getSubjects }) {
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const path = "createSubject";
        const res = await httpService.post(path, { title: subject });
        if (res) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            titleText: res.data.message,
            timer: 2000,
          });
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
      <div className="card-header">Create new subject</div>
      <div className="card-body">
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
                {loading ? (
                  <div className="">
                    <div class="spinner-border text-white" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  "Create Subject"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <>
    //   {/* <form>

    //     <div className="mt-3">
    //       <button className="btn btn-success" type="submit">
    //         {loading ? (
    //           <div className="">
    //             <div class="spinner-border text-white" role="status">
    //               <span class="visually-hidden">Loading...</span>
    //             </div>
    //           </div>
    //         ) : (
    //           "Create Subject"
    //         )}
    //       </button>
    //     </div>
    //   </form> */}
    // </>
  );
}
