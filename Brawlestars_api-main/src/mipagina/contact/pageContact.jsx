import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Divider, colors } from '@mui/material';
import '../contact/style.css';  // Importamos el archivo de estilos CSS

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

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  // Función para guardar los datos del contacto (en este caso, solo se imprime en la consola)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', contact);
    setSuccessMessage('Tu mensaje ha sido enviado con éxito!');
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
        <Typography variant="h3" className="contact-title" sx={{ color: "#ea2a04" }}>Contacto</Typography>
        <Typography variant="body1" className="contact-description">
        ¡Estoy aquí para ayudarte!
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* Formulario de contacto */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Fila 1: Nombre */}
            <Grid item xs={12}>
              <TextField
                label="Tu nombre"
                name="name"
                fullWidth
                variant="outlined"
                value={contact.name}
                onChange={handleChange}
                className="contact-field"
                required
              />
            </Grid>

            {/* Fila 2: Apellidos */}
            <Grid item xs={12}>
              <TextField
                label="Tus apellidos"
                name="surname"
                fullWidth
                variant="outlined"
                value={contact.surname}
                onChange={handleChange}
                className="contact-field"
                required
              />
            </Grid>

            {/* Fila 3: Correo Electrónico */}
            <Grid item xs={12}>
              <TextField
                label="Tu correo electrónico"
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

            {/* Fila 4: Teléfono */}
            <Grid item xs={12}>
              <TextField
                label="Tu teléfono"
                name="phone"
                fullWidth
                variant="outlined"
                type="tel"
                value={contact.phone}
                onChange={handleChange}
                className="contact-field"
                pattern="[0-9]{10}"
                placeholder="Escribe tu teléfono aquí"
              />
            </Grid>

            {/* Fila 5: Asunto */}
            <Grid item xs={12}>
              <TextField
                label="Asunto"
                name="subject"
                fullWidth
                variant="outlined"
                value={contact.subject}
                onChange={handleChange}
                className="contact-field"
                required
              />
            </Grid>

            {/* Fila 6: Mensaje */}
            <Grid item xs={12}>
              <TextField
                label="Mensaje"
                name="message"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={contact.message}
                onChange={handleChange}
                className="contact-field"
                placeholder="Escribe tu mensaje aquí"
              />
            </Grid>

            {/* Fila 7: Botón de Enviar */}
            <Grid item xs={12}>
              <Button variant="contained" sx={{ backgroundColor:'black' }} type="submit" fullWidth>
                Enviar mensaje
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