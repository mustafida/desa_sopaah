import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';

const UPLOAD_DIR = 'static/uploads';

/**
 * Simpan file yang diupload ke static/uploads dan return URL-nya
 */
export async function saveUploadedFile(file: File): Promise<string | null> {
	if (!file || file.size === 0) return null;

	// Generate unique filename
	const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
	const uniqueName = `${Date.now()}-${randomBytes(4).toString('hex')}.${ext}`;
	const filePath = join(UPLOAD_DIR, uniqueName);

	// Save file
	const buffer = Buffer.from(await file.arrayBuffer());
	await writeFile(filePath, buffer);

	// Return the public URL path
	return `/uploads/${uniqueName}`;
}
