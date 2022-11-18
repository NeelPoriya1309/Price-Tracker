// ** React Imports
import { useEffect, useState } from 'react';
import { server } from 'config/index';

// ** MUI Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { LoadingButton } from '@mui/lab';

const TableStickyHeader = ({ tableName }) => {
  useEffect(() => {
    // console.log(`${server}/api/${tableName}`);
    fetch(`${server}/api/${tableName}`)
      .then((res) => res.json())
      .then((data) => {
        let cols = Object.keys(data.body[0]).map((el, idx) => {
          return {
            id: `${idx}`,
            label: el,
            minWidth: 170,
            align: 'center',
          };
        });

        setcolumns(cols);
        setRows(data.body);
      });
  }, [tableName]);

  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [columns, setcolumns] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let counter = 0;

  return (
    <>
      {rows.length && (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={counter++}
                      align={column.align}
                      sx={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={counter++}
                      >
                        {columns.map((column) => {
                          const value = row[column.label];
                          return (
                            <TableCell key={counter++} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {!rows.length && (
        <LoadingButton
          sx={{
            width: '100%',
            scale: '2',
            div: {
              color: '#232227',
            },
            marginBottom: '20px',
          }}
          loading
        />
      )}
    </>
  );
};

export default TableStickyHeader;
