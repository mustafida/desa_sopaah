import sharp from 'sharp';

/**
 * Mengompresi file gambar hingga ukuran ±30 KB dan mengembalikannya sebagai Data URL (Base64)
 * yang disimpan langsung ke dalam database MySQL.
 */
export async function saveUploadedFile(file: File): Promise<string | null> {
	if (!file || file.size === 0) return null;

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const isImage =
		file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|jfif|gif|avif)$/i.test(file.name);

	if (isImage) {
		try {
			// Step 1: Resizing awal yang besar & kualitas tinggi (WebP quality 80, max 1200px)
			// Hasilnya biasanya tajam dan ukurannya sekitar 100-300 KB
			let compressedBuffer = await sharp(buffer)
				.resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
				.webp({ quality: 80 })
				.toBuffer();

			// Step 2: Jika file masih lebih dari 500 KB, turunkan resolusi ke 1000px & kualitas 70
			if (compressedBuffer.length > 500 * 1024) {
				compressedBuffer = await sharp(buffer)
					.resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
					.webp({ quality: 70 })
					.toBuffer();
			}

			// Step 3: Jika file MASIH lebih dari 500 KB (sangat jarang), turunkan lagi ke 800px & kualitas 60
			if (compressedBuffer.length > 500 * 1024) {
				compressedBuffer = await sharp(buffer)
					.resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
					.webp({ quality: 60 })
					.toBuffer();
			}

			const base64 = compressedBuffer.toString('base64');
			return `data:image/webp;base64,${base64}`;
		} catch (error) {
			console.error('Error compressing image with sharp:', error);
			// Fallback ke simpan lokal jika gagal kompresi
		}
	}

	// Fallback untuk video dan file non-gambar lainnya, simpan ke static/uploads/
	const fs = await import('fs/promises');
	const path = await import('path');
	const crypto = await import('crypto');

	const uploadDir = path.resolve('static', 'uploads');
	await fs.mkdir(uploadDir, { recursive: true });

	const ext = file.name.split('.').pop() || 'bin';
	const fileName = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
	const filePath = path.join(uploadDir, fileName);

	await fs.writeFile(filePath, buffer);

	return `/uploads/${fileName}`;
}
