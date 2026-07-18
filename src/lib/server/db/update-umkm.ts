import mysql from 'mysql2/promise';

async function updateUMKM() {
	const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root@localhost:3306/sopaah_db';
	console.log('🔄 Memperbarui data UMKM...');

	const pool = mysql.createPool(DATABASE_URL);

	try {
		// Update UMKM pertama menjadi Jamu Adiba Herbal
		await pool.query(`
			UPDATE umkm 
			SET 
				nama_usaha = 'Jamu Adiba Herbal',
				pemilik = 'Ibu Adiba',
				deskripsi = 'Menyediakan berbagai macam jamu herbal tradisional yang diracik dari bahan alami pilihan untuk kesehatan keluarga.',
				kategori = 'Kesehatan'
			WHERE id = 1
		`);
		console.log('   ✅ UMKM 1 diperbarui menjadi Jamu Adiba Herbal');

		// Update UMKM kedua menjadi 3 Putri Rengginang
		await pool.query(`
			UPDATE umkm 
			SET 
				nama_usaha = '3 Putri Rengginang',
				pemilik = 'Ibu Putri',
				deskripsi = 'Rengginang gurih dan renyah khas Sopaah dengan berbagai varian rasa seperti terasi, bawang, dan udang. Cocok untuk camilan dan oleh-oleh.',
				kategori = 'Makanan & Minuman'
			WHERE id = 2
		`);
		console.log('   ✅ UMKM 2 diperbarui menjadi 3 Putri Rengginang');
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await pool.end();
	}
}

updateUMKM();
