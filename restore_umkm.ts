import { db } from './src/lib/server/db/index';
import { umkm, adminUsers } from './src/lib/server/db/schema';
import { randomBytes, scryptSync } from 'crypto';

function hashPassword(password: string): string {
	const salt = randomBytes(16).toString('hex');
	const hash = scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

async function main() {
    console.log("Restoring UMKM...");
    try {
        await db.insert(umkm).values([
            {
                namaUsaha: 'UMKM dengan Video 1',
                pemilik: 'Warga Desa',
                deskripsi: 'Data direstore dari file upload.',
                kategori: 'Lainnya',
                videoUrl: '/uploads/1784526307375-bb0fcc8a.mp4',
                gambarUrl: '/uploads/1784686722534-2fb11de3.webp'
            },
            {
                namaUsaha: 'UMKM dengan Video 2',
                pemilik: 'Warga Desa',
                deskripsi: 'Data direstore dari file upload.',
                kategori: 'Lainnya',
                videoUrl: '/uploads/1784689170471-257648ec.mp4',
                gambarUrl: '/uploads/1784686749759-1e4ecccf.webp'
            },
            {
                namaUsaha: 'UMKM Foto 1',
                pemilik: 'Warga Desa',
                deskripsi: 'Data direstore dari file upload.',
                kategori: 'Lainnya',
                gambarUrl: '/uploads/1784686772389-c922e4b1.webp'
            },
            {
                namaUsaha: 'UMKM Foto 2',
                pemilik: 'Warga Desa',
                deskripsi: 'Data direstore dari file upload.',
                kategori: 'Lainnya',
                gambarUrl: '/uploads/1784686801401-ad012661.webp'
            },
            {
                namaUsaha: 'UMKM Foto 3',
                pemilik: 'Warga Desa',
                deskripsi: 'Data direstore dari file upload.',
                kategori: 'Lainnya',
                gambarUrl: '/uploads/1784689309328-4c6f7aa6.webp'
            }
        ]);
        console.log("Berhasil menambahkan UMKM.");
    } catch(e) {
        console.error(e);
    }
    
    process.exit(0);
}
main();
