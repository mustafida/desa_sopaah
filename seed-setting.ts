import mysql from 'mysql2/promise';
async function run() {
	const dbUrl = process.env.DATABASE_URL || 'mysql://root@localhost:3306/sopaah_db';
	const pool = mysql.createPool(dbUrl);
	await pool.query(
		"INSERT IGNORE INTO pengaturan (kunci, nilai) VALUES ('kepala_desa', 'Cicik Ernawati')"
	);
	await pool.end();
}
run();
