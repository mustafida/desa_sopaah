<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { latestBerita, settings } = data;

	let currentSlide = $state(0);
	const slides = ['/img/slider1.jpeg', '/img/slider2.jpeg'];

	let sambutanVisible = $state(false);
	let sambutanRef: HTMLElement;

	onMount(() => {
		const interval = setInterval(() => {
			currentSlide = (currentSlide + 1) % slides.length;
		}, 5000); // 5 seconds per slide

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					sambutanVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);

		if (sambutanRef) observer.observe(sambutanRef);

		return () => {
			clearInterval(interval);
			observer.disconnect();
		};
	});

	// Fallback untuk Pengaturan jika kosong
	const namaKades = settings['kepala_desa'] || 'Kepala Desa Sopa\'ah';
	const sambutanKades =
		settings['sambutan_kepala_desa'] ||
		'Melalui website ini, Pemerintah Desa Sopa’ah berupaya menyediakan informasi desa yang akurat, mudah diakses, dan bermanfaat bagi seluruh masyarakat. Website ini juga menjadi sarana untuk memperkenalkan potensi desa, kegiatan masyarakat, pelayanan administrasi, serta perkembangan pembangunan Desa Sopa’ah.\n\nKami berharap kehadiran website ini dapat mempermudah masyarakat dalam memperoleh informasi dan mengakses pelayanan desa. Mari bersama-sama membangun Desa Sopa’ah menjadi desa yang maju, mandiri, dan sejahtera.';
	
	let fotoKades = 'https://ui-avatars.com/api/?name=Kepala+Desa&background=16a34a&color=fff&size=512';
	if (settings['struktur_pemerintahan']) {
		try {
			const struktur = JSON.parse(settings['struktur_pemerintahan']);
			if (struktur.fotoKepalaDesa) {
				fotoKades = struktur.fotoKepalaDesa;
			}
		} catch (e) {}
	}

	let visi = '';
	let misiArray: string[] = [];
	if (settings['visi_misi']) {
		try {
			const parsed = JSON.parse(settings['visi_misi']);
			visi = parsed.visi || '';
			misiArray = parsed.misi || [];
		} catch (e) {}
	}

	// Data Kependudukan untuk statistik beranda
	let totalPenduduk = '2,5K';
	if (settings['data_kependudukan']) {
		try {
			const kependudukan = JSON.parse(settings['data_kependudukan']);
			if (kependudukan.totalJiwa) {
				totalPenduduk = kependudukan.totalJiwa.toLocaleString('id-ID');
			}
		} catch (e) {}
	}

	// Helper function untuk format tanggal
	const formatDate = (date: string | Date | null) => {
		if (!date) return '-';
		return new Date(date).toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const stripHtml = (html: string) => {
		if (!html) return '';
		return html.replace(/<[^>]*>?/gm, '');
	};
</script>

<svelte:head>
	<title>Desa Sopa'ah - Beranda</title>
	<meta name="description" content="Website Resmi Desa Sopa'ah, Pamekasan, Jawa Timur" />
</svelte:head>

<!-- HERO SECTION (Glassmorphism & Slider) -->
<section class="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center bg-gray-900">
	<!-- Background Slider -->
	{#each slides as slide, i}
		<div
			class="absolute inset-0 z-0 transition-opacity duration-[1500ms] ease-in-out {i === currentSlide
				? 'opacity-100'
				: 'opacity-0'}"
		>
			<div
				class="absolute inset-0 bg-cover bg-center animate-zoom"
				style="background-image: url('{slide}');"
			></div>
		</div>
	{/each}

	<!-- Dark Gradient Overlay -->
	<div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>

	<!-- Hero Content -->
	<div class="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
		<div class="max-w-4xl mx-auto text-center p-8 md:p-12 transform transition hover:scale-[1.01] duration-500">
			<span class="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm tracking-wider mb-4 border border-emerald-500/30">
				KABUPATEN PAMEKASAN
			</span>
			<h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-xl">
				Selamat Datang di <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-100">Desa Sopa'ah</span>
			</h1>
			<p class="text-lg md:text-2xl text-gray-200 mb-10 drop-shadow-md font-light leading-relaxed">
				Mewujudkan tata kelola desa yang inovatif, berbudaya, dan berorientasi pada pelayanan untuk meningkatkan kesejahteraan masyarakat.
			</p>
			<div class="flex flex-col sm:flex-row justify-center gap-4">
				<a href="/profil" class="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2">
					Jelajahi Profil Desa
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
				</a>
				<a href="/layanan-surat" class="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold rounded-full transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
					Layanan Surat
				</a>
			</div>
		</div>
	</div>
	
	<!-- Bouncing Scroll Down Indicator -->
	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
		</svg>
	</div>
</section>

<!-- LAYANAN & AKSES CEPAT (Quick Links) -->
<section class="py-16 bg-gradient-to-r from-white via-green-600 to-green-900 -mt-6 relative z-30 rounded-t-[3rem] shadow-2xl">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
			<!-- Link 1 -->
			<a href="/profil" class="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
				<div class="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
					</svg>
				</div>
				<h3 class="font-bold text-gray-800 group-hover:text-emerald-700">Profil Desa</h3>
				<p class="text-sm text-gray-500 mt-2">Pemerintahan & Sejarah</p>
			</a>
			<!-- Link 2 -->
			<a href="/informasi/berita" class="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-amber-200 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
				<div class="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
					</svg>
				</div>
				<h3 class="font-bold text-gray-800 group-hover:text-amber-700">Informasi & Berita</h3>
				<p class="text-sm text-gray-500 mt-2">Kabar terbaru desa</p>
			</a>
			<!-- Link 3 -->
			<a href="/informasi/umkm" class="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
				<div class="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
				</div>
				<h3 class="font-bold text-gray-800 group-hover:text-blue-700">Produk UMKM</h3>
				<p class="text-sm text-gray-500 mt-2">Potensi ekonomi warga</p>
			</a>
			<!-- Link 4 -->
			<a href="/informasi/galeri" class="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-rose-200 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
				<div class="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
				</div>
				<h3 class="font-bold text-gray-800 group-hover:text-rose-700">Galeri Desa</h3>
				<p class="text-sm text-gray-500 mt-2">Dokumentasi kegiatan</p>
			</a>
		</div>
	</div>
</section>

<!-- SAMBUTAN KEPALA DESA -->
<section class="py-20 bg-white" bind:this={sambutanRef}>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 transition-all duration-1000 transform {sambutanVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}">
			<!-- Photo -->
			<div class="w-full md:w-2/5 flex justify-center">
				<div class="relative group">
					<img 
						src={fotoKades} 
						alt="Kepala Desa Sopa'ah" 
						class="relative z-10 w-72 h-80 object-cover rounded-3xl shadow-xl border-4 border-white transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-2xl"
						onerror={(e) => ((e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Kepala+Desa&background=16a34a&color=fff&size=512")}
					/>
				</div>
			</div>
			<!-- Text -->
			<div class="w-full md:w-3/5 text-center md:text-left">
				<h4 class="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2">Pemerintah Desa Sopa'ah</h4>
				<h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Sambutan Kepala Desa</h2>
				<div class="prose prose-lg text-gray-600 mb-8 italic">
					<p class="whitespace-pre-line">"{sambutanKades}"</p>
				</div>
				<p class="font-bold text-gray-900 text-xl">{namaKades}</p>
				<p class="text-emerald-600 font-medium">Kepala Desa Sopa'ah</p>
			</div>
		</div>
	</div>
</section>

<!-- VISI & MISI -->
<section class="py-20 bg-gray-50 border-t border-gray-100">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
		<div class="text-center mb-16">
			<h4 class="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2">Tujuan Kami</h4>
			<h2 class="text-3xl md:text-4xl font-extrabold text-gray-900">Visi & Misi</h2>
			<div class="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
		</div>

		<div class="grid md:grid-cols-2 gap-10 text-gray-700">
			<!-- Visi -->
			<div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
				<h3 class="font-bold text-2xl mb-4 text-emerald-700 flex items-center">
					<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
					Visi
				</h3>
				<p class="italic leading-relaxed text-lg text-emerald-900 font-medium">
					"{visi}"
				</p>
			</div>
			<!-- Misi -->
			<div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
				<h3 class="font-bold text-2xl mb-6 text-emerald-700 flex items-center">
					<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
					Misi
				</h3>
				<ul class="space-y-4">
					{#each misiArray as misiItem, index}
						<li class="flex items-start">
							<span class="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold mr-3 mt-0.5 text-sm transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:rotate-12 hover:bg-emerald-500 hover:text-white hover:shadow-md cursor-pointer">{index + 1}</span>
							<div class="text-gray-800 leading-relaxed transition-all duration-300 hover:translate-x-2 hover:text-emerald-700 cursor-default">{misiItem}</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- BERITA TERKINI -->
<section class="py-20 bg-white border-t border-gray-100">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h4 class="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2">Informasi Terbaru</h4>
			<h2 class="text-3xl md:text-4xl font-extrabold text-gray-900">Kabar & Berita Desa</h2>
			<div class="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
			{#if latestBerita && latestBerita.length > 0}
				{#each latestBerita as berita}
					<div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group">
						<div class="relative h-56 overflow-hidden">
							<img 
								src={berita.gambarUrl || 'https://via.placeholder.com/800x400?text=Berita+Desa'} 
								alt={berita.judul} 
								class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
							/>
							<div class="absolute top-4 left-4">
								<span class="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
									{berita.kategori || 'Umum'}
								</span>
							</div>
						</div>
						<div class="p-6 flex-1 flex flex-col">
							<div class="text-xs text-gray-500 mb-3 flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								{formatDate(berita.createdAt)}
							</div>
							<h3 class="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
								{berita.judul}
							</h3>
							<!-- Menghapus tag HTML dari isi -->
							<p class="text-gray-600 mb-6 line-clamp-3 text-sm flex-1">
								{stripHtml(berita.isi).substring(0, 150)}...
							</p>
							<a href={`/informasi/berita/${berita.id}`} class="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2 mt-auto">
								Baca Selengkapnya
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					</div>
				{/each}
			{:else}
				<div class="col-span-1 md:col-span-3 text-center py-12 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
					Belum ada berita atau informasi terbaru.
				</div>
			{/if}
		</div>
		
		{#if latestBerita && latestBerita.length > 0}
			<div class="text-center mt-12">
				<a href="/informasi/berita" class="inline-block px-8 py-3 rounded-full border-2 border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-600 hover:text-white transition-colors duration-300">
					Lihat Semua Berita
				</a>
			</div>
		{/if}
	</div>
</section>

<!-- PETA ADMINISTRASI DESA -->
<section class="py-20 bg-gray-50">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-gray-800 mb-4">Peta Administrasi Desa</h2>
			<div class="w-24 h-1 bg-emerald-600 mx-auto rounded-full mb-6"></div>
			<p class="text-gray-600 max-w-2xl mx-auto">
				Klik gambar peta di bawah ini untuk melihat dalam ukuran penuh.
			</p>
		</div>
		
		<div class="bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-gray-100">
			<a href="/img/peta-desa-sopaah.jpg" target="_blank" rel="noopener noreferrer" class="block overflow-hidden rounded-2xl border border-slate-200 hover:shadow-2xl transition-all group relative">
				<img src="/img/peta-desa-sopaah.jpg" alt="Peta Administrasi Desa Sopaah" class="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-500" />
				
				<!-- Overlay on hover -->
				<div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
					<div class="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-emerald-700 font-bold">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
						Perbesar Peta
					</div>
				</div>
			</a>
		</div>
	</div>
</section>

<!-- STATISTIK SINGKAT -->
<section class="py-20 relative bg-emerald-900 overflow-hidden">
	<!-- Decorative background -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-400 blur-3xl"></div>
		<div class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-teal-300 blur-3xl"></div>
	</div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
		<h2 class="text-3xl font-bold text-white mb-12">Desa Sopa'ah dalam Angka</h2>
		
		<div class="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
			<div class="p-4 md:p-6">
				<div class="text-3xl md:text-5xl font-extrabold text-emerald-400 mb-2">2</div>
				<div class="text-emerald-100 font-medium uppercase tracking-wider text-xs md:text-sm">Dusun</div>
			</div>
			<div class="p-4 md:p-6 border-l border-emerald-800/50">
				<div class="text-3xl md:text-5xl font-extrabold text-amber-400 mb-2">{totalPenduduk}</div>
				<div class="text-emerald-100 font-medium uppercase tracking-wider text-xs md:text-sm">Penduduk</div>
			</div>
			<div class="p-4 md:p-6 border-l border-emerald-800/50">
				<div class="text-3xl md:text-5xl font-extrabold text-emerald-400 mb-2">{data.umkmCount > 0 ? data.umkmCount : '12+'}</div>
				<div class="text-emerald-100 font-medium uppercase tracking-wider text-xs md:text-sm">UMKM Lokal</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Custom animation for the slow zoom effect */
	@keyframes zoom {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(1.15);
		}
	}
	.animate-zoom {
		animation: zoom 25s infinite alternate ease-in-out;
	}
	
	/* Utility for line clamp (truncate multiple lines) */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;  
		overflow: hidden;
	}
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;  
		overflow: hidden;
	}
</style>
