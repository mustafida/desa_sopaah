import mysql from 'mysql2/promise';

async function main() {
    const connection = await mysql.createConnection('mysql://root:@localhost:3306/sopaah_db');
    
    try {
        await connection.query(`
            INSERT INTO \`umkm\` (\`nama_usaha\`, \`pemilik\`, \`deskripsi\`, \`kategori\`, \`video_url\`, \`gambar_url\`) VALUES 
            ('UMKM Restored Video 1', 'Warga Desa', 'Data direstore dari file upload.', 'Lainnya', '/uploads/1784526307375-bb0fcc8a.mp4', '/uploads/1784686722534-2fb11de3.webp'),
            ('UMKM Restored Video 2', 'Warga Desa', 'Data direstore dari file upload.', 'Lainnya', '/uploads/1784689170471-257648ec.mp4', '/uploads/1784686749759-1e4ecccf.webp'),
            ('UMKM Restored Foto 1', 'Warga Desa', 'Data direstore dari file upload.', 'Lainnya', NULL, '/uploads/1784686772389-c922e4b1.webp'),
            ('UMKM Restored Foto 2', 'Warga Desa', 'Data direstore dari file upload.', 'Lainnya', NULL, '/uploads/1784686801401-ad012661.webp'),
            ('UMKM Restored Foto 3', 'Warga Desa', 'Data direstore dari file upload.', 'Lainnya', NULL, '/uploads/1784689309328-4c6f7aa6.webp')
        `);
        console.log('Restored UMKM from uploaded files.');
    } catch(e) {
        console.log(e);
    }
    
    await connection.end();
}
main();
