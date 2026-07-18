import {
	mysqlTable,
	serial,
	int,
	text,
	varchar,
	boolean,
	timestamp,
	datetime
} from 'drizzle-orm/mysql-core';

// Tabel admin untuk login
export const adminUsers = mysqlTable('admin_users', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 100 }).notNull().unique(),
	passwordHash: text('password_hash').notNull(),
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
	isi: text('isi').notNull(),
	kategori: varchar('kategori', { length: 100 }).notNull().default('Umum'),
	gambarUrl: text('gambar_url'),
	isFeatured: boolean('is_featured').notNull().default(false),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

// Tabel UMKM
export const umkm = mysqlTable('umkm', {
	id: serial('id').primaryKey(),
	namaUsaha: varchar('nama_usaha', { length: 255 }).notNull(),
	pemilik: varchar('pemilik', { length: 255 }).notNull(),
	deskripsi: text('deskripsi').notNull(),
	kategori: varchar('kategori', { length: 100 }).notNull().default('Lainnya'),
	gambarUrl: text('gambar_url'),
	noWhatsapp: varchar('no_whatsapp', { length: 20 }),
	alamat: text('alamat'),
	videoUrl: text('video_url'),
	createdAt: timestamp('created_at').defaultNow()
});

// Tabel pengaturan (settings)
export const pengaturan = mysqlTable('pengaturan', {
	kunci: varchar('kunci', { length: 100 }).primaryKey(),
	nilai: text('nilai').notNull()
});

// Tabel galeri dokumentasi
export const galeri = mysqlTable('galeri', {
	id: serial('id').primaryKey(),
	judul: varchar('judul', { length: 255 }).notNull(),
	gambarUrl: text('gambar_url').notNull(),
	kategori: varchar('kategori', { length: 100 }).notNull().default('Umum'),
	createdAt: timestamp('created_at').defaultNow()
});
