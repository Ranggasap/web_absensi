// Import Library
const express = require('express');
const router = express.Router();
const UsersModel = require('../models/users');
const bcrypt = require("bcrypt");
const passwordCheck = require('../utils/passwordCheck')

// Router utama
router.get('/', async(req, res) => {
    
    // Ambil data dari db
    const users = await UsersModel.findAll()
    
    // Menampilkan data dari db
    res.status(200).json({
        data : users,
        metadata : "Show all users complete"
    });
});

router.post('/', async (req, res) => {
    // Request data dari front end
    const {nip, nama, password} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10)

    // Menambahkan Data
    const users = await UsersModel.create({
        nip, nama, password : encryptedPassword
    });

    // Menampilkan data
    res.status(200).json({
        data: users,
        metadata: 'test post user endpoint'
    })
});

router.put('/', async (req, res) => {
    // Request data dari front end
    const {nip, nama, password, passwordBaru} = req.body;
    
    const check = await passwordCheck(nip, password)
    const encryptedPassword = await bcrypt.hash(passwordBaru, 10)
    // password yang muncul di db === password dari inputan

    // Menambahkan Data
    if(check.compare === true){

        const users = await UsersModel.update({
            nama, password: encryptedPassword
        }, {where: {nip: nip}});

        res.status(200).json({
            users : {updated: users[0]},
            metadata: "user updated!"
        })
    } else {
        res.status(400).json({
            error: "invalid"
        })
    }

});

router.delete('/', async (req, res) => {
    // Request data dari front end
    const {nip, password} = req.body;
    
    const check = await passwordCheck(nip, password)
    // password yang muncul di db === password dari inputan

    // Menambahkan Data
    if(check.compare === true){

        const users = await UsersModel.destroy({where: {nip: nip}});

        res.status(200).json({
            users : users,
            metadata: "user deleted!"
        })
    } else {
        res.status(400).json({
            error: "invalid"
        })
    }

});

router.post('/login', async (req, res) => {

    const {nip, password} = req.body

    const check = await passwordCheck(nip, password);
   
    if (check.compare === true){
        res.status(200).json({
            users: check.userData,
            metadata: "login success"
        })
    } else {
        res.status(400).json({
            error: "data invalid"
        })
    }
})

// Ekspor Modul Router untuk digunakan oleh file lainnya
module.exports = router;