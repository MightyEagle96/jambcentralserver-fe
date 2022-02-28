import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { httpService } from "../../services/services";
import QuestionsCreate from "./QuestionsCreate";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { Chip } from "@mui/material";

export default function QuestionsView() {
  const [subjectData, setSubjectData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadSpecific, setLoadSpecific] = useState({
    loading: false,
    id: "",
    type: "",
  });
  const [singleQuestion, setSingleQuestion] = useState(null);
  const alert = useAlert();

  const { id } = useParams();

  async function GetSubjectData() {
    setLoading(true);
    const path = `viewSubjects?_id=${id}`;
    setLoading(true);
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setSubjectData(res.data.subjects[0]);
    } else {
      alert.error("Cannot get subject data");
    }
  }
  async function FetchQuestions() {
    setLoading(true);
    const path = `viewQuestions?subject=${id}`;
    const res = await httpService.get(path);

    if (res && res.data.questions) {
      setQuestions(res.data.questions[0].questions);
      setLoading(false);
    } else {
      setLoading(false);
      alert.error("Cannot get questions");
    }
  }

  const FetchQuestion = async (questionId) => {
    setLoadSpecific({ loading: true, id: questionId, type: "edit" });
    const path = `viewQuestion/${subjectData._id}/${questionId}`;
    const res = await httpService.get(path);
    if (res) {
      setLoadSpecific({ loading: false, id: "" });

      setSingleQuestion(res.data.question);

      setTimeout(() => {
        setSingleQuestion(null);
      }, 3000);
    }
  };
  const DeleteQuestion = (questionId) => {
    Swal.fire({
      icon: "question",
      title: "Delete Question",
      text: "Do you wish to delete this question?",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadSpecific({ loading: true, id: questionId, type: "delete" });
        const path = `deleteQuestion/${subjectData._id}/${questionId}`;
        const res = await httpService.delete(path);
        if (res) {
          setLoadSpecific({ loading: false, id: "", type: "" });

          setSingleQuestion(res.data.question);
          FetchQuestions();
        }
      }
    });
  };

  useEffect(() => {
    GetSubjectData();
    FetchQuestions();
  }, []);

  const columns = [
    { name: "Question", selector: (row) => truncateString(row.question, 100) },
    { name: "Option A", selector: (row) => truncateString(row.optionA, 50) },
    { name: "Option B", selector: (row) => truncateString(row.optionB, 50) },
    { name: "Option C", selector: (row) => truncateString(row.optionC, 50) },
    { name: "Option D", selector: (row) => truncateString(row.optionD, 50) },
    {
      name: "Correct Answer",
      selector: (row) => truncateString(row.correctAnswer, 50),
    },
    { name: "Group Status", selector: (row) => Grouping(row) },
    {
      name: "Edit",
      selector: (row) => (
        <button
          className="btn btn-light text-warning"
          onClick={() => {
            FetchQuestion(row._id);
          }}
        >
          {loadSpecific.loading &&
          loadSpecific.id === row._id &&
          loadSpecific.type === "edit" ? (
            <div
              class="spinner-border spinner-border-sm text-warning"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <i class="fas fa-edit    "></i>
          )}
        </button>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <button
          className="btn btn-light text-danger"
          onClick={() => {
            DeleteQuestion(row._id);
          }}
        >
          {loadSpecific.loading &&
          loadSpecific.id === row._id &&
          loadSpecific.type === "delete" ? (
            <div
              class="spinner-border spinner-border-sm text-danger"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <i class="fas fa-trash    "></i>
          )}
        </button>
      ),
    },
  ];

  const ExpandedComponent = ({ data }) => (
    <div className="container ">
      <div className="row shadow-lg p-3 mb-2 mt-2">
        <div className="col-md-6">
          <b>Question:</b>
          <p>{data.question}</p>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-3">
              <div>
                <b>Option A:</b>
                <p>{data.optionA}</p>
              </div>
              <div>
                <b>Option B:</b>
                <p>{data.optionB}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <b>Option C:</b>
                <p>{data.optionC}</p>
              </div>
              <div>
                <b>Option D:</b>
                <p>{data.optionD}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  function Grouping(data) {
    if (data.startGroup) {
      return (
        <Chip
          label="Group Started"
          color="success"
          onClick={() => {
            RemoveStartGroup(data);
          }}
        />
      );
    } else if (data.stopGroup) {
      return (
        <Chip
          label="Group Stopped"
          color="error"
          onClick={() => {
            RemoveStopGroup(data);
          }}
        />
      );
    } else return "-";
  }

  function RemoveStartGroup(data) {
    Swal.fire({
      icon: "question",
      title: "Remove Start Group",
      text: "Do you want to remove start group flag for this question",
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "No don't remove",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = `updateQuestion/${subjectData._id}/${data._id}`;
        data.startGroup = false;
        const res = await httpService.patch(path, data);
        if (res) {
          FetchQuestions();
          Swal.fire({
            icon: "success",
            title: "SUCCESS",
            text: "Start group removed successfully",
          });
        }
      }
    });
  }

  function RemoveStopGroup(data) {
    Swal.fire({
      icon: "question",
      title: "Remove Start Group",
      text: "Do you want to remove stop group flag for this question",
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "No don't remove",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = `updateQuestion/${subjectData._id}/${data._id}`;
        data.stopGroup = false;
        const res = await httpService.patch(path, data);
        if (res) {
          FetchQuestions();
          Swal.fire({
            icon: "success",
            title: "SUCCESS",
            text: "Stop group removed successfully",
          });
        }
      }
    });
  }
  return (
    <div>
      <QuestionsCreate
        subjectData={subjectData}
        FetchQuestion={FetchQuestions}
        singleQuestion={singleQuestion}
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
        <DataTable
          columns={columns}
          data={questions}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          pagination
          responsive
          subHeaderWrap
          title={subjectData.title}
        />
      </div>
    </div>
  );
}
