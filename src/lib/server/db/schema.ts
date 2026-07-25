import {
	mysqlTable,
	serial,
	int,
	longtext,
	varchar,
	boolean,
	timestamp,
	datetime
} from 'drizzle-orm/mysql-core';

// Tabel admin untuk login
export const adminUsers = mysqlTable('admin_users', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 100 }).notNull(),
	passwordHash: longtext('password_hash').notNull(),
	namaLengkap: varchar('nama_lengkap', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

// Tabel session untuk autentikasi
export const sessions = mysqlTable('sessions', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: int('user_id').notNull(),
	expiresAt: datetime('expires_at').notNull()
});

// Tabel berita/pengumuman
export const berita = mysqlTable('berita', {
	id: serial('id').primaryKey(),
	judul: varchar('judul', { length: 500 }).notNull(),
	isi: longtext('isi').notNull(),
	kategori: varchar('kategori', { length: 100 }).notNull().default('Umum'),
	gambarUrl: longtext('gambar_url'),
	isFeatured: boolean('is_featured').notNull().default(false),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

// Tabel UMKM
export const umkm = mysqlTable('umkm', {
	id: serial('id').primaryKey(),
	namaUsaha: varchar('nama_usaha', { length: 255 }).notNull(),
	pemilik: varchar('pemilik', { length: 255 }).notNull(),
	deskripsi: longtext('deskripsi').notNull(),
	kategori: varchar('kategori', { length: 100 }).notNull().default('Lainnya'),
	gambarUrl: longtext('gambar_url'),
	noWhatsapp: varchar('no_whatsapp', { length: 20 }),
	alamat: longtext('alamat'),
	mapsUrl: longtext('maps_url'),
	videoUrl: longtext('video_url'),
	fotoProduk: longtext('foto_produk'),
	linkInstagram: varchar('link_instagram', { length: 500 }),
	linkFacebook: varchar('link_facebook', { length: 500 }),
	linkTiktok: varchar('link_tiktok', { length: 500 }),
	linkShopee: varchar('link_shopee', { length: 500 }),
	createdAt: timestamp('created_at').defaultNow()
});

// Tabel pengaturan (settings)
export const pengaturan = mysqlTable('pengaturan', {
	kunci: varchar('kunci', { length: 100 }).primaryKey(),
	nilai: longtext('nilai').notNull()
});

// Tabel galeri dokumentasi
export const galeri = mysqlTable('galeri', {
	id: serial('id').primaryKey(),
	judul: varchar('judul', { length: 255 }).notNull(),
	gambarUrl: longtext('gambar_url').notNull(),
	kategori: varchar('kategori', { length: 100 }).notNull().default('Umum'),
	createdAt: timestamp('created_at').defaultNow()
});

// Tabel Pengaduan / Aspirasi Masyarakat
export const pengaduan = mysqlTable('pengaduan', {
	id: serial('id').primaryKey(),
	nama: varchar('nama', { length: 255 }).notNull(),
	nik: varchar('nik', { length: 20 }),
	noHp: varchar('no_hp', { length: 20 }),
	kategori: varchar('kategori', { length: 100 }).notNull().default('Umum'),
	isiLaporan: longtext('isi_laporan').notNull(),
	lampiranUrl: longtext('lampiran_url'),
	status: varchar('status', { length: 50 }).notNull().default('Menunggu'),
	tanggapan: longtext('tanggapan'),
	isRead: boolean('is_read').notNull().default(false),
	createdAt: timestamp('created_at').defaultNow()
});
