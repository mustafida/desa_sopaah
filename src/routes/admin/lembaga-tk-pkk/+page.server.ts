import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pengaturan, galeri } from '$lib/server/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { saveUploadedFile } from '$lib/server/upload';

export const load: PageServerLoad = async () => {
	const data = await db.select().from(pengaturan).where(eq(pengaturan.kunci, 'lembaga_tk_pkk_struktur')).limit(1);
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
		alamat: 'Jalan Raya Sopaah, Desa Sopaah, Kecamatan Pademawu, Kabupaten Pamekasan, Kode Pos 69381.',
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
			console.error("Failed to parse lembaga_tk_pkk_struktur JSON");
		}
	}

	const dokumentasi = await db.select().from(galeri).where(eq(galeri.kategori, 'TK PKK')).orderBy(desc(galeri.createdAt));

	return { struktur, dokumentasi };
};

export const actions: Actions = {
	simpan: async ({ request }) => {
		const formData = await request.formData();
		const ketuaYayasan = formData.get('ketuaYayasan')?.toString().trim() || '';
		const kepalaSekolah = formData.get('kepalaSekolah')?.toString().trim() || '';
		const operatorSekolah = formData.get('operatorSekolah')?.toString().trim() || '';
		const sekretaris = formData.get('sekretaris')?.toString().trim() || '';
		const bendahara = formData.get('bendahara')?.toString().trim() || '';
		const guruKelompokA = formData.get('guruKelompokA')?.toString().trim() || '';
		const guruKelompokB = formData.get('guruKelompokB')?.toString().trim() || '';

		const npsn = formData.get('npsn')?.toString().trim() || '';
		const status = formData.get('status')?.toString().trim() || '';
		const akreditasi = formData.get('akreditasi')?.toString().trim() || '';
		const alamat = formData.get('alamat')?.toString().trim() || '';
		const email = formData.get('email')?.toString().trim() || '';
		const noWhatsapp = formData.get('noWhatsapp')?.toString().trim() || '';

		const visi = formData.get('visi')?.toString().trim() || '';
		const misi = JSON.parse(formData.get('misi')?.toString() || '[]');
		const tujuan = JSON.parse(formData.get('tujuan')?.toString() || '[]');

		const newVal = JSON.stringify({ 
			ketuaYayasan, kepalaSekolah, operatorSekolah, sekretaris, bendahara, guruKelompokA, guruKelompokB,
			npsn, status, akreditasi, alamat, email, noWhatsapp,
			visi, misi, tujuan
		});

		const existing = await db.select().from(pengaturan).where(eq(pengaturan.kunci, 'lembaga_tk_pkk_struktur')).limit(1);
		
		if (existing.length > 0) {
			await db.update(pengaturan).set({ nilai: newVal }).where(eq(pengaturan.kunci, 'lembaga_tk_pkk_struktur'));
		} else {
			await db.insert(pengaturan).values({ kunci: 'lembaga_tk_pkk_struktur', nilai: newVal });
		}

		return { success: true, message: 'Struktur Pengurus TK PKK berhasil diperbarui!' };
	},

	tambahDokumentasi: async ({ request }) => {
		const formData = await request.formData();
		const judul = formData.get('judul')?.toString().trim();
		const gambarFile = formData.get('gambar') as File | null;

		if (!judul || !gambarFile || gambarFile.size === 0) {
			return fail(400, { error: 'Judul dan Foto harus diisi' });
		}

		const gambarUrl = await saveUploadedFile(gambarFile);
		if (!gambarUrl) {
			return fail(500, { error: 'Gagal mengunggah foto' });
		}

		await db.insert(galeri).values({
			judul,
			kategori: 'TK PKK',
			gambarUrl
		});

		return { success: true, message: 'Foto dokumentasi TK PKK berhasil ditambahkan!' };
	},

	hapusDokumentasi: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		if (!id) {
			return fail(400, { error: 'ID foto tidak valid' });
		}

		await db.delete(galeri).where(and(eq(galeri.id, id), eq(galeri.kategori, 'TK PKK')));
		return { success: true, message: 'Foto dokumentasi TK PKK berhasil dihapus!' };
	}
};
