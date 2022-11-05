// Import library
const express = require('express');
const cors = require('cors');
const port = 3300;

const sequelize = require('./db.config');
sequelize.sync().then(() => console.log('database ready!'))

// Import Routes
const userEndpoint = require('./routes/users');
const absensiEndpoint = require('./routes/absensi')

// Inisialisasi App
const app = express();
app.use(cors());
app.use(express.json());

// Menggunakan userEndpoint dan Routes
app.use('/users', userEndpoint);
app.use('/absensi', absensiEndpoint);

// Menampilkan Port
app.listen(port, () => console.log(`running server on port ${port}`));
