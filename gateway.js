// apps/cleaker/index.js - Aplicación Cleaker.me que maneja múltiples dominios
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;

// Middleware to log incoming requests and headers
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});

// Middleware para manejar las rutas basadas en el dominio de origen
app.use((req, res, next) => {
    const domain = req.headers.host; // Obtiene el dominio desde el request
    const [subdomain, ...rest] = domain.split('.'); // Separa el subdominio del resto del dominio
    const mainDomain = rest.join('.'); // Reconstruye el dominio principal (cleaker.me)

    // Lógica para redirigir a diferentes secciones según el dominio
    if (mainDomain === 'cleaker.me') {
        if (subdomain === 'cleaker' || subdomain === 'www') {
            // Ruta para el dominio principal cleaker.me
            res.redirect('/cleaker');
        } else {
            // Ruta para los subdominios (username.cleaker.me)
            req.username = subdomain; // Guardar el subdominio como nombre de usuario
            res.redirect('/me'); // Redirigir a la sección de usuario
        }
    } else {
        // Redirigir a una página por defecto o mostrar un error si el dominio no es reconocido
        res.redirect('/not-found');
    }
});

// Definición de las rutas específicas para cada sección
app.get('/cleaker', (req, res) => {
    // Renderiza o maneja la lógica para cleaker.me home.
    res.send('Welcome to Cleaker.');
});

app.get('/me', (req, res) => {
    // Renderiza o maneja la lógica para usernames.cleaker.me
    const username = req.username || 'Guest';
    res.send(`Welcome ${username}.`);
});

app.get('/not-found', (req, res) => {
    // Muestra una página de error o un mensaje de dominio no reconocido
    res.status(404).send('Dominio no reconocido.');
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Cleaker está escuchando en el puerto ${PORT}`);
});