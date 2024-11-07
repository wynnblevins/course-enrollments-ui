
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
import { addEnrollment, deleteEnrollment, Enrollment, fetchEnrollments } from '../../api';
import EnrollmentModal from '../EnrollmentModal/EnrollmentModal';

export default function EnrollmentsList() {
  const [enrollments, setEnrollments] = React.useState<Enrollment[]>([]);
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
    const enrollments = await fetchEnrollments();
    setEnrollments(enrollments);
  };

  const onAddNewEnrollment = async (enrollment: Enrollment) => {
    await addEnrollment(enrollment);
    setShowAddModal(false);
    await fetchData();
  };

  const onDeleteEnrollment = async (enrollmentId: string) => {
    await deleteEnrollment(enrollmentId);
    await fetchData();
  };

  return (
    <>
      <EnrollmentModal 
        title='Add New Enrollment' 
        isOpen={showAddModal}
        onClose={onClose}
        onSubmit={(enrollment: Enrollment) =>  { onAddNewEnrollment(enrollment) }} />
      <h2 style={{ float: 'left' }}>Enrollments</h2>
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
              <TableCell>Student</TableCell>
              <TableCell>Course</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrollments?.map((enrollment: Enrollment) => (
              <TableRow
                key={enrollment.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="td" scope="row">
                  {enrollment.id}
                </TableCell>
                <TableCell component="td" scope="row">
                  {enrollment.student.name}
                </TableCell>
                <TableCell component="td" scope="row">
                  {enrollment.course.name}
                </TableCell>
                <TableCell align='right' component="td" scope='row'>
                <IconButton 
                  onClick={() => { onDeleteEnrollment(enrollment.id!) }} 
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
