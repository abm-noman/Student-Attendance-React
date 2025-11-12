import { useState } from "react";
import "./App.css";

function App() {
  //States
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);

  //Derrived State
  const markPresent = (student) => {
  setAttendance({ ...attendance, [student]: "present" });
};

const markAbsent = (student) => {
  setAttendance({ ...attendance, [student]: "absent" });
};

  // const presentList = students.filter(
  //   (student) => attendance[student] === "present"
  // );
  // const absentList = students.filter(
  //   (student) => attendance[student] === "absent"
  // );

  //Functions/Handlers
  const changeNameHandler = (event) => {
    setStudentName(event.target.value);
  };

  const createHandler = (event) => {
    event.preventDefault();
    if (studentName.trim() === "") return;
    // const newStudent = {
    //   id: Date.now(),
    //   name: studentName,
    //   isPresent: undefined,
    // };

    setStudents([...students, studentName]);
    setStudentName("");
  };

  const editHandler = (student) => {
    setEditMode(true);
    setEditableStudent(student);
    setStudentName(student);
  };

  const removeHandler = (student) => {
    setStudents(students.filter((s) => s !== student));

    const updatedAttendance = { ...attendance };
    delete updatedAttendance[student];
    setAttendance(updatedAttendance);
  };

  const updateHandler = (event) => {
    event.preventDefault();
    if (studentName.trim() === "") return;

    setStudents(
      students.map((student) =>
        student === editableStudent ? studentName : student
      )
    );
    setEditMode(false);
    setEditableStudent(null);
    setStudentName("");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (editMode) {
      updateHandler(event);
    } else {
      createHandler(event);
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Student Attendance App</h1>
      <form action="" onSubmit={submitHandler}>
        <input
          type="text"
          value={studentName}
          onChange={changeNameHandler}
          placeholder="Student Name"
          className="border border-gray-300 rounded-md p-2 m-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 m-2"
        >
          {editMode ? "Update Student" : "Add Student"}
        </button>
      </form>
      <div className="student-section">
        <div className="list all-student">
          <h2 className="text-2xl font-semibold">All Students</h2>
          <ul>
            {students.map((student, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b border-gray-200 p-2"
              >
                <span>{student}</span>
                <div>
                  <button
                    onClick={() => editHandler(student)}
                    className="bg-yellow-500 text-white rounded-md p-1 m-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeHandler(student)}
                    className="bg-red-500 text-white rounded-md p-1 m-1"
                  >
                    Remove
                  </button>

                  <button
                    className="bg-green-500 text-white rounded-md p-1 m-1"
                    onClick={() => markPresent(student)}
                  >
                    Mark Present
                  </button>
                  <button
                    className="bg-gray-500 text-white rounded-md p-1 m-1"
                    onClick={() => markAbsent(student)}
                  >
                    Mark Absent
                  </button>

                  {/* <button
                    className="bg-green-500 text-white rounded-md p-1 m-1"
                    onClick={() => presentList()}
                  >
                    Mark Present
                  </button>
                  <button
                    onClick={() => absentList()}
                    className="bg-gray-500 text-white rounded-md p-1 m-1"
                  >
                    Mark Absent
                  </button> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="list present-student">
          <h2 className="text-2xl font-semibold">Present Students</h2>
          <ul>
            {Object.entries(attendance)
              .filter(([_, status]) => status === "present")
              .map(([student, _], index) => (
                <li key={index} className="border-b border-gray-200 p-2">
                  {student}
                </li>
              ))}
          </ul>
        </div>
        <div className="list absent-student">
          <h2 className="text-2xl font-semibold">Absent Students</h2>
          <ul>
            {Object.entries(attendance)
              .filter(([_, status]) => status === "absent")
              .map(([student, _], index) => (
                <li key={index} className="border-b border-gray-200 p-2">
                  {student}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
