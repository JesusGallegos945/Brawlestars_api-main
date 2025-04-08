import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Divider } from '@mui/material';
import '../contact/style.css';

export default function PageContact() {
  const [contact, setContact] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', contact);
    setSuccessMessage('Your message has been sent successfully!');
    setContact({
      name: '',
      surname: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <Box className="contact-background">
      <Container maxWidth="md" className="contact-container">
        <Typography variant="h3" className="contact-title" sx={{ color: "black" }}>Contact</Typography>
        <Typography variant="body1" className="contact-description">
          I'm here to help you!
        </Typography>

        <Divider sx={{ my: 4 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Your name"
                name="name"
                fullWidth
                variant="outlined"
                value={contact.name}
                onChange={handleChange}
                className="contact-field"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Your surname"
                name="surname"
                fullWidth
                variant="outlined"
                value={contact.surname}
                onChange={handleChange}
                className="contact-field"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Your email"
                name="email"
                fullWidth
                variant="outlined"
                type="email"
                value={contact.email}
                onChange={handleChange}
                className="contact-field"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Your phone"
                name="phone"
                fullWidth
                variant="outlined"
                type="tel"
                value={contact.phone}
                onChange={handleChange}
                className="contact-field"
                pattern="[0-9]{10}"
                placeholder="Enter your phone number"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Subject"
                name="subject"
                fullWidth
                variant="outlined"
                value={contact.subject}
                onChange={handleChange}
                className="contact-field"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Message"
                name="message"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={contact.message}
                onChange={handleChange}
                className="contact-field"
                placeholder="Write your message here"
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" sx={{ backgroundColor: 'black' }} type="submit" fullWidth>
                Send message
              </Button>
            </Grid>
          </Grid>
        </form>

        {successMessage && (
          <Typography variant="body1" className="success-message">{successMessage}</Typography>
        )}
      </Container>
    </Box>
  );
}
