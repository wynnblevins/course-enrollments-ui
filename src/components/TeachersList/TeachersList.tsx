
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchTeachers } from '../../api';

export default function StudentsList() {
  const [teachers, setTeachers] = React.useState<any>(null);
  
  React.useEffect(() => {
    const fetchData = async () => {
      const teachers = await fetchTeachers();
      setTeachers(teachers.data);
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
