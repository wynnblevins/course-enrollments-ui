
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
import { fetchTeachers, addTeacher, Teacher } from '../../api';
import TeacherModal from '../TeacherModal/TeacherModal';

export default function StudentsList() {
  const [teachers, setTeachers] = React.useState<any>(null);
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
  
  const onAddNewTeacher = async (teacher: Teacher) => {
    await addTeacher(teacher);
    setShowAddModal(false);
    await fetchData();
  };
  
  const fetchData = async () => {
    const teachers = await fetchTeachers();
    setTeachers(teachers);
  };

  return (
    <>
      <TeacherModal 
        title='Add New Teacher' 
        isOpen={showAddModal}
        onClose={onClose}
        onSubmit={onAddNewTeacher} />
      <h2 style={{ float: 'left' }}>Teachers</h2>
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
          {teachers?.map((teacher: any) => (
            <TableRow
              key={teacher.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="td" scope="row">
                {teacher.id}
              </TableCell>
              <TableCell component="td" scope="row">
                {teacher.name}
              </TableCell>
              <TableCell align='right' component="td" scope='row'>
                <IconButton aria-label="delete" size="large">
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
