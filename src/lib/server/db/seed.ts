import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { adminUsers, berita, umkm, pengaturan } from './schema';
import { randomBytes, scryptSync } from 'crypto';

// Hash password utility (same as auth.ts)
function hashPassword(password: string): string {
	const salt = randomBytes(16).toString('hex');
	const hash = scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

async function seed() {
	const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root@localhost:3306/sopaah_db';

	console.log('🌱 Memulai seeding database...');
	console.log(`📦 Koneksi ke: ${DATABASE_URL}`);

	const client = mysql.createPool(DATABASE_URL);
	const db = drizzle(client, { mode: 'default' });

	try {
		// 1. Seed Admin User
		console.log('\n👤 Membuat akun admin...');
		await db.insert(adminUsers).values({
			username: 'admin',
			passwordHash: hashPassword('admin123'),
			namaLengkap: 'Administrator Desa'
		});
		console.log('   ✅ Admin dibuat: username=admin, password=admin123');

		// 2. Seed Berita
		console.log('\n📰 Menambahkan contoh berita...');
		await db.insert(berita).values([
			{
				judul: 'Panen Raya Pisang 2026: Pamekasan Tunjuk Sopaah Sebagai Desa Percontohan Lumbung Pangan',
				isi: 'Pemerintah Kabupaten Pamekasan secara resmi menunjuk Desa Sopaah sebagai desa percontohan lumbung pangan daerah, khususnya untuk komoditas pisang. Hal ini menyusul keberhasilan warga Sopaah dalam memaksimalkan potensi lahan agraris yang ada. Kepala Desa Sopaah menyampaikan apresiasi tinggi atas kerja keras seluruh warga yang telah berkontribusi dalam program ini.',
				kategori: 'Pertanian',
				gambarUrl: '/img/slider1.jpg',
				isFeatured: true
			},
			{
				judul: 'Perbaikan Jalan Utama Desa Telah Selesai 100%',
				isi: 'Proyek pengaspalan jalan utama yang menghubungkan dusun timur dan barat telah rampung dikerjakan menggunakan kuncuran dana desa. Jalan sepanjang 2.5 km ini diharapkan meningkatkan aksesibilitas dan mobilitas warga Desa Sopaah.',
				kategori: 'Infrastruktur',
				gambarUrl: '/img/slider2.jpg',
				isFeatured: false
			},
			{
				judul: 'Kunjungan Dinas Kesehatan ke Puskesmas Sopaah',
				isi: 'Dalam rangka peningkatan mutu pelayanan kesehatan warga desa, Dinas Kesehatan Kabupaten Pamekasan melakukan sidak ke fasilitas rawat inap Puskesmas Sopaah. Hasil evaluasi menunjukkan adanya peningkatan signifikan dalam pelayanan kesehatan.',
				kategori: 'Kesehatan',
				gambarUrl: '/img/slider3.jpg',
				isFeatured: false
			}
		]);
		console.log('   ✅ 3 berita contoh ditambahkan');

		// 3. Seed UMKM
		console.log('\n🏪 Menambahkan contoh UMKM...');
		await db.insert(umkm).values([
			{
				namaUsaha: 'Jamu Adiba Herbal',
				pemilik: 'Ibu Adiba',
				deskripsi: 'Menyediakan berbagai macam jamu herbal tradisional yang diracik dari bahan alami pilihan untuk kesehatan keluarga.',
				kategori: 'Kesehatan',
				noWhatsapp: '081234567890',
				alamat: 'Dusun Timur RT 01/RW 02'
			},
			{
				namaUsaha: '3 Putri Rengginang',
				pemilik: 'Ibu Putri',
				deskripsi: 'Rengginang gurih dan renyah khas Sopaah dengan berbagai varian rasa seperti terasi, bawang, dan udang. Cocok untuk camilan dan oleh-oleh. dkdsjghjghshguihaishguahihgiuahhgiuahgiuhiasuhiuhseuhgisuhdguhahaigheughudhsbsdhguauwhgusegijsihfiuahighisuhgiuhsihgishgehoiagjiahgiosaghwwfahvjb',
				kategori: 'Makanan & Minuman',
				noWhatsapp: '081298765432',
				alamat: 'Dusun Barat RT 03/RW 01'
			},
			{
				namaUsaha: 'Budidaya Ayam Kampung Organik',
				pemilik: 'Bapak Slamet',
				deskripsi: 'Peternakan ayam kampung organik yang menghasilkan telur dan daging ayam kampung berkualitas premium. Ayam dipelihara dengan pakan alami tanpa bahan kimia.',
				kategori: 'Peternakan',
				noWhatsapp: '085712345678',
				alamat: 'Dusun Utara RT 02/RW 03'
			}
		]);
		console.log('   ✅ 3 UMKM contoh ditambahkan');

		// 4. Seed Pengaturan (Settings)
		console.log('\n⚙️ Menambahkan pengaturan default...');
		await db.insert(pengaturan).values([
			{
				kunci: 'kepala_desa',
				nilai: 'Cicik Ernawati'
			}
		]);
		console.log('   ✅ Pengaturan default ditambahkan (Kepala Desa)');

		console.log('\n🎉 Seeding selesai! Anda bisa login dengan:');
		console.log('   Username: admin');
		console.log('   Password: admin123');
		console.log('\n⚠️  PENTING: Segera ganti password setelah login pertama!\n');

	} catch (error: any) {
		if (error.code === 'ER_DUP_ENTRY') {
			console.log('\n⚠️  Data seed sudah ada di database. Lewati...');
		} else {
			console.error('\n❌ Error saat seeding:', error);
			throw error;
		}
	} finally {
		await client.end();
	}
}

seed();
