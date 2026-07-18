import mysql from 'mysql2/promise';

const dummyLongText = `Usaha ini dibangun berawal dari keinginan kuat untuk mengangkat potensi lokal yang ada di Desa Sopaah. Memanfaatkan resep warisan leluhur yang sudah diturunkan dari generasi ke generasi, kami terus berinovasi untuk memberikan kualitas produk terbaik kepada pelanggan kami.

Setiap produk yang kami buat melewati proses seleksi bahan baku yang sangat ketat. Kami memastikan hanya bahan-bahan segar, berkualitas tinggi, dan organik yang digunakan, karena kesehatan dan kepuasan pelanggan adalah prioritas utama kami. Selain itu, proses produksi juga dilakukan dengan memperhatikan standar kebersihan dan higienitas yang maksimal, sehingga produk kami tidak hanya lezat namun juga aman untuk dikonsumsi setiap hari.

Lebih dari sekadar berbisnis, kami memiliki misi sosial untuk memberdayakan masyarakat sekitar. Saat ini, kami mempekerjakan beberapa ibu rumah tangga di lingkungan desa Sopaah untuk membantu proses pengemasan dan produksi. Dengan membeli produk kami, Anda tidak hanya mendapatkan kualitas terbaik tetapi juga ikut serta dalam memajukan roda perekonomian desa kami.

Ke depannya, kami berharap dapat memperluas jangkauan pasar hingga ke luar kota dan bahkan seluruh nusantara. Dukungan Anda sangat berarti bagi kelangsungan UMKM kami. Jangan ragu untuk menghubungi kami jika ada pertanyaan lebih lanjut atau ingin melakukan pemesanan dalam jumlah besar untuk acara khusus Anda.`;

async function updateUMKMDescriptions() {
	const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root@localhost:3306/sopaah_db';
	console.log('🔄 Memperbarui deskripsi UMKM menjadi teks panjang...');

	const pool = mysql.createPool(DATABASE_URL);

	try {
		await pool.query(
			`
			UPDATE umkm 
			SET deskripsi = ?
		`,
			[dummyLongText]
		);

		console.log('   ✅ Semua UMKM telah diperbarui dengan deskripsi panjang (dummy text).');
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await pool.end();
	}
}

updateUMKMDescriptions();
