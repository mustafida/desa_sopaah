import mysql from 'mysql2/promise';
async function run() {
	const pool = mysql.createPool(process.env.DATABASE_URL as string);
	await pool.query(
		"INSERT IGNORE INTO pengaturan (kunci, nilai) VALUES ('kepala_desa', 'Cicik Ernawati')"
	);
	await pool.end();
}
run();
