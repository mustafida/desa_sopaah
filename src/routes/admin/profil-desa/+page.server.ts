import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pengaturan } from '$lib/server/db/schema';
import { inArray, eq } from 'drizzle-orm';
import { saveUploadedFile } from '$lib/server/upload';

export const load: PageServerLoad = async () => {
	const data = await db
		.select()
		.from(pengaturan)
		.where(inArray(pengaturan.kunci, ['visi_misi', 'kepala_desa', 'struktur_pemerintahan', 'sambutan_kepala_desa', 'kontak_admin', 'sosial_media']));
	let visiMisi = { visi: '', misi: [] };
	let kepalaDesa = '';
	let sambutanKepalaDesa = '';
	let kontakAdmin = '6281234567890';
	let sosialMedia = { instagram: '', facebook: '', youtube: '', tiktok: '' };
	let struktur = {
		sekdes: 'APRILIYANTO WAHYUDI',
		kaurPerencanaan: 'LILIS SURYANI',
		kepalaTataUsaha: 'ISARI WAHIDAH PUSPA WARDANI',
		kepalaKeuangan: 'DECKI SURYA IRWANTO',
		kasiPemerintahan: 'MUNIRAH',
		kasiPelayanan: 'AHMAD FAUZI',
		kasunBarat: 'ACH MIMBAR SOFIYULLAH',
		kasunTimur: 'AGUS SALIM',
		fotoKepalaDesa: ''
	};

	data.forEach((row) => {
		if (row.kunci === 'kepala_desa') kepalaDesa = row.nilai;
		if (row.kunci === 'sambutan_kepala_desa') sambutanKepalaDesa = row.nilai;
		if (row.kunci === 'visi_misi') {
			try {
				visiMisi = JSON.parse(row.nilai);
			} catch (e) {}
		}
		if (row.kunci === 'struktur_pemerintahan') {
			try {
				struktur = { ...struktur, ...JSON.parse(row.nilai) };
			} catch (e) {}
		}
		if (row.kunci === 'kontak_admin') kontakAdmin = row.nilai;
		if (row.kunci === 'sosial_media') {
			try {
				sosialMedia = { ...sosialMedia, ...JSON.parse(row.nilai) };
			} catch (e) {}
		}
	});

	return { visiMisi, kepalaDesa, sambutanKepalaDesa, struktur, kontakAdmin, sosialMedia };
};

export const actions: Actions = {
	simpan: async ({ request }) => {
		const formData = await request.formData();
		const kepalaDesa = formData.get('kepalaDesa')?.toString().trim();
		const sambutanKepalaDesa = formData.get('sambutanKepalaDesa')?.toString().trim();
		const visi = formData.get('visi')?.toString().trim();
		const misiStr = formData.get('misi')?.toString().trim();

		const sekdes = formData.get('sekdes')?.toString().trim() || '';
		const kaurPerencanaan = formData.get('kaurPerencanaan')?.toString().trim() || '';
		const kepalaTataUsaha = formData.get('kepalaTataUsaha')?.toString().trim() || '';
		const kepalaKeuangan = formData.get('kepalaKeuangan')?.toString().trim() || '';
		const kasiPemerintahan = formData.get('kasiPemerintahan')?.toString().trim() || '';
		const kasiPelayanan = formData.get('kasiPelayanan')?.toString().trim() || '';
		const kasunBarat = formData.get('kasunBarat')?.toString().trim() || '';
		const kasunTimur = formData.get('kasunTimur')?.toString().trim() || '';
		const kontakAdmin = formData.get('kontakAdmin')?.toString().trim() || '6281234567890';
		const sosmedInstagram = formData.get('sosmedInstagram')?.toString().trim() || '';
		const sosmedFacebook = formData.get('sosmedFacebook')?.toString().trim() || '';
		const sosmedYoutube = formData.get('sosmedYoutube')?.toString().trim() || '';
		const sosmedTiktok = formData.get('sosmedTiktok')?.toString().trim() || '';

		let fotoKepalaDesa = formData.get('existing_foto')?.toString() || '';
		const fileUpload = formData.get('fotoKepalaDesa') as File | null;
		if (fileUpload && fileUpload.size > 0) {
			const uploadedUrl = await saveUploadedFile(fileUpload);
			if (uploadedUrl) fotoKepalaDesa = uploadedUrl;
		}

		if (!visi || !misiStr || !kepalaDesa) {
			return fail(400, { error: 'Kepala Desa, Visi dan Misi tidak boleh kosong' });
		}

		let misiArr = [];
		try {
			misiArr = JSON.parse(misiStr);
		} catch (e) {
			return fail(400, { error: 'Format misi tidak valid' });
		}

		const strukturVal = JSON.stringify({
			sekdes,
			kaurPerencanaan,
			kepalaTataUsaha,
			kepalaKeuangan,
			kasiPemerintahan,
			kasiPelayanan,
			kasunBarat,
			kasunTimur,
			fotoKepalaDesa
		});

		const newVal = JSON.stringify({ visi, misi: misiArr });

		// Kepala Desa
		const existingKades = await db
			.select()
			.from(pengaturan)
			.where(eq(pengaturan.kunci, 'kepala_desa'));
		if (existingKades.length > 0) {
			await db
				.update(pengaturan)
				.set({ nilai: kepalaDesa })
				.where(eq(pengaturan.kunci, 'kepala_desa'));
		} else {
			await db.insert(pengaturan).values({ kunci: 'kepala_desa', nilai: kepalaDesa });
		}

		// Sambutan
		if (sambutanKepalaDesa !== undefined) {
			const existingSambutan = await db
				.select()
				.from(pengaturan)
				.where(eq(pengaturan.kunci, 'sambutan_kepala_desa'));
			if (existingSambutan.length > 0) {
				await db
					.update(pengaturan)
					.set({ nilai: sambutanKepalaDesa })
					.where(eq(pengaturan.kunci, 'sambutan_kepala_desa'));
			} else {
				await db.insert(pengaturan).values({ kunci: 'sambutan_kepala_desa', nilai: sambutanKepalaDesa });
			}
		}

		// Visi Misi
		const existingVisi = await db
			.select()
			.from(pengaturan)
			.where(eq(pengaturan.kunci, 'visi_misi'));
		if (existingVisi.length > 0) {
			await db.update(pengaturan).set({ nilai: newVal }).where(eq(pengaturan.kunci, 'visi_misi'));
		} else {
			await db.insert(pengaturan).values({ kunci: 'visi_misi', nilai: newVal });
		}

		// Struktur Pemerintahan
		const existingStruktur = await db
			.select()
			.from(pengaturan)
			.where(eq(pengaturan.kunci, 'struktur_pemerintahan'));
		if (existingStruktur.length > 0) {
			await db
				.update(pengaturan)
				.set({ nilai: strukturVal })
				.where(eq(pengaturan.kunci, 'struktur_pemerintahan'));
		} else {
			await db.insert(pengaturan).values({ kunci: 'struktur_pemerintahan', nilai: strukturVal });
		}

		// Kontak Admin
		const existingKontak = await db
			.select()
			.from(pengaturan)
			.where(eq(pengaturan.kunci, 'kontak_admin'));
		if (existingKontak.length > 0) {
			await db.update(pengaturan).set({ nilai: kontakAdmin }).where(eq(pengaturan.kunci, 'kontak_admin'));
		} else {
			await db.insert(pengaturan).values({ kunci: 'kontak_admin', nilai: kontakAdmin });
		}

		// Sosial Media
		const sosialMediaVal = JSON.stringify({ instagram: sosmedInstagram, facebook: sosmedFacebook, youtube: sosmedYoutube, tiktok: sosmedTiktok });
		const existingSosmed = await db
			.select()
			.from(pengaturan)
			.where(eq(pengaturan.kunci, 'sosial_media'));
		if (existingSosmed.length > 0) {
			await db.update(pengaturan).set({ nilai: sosialMediaVal }).where(eq(pengaturan.kunci, 'sosial_media'));
		} else {
			await db.insert(pengaturan).values({ kunci: 'sosial_media', nilai: sosialMediaVal });
		}

		return { success: true, message: 'Profil Desa dan Struktur Pemerintahan berhasil diperbarui!' };
	}
};
