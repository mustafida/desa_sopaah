import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pengaturan, galeri } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const data = await db
		.select()
		.from(pengaturan)
		.where(eq(pengaturan.kunci, 'lembaga_tk_pkk_struktur'))
		.limit(1);

	let struktur = {
		ketuaYayasan: 'CICIK ERNAWATI',
		kepalaSekolah: 'MARDIYAH, S.Pd',
		operatorSekolah: 'RINA PARAMITA, S.Pd',
		sekretaris: 'JUHAIRIAH, S.Pd',
		bendahara: 'SRI ASTUTIK, S.Pd',
		guruKelompokA: 'JUHAIRIAH, S.Pd',
		guruKelompokB: 'SRI ASTUTIK, S.Pd\nRINA PARAMITA, S.Pd',
		npsn: '60726043',
		status: 'Swasta / Yayasan',
		akreditasi: 'Terakreditasi C',
		alamat:
			'Jalan Raya Sopaah, Desa Sopaah, Kecamatan Pademawu, Kabupaten Pamekasan, Kode Pos 69381.',
		email: 'tksopaah@gmail.com',
		noWhatsapp: '081935168460',
		visi: 'Menjadikan sekolah yang dapat mewujudkan siswa yang bertaqwa kepada Tuhan Yang Maha Esa yang berilmu, berprestasi, mandiri dan berkarya, santun dalam berperilaku dan kreatif.',
		misi: [
			'Menanamkan moral-moral agama',
			'Membentuk manusia yang beriman dan bertaqwa kepada Tuhan Yang Maha Esa',
			'Mengembangkan prestasi anak',
			'Membentuk keterampilan dan meningkatkan intelektual anak'
		],
		tujuan: [
			'Menambah nilai-nilai agama dan menjadi / membentuk manusia yang beriman, bertaqwa kepada Tuhan Yang Maha esa',
			'Mengembangkan prestasi anak agar berguna bagi nusa dan bangsa',
			'Mendidik anak agar menjadi generasi yang berkualitas, berguna bagi agama, nusa dan bangsa'
		]
	};

	if (data.length > 0 && data[0].nilai) {
		try {
			const parsed = JSON.parse(data[0].nilai);
			struktur = { ...struktur, ...parsed };
		} catch (e) {
			console.error('Failed to parse JSON for lembaga_tk_pkk_struktur');
		}
	}

	const dokumentasi = await db
		.select()
		.from(galeri)
		.where(eq(galeri.kategori, 'TK PKK'))
		.orderBy(desc(galeri.createdAt));

	return { struktur, dokumentasi };
};
