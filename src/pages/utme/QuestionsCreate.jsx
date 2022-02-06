import React, { useState } from "react";
import { useAlert } from "react-alert";
import ControlledEditor from "../../components/elements/Editor";
import { httpService } from "../../services/services";

export default function QuestionsCreate({
  subjectData,
  FetchQuestion,
  singleQuestion,
}) {
  const [questionData, setQuestionData] = useState({});

  const [loading, setLoading] = useState(false);

  if (singleQuestion) {
    console.log(singleQuestion);
    questionData.question = singleQuestion.question;
    questionData.optionA = singleQuestion.optionA;
    questionData.optionB = singleQuestion.optionB;
    questionData.optionC = singleQuestion.optionC;
    questionData.optionD = singleQuestion.optionD;
    questionData.correctAnswer = singleQuestion.correctAnswer;
    questionData._id = singleQuestion._id;
  }
  const alert = useAlert();

  function HandleChange(e) {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  }

  async function PostQuestion(e) {
    setLoading(true);
    e.preventDefault();

    if (questionData._id) {
      const path = `updateQuestion/${subjectData._id}/${questionData._id}`;
      const res = await httpService.patch(path, questionData);
      if (res) {
        setLoading(false);
        alert.success(res.data.message);
        FetchQuestion();
        setQuestionData({
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "",
          _id: "",
        });
      }
    } else {
      const path = `postQuestion/${subjectData._id}`;

      const res = await httpService.post(path, questionData);
      if (res) {
        setLoading(false);
        alert.success(res.data.message);
        FetchQuestion();
        setQuestionData({
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "",
        });
      } else {
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <div className="p-3">
        <div className="border border-light p-5 rounded-3 border-2">
          <div className="h3 mb-3 text-success">Create Questions</div>
          <form onSubmit={PostQuestion}>
            <div className="row">
              <div className="col-md-4 border-end">
                <ControlledEditor />
                <label htmlFor="question" className="mb-2">
                  Question
                </label>
                <textarea
                  name="question"
                  id="question"
                  cols="30"
                  rows="5"
                  className="form-control"
                  onChange={HandleChange}
                  value={questionData.question}
                  required
                ></textarea>
              </div>
              <div className="col-md-3 border-end">
                <label htmlFor="optionA" className="mb-2">
                  Option A
                </label>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    name="optionA"
                    id="optionA"
                    className="form-control"
                    onChange={HandleChange}
                    value={questionData.optionA}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="optionB" className="mb-2">
                    Option B
                  </label>
                  <input
                    type="text"
                    name="optionB"
                    id="optionB"
                    className="form-control"
                    onChange={HandleChange}
                    value={questionData.optionB}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3 border-end">
                <label htmlFor="optionC" className="mb-2">
                  Option C
                </label>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    name="optionC"
                    id="optionC"
                    className="form-control"
                    onChange={HandleChange}
                    value={questionData.optionC}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="optionD" className="mb-2">
                    Option D
                  </label>
                  <input
                    type="text"
                    name="optionD"
                    id="optionD"
                    className="form-control"
                    onChange={HandleChange}
                    value={questionData.optionD}
                    required
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group mb-2">
                  <label htmlFor="correctAnswer">Correct Answer</label>
                  <select
                    name="correctAnswer"
                    id="correctAnswer"
                    className="form-control"
                    onChange={HandleChange}
                    value={questionData.correctAnswer}
                  >
                    <option value="">Select Answer</option>
                    <option value={questionData.optionA}>
                      {questionData.optionA}
                    </option>
                    <option value={questionData.optionB}>
                      {questionData.optionB}
                    </option>
                    <option value={questionData.optionC}>
                      {questionData.optionC}
                    </option>
                    <option value={questionData.optionD}>
                      {questionData.optionD}
                    </option>
                  </select>
                </div>
                <div className="form-group text-center">
                  <button className="btn btn-success me-2" type="submit">
                    {loading ? (
                      <div class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : questionData._id ? (
                      "Update"
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button className="btn btn-danger" type="reset">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
