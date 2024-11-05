
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchStudents } from '../../api';
import { Button } from '@mui/material';
import AddPersonModal from '../AddPersonModal/AddPersonModal';

export default function StudentsList() {
  const [students, setStudents] = React.useState<any>(null);
  const [showAddModal, setShowAddModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const students = await fetchStudents();
      setStudents(students.data);
    };
    fetchData();
  }, []);
  
  const onClose = () => {
    setShowAddModal(false);
  };

  const onAddNewStudent = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <AddPersonModal 
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
