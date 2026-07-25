import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { umkm } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { saveUploadedFile, saveUploadedFileAsDisk } from '$lib/server/upload';

export const load: PageServerLoad = async () => {
	const allUmkm = await db.select().from(umkm).orderBy(desc(umkm.createdAt));

	return { umkmList: allUmkm };
};

export const actions: Actions = {
	tambah: async ({ request }) => {
		const formData = await request.formData();
		const namaUsaha = formData.get('nama_usaha')?.toString().trim();
		const pemilik = formData.get('pemilik')?.toString().trim();
		const deskripsi = formData.get('deskripsi')?.toString().trim();
		const kategori = formData.get('kategori')?.toString().trim() || 'Lainnya';
		const noWhatsapp = formData.get('no_whatsapp')?.toString().trim() || null;
		const alamat = formData.get('alamat')?.toString().trim() || null;
		const mapsUrl = formData.get('maps_url')?.toString().trim() || null;
		const linkInstagram = formData.get('link_instagram')?.toString().trim() || null;
		const linkFacebook = formData.get('link_facebook')?.toString().trim() || null;
		const linkTiktok = formData.get('link_tiktok')?.toString().trim() || null;
		const linkShopee = formData.get('link_shopee')?.toString().trim() || null;

		// Handle file upload
		const gambarFile = formData.get('gambar') as File | null;
		let gambarUrl: string | null = null;
		if (gambarFile && gambarFile.size > 0) {
			gambarUrl = await saveUploadedFile(gambarFile);
		}

		// Handle video upload
		const videoFile = formData.get('video') as File | null;
		let videoUrl: string | null = null;
		if (videoFile && videoFile.size > 0) {
			videoUrl = await saveUploadedFile(videoFile);
		}

		// Handle product photos upload - simpan ke disk (bukan base64) agar unlimited
		const fotoProdukFiles = formData.getAll('foto_produk') as File[];
		const fotoProdukUrls: string[] = [];
		for (const file of fotoProdukFiles) {
			if (file && file.size > 0) {
				const url = await saveUploadedFileAsDisk(file);
				if (url) fotoProdukUrls.push(url);
			}
		}
		let fotoProduk: string | null = null;
		if (fotoProdukUrls.length > 0) {
			fotoProduk = JSON.stringify(fotoProdukUrls);
		}

		if (!namaUsaha || !pemilik || !deskripsi) {
			return fail(400, {
				error: 'Nama usaha, pemilik, dan deskripsi harus diisi',
				action: 'tambah'
			});
		}

		try {
			await db.insert(umkm).values({
			namaUsaha,
			pemilik,
			deskripsi,
			kategori,
			gambarUrl,
			noWhatsapp,
			alamat,
			mapsUrl,
			videoUrl,
			fotoProduk,
			linkInstagram,
			linkFacebook,
			linkTiktok,
				linkShopee
			});

			return { success: true, message: 'UMKM berhasil ditambahkan!' };
		} catch (err: any) {
			console.error('Error in tambah action:', err);
			return fail(500, {
				error: `Terjadi kesalahan saat menyimpan data: ${err.message}`,
				action: 'tambah'
			});
		}
	},

	edit: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const namaUsaha = formData.get('nama_usaha')?.toString().trim();
		const pemilik = formData.get('pemilik')?.toString().trim();
		const deskripsi = formData.get('deskripsi')?.toString().trim();
		const kategori = formData.get('kategori')?.toString().trim() || 'Lainnya';
		const noWhatsapp = formData.get('no_whatsapp')?.toString().trim() || null;
		const alamat = formData.get('alamat')?.toString().trim() || null;
		const mapsUrl = formData.get('maps_url')?.toString().trim() || null;
		const linkInstagram = formData.get('link_instagram')?.toString().trim() || null;
		const linkFacebook = formData.get('link_facebook')?.toString().trim() || null;
		const linkTiktok = formData.get('link_tiktok')?.toString().trim() || null;
		const linkShopee = formData.get('link_shopee')?.toString().trim() || null;
		// Handle file upload - only update if new file is provided
		const gambarFile = formData.get('gambar') as File | null;
		const existingGambar = formData.get('existing_gambar')?.toString() || null;
		let gambarUrl = existingGambar;
		if (gambarFile && gambarFile.size > 0) {
			gambarUrl = await saveUploadedFile(gambarFile);
		}

		// Handle video upload - only update if new file is provided
		const videoFile = formData.get('video') as File | null;
		const existingVideo = formData.get('existing_video')?.toString() || null;
		let videoUrl = existingVideo;
		if (videoFile && videoFile.size > 0) {
			videoUrl = await saveUploadedFile(videoFile);
		}

		// Handle product photos upload - simpan ke disk (bukan base64) agar unlimited
		const fotoProdukFiles = formData.getAll('foto_produk') as File[];
		const keptFotoProduk = formData.getAll('kept_foto_produk') as string[];
		
		let fotoProdukArray = [...keptFotoProduk];
		
		for (const file of fotoProdukFiles) {
			if (file && file.size > 0) {
				const url = await saveUploadedFileAsDisk(file);
				if (url) fotoProdukArray.push(url);
			}
		}
		
		let fotoProduk = fotoProdukArray.length > 0 ? JSON.stringify(fotoProdukArray) : null;

		if (!id || !namaUsaha || !pemilik || !deskripsi) {
			return fail(400, { error: 'Data tidak lengkap', action: 'edit' });
		}

		try {
			await db
			.update(umkm)
			.set({ namaUsaha, pemilik, deskripsi, kategori, gambarUrl, noWhatsapp, alamat, mapsUrl, videoUrl, fotoProduk, linkInstagram, linkFacebook, linkTiktok, linkShopee })
				.where(eq(umkm.id, id));

			return { success: true, message: 'UMKM berhasil diperbarui!' };
		} catch (err: any) {
			console.error('Error in edit action:', err);
			return fail(500, { error: `Terjadi kesalahan saat memperbarui data: ${err.message}`, action: 'edit' });
		}
	},

	hapus: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		if (!id) {
			return fail(400, { error: 'ID UMKM tidak valid' });
		}

		await db.delete(umkm).where(eq(umkm.id, id));
		return { success: true, message: 'UMKM berhasil dihapus!' };
	}
};
