import React, { useState } from 'react';
import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, ListItemIcon, MenuItem, Button, Modal, TextField, Typography, IconButton, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { Edit, Delete, Close } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { data } from './BookingsData';
import { useFormik } from 'formik';

const Hotels = () => {
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
        id: 'hotels',
        header: 'Hotels',
        columns: [
          {
            accessorKey: 'photos', // Change accessorKey to 'photos'
            header: 'Photos', // Change header to 'Photos'
            size: 200,
            // Modify Cell component if needed
          },
          {
            accessorKey: 'name', // Change accessorKey to 'name'
            header: 'Name', // Change header to 'Name'
            size: 200,
          },
          {
            accessorKey: 'type', // Change accessorKey to 'type'
            header: 'Type', // Change header to 'Type'
            size: 200,
          },
          {
            accessorKey: 'city', // Change accessorKey to 'city'
            header: 'City', // Change header to 'City'
            size: 200,
          },
          {
            accessorKey: 'address', // Change accessorKey to 'address'
            header: 'Address', // Change header to 'Address'
            size: 200,
          },
          {
            accessorKey: 'title', // Change accessorKey to 'title'
            header: 'Title', // Change header to 'Title'
            size: 200,
          },
          {
            accessorKey: 'desc', // Change accessorKey to 'desc'
            header: 'Description', // Change header to 'Description'
            size: 200,
          },
          {
            accessorKey: 'rating', // Change accessorKey to 'rating'
            header: 'Rating', // Change header to 'Rating'
            size: 200,
          },
          {
            accessorKey: 'rooms', // Change accessorKey to 'rooms'
            header: 'Rooms', // Change header to 'Rooms'
            size: 200,
          },
          {
            accessorKey: 'cheapestPrice', // Change accessorKey to 'cheapestPrice'
            header: 'Cheapest Price', // Change header to 'Cheapest Price'
            size: 200,
          },
          {
            accessorKey: 'featured', // Change accessorKey to 'featured'
            header: 'Featured', // Change header to 'Featured'
            size: 200,
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
        {/* Render detail panel if needed */}
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

  const initialValues = {
    photos: '',
    name: '',
    type: '',
    city: '',
    address: '',
    title: '',
    desc: '',
    rating: '',
    rooms: '',
    cheapestPrice: '',
    featured: false, // Assuming featured should be a boolean
  };

  const validationSchema = Yup.object().shape({
    photos: Yup.string().required('Photos URL is required'),
    name: Yup.string().required('Name is required'),
    type: Yup.string().required('Type is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
    title: Yup.string().required('Title is required'),
    desc: Yup.string().required('Description is required'),
    rating: Yup.number().required('Rating is required'),
    rooms: Yup.number().required('Number of rooms is required'),
    cheapestPrice: Yup.number().required('Cheapest Price is required'),
    featured: Yup.boolean().required('Featured is required'),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/register",
          values, 
        );
        console.log(response.data); // Assuming response contains user data or token
        // handleOpen();
        setIsModalOpen(true);
        resetForm();
        Navegate('/login');
        
      } catch (error) {
        console.error("Error:", error);
      }
    },
    // onSubmit: (values) => {
     

    //   // Redirect to login page upon successful registration
    //   navigate('/login');
    // },
  });

  return (
    <Box position="relative">
      <Button
        variant="contained"
        color="primary"
        style={{ position: 'relative', top: 0, left: '86%', zIndex: 1 }}
        onClick={handleOpen}
      >
        Create Hotel
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-hotel-modal"
        aria-describedby="create-hotel-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: '90%' , overflow:'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
          </Box>
          <Typography variant="h5" component="div" gutterBottom>
            Create Hotel
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              resetForm();
              handleClose();
            }}
          >
            {({ errors, touched }) => (
              <Form onSubmit={formik.handleSubmit}>
                <Field
                  name="photos"
                  as={TextField}
                  label="Photos URL"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.photos && !!errors.photos}
                  helperText={touched.photos && errors.photos}
                />
                <Field
                  name="name"
                  as={TextField}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
                <Field
                  name="type"
                  as={TextField}
                  label="Type"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.type && !!errors.type}
                  helperText={touched.type && errors.type}
                />
                <Field
                  name="city"
                  as={TextField}
                  label="City"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                />
                <Field
                  name="address"
                  as={TextField}
                  label="Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                />
                <Field
                  name="title"
                  as={TextField}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />
                <Field
                  name="desc"
                  as={TextField}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.desc && !!errors.desc}
                  helperText={touched.desc && errors.desc}
                />
                <Field
                  name="rating"
                  as={TextField}
                  label="Rating"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.rating && !!errors.rating}
                  helperText={touched.rating && errors.rating}
                />
                <Field
                  name="rooms"
                  as={TextField}
                  label="Rooms"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.rooms && !!errors.rooms}
                  helperText={touched.rooms && errors.rooms}
                />
                <Field
                  name="cheapestPrice"
                  as={TextField}
                  label="Cheapest Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.cheapestPrice && !!errors.cheapestPrice}
                  helperText={touched.cheapestPrice && errors.cheapestPrice}
                />
                <FormControlLabel
                  control={<Field as={Radio} name="featured" />}
                  label="Featured"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Create Hotel
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default Hotels;
