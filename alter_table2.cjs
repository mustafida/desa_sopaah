const mysql = require('mysql2/promise');

async function migrate() {
	const dbUrl = 'mysql://root@localhost:3306/sopaah_db';
	const pool = mysql.createPool(dbUrl);

	try {
        await pool.query("ALTER TABLE umkm DROP COLUMN sosial_media;");
    	await pool.query("ALTER TABLE umkm ADD link_instagram varchar(500);");
    	await pool.query("ALTER TABLE umkm ADD link_facebook varchar(500);");
    	await pool.query("ALTER TABLE umkm ADD link_tiktok varchar(500);");
    	await pool.query("ALTER TABLE umkm ADD link_shopee varchar(500);");
    	console.log('Columns added successfully.');
	} catch (err) {
		console.error(err);
	}
    process.exit(0);
}
migrate();
