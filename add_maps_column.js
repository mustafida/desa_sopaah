import mysql from 'mysql2/promise';

async function main() {
	const connection = await mysql.createConnection(process.env.DATABASE_URL || 'mysql://root:@localhost:3306/desa_sopaah');

	try {
		await connection.query('ALTER TABLE `umkm` ADD COLUMN `maps_url` longtext;');
		console.log('Column maps_url added successfully.');
	} catch (err) {
		if (err.code === 'ER_DUP_FIELDNAME') {
			console.log('Column maps_url already exists.');
		} else {
			console.error(err);
		}
	}
    
    // Update Hawa Batik Maps URL
    await connection.query("UPDATE umkm SET maps_url = 'https://maps.app.goo.gl/gcFbWuf5p4q1A3Pi9?g_st=aw' WHERE id = 11");
    console.log('Updated maps_url for Hawa Batik (id 11)');

	await connection.end();
}

main();
