import mysql from 'mysql2/promise';

async function main() {
	const connection = await mysql.createConnection(process.env.DATABASE_URL || 'mysql://root:@localhost:3306/desa_sopaah');

	try {
		await connection.query("UPDATE umkm SET video_url = '/uploads/1784526357775-a46f18e7.mp4' WHERE id = 11");
		console.log('updated');
	} catch (err) {
		console.error(err);
	}
	await connection.end();
}

main();
