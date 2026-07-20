import mysql from 'mysql2/promise';

async function createTables() {
	const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root@localhost:3306/sopaah_db';
	console.log('🔧 Membuat tabel secara langsung...');

	const pool = mysql.createPool(DATABASE_URL);

	// Drop old unused legacy tables if they exist
	const unusedTables = ['task', 'admins', 'dokumentasi', 'profil_desa', 'surat'];
	for (const table of unusedTables) {
		await pool.query(`DROP TABLE IF EXISTS ${table}`);
	}
	console.log(
		'   ✅ Tabel lama yang tidak terpakai (admins, dokumentasi, profil_desa, surat, task) telah dibersihkan'
	);

	// Create admin_users table
	await pool.query(`
		CREATE TABLE IF NOT EXISTS admin_users (
			id SERIAL PRIMARY KEY,
			username VARCHAR(100) NOT NULL UNIQUE,
			password_hash LONGTEXT NOT NULL,
			nama_lengkap VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`);
	await pool.query(`ALTER TABLE admin_users MODIFY COLUMN password_hash LONGTEXT`).catch(() => {});
	console.log('   ✅ Tabel admin_users dibuat/diperbarui');

	// Create sessions table
	await pool.query(`
		CREATE TABLE IF NOT EXISTS sessions (
			id VARCHAR(255) PRIMARY KEY,
			user_id INT NOT NULL,
			expires_at DATETIME NOT NULL
		)
	`);
	console.log('   ✅ Tabel sessions dibuat');

	// Create berita table
	await pool.query(`
		CREATE TABLE IF NOT EXISTS berita (
			id SERIAL PRIMARY KEY,
			judul VARCHAR(500) NOT NULL,
			isi LONGTEXT NOT NULL,
			kategori VARCHAR(100) NOT NULL DEFAULT 'Umum',
			gambar_url LONGTEXT,
			is_featured BOOLEAN NOT NULL DEFAULT FALSE,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`);
	await pool.query(`ALTER TABLE berita MODIFY COLUMN gambar_url LONGTEXT`).catch(() => {});
	await pool.query(`ALTER TABLE berita MODIFY COLUMN isi LONGTEXT`).catch(() => {});
	console.log('   ✅ Tabel berita dibuat/diperbarui (LONGTEXT)');

	// Create umkm table
	await pool.query(`
		CREATE TABLE IF NOT EXISTS umkm (
			id SERIAL PRIMARY KEY,
			nama_usaha VARCHAR(255) NOT NULL,
			pemilik VARCHAR(255) NOT NULL,
			deskripsi LONGTEXT NOT NULL,
			kategori VARCHAR(100) NOT NULL DEFAULT 'Lainnya',
			gambar_url LONGTEXT,
			no_whatsapp VARCHAR(20),
			alamat LONGTEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`);
	await pool.query(`ALTER TABLE umkm MODIFY COLUMN gambar_url LONGTEXT`).catch(() => {});
	await pool.query(`ALTER TABLE umkm MODIFY COLUMN deskripsi LONGTEXT`).catch(() => {});
	await pool.query(`ALTER TABLE umkm MODIFY COLUMN alamat LONGTEXT`).catch(() => {});
	console.log('   ✅ Tabel umkm dibuat/diperbarui (LONGTEXT)');

	// Create pengaturan table
	await pool.query(`
		CREATE TABLE IF NOT EXISTS pengaturan (
			kunci VARCHAR(100) PRIMARY KEY,
			nilai LONGTEXT NOT NULL
		)
	`);
	await pool.query(`ALTER TABLE pengaturan MODIFY COLUMN nilai LONGTEXT`).catch(() => {});
	console.log('   ✅ Tabel pengaturan dibuat/diperbarui (LONGTEXT)');

	// Create galeri table
	await pool.query(`
		CREATE TABLE IF NOT EXISTS galeri (
			id SERIAL PRIMARY KEY,
			judul VARCHAR(255) NOT NULL,
			gambar_url LONGTEXT NOT NULL,
			kategori VARCHAR(100) NOT NULL DEFAULT 'Umum',
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`);
	await pool.query(`ALTER TABLE galeri MODIFY COLUMN gambar_url LONGTEXT`).catch(() => {});
	console.log('   ✅ Tabel galeri dibuat/diperbarui (LONGTEXT)');

	console.log('\n🎉 Semua tabel berhasil dibuat!');
	await pool.end();
}

createTables();
