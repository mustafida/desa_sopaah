import mysql from 'mysql2/promise';

async function main() {
	const connection = await mysql.createConnection(process.env.DATABASE_URL || 'mysql://root:@localhost:3306/desa_sopaah');

	try {
		await connection.query(`
			CREATE TABLE IF NOT EXISTS \`pengaduan\` (
				\`id\` int AUTO_INCREMENT NOT NULL,
				\`nama\` varchar(255) NOT NULL,
				\`nik\` varchar(20),
				\`no_hp\` varchar(20) NOT NULL,
				\`kategori\` varchar(100) NOT NULL DEFAULT 'Umum',
				\`isi_laporan\` longtext NOT NULL,
				\`lampiran_url\` longtext,
				\`status\` varchar(50) NOT NULL DEFAULT 'Menunggu',
				\`tanggapan\` longtext,
				\`created_at\` timestamp DEFAULT (now()),
				CONSTRAINT \`pengaduan_id\` PRIMARY KEY(\`id\`)
			);
		`);
		console.log('Table pengaduan created successfully.');
	} catch (err) {
		console.error('Error creating table:', err);
	}

	await connection.end();
}

main();
