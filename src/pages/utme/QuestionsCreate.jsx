import React, { useState, useRef } from "react";
import { useAlert } from "react-alert";
import { httpService } from "../../services/services";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
export default function QuestionsCreate({
  subjectData,
  FetchQuestion,
  singleQuestion,
}) {
  const [questionData, setQuestionData] = useState({});

  const [loading, setLoading] = useState(false);

  if (singleQuestion) {
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
          question: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          correctAnswer: '',
          _id: '',
        });

        setQuestionData({});
      }
    } else {
      const path = `postQuestion/${subjectData._id}`;

      const res = await httpService.post(path, questionData);
      if (res) {
        setLoading(false);
        alert.success(res.data.message);
        FetchQuestion();
        setQuestionData({
          question: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          correctAnswer: '',
        });
      } else {
        setLoading(false);
      }
    }
  }
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const startGroupBtn = () => {
    Swal.fire({
      icon: "question",
      title: "Start a group?",
      text: "Do you wish to start a group of questions with this particular question?",
      confirmButtonText: "Yes start",
      cancelButtonText: "No ",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setQuestionData({ ...questionData, startGroup: true });
      }
    });
  };
  const stopGroupBtn = () => {
    Swal.fire({
      icon: "question",
      title: "End a group?",
      text: "Do you wish to end a group of questions with this particular question?",
      cancelButtonText: "No ",
      showCancelButton: true,
      confirmButtonText: "Yes, stop",
    }).then((result) => {
      if (result.isConfirmed) {
        setQuestionData({ ...questionData, stopGroup: true });
      }
    });
  };

  return (
    <div>
      <div className='p-3'>
        <div className='border border-light p-5 rounded-3 border-2'>
          {/* <Editor editorState={editorState.editorState} onChange={()=>{setEditorState({name:})}}></Editor> */}
          <div className='h3 mb-3 text-success'>Create Questions</div>
          <form onSubmit={PostQuestion}>
            <div className='row'>
              <div className='col-md-4 border-end'>
                <ControlledEditor />
            <div className="row">
              <div className="col-md-3 border-end">
                {/* <div>
                  <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div> */}
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
              <div className='col-md-3 border-end'>
                <label htmlFor='optionA' className='mb-2'>
                  Option A
                </label>
                <div className='form-group mb-4'>
                  <input
                    type='text'
                    name='optionA'
                    id='optionA'
                    className='form-control'
                    onChange={HandleChange}
                    value={questionData.optionA}
                    required
                  />
                </div>
                <div className='form-group my-4'>
                  <label htmlFor='optionB' className='mb-2'>
                    Option B
                  </label>
                  <input
                    type='text'
                    name='optionB'
                    id='optionB'
                    className='form-control'
                    onChange={HandleChange}
                    value={questionData.optionB}
                    required
                  />
                </div>
                <div className='form-group my-4'>
                  <label htmlFor='optionC' className='mb-2'>
                    Option C
                  </label>
                  <input
                    type='text'
                    name='optionC'
                    id='optionC'
                    className='form-control'
                    onChange={HandleChange}
                    value={questionData.optionC}
                    required
                  />
                </div>
                <div className='form-group my-4'>
                  <label htmlFor='optionD' className='mb-2'>
                    Option D
                  </label>
                  <input
                    type='text'
                    name='optionD'
                    id='optionD'
                    className='form-control'
                    onChange={HandleChange}
                    value={questionData.optionD}
                    required
                  />
                </div>
              </div>
              {/* <div className='col-md-3 border-end'>
                <label htmlFor='optionC' className='mb-2'>
                  Option C
                </label>
                <div className='form-group mb-4'>
                  <input
                    type='text'
                    name='optionC'
                    id='optionC'
                    className='form-control'
                    onChange={HandleChange}
                    value={questionData.optionC}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='optionD' className='mb-2'>
                    Option D
                  </label>
                  <input
                    type='text'
                    name='optionD'
                    id='optionD'
                    className='form-control'
                    onChange={HandleChange}
                    value={questionData.optionD}
                    required
                  />
                </div>
              </div> */}
              <div className='col-md-2'>
                <div className='form-group mb-2'>
                  <label htmlFor='correctAnswer'>Correct Answer</label>
              </div>
              <div className="col-md-3">
                <div className="form-group mb-2">
                  <label htmlFor="correctAnswer">Correct Answer</label>
                  <select
                    name='correctAnswer'
                    id='correctAnswer'
                    className='form-control'
                    onChange={HandleChange}
                    value={questionData.correctAnswer}
                  >
                    <option value=''>Select Answer</option>
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
                <div className='form-group text-center'>
                  <button className='btn btn-success me-2' type='submit'>
                <div className="form-group text-center mb-2">
                  <Button
                    variant="outlined"
                    className="me-2"
                    onClick={startGroupBtn}
                  >
                    {" "}
                    start group
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={stopGroupBtn}
                  >
                    {" "}
                    stop group
                  </Button>
                </div>
                <div className="form-group text-center">
                  <button className="btn btn-success me-2" type="submit">
                    {loading ? (
                      <div class='spinner-border text-light' role='status'>
                        <span class='visually-hidden'>Loading...</span>
                      </div>
                    ) : questionData._id ? (
                      'Update'
                    ) : (
                      'Save'
                    )}
                  </button>
                  <button className='btn btn-danger' type='reset'>
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
