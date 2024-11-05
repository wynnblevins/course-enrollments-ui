
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchStudents } from '../../api';

export default function StudentsList() {
  const [students, setStudents] = React.useState<any>(null);
  
  React.useEffect(() => {
    const fetchData = async () => {
      const students = await fetchStudents();
      setStudents(students.data);
    };
    fetchData();
  }, []);
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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
  );
}
