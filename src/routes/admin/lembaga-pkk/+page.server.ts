import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pengaturan, galeri } from '$lib/server/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { saveUploadedFile } from '$lib/server/upload';

export const load: PageServerLoad = async () => {
	const data = await db.select().from(pengaturan).where(eq(pengaturan.kunci, 'lembaga_pkk_struktur')).limit(1);
	let struktur = { 
		ketua: '', wakil: '', sekretaris: '', bendahara: '', 
		deskripsi: '', gambarUrl: '',
		pokja1: '', pokja2: '', pokja3: '', pokja4: ''
	};
	
	if (data.length > 0 && data[0].nilai) {
		try {
			const parsed = JSON.parse(data[0].nilai);
			struktur = { ...struktur, ...parsed };
		} catch (e) {
			console.error("Failed to parse lembaga_pkk_struktur JSON");
		}
	}

	const dokumentasi = await db.select().from(galeri).where(eq(galeri.kategori, 'PKK')).orderBy(desc(galeri.createdAt));

	return { struktur, dokumentasi };
};

export const actions: Actions = {
	simpan: async ({ request }) => {
		const formData = await request.formData();
		const ketua = formData.get('ketua')?.toString().trim() || '';
		const wakil = formData.get('wakil')?.toString().trim() || '';
		const sekretaris = formData.get('sekretaris')?.toString().trim() || '';
		const bendahara = formData.get('bendahara')?.toString().trim() || '';
		const deskripsi = formData.get('deskripsi')?.toString().trim() || '';
		
		const pokja1 = formData.get('pokja1')?.toString().trim() || '';
		const pokja2 = formData.get('pokja2')?.toString().trim() || '';
		const pokja3 = formData.get('pokja3')?.toString().trim() || '';
		const pokja4 = formData.get('pokja4')?.toString().trim() || '';

		const gambarFile = formData.get('gambar') as File | null;
		let gambarUrl = formData.get('existing_gambar')?.toString() || '';
		if (gambarFile && gambarFile.size > 0) {
			const uploadedUrl = await saveUploadedFile(gambarFile);
			if (uploadedUrl) gambarUrl = uploadedUrl;
		}

		const newVal = JSON.stringify({ 
			ketua, wakil, sekretaris, bendahara, 
			deskripsi, gambarUrl, 
			pokja1, pokja2, pokja3, pokja4
		});

		const existing = await db.select().from(pengaturan).where(eq(pengaturan.kunci, 'lembaga_pkk_struktur')).limit(1);
		
		if (existing.length > 0) {
			await db.update(pengaturan).set({ nilai: newVal }).where(eq(pengaturan.kunci, 'lembaga_pkk_struktur'));
		} else {
			await db.insert(pengaturan).values({ kunci: 'lembaga_pkk_struktur', nilai: newVal });
		}

		return { success: true, message: 'Struktur Kepengurusan PKK berhasil diperbarui!' };
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
			kategori: 'PKK',
			gambarUrl
		});

		return { success: true, message: 'Foto dokumentasi berhasil ditambahkan!' };
	},

	hapusDokumentasi: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		if (!id) {
			return fail(400, { error: 'ID foto tidak valid' });
		}

		await db.delete(galeri).where(and(eq(galeri.id, id), eq(galeri.kategori, 'PKK')));
		return { success: true, message: 'Foto dokumentasi berhasil dihapus!' };
	}
};
