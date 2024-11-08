
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import StudentModal from '../StudentModal/StudentModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchStudents, addStudent, Student, deleteStudent } from '../../api';

export default function StudentsList() {
  const [students, setStudents] = React.useState<any>(null);
  const [showAddModal, setShowAddModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    const onMount = async () => {
      await fetchData();
    }
    onMount();
  }, []);
  
  const onClose = () => {
    setShowAddModal(false);
  };

  const fetchData = async () => {
    const students = await fetchStudents();
    setStudents(students);
  };

  const onAddNewStudent = async (student: Student) => {
    await addStudent(student);
    setShowAddModal(false);
    await fetchData();
  };

  const onDeleteStudent = async (studentId: string) => {
    await deleteStudent(studentId);
    await fetchData();
  };

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
        <Table aria-label="students list">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((student: any) => (
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
                <IconButton 
                  onClick={() => { onDeleteStudent(student.id) }} 
                  aria-label="delete" 
                  size="large">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
