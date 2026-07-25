import mysql from 'mysql2/promise';

async function main() {
	const connection = await mysql.createConnection(process.env.DATABASE_URL || 'mysql://root:@localhost:3306/desa_sopaah');

	try {
		await connection.query('ALTER TABLE `umkm` ADD COLUMN `foto_produk` longtext;');
		console.log('Column foto_produk added successfully.');
	} catch (err) {
		if (err.code === 'ER_DUP_FIELDNAME') {
			console.log('Column foto_produk already exists.');
		} else {
			console.error(err);
		}
	}
	await connection.end();
}

main();
