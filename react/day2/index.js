const root = ReactDOM.createRoot(document.getElementById('root'));

const StudentCard = (props) => {
  const { student } = props;

  return React.createElement(
    'div',
    { className: 'student-card' },
    React.createElement('h2', null, student.name),
    React.createElement('p', null, React.createElement('strong', null, 'Email: '), student.email),
    React.createElement('p', null, React.createElement('strong', null, 'Password: '), student.password),
    React.createElement('p', null, React.createElement('strong', null, 'Section: '), student.section)
  );
};

const ParentComponent = () => {
  const students = [
    { id: 1, name: 'Chirag', email: 'chirag@example.com', password: '123456', section: 'A' },
    { id: 2, name: 'Ananya', email: 'ananya@example.com', password: '234567', section: 'B' },
    { id: 3, name: 'Rahul', email: 'rahul@example.com', password: '345678', section: 'C' },
    { id: 4, name: 'Priya', email: 'priya@example.com', password: '456789', section: 'A' },
    { id: 5, name: 'Karan', email: 'karan@example.com', password: '567890', section: 'B' },
    { id: 6, name: 'Meera', email: 'meera@example.com', password: '678901', section: 'C' }
  ];

  return React.createElement(
    'div',
    { className: 'student-container' },
    React.createElement('h1', { className: 'title' }, 'Student Details'),
    React.createElement(
      'div',
      { className: 'student-grid' },
      students.map((student) =>
        React.createElement(StudentCard, { key: student.id, student: student })
      )
    )
  );
};

root.render(React.createElement(ParentComponent));
