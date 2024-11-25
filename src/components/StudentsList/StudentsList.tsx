
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import { 
  fetchCourseTeachersByTeacher, 
  addStudent, 
  deleteAllForStudent as deleteAllEnrollmentsForStudent,
  deleteStudent,
  Student,
  fetchStudents,
  fetchEnrollmentsByStudentId
} from '../../api';
import MessageModal from "../MessageModal/MessageModal";
import StudentModal from '../StudentModal/StudentModal';

export default function TeachersList() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [showAddModal, setShowAddModal] = React.useState<boolean>(false);
  const [showMessageModal, setShowMessageModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    const onMount = async () => {
      await fetchData();
    }  
    onMount();
  }, []);

  const onClose = () => {
    setShowAddModal(false);
  };
  
  const onAddNewStudent = async (student: Student) => {
    await addStudent(student);
    setShowAddModal(false);
    await fetchData();
  };
  
  const fetchData = async () => {
    const students = await fetchStudents();
    setStudents(students);
  };

  const performDelete = async (studentId: string) => {
    try {
      await deleteAllEnrollmentsForStudent(studentId);
    } catch (e: any) {
      console.error(`Unable to delete course enrollments for student ID ${studentId}`, e);
    }

    setShowMessageModal(false);

    try {
      await deleteStudent(studentId);
    } catch (e: any) {
      console.error(`Unable to delete student with ID ${studentId}`, e);
    }

    await fetchData();
  };

  const onDeleteClick = async (studentId: string) => {
    const coursesForStudent = await fetchEnrollmentsByStudentId(studentId);
    if (coursesForStudent.length) {
      setShowMessageModal(true);
    } else {
      performDelete(studentId) 
    }
  };

  const closeModal = () => {
    setShowMessageModal(false);
  }

  return (
    <>
      <StudentModal 
        title='Add New Student' 
        isOpen={showAddModal}
        onClose={onClose}
        onSubmit={onAddNewStudent} />
      <h2 style={{ float: 'left' }}>Students</h2>
      <Button style={{ float: 'right', marginTop: '15px' }} 
        type='button' 
        onClick={() => setShowAddModal(true)}>
          Add
      </Button>
      <TableContainer component={Paper}>
      <Table aria-label="teachers list">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students?.map((student: Student) => (
            <>
              <TableRow
                key={student.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="td" scope="row">
                  {student.id}
                </TableCell>
                <TableCell component="td" scope="row">
                  {student.name}
                </TableCell>
                <TableCell align='right' component="td" scope='row'>
                  <IconButton onClick={() => onDeleteClick(student.id as string)} aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
              <MessageModal 
                title={"Student Has Enrollments"}
                message={"This student is still enrolled in at least one course.  Deleting this student will also delete all of their course enrollments.  Do you wish to continue?"}
                isOpen={showMessageModal} 
                onCancel={() => { closeModal() }}
                onConfirm={() => { 
                  performDelete(student.id as string);
                }}
              ></MessageModal>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
