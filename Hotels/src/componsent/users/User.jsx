import React, { useState } from 'react';
import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, ListItemIcon, MenuItem, Button, Modal, TextField, Typography, IconButton } from '@mui/material';
import { Edit, Delete, Close } from '@mui/icons-material';

import { data } from './usersData';

const User = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        id: 'users',
        header: 'Users',
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            id: 'name',
            header: 'Name',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  loading="lazy"
                  style={{ borderRadius: '50%' }}
                />
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'username',
            header: 'Username',
            size: 200,
          },
          {
            accessorKey: 'email',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Email',
            size: 350,
          },
          {
            accessorKey: 'isAdmin',
            header: 'Is Admin',
            size: 100,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor: cell.getValue() ? theme.palette.success.main : theme.palette.error.main,
                  color: '#fff',
                  borderRadius: '0.25rem',
                  padding: '0.25rem',
                  fontWeight: 'bold',
                })}
              >
                {cell.getValue() ? 'Yes' : 'No'}
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [5, 10, 15, 20, 25, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-around',
          left: '30px',
          maxWidth: '1000px',
          position: 'sticky',
          width: '100%',
        }}
      >
        <img
          alt="avatar"
          height={200}
          src={row.original.avatar}
          loading="lazy"
          style={{ borderRadius: '50%' }}
        />
      </Box>
    ),
    renderRowActionMenuItems: ({ closeMenu, table }) => [
      <MenuItem
        key="edit"
        onClick={() => {
          // Edit logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Edit
      </MenuItem>,
      <MenuItem
        key="delete"
        onClick={() => {
          const selectedRows = table.getSelectedRowModel().flatRows;
          selectedRows.forEach((row) => table.deleteRow(row.id));
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Delete
      </MenuItem>,
    ],
  });

  return (
    <Box position="relative">
      <Button
        variant="contained"
        color="primary"
        style={{ position: 'relative', top: 0, left: '86%', zIndex: 1 }}
        onClick={handleOpen}
      >
        Create User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-user-modal"
        aria-describedby="create-user-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: '90%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
          </Box>
          <Typography variant="h5" component="div" gutterBottom>
            Create User
          </Typography>
          <form>
            <TextField id="firstName" label="First Name" variant="outlined" fullWidth margin="normal" />
            <TextField id="lastName" label="Last Name" variant="outlined" fullWidth margin="normal" />
            <TextField id="email" label="Email" variant="outlined" fullWidth margin="normal" />
            <TextField id="avatar" label="Avatar" variant="outlined" fullWidth margin="normal" />
            <TextField id="isAdmin" label="Is Admin" variant="outlined" fullWidth margin="normal" />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Create User
            </Button>
          </form>
        </Box>
      </Modal>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default User;
