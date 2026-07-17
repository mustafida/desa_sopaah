CREATE TABLE `admin_users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(100) NOT NULL,
	`password_hash` text NOT NULL,
	`nama_lengkap` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `berita` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`judul` varchar(500) NOT NULL,
	`isi` text NOT NULL,
	`kategori` varchar(100) NOT NULL DEFAULT 'Umum',
	`gambar_url` text,
	`is_featured` boolean NOT NULL DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `berita_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pengaturan` (
	`kunci` varchar(100) NOT NULL,
	`nilai` text NOT NULL,
	CONSTRAINT `pengaturan_kunci` PRIMARY KEY(`kunci`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `umkm` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama_usaha` varchar(255) NOT NULL,
	`pemilik` varchar(255) NOT NULL,
	`deskripsi` text NOT NULL,
	`kategori` varchar(100) NOT NULL DEFAULT 'Lainnya',
	`gambar_url` text,
	`no_whatsapp` varchar(20),
	`alamat` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `umkm_id` PRIMARY KEY(`id`)
);
