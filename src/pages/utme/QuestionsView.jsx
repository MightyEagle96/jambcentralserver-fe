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
    { name: "Question", selector: (row) => row.question },
    { name: "Option A", selector: (row) => row.optionA },
    { name: "Option B", selector: (row) => row.optionB },
    { name: "Option C", selector: (row) => row.optionC },
    { name: "Option D", selector: (row) => row.optionD },
    { name: "Correct Answer", selector: (row) => row.correctAnswer },
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
    { name: "Group Status", selector: (row) => Grouping(row) },
  ];

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
          data={questions}
          title={subjectData.title}
          columns={columns}
          pagination
        />
      </div>
    </div>
  );
}
