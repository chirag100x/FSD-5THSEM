const { useState, useMemo } = React;

const initialStudents = [
  { id: 1, name: "Alice", rollNo: "101", course: "BCA", marks: 87 },
  { id: 2, name: "Rohan", rollNo: "102", course: "B.Tech", marks: 72 },
  { id: 3, name: "Meera", rollNo: "103", course: "B.Sc", marks: 94 },
  { id: 4, name: "Arjun", rollNo: "104", course: "MCA", marks: 68 },
];

const calculateGrade = (marks) => {
  const value = Number(marks);

  if (value >= 90) return "A+";
  if (value >= 80) return "A";
  if (value >= 70) return "B+";
  if (value >= 60) return "B";
  if (value >= 40) return "C+";
  return "F";
};

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [form, setForm] = useState({ name: "", rollNo: "", course: "BCA", marks: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const totalStudents = students.length;

  const averageMarks = useMemo(() => {
    if (!students.length) return 0;
    const total = students.reduce((sum, student) => sum + Number(student.marks || 0), 0);
    return total / students.length;
  }, [students]);

  const filteredStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return students;

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(term) ||
        student.rollNo.toString().toLowerCase().includes(term)
    );
  }, [students, searchTerm]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const rollNo = form.rollNo.trim();
    const course = form.course.trim();
    const marks = Number(form.marks);

    if (!name || !rollNo || !course || form.marks === "") {
      alert("Please fill all fields before adding a student.");
      return;
    }

    if (marks < 0 || marks > 100) {
      alert("Marks should be between 0 and 100.");
      return;
    }

    const normalizedStudent = {
      id: editingId ?? Date.now(),
      name,
      rollNo,
      course,
      marks,
    };

    if (editingId) {
      setStudents((prev) =>
        prev.map((student) => (student.id === editingId ? normalizedStudent : student))
      );
      setEditingId(null);
    } else {
      const duplicateStudent = students.some(
        (student) => student.rollNo.toString() === rollNo
      );

      if (duplicateStudent) {
        alert("A student with this roll number already exists.");
        return;
      }

      setStudents((prev) => [normalizedStudent, ...prev]);
    }

    setForm({ name: "", rollNo: "", course: "BCA", marks: "" });
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.name,
      rollNo: student.rollNo,
      course: student.course,
      marks: student.marks,
    });
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ name: "", rollNo: "", course: "BCA", marks: "" });
    }
  };

  return (
    <div className="app-shell">
      <h1 className="board-title">Student Management System</h1>

      <form className="form-wrapper" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Student Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Student Name"
          />
        </div>

        <div className="side-panel">
          <div className="marks-box">
            <span>Marks Range</span>
            <span>0 - 100</span>
          </div>
          <div className="grade-box">
            <span>Grade</span>
            <span>{form.marks === "" ? "-" : calculateGrade(form.marks)}</span>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="rollNo">Roll No.</label>
          <input
            id="rollNo"
            name="rollNo"
            type="text"
            value={form.rollNo}
            onChange={handleChange}
            placeholder="Roll No."
          />
        </div>

        <div className="input-group">
          <label htmlFor="marks">Marks</label>
          <input
            id="marks"
            name="marks"
            type="number"
            min="0"
            max="100"
            value={form.marks}
            onChange={handleChange}
            placeholder="Marks"
          />
        </div>

        <div className="input-group">
          <label htmlFor="course">Course</label>
          <select id="course" name="course" value={form.course} onChange={handleChange}>
            <option value="BCA">BCA</option>
            <option value="B.Sc">B.Sc</option>
            <option value="B.Tech">B.Tech</option>
            <option value="MCA">MCA</option>
            <option value="B.Com">B.Com</option>
          </select>
        </div>
      </form>

      <button className="add-btn" type="submit" onClick={handleSubmit}>
        {editingId ? "Update Student" : "Add Student"}
      </button>

      <div className="toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or roll no."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="stat-box">Total Students: {totalStudents}</div>
        <div className="stat-box">Average Marks: {averageMarks.toFixed(2)}</div>
      </div>

      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>Name</th>
              <th>Course</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  No student found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>{student.marks}</td>
                  <td>{calculateGrade(student.marks)}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(student)} type="button">
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(student.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
