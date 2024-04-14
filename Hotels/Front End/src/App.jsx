import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button, ListGroup } from 'react-bootstrap';
import { Drawer, DrawerHeader } from '@mui/material';
import { FaBars, FaChevronLeft, FaChevronRight, FaHome, FaHotel, FaShoppingCart, FaUser } from 'react-icons/fa';
import Dashbaord from './componsent/Dashbaord/Dashbaord';
import Hotels from './componsent/Hotels/Hotels';
import Room from './componsent/Rooms/Room';
import LoginForm from './componsent/LoginRegister/Login';
import RegisterForm from './componsent/LoginRegister/Register';
import Booking from './componsent/Booking/Booking';
import User from './componsent/users/User';

const drawerWidth = 240;

const MiniDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Navbar bg="dark" variant="dark" expand="lg" open={open}>
          <Container>
            <Navbar.Brand>Rinor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleDrawerOpen}>
              <FaBars />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Button as={Link} to="/login" variant="light">Login</Button>
                <Button as={Link} to="/register" variant="light">Register</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <FaChevronLeft onClick={handleDrawerClose} style={{ cursor: 'pointer' }} />
          </DrawerHeader>
          <ListGroup>
            {[
              { title: 'Dashboard', icon: <FaHome />, path: '/dashboard' },
              { title: 'Hotels', icon: <FaHotel />, path: '/hotels' },
              { title: 'Room', icon: <FaHotel />, path: '/room' },
              { title: 'Booking', icon: <FaShoppingCart />, path: '/booking' },
              { title: 'User', icon: <FaUser />, path: '/user' },
            ].map((item) => (
              <Link key={item.title} to={item.path} className="list-group-item list-group-item-action" onClick={handleDrawerClose}>
                {item.icon} {item.title}
              </Link>
            ))}
          </ListGroup>
        </Drawer>
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/dashboard" element={<Dashbaord />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/room" element={<Room />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default MiniDrawer;
