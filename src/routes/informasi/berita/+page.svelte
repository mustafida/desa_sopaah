<svelte:head>
	<title>Berita & Pengumuman - Desa Sopaah</title>
</svelte:head>

<div class="bg-gray-50 min-h-screen py-12">
	<div class="container mx-auto px-4 max-w-7xl">
		
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-gray-800 mb-4">Berita & Pengumuman Desa</h1>
			<div class="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
			<p class="text-gray-600 text-lg max-w-2xl mx-auto">
				Ikuti informasi terbaru, kegiatan warga, dan pengumuman resmi dari Pemerintah Desa Sopaah.
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-10">
			
			<!-- Kolom Kiri: Berita Utama & Daftar Berita (2 Kolom di Desktop) -->
			<div class="lg:col-span-2 space-y-10">
				
				<!-- Berita Utama (Featured) -->
				<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow">
					<div class="relative h-72 md:h-96 overflow-hidden bg-gray-200">
						<!-- Menggunakan foto slider1 sebagai placeholder gambar berita -->
						<img src="/img/slider1.jpg" alt="Berita Utama" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
						<div class="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
							Berita Utama
						</div>
					</div>
					<div class="p-8">
						<div class="flex items-center text-sm text-gray-500 mb-3">
							<svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
							12 Agustus 2026
							<span class="mx-3">•</span>
							<svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
							Oleh Admin Desa
						</div>
						<h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors">
							Panen Raya Pisang 2026: Pamekasan Tunjuk Sopaah Sebagai Desa Percontohan Lumbung Pangan
						</h2>
						<p class="text-gray-600 leading-relaxed mb-6">
							Pemerintah Kabupaten Pamekasan secara resmi menunjuk Desa Sopaah sebagai desa percontohan lumbung pangan daerah, khususnya untuk komoditas pisang. Hal ini menyusul keberhasilan warga Sopaah dalam memaksimalkan potensi lahan agraris...
						</p>
						<button class="text-green-600 font-bold hover:text-green-800 flex items-center transition-colors">
							Baca Selengkapnya 
							<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
						</button>
					</div>
				</div>

				<!-- Grid Berita Lainnya -->
				<h3 class="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 inline-block">Berita Terbaru</h3>
				<div class="grid md:grid-cols-2 gap-6">
					
					<!-- Card Berita 1 -->
					<div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all">
						<div class="h-48 bg-gray-200 overflow-hidden relative">
							<!-- Placeholder gambar pakai slider2 -->
							<img src="/img/slider2.jpg" alt="Berita 1" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
						</div>
						<div class="p-6">
							<div class="text-xs text-green-600 font-bold mb-2">Infrastruktur</div>
							<h4 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
								Perbaikan Jalan Utama Desa Telah Selesai 100%
							</h4>
							<p class="text-gray-600 text-sm mb-4 line-clamp-3">
								Proyek pengaspalan jalan utama yang menghubungkan dusun timur dan barat telah rampung dikerjakan menggunakan kuncuran dana desa...
							</p>
							<div class="text-xs text-gray-400">10 Agustus 2026</div>
						</div>
					</div>

					<!-- Card Berita 2 -->
					<div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all">
						<div class="h-48 bg-gray-200 overflow-hidden relative">
							<!-- Placeholder gambar pakai slider3 -->
							<img src="/img/slider3.jpg" alt="Berita 2" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
						</div>
						<div class="p-6">
							<div class="text-xs text-green-600 font-bold mb-2">Kesehatan</div>
							<h4 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
								Kunjungan Dinas Kesehatan ke Puskesmas Sopaah
							</h4>
							<p class="text-gray-600 text-sm mb-4 line-clamp-3">
								Dalam rangka peningkatan mutu pelayanan kesehatan warga desa, Dinas Kesehatan Kabupaten Pamekasan melakukan sidak ke fasilitas rawat inap...
							</p>
							<div class="text-xs text-gray-400">05 Agustus 2026</div>
						</div>
					</div>

				</div>
				
				<div class="text-center pt-4">
					<button class="px-6 py-3 border-2 border-green-600 text-green-700 font-bold rounded-full hover:bg-green-600 hover:text-white transition-colors">
						Muat Berita Lebih Banyak
					</button>
				</div>
			</div>

			<!-- Kolom Kanan: Pengumuman & Agenda -->
			<div class="space-y-8">
				
				<!-- Kotak Pengumuman Penting -->
				<div class="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
					<div class="absolute top-0 right-0 p-4 opacity-20">
						<svg class="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
					</div>
					<h3 class="text-xl font-bold mb-6 flex items-center relative z-10">
						<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
						Papan Pengumuman
					</h3>
					
					<div class="space-y-5 relative z-10">
						<div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
							<div class="text-green-200 text-xs font-bold mb-1">15 Agustus 2026</div>
							<h4 class="font-bold text-white text-sm mb-1">Penyaluran BLT Dana Desa Tahap 3</h4>
							<p class="text-green-50 text-xs">Mohon membawa fotokopi KK & KTP ke Balai Desa pukul 08:00 WIB.</p>
						</div>
						
						<div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
							<div class="text-green-200 text-xs font-bold mb-1">18 Agustus 2026</div>
							<h4 class="font-bold text-white text-sm mb-1">Gotong Royong Bersih Desa</h4>
							<p class="text-green-50 text-xs">Kerja bakti massal menyambut bulan kemerdekaan. Diharapkan partisipasi seluruh warga.</p>
						</div>
						
						<div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
							<div class="text-green-200 text-xs font-bold mb-1">Rutinan</div>
							<h4 class="font-bold text-white text-sm mb-1">Jadwal Posyandu Balita</h4>
							<p class="text-green-50 text-xs">Setiap tanggal 5 (Dusun Timur) dan tanggal 7 (Dusun Barat).</p>
						</div>
					</div>
				</div>

				<!-- Link Cepat -->
				<div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
					<h3 class="text-lg font-bold text-gray-800 mb-4">Layanan Cepat</h3>
					<div class="space-y-3">
						<a href="/layanan-surat" class="flex items-center p-3 text-gray-700 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-green-700 transition-colors font-medium">
							<svg class="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
							Buat Surat Pengantar
						</a>
						<a href="/profil" class="flex items-center p-3 text-gray-700 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-green-700 transition-colors font-medium">
							<svg class="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
							Kontak Perangkat Desa
						</a>
					</div>
				</div>
				
			</div>
			
		</div>
	</div>
</div>
