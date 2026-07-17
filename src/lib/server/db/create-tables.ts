import mysql from 'mysql2/promise';

async function createTables() {
	const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root@localhost:3306/sopaah_db';
	console.log('🔧 Membuat tabel secara langsung...');
	
	const pool = mysql.createPool(DATABASE_URL);

	// Drop old task table if exists
	await pool.query(`DROP TABLE IF EXISTS task`);
	console.log('   ✅ Tabel lama "task" dihapus');

	// Create admin_users table
	await pool.query(`
		CREATE TABLE IF NOT EXISTS admin_users (
			id SERIAL PRIMARY KEY,
			username VARCHAR(100) NOT NULL UNIQUE,
			password_hash TEXT NOT NULL,
			nama_lengkap VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`);
	console.log('   ✅ Tabel admin_users dibuat');

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
			isi TEXT NOT NULL,
			kategori VARCHAR(100) NOT NULL DEFAULT 'Umum',
			gambar_url TEXT,
			is_featured BOOLEAN NOT NULL DEFAULT FALSE,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`);
	console.log('   ✅ Tabel berita dibuat');

	// Create umkm table
	await pool.query(`
		CREATE TABLE IF NOT EXISTS umkm (
			id SERIAL PRIMARY KEY,
			nama_usaha VARCHAR(255) NOT NULL,
			pemilik VARCHAR(255) NOT NULL,
			deskripsi TEXT NOT NULL,
			kategori VARCHAR(100) NOT NULL DEFAULT 'Lainnya',
			gambar_url TEXT,
			no_whatsapp VARCHAR(20),
			alamat TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`);
	console.log('   ✅ Tabel umkm dibuat');

	// Create pengaturan table
	await pool.query(`
		CREATE TABLE IF NOT EXISTS pengaturan (
			kunci VARCHAR(100) PRIMARY KEY,
			nilai TEXT NOT NULL
		)
	`);
	console.log('   ✅ Tabel pengaturan dibuat');

	// Create galeri table
	await pool.query(`
		CREATE TABLE IF NOT EXISTS galeri (
			id SERIAL PRIMARY KEY,
			judul VARCHAR(255) NOT NULL,
			gambar_url TEXT NOT NULL,
			kategori VARCHAR(100) NOT NULL DEFAULT 'Umum',
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`);
	console.log('   ✅ Tabel galeri dibuat');

	console.log('\n🎉 Semua tabel berhasil dibuat!');
	await pool.end();
}

createTables();
