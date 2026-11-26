import { useState, type FormEvent } from "react";

// now i have define type here.
// it's means which typeof data have to be store.
// Custom Data Type means:- apne according khud ka Data Type banana.
type Student = {
    id: number;
    name: string;
    email: string;
    course: string;
};

function StudentCrud() {
    // this is React Hook and it is use for update and store data
    // here it is use for store record of student
    const [students, setStudents] = useState<Student[]>([]);

    // here it is use for store user's name that will give in inputbox.
    const [name, setName] = useState("");

    // used for store email of student
    const [email, setEmail] = useState("");

    // used for store course
    const [course, setCourse] = useState("");

    // Its purpose is to store the ID of the student whose details we want to edit.
    const [editId, setEditId] = useState<number | null>(null);

    // Function to add or update student
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (name === "" || email === "" || course === "") {
            alert("Please fill all fields");
            return;
        }

        if (editId !== null) {
            // Update existing student
            const updatedList = students.map((student) => {
                if (student.id === editId) {
                    return { id: editId, name: name, email: email, course: course };
                }
                return student;
            });
            setStudents(updatedList);
            setEditId(null);
        } else {
            // Add new student
            const newStudent: Student = {
                id: Date.now(),
                name: name,
                email: email,
                course: course
            };
            setStudents([...students, newStudent]);
        }

        // Clear input boxes
        setName("");
        setEmail("");
        setCourse("");
    }

    // Function to edit student
    function handleEdit(student: Student) {
        setName(student.name);
        setEmail(student.email);
        setCourse(student.course);
        setEditId(student.id);
    }

    // Function to delete student
    function handleDelete(id: number) {
        const filteredList = students.filter((student) => student.id !== id);
        setStudents(filteredList);
    }

    return (
        <div className="container">
            <h1>Student Management System</h1>
            {/* here form is used for collect the informations by user */}
            <form onSubmit={handleSubmit}>
                {/* for student's name */}
                <input
                    type="text"
                    placeholder="Enter Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Enter Student Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* for student course */}
                <input
                    type="text"
                    placeholder="Enter Student Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                />

                <button type="submit">
                    {editId !== null ? "Update Student" : "Add Student"}
                </button>
            </form>

            <h2>Student Heading</h2>
            {/* here table element is used for show data of student in row and column */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 ? (
                        <tr>
                            <td colSpan={5}>No students found</td>
                        </tr>
                    ) : (
                        students.map((student, index) => (
                            <tr key={student.id}>
                                {/* This displays the student's serial number in the table. */}
                                <td>{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.course}</td>
                                <td>
                                    <button type="button" onClick={() => handleEdit(student)}>
                                        Edit
                                    </button>
                                    <button type="button" onClick={() => handleDelete(student.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default StudentCrud;
