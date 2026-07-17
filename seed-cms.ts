import mysql from 'mysql2/promise';

async function run() {
    const pool = mysql.createPool(process.env.DATABASE_URL as string);
    
    const visiMisi = {
        visi: "Terwujudnya Desa yang Maju, Mandiri, dan Sejahtera melalui tata kelola pemerintahan yang bersih, serta pemanfaatan potensi lokal yang berdaya saing",
        misi: [
            "Mewujudkan tata kelola pemerintahan desa yang profesional, transparan, akuntabel, dan berbasis pelayanan prima.",
            "Membangun dan merawat infrastruktur desa yang merata guna menunjang kelancaran aksesibilitas dan perekonomian warga.",
            "Mengembangkan ekonomi kerakyatan melalui optimalisasi Badan Usaha Milik Desa (BUMDes) dan pemberdayaan Usaha Mikro, Kecil, dan Menengah (UMKM).",
            "Meningkatkan kualitas Sumber Daya Manusia (SDM) melalui program pendidikan yang merata, keterampilan kerja, dan peningkatan derajat kesehatan masyarakat.",
            "Menjaga kelestarian lingkungan hidup dan nilai-nilai kearifan lokal (gotong royong) guna menciptakan masyarakat yang aman, harmonis, dan berbudaya."
        ]
    };
    
    const dataKependudukan = {
        totalJiwa: 2450,
        kepalaKeluarga: 720,
        lakiLaki: 1215,
        perempuan: 1235
    };
    
    const dataPendidikan = [
        { nama: 'SD / Sederajat', persentase: 40 },
        { nama: 'SMP / Sederajat', persentase: 30 },
        { nama: 'SMA / Sederajat', persentase: 20 },
        { nama: 'Diploma / Sarjana', persentase: 10 }
    ];
    
    const dataPekerjaan = [
        { nama: 'Petani / Pekebun', persentase: 55 },
        { nama: 'Wiraswasta / Pedagang', persentase: 20 },
        { nama: 'Karyawan Swasta', persentase: 15 },
        { nama: 'PNS / TNI / Polri', persentase: 10 }
    ];
    
    await pool.query("INSERT IGNORE INTO pengaturan (kunci, nilai) VALUES (?, ?)", ['visi_misi', JSON.stringify(visiMisi)]);
    await pool.query("INSERT IGNORE INTO pengaturan (kunci, nilai) VALUES (?, ?)", ['data_kependudukan', JSON.stringify(dataKependudukan)]);
    await pool.query("INSERT IGNORE INTO pengaturan (kunci, nilai) VALUES (?, ?)", ['data_pendidikan', JSON.stringify(dataPendidikan)]);
    await pool.query("INSERT IGNORE INTO pengaturan (kunci, nilai) VALUES (?, ?)", ['data_pekerjaan', JSON.stringify(dataPekerjaan)]);
    
    console.log("Seed pengaturan CMS sukses!");
    await pool.end();
}

run();
