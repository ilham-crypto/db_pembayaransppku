const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const index = express();
const port = 1200;

// vuew engine hbs
index.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'ilham',
    password: '0000',
    database: 'db_pembayaransppku'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

index.get('/', (req, res) => {
    koneksi.query('use db_pembayaransppku', (err, hasil) => {
        if(err) throw err;
        res.render('login.hbs',{
            judulhalaman: 'DATA-DATA',
            data: hasil
        });
    });
});

index.get('/inputpembayaran', (req, res) => {
    koneksi.query('SELECT*FROM pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('inputpembayaran.hbs',{
            judulhalaman: 'DATA-PEMBAYARAN',
            data: hasil
        });
    });
});

index.post('/inputpembayaran', (req, res) =>{
    var siswa = req.body.inputsiswa;
    var bulan = req.body.inputbulan;
    var jumlah = req.body.inputjumlah;
    var tanggal_transaksi = req.body.inputtanggal_transaksi;
    koneksi.query('INSERT INTO pembayaran(siswa, bulan, jumlah, tanggal_transaksi)values(?,?,?,?)',
    [siswa, bulan, jumlah, tanggal_transaksi],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/inputpembayaran');
    }
    )
});

index.get('/hapus-siswa/:siswa', (req, res) => {
    var siswa = req.params.siswa;
    koneksi.query("DELETE FROM pembayaran WHERE siswa=?",
         [siswa], (err, hasil) => {
             if(err) throw err;
             res.redirect('/inputpembayaran');
         }
    )
});

index.get('/pembayaran', (req, res) => {
    koneksi.query('SELECT*FROM pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('pembayaran.hbs',{
            judulhalaman: 'DATA-PEMBAYARAN',
            data: hasil
        });
    });
});

index.post('/pembayaran', (req, res) =>{
    var siswa = req.body.inputsiswa;
    var bulan = req.body.inputbulan;
    var jumlah = req.body.inputjumlah;
    var tanggal_transaksi = req.body.inputtanggal_transaksi;
    koneksi.query('INSERT INTO pembayaran(siswa, bulan, jumlah, tanggal_transaksi)values(?,?,?,?)',
    [siswa, bulan, jumlah, tanggal_transaksi],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/inputpembayaran');
    }
    )
});

index.get('/hapus-siswa/:siswa', (req, res) => {
    var siswa = req.params.siswa;
    koneksi.query("DELETE FROM pembayaran WHERE siswa=?",
         [siswa], (err, hasil) => {
             if(err) throw err;
             res.redirect('/pembayaran');
         }
    )
});

index.listen(port, () => {
    console.log(`app INVENT-SHOP berjalan pada port ${port}`);
});