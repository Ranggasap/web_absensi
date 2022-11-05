// Import Library
const express = require('express');
const router = express.Router();
const AbsensiModel = require('../models/absensi');

// Router utama
router.get('/', async(req, res) => {
    
    // Ambil data dari db
    const absensi = await AbsensiModel.findAll()
    
    // Menampilkan data dari db
    res.status(200).json({
        data : absensi,
        metadata: "test absensi endpoint"
    });
});

router.post('/checkin', async(req, res) => {
    
    const {nip} = req.body

    // Ambil data dari db
    const absensi = await AbsensiModel.create({
        users_nip: nip,
        status: 'in'
    })
    
    // Menampilkan data dari db
    res.status(200).json({
        data : absensi,
        metadata: "Check in Berhasil!"
    });
});


router.post('/checkout', async(req, res) => {
    
    const {nip} = req.body

    // Ambil data dari db
    const absensi = await AbsensiModel.create({
        users_nip: nip,
        status: 'out'
    })
    
    // Menampilkan data dari db
    res.status(200).json({
        data : absensi,
        metadata: "Check out berhasil"
    });
});

module.exports = router