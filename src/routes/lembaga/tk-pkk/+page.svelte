<script lang="ts">
	let { data } = $props();

	// Logo TK PKK
	const logoTkPkk = '/img/logo-tk-pkk.png';

	// Data materi plus dari KSP PDF
	const materiPlusList = [
		{
			kategori: 'Ibadah Amaliyah',
			deskripsi:
				"Membiasakan praktik wudhu, gerakan shalat, dan hafalan bacaan shalat (Ruku', Sujud, I'tidal, Duduk di antara dua sujud, Tahiyyat, Qunut, dan Doa Iftitah) sejak dini.",
			icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.168.477-4.5 1.253"></path></svg>`
		},
		{
			kategori: "Al-Qur'an & Hijaiyah",
			deskripsi:
				"Pembiasaan membaca huruf hijaiyah lepas & bersambung, pengenalan macam-macam harakat (harkat, tasydid, sukun), panjang-pendek, serta belajar membaca Al-Qur'an dengan tartil.",
			icon: `<svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.168.477-4.5 1.253"></path></svg>`
		},
		{
			kategori: 'Hafalan Surat Pendek',
			deskripsi:
				"Hafalan surat-surat pendek juz 30 pilihan seperti Surat Al-Fatihah, Al-Ikhlas, Al-Falaq, An-Naas, Al-Lahab, An-Nasr, Al-Kafirun, Al-Kautsar, Al-Ma'un, Al-Quraisy, Al-Fil, dan Al-Humazah.",
			icon: `<svg class="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
		},
		{
			kategori: 'Doa & Kalimat Thayyibah',
			deskripsi:
				'Hafalan doa harian (kedua orang tua, kebaikan dunia akhirat, doa belajar, makan, tidur, kamar mandi, rumah, masjid, bercermin, berpakaian, turun hujan, dll) serta kalimat Thayyibah.',
			icon: `<svg class="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`
		}
	];

	// Integrasi Kearifan Lokal
	const budayaMadura = [
		{
			nama: 'Gotong Royong',
			detail: 'Membangun jiwa kolaboratif, saling membantu, dan kepedulian sosial sejak usia dini.'
		},
		{
			nama: 'Taneyan Lanjheng',
			detail:
				'Mengenal konsep pemukiman tradisional Madura sebagai sarana belajar sejarah & budaya lokal.'
		},
		{
			nama: 'Sapi Sonok & Kerapan Sapi',
			detail:
				'Pengenalan tradisi khas yang penuh dengan nilai sportivitas, keindahan, dan kerja keras.'
		},
		{
			nama: 'Tari Topeng Ghettak',
			detail:
				'Melestarikan seni tari tradisional Madura untuk melatih motorik kasar dan rasa percaya diri anak.'
		},
		{
			nama: 'Tradisi Ter-Ater & Angonan Sapeh',
			detail:
				'Mengajarkan nilai berbagi, silaturahmi, dan interaksi yang harmonis dengan alam sekitar.'
		}
	];

	// Metode Pembelajaran Unggulan (STEAM & PBL)
	const metodeBelajar = [
		{
			judul: 'STEAM Integration',
			sub: 'Science, Tech, Engineering, Arts, Math',
			desc: 'Eksplorasi sains alam sederhana, rekayasa balok, pengenalan pola/bilangan matematika, serta ekspresi seni kreatif secara terpadu.',
			color: 'bg-gradient-to-br from-amber-500 to-orange-500',
			shadow: 'shadow-amber-500/20'
		},
		{
			judul: 'Project-Based Learning (PBL)',
			sub: 'Belajar dari Proyek Nyata',
			desc: "Melibatkan anak langsung dalam proyek konkret yang relevan, seperti menanam dan merawat 'Taman Toga Mini' serta menganalisis masalah lingkungan sederhana.",
			color: 'bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 text-sky-900',
			shadow: 'shadow-sky-500/10'
		},
		{
			judul: 'Inquiry & Eksplorasi',
			sub: 'Memantik Rasa Ingin Tahu',
			desc: 'Guru memfasilitasi anak untuk bertanya, memprediksi, menguji coba, dan menyimpulkan melalui eksperimen menyenangkan (contoh: benda tenggelam & terapung).',
			color: 'bg-gradient-to-br from-emerald-500 to-teal-500',
			shadow: 'shadow-emerald-500/20'
		}
	];

	// Lightbox Modal State
	let activeImage = $state<string | null>(null);
	let activeImageTitle = $state<string | null>(null);

	function openLightbox(url: string, title: string) {
		activeImage = url;
		activeImageTitle = title;
	}

	function closeLightbox() {
		activeImage = null;
		activeImageTitle = null;
	}
</script>

<svelte:head>
	<title>TK PKK Sopaah - Taman Kanak-Kanak Unggulan</title>
</svelte:head>

<div class="bg-[#fcfbf7] min-h-screen pb-20 font-['Inter']">
	<!-- Hero Section: Premium, Playful, and Welcoming Banner -->
	<div
		class="relative overflow-hidden bg-gradient-to-b from-amber-50 via-amber-50/40 to-[#fcfbf7] py-16 md:py-24 border-b border-amber-100"
	>
		<!-- Background Doodles & Geometric Circles -->
		<div class="absolute top-10 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl"></div>
		<div class="absolute bottom-10 right-10 w-48 h-48 bg-sky-200/30 rounded-full blur-3xl"></div>
		<div
			class="absolute top-1/2 left-2/3 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2"
		></div>

		<div class="container mx-auto px-4 max-w-6xl relative">
			<div class="flex flex-col md:flex-row items-center gap-10 md:gap-16">
				<!-- School Logo -->
				<div class="relative flex-shrink-0">
					<div
						class="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transition-transform hover:scale-105 duration-300"
					>
						<img
							src={logoTkPkk}
							alt="Logo TK PKK Sopaah"
							class="w-full h-full object-contain mix-blend-multiply"
							onerror={(e) => {
								if (e.currentTarget instanceof HTMLImageElement)
									e.currentTarget.src = '/img/logo.png';
							}}
						/>
					</div>
				</div>

				<!-- School Identity -->
				<div class="text-center md:text-left flex-1">
					<div
						class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-wider mb-4"
					>
						<span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
						Kurikulum Merdeka 2025/2026
					</div>
					<h1
						class="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight mb-4"
					>
						TK PKK <span class="text-amber-500">Sopaah</span>
					</h1>
					<p class="text-lg md:text-xl font-medium text-slate-600 mb-6 leading-relaxed max-w-3xl">
						Melahirkan generasi emas yang bertaqwa, berilmu, mandiri, kreatif, serta menjunjung
						tinggi nilai moral, kesantunan, dan kearifan lokal.
					</p>

					<div class="flex flex-wrap justify-center md:justify-start gap-4">
						<a
							href="#daftar"
							class="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5"
						>
							Profil Sekolah
						</a>
						<a
							href="#materi-plus"
							class="px-6 py-3 rounded-2xl bg-white hover:bg-amber-50 text-slate-700 font-bold border border-slate-200 transition-all hover:-translate-y-0.5"
						>
							Materi Unggulan (Plus)
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Layout -->
	<div class="container mx-auto px-4 max-w-6xl mt-12">
		<div class="grid lg:grid-cols-3 gap-10">
			<!-- Left side (2 Cols): Core Curriculum, Local Culture, Visi Misi -->
			<div class="lg:col-span-2 space-y-12">
				<!-- Visi & Misi Section -->
				<section
					class="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden"
				>
					<div
						class="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 opacity-50"
					></div>
					<h2 class="text-3xl font-extrabold text-slate-800 mb-8 flex items-center gap-3">
						<span class="p-2 rounded-xl bg-amber-50 text-amber-600">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
								></path></svg
							>
						</span>
						Visi & Misi Utama
					</h2>

					<div class="space-y-8 text-slate-700">
						<div class="bg-amber-50/50 p-6 rounded-2xl border-l-4 border-amber-500 shadow-sm">
							<h3 class="font-bold text-lg text-amber-900 mb-2">Visi Sekolah:</h3>
							<p class="italic text-slate-800 text-lg leading-relaxed font-medium">
								"{data.struktur.visi ||
									'Menjadikan sekolah yang dapat mewujudkan siswa yang bertaqwa kepada Tuhan Yang Maha Esa yang berilmu, berprestasi, mandiri dan berkarya, santun dalam berperilaku dan kreatif.'}"
							</p>
						</div>

						<div>
							<h3 class="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
								<span class="w-2 h-2 rounded-full bg-amber-500"></span>
								Misi Kami:
							</h3>
							<ul class="space-y-4">
								{#each data.struktur.misi || [] as misiItem, index}
									<li
										class="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-amber-100 transition-colors"
									>
										<span
											class="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0 mr-4 text-sm"
											>{index + 1}</span
										>
										<span class="text-slate-700 leading-relaxed font-medium">{misiItem}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</section>

				<!-- Deep Learning & Modern Methods Section (STEAM, PBL) -->
				<section class="space-y-6">
					<div class="text-center md:text-left mb-6">
						<h2 class="text-3xl font-extrabold text-slate-800">Inovasi Pembelajaran</h2>
						<p class="text-slate-500 mt-2">
							Menerapkan konsep Deep Learning (Pembelajaran Mendalam) yang berfokus pada 3 prinsip: <strong
								>Mindful (Berkesadaran), Meaningful (Bermakna), dan Joyful (Menggembirakan).</strong
							>
						</p>
					</div>

					<div class="grid md:grid-cols-3 gap-6">
						{#each metodeBelajar as metode}
							<div
								class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
							>
								<div>
									<div
										class="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg {metode.shadow} {metode.color}"
									>
										{metode.judul.charAt(0)}
									</div>
									<h3 class="font-extrabold text-slate-800 text-lg leading-snug mb-1">
										{metode.judul}
									</h3>
									<span class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4"
										>{metode.sub}</span
									>
									<p class="text-sm text-slate-600 leading-relaxed">{metode.desc}</p>
								</div>
							</div>
						{/each}
					</div>
				</section>

				<!-- Materi Plus (Agama & Pembiasaan Karakter Islami) -->
				<section
					id="materi-plus"
					class="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden"
				>
					<div
						class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 opacity-60"
					></div>

					<div class="mb-8">
						<span class="text-emerald-600 font-bold text-xs uppercase tracking-widest block mb-1"
							>Kurikulum Plus</span
						>
						<h2 class="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
							<span class="p-2 rounded-xl bg-emerald-50 text-emerald-600">
								<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
									></path></svg
								>
							</span>
							Program Karakter Religius & Materi Plus
						</h2>
						<p class="text-slate-500 mt-2">
							Program pembiasaan khusus untuk membekali spiritualitas dan nilai keagamaan dasar yang
							sangat krusial bagi anak didik.
						</p>
					</div>

					<div class="grid md:grid-cols-2 gap-6">
						{#each materiPlusList as materi}
							<div
								class="p-5 rounded-2xl bg-[#fafbf9] border border-[#f0f4ec] hover:border-emerald-200 transition-colors flex gap-4"
							>
								<div
									class="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm"
								>
									{@html materi.icon}
								</div>
								<div>
									<h4 class="font-bold text-slate-800 text-lg mb-1.5">{materi.kategori}</h4>
									<p class="text-sm text-slate-600 leading-relaxed font-medium">
										{materi.deskripsi}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</section>

				<!-- Local Wisdom: Kearifan Lokal Sopaah / Madura -->
				<section
					class="bg-gradient-to-br from-sky-50 to-indigo-50/30 p-8 md:p-10 rounded-3xl border border-sky-100 relative overflow-hidden"
				>
					<div
						class="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-200/40 rounded-full blur-2xl"
					></div>

					<div class="mb-8">
						<span class="text-sky-600 font-bold text-xs uppercase tracking-widest block mb-1"
							>Integrasi Kultural</span
						>
						<h2 class="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
							<span class="p-2 rounded-xl bg-sky-100 text-sky-600">
								<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									></path></svg
								>
							</span>
							Pelestarian Warisan Budaya & Kearifan Lokal
						</h2>
						<p class="text-slate-600 mt-2">
							Menyelaraskan proses belajar mengajar dengan melestarikan kebudayaan lokal daerah Jawa
							Timur dan tradisi masyarakat Madura di Desa Sopaah.
						</p>
					</div>

					<div class="space-y-4">
						{#each budayaMadura as budaya}
							<div
								class="p-4 rounded-xl bg-white border border-sky-100/50 hover:border-sky-300 transition-colors flex items-start gap-4 shadow-sm"
							>
								<div
									class="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center shrink-0 text-sky-600"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										></path></svg
									>
								</div>
								<div>
									<h4 class="font-bold text-slate-800 text-sm mb-1">{budaya.nama}</h4>
									<p class="text-xs text-slate-600 leading-relaxed font-medium">{budaya.detail}</p>
								</div>
							</div>
						{/each}
					</div>
				</section>
			</div>

			<!-- Right side (1 Col): Structure & School Profile -->
			<div class="space-y-8">
				<!-- School Profile & Contacts Section -->
				<section
					id="daftar"
					class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
				>
					<div class="bg-amber-500 px-6 py-8 text-white relative">
						<div class="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600"></div>
						<div class="relative z-10 text-center">
							<h3 class="font-extrabold text-2xl mb-1">Profil TK PKK Sopaah</h3>
							<p class="text-amber-100 text-sm">Informasi Legalitas & Detail Sekolah</p>
						</div>
					</div>

					<div class="p-6 space-y-4 text-sm">
						<div
							class="flex justify-between items-center py-2.5 border-b border-slate-100 font-medium"
						>
							<span class="text-slate-500">NPSN</span>
							<span class="font-bold text-slate-800">{data.struktur.npsn || '60726043'}</span>
						</div>
						<div
							class="flex justify-between items-center py-2.5 border-b border-slate-100 font-medium"
						>
							<span class="text-slate-500">Status</span>
							<span class="font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full"
								>{data.struktur.status || 'Swasta / Yayasan'}</span
							>
						</div>
						<div
							class="flex justify-between items-center py-2.5 border-b border-slate-100 font-medium"
						>
							<span class="text-slate-500">Akreditasi</span>
							<span class="font-bold text-slate-800"
								>{data.struktur.akreditasi || 'Terakreditasi C'}</span
							>
						</div>
						<div
							class="flex justify-between items-center py-2.5 border-b border-slate-100 font-medium"
						>
							<span class="text-slate-500">Waktu Belajar</span>
							<span class="font-bold text-slate-800">Senin - Sabtu</span>
						</div>
						<div
							class="flex justify-between items-center py-2.5 border-b border-slate-100 font-medium"
						>
							<span class="text-slate-500">KBM</span>
							<span class="font-bold text-slate-800">Luring (Tatap Muka)</span>
						</div>
						<div class="py-2.5 border-b border-slate-100">
							<span class="text-slate-500 block mb-1 font-medium">Alamat</span>
							<span class="font-semibold text-slate-800 leading-relaxed block text-xs"
								>{data.struktur.alamat ||
									'Jalan Raya Sopaah, Desa Sopaah, Kecamatan Pademawu, Kabupaten Pamekasan, Kode Pos 69381.'}</span
							>
						</div>
						<div
							class="flex justify-between items-center py-2.5 border-b border-slate-100 font-medium"
						>
							<span class="text-slate-500">Email</span>
							<span class="font-bold text-slate-800 text-xs"
								>{data.struktur.email || 'tksopaah@gmail.com'}</span
							>
						</div>
						<div class="flex justify-between items-center py-2.5 font-medium">
							<span class="text-slate-500">Hubungi Sekolah</span>
							<a
								href="https://wa.me/62{data.struktur.noWhatsapp || '81935168460'}"
								target="_blank"
								class="font-bold text-emerald-600 hover:underline"
								>{data.struktur.noWhatsapp || '081935168460'}</a
							>
						</div>
					</div>
				</section>

				<!-- Board of Management (Struktur Kepengurusan) -->
				<section class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
					<div class="bg-slate-800 px-6 py-6 text-white text-center">
						<h3 class="font-bold text-lg">Struktur Kepengurusan</h3>
						<p class="text-slate-400 text-xs mt-1">TK PKK Desa Sopaah (Sesuai Bagan Resmi)</p>
					</div>

					<div class="p-6 space-y-6">
						<!-- Ketua Yayasan -->
						<div class="flex flex-col items-center">
							<div
								class="w-full bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center shadow-sm"
							>
								<span
									class="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider"
									>Ketua Yayasan PKK Sopaah</span
								>
								<h4 class="font-extrabold text-slate-800 text-sm mt-2">
									{data.struktur.ketuaYayasan || 'CICIK ERNAWATI'}
								</h4>
							</div>

							<!-- Arrow Down -->
							<svg
								class="w-5 h-5 text-slate-300 my-2 animate-bounce"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 13l-7 7-7-7m14-6l-7 7-7-7"
								></path></svg
							>
						</div>

						<!-- Kepala Sekolah -->
						<div class="flex flex-col items-center">
							<div
								class="w-full bg-sky-50 border border-sky-200 rounded-2xl p-4 text-center shadow-sm"
							>
								<span
									class="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full uppercase tracking-wider"
									>Kepala Sekolah</span
								>
								<h4 class="font-extrabold text-slate-800 text-sm mt-2">
									{data.struktur.kepalaSekolah || 'MARDIYAH, S.Pd'}
								</h4>
							</div>

							<!-- Arrow Down -->
							<svg
								class="w-5 h-5 text-slate-300 my-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 13l-7 7-7-7m14-6l-7 7-7-7"
								></path></svg
							>
						</div>

						<!-- Staff Pembantu (Operator, Sekretaris, Bendahara) -->
						<div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
							<span
								class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-center mb-1"
								>Staf Administrasi & Keuangan</span
							>

							<!-- Operator Sekolah -->
							<div class="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3">
								<div
									class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0"
								>
									OP
								</div>
								<div>
									<h5 class="font-bold text-slate-800 text-xs">
										{data.struktur.operatorSekolah || 'RINA PARAMITA, S.Pd'}
									</h5>
									<p class="text-[9px] text-indigo-600 font-semibold uppercase tracking-wider">
										Operator Sekolah
									</p>
								</div>
							</div>

							<!-- Sekretaris -->
							<div class="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3">
								<div
									class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0"
								>
									SK
								</div>
								<div>
									<h5 class="font-bold text-slate-800 text-xs">
										{data.struktur.sekretaris || 'JUHAIRIAH, S.Pd'}
									</h5>
									<p class="text-[9px] text-indigo-600 font-semibold uppercase tracking-wider">
										Sekretaris
									</p>
								</div>
							</div>

							<!-- Bendahara -->
							<div class="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3">
								<div
									class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0"
								>
									BD
								</div>
								<div>
									<h5 class="font-bold text-slate-800 text-xs">
										{data.struktur.bendahara || 'SRI ASTUTIK, S.Pd'}
									</h5>
									<p class="text-[9px] text-indigo-600 font-semibold uppercase tracking-wider">
										Bendahara
									</p>
								</div>
							</div>
						</div>

						<!-- Arrow Down to Teachers -->
						<div class="flex justify-center">
							<svg
								class="w-5 h-5 text-slate-300 my-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 13l-7 7-7-7m14-6l-7 7-7-7"
								></path></svg
							>
						</div>

						<!-- Guru Pendidik (Kelompok A, Kelompok B) -->
						<div class="bg-[#fafcf9] rounded-2xl p-4 border border-emerald-100 space-y-3">
							<span
								class="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block text-center mb-1"
								>Guru Pendidik Kelompok</span
							>

							<!-- Guru Kelompok A -->
							<div class="bg-white rounded-xl p-3 border border-slate-100">
								<span
									class="text-[9px] font-bold text-emerald-600 uppercase tracking-wider block mb-1"
									>Guru Kelompok A</span
								>
								<h5 class="font-bold text-slate-800 text-xs">
									{data.struktur.guruKelompokA || 'JUHAIRIAH, S.Pd'}
								</h5>
							</div>

							<!-- Guru Kelompok B -->
							<div class="bg-white rounded-xl p-3 border border-slate-100">
								<span
									class="text-[9px] font-bold text-emerald-600 uppercase tracking-wider block mb-1"
									>Guru Kelompok B</span
								>
								{#each (data.struktur.guruKelompokB || 'SRI ASTUTIK, S.Pd\nRINA PARAMITA, S.Pd').split('\n') as namaGuru}
									{#if namaGuru.trim()}
										<h5 class="font-bold text-slate-800 text-xs last:mb-0 mb-1">
											{namaGuru.trim()}
										</h5>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>

		<!-- Dokumentasi Section (Full width, placed at the bottom) -->
		{#if data.dokumentasi && data.dokumentasi.length > 0}
			<div class="mt-16 bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm">
				<div class="text-center mb-10">
					<h2 class="text-3xl font-extrabold text-slate-800 mb-4 relative inline-block">
						Dokumentasi & Kegiatan Siswa
						<div
							class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-amber-500 rounded-full"
						></div>
					</h2>
					<p class="text-slate-500 max-w-2xl mx-auto mt-2">
						Momen kebersamaan, belajar aktif, dan kreativitas siswa-siswi TK PKK Sopaah.
					</p>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{#each data.dokumentasi as foto}
						<div
							onclick={() => openLightbox(foto.gambarUrl, foto.judul)}
							onkeydown={(e) => e.key === 'Enter' && openLightbox(foto.gambarUrl, foto.judul)}
							role="button"
							tabindex="0"
							class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col cursor-pointer"
						>
							<div class="h-48 overflow-hidden relative">
								<img
									src={foto.gambarUrl}
									alt={foto.judul}
									class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<div class="p-4 flex-1 flex flex-col justify-between">
								<h3 class="font-bold text-slate-800 text-sm leading-snug line-clamp-2">
									{foto.judul}
								</h3>
								{#if foto.createdAt}
									<p class="text-slate-400 text-[10px] mt-2 font-medium">
										{new Date(foto.createdAt).toLocaleDateString('id-ID')}
									</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- Lightbox Modal -->
	{#if activeImage}
		<div
			class="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 transition-all duration-300"
			onclick={closeLightbox}
			onkeydown={(e) => e.key === 'Escape' && closeLightbox()}
			role="button"
			tabindex="0"
		>
			<!-- Close Button -->
			<button
				class="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors focus:outline-none"
				onclick={(e) => {
					e.stopPropagation();
					closeLightbox();
				}}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<!-- Image Container -->
			<div
				class="relative max-w-4xl max-h-[85vh] overflow-hidden flex flex-col items-center gap-4"
				onclick={(e) => e.stopPropagation()}
				role="none"
			>
				<img
					src={activeImage}
					alt={activeImageTitle}
					class="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
				/>
				{#if activeImageTitle}
					<p class="text-white text-lg font-bold text-center drop-shadow-md">{activeImageTitle}</p>
				{/if}
			</div>
		</div>
	{/if}
</div>
