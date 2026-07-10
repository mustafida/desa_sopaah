<svelte:head>
	<title>Data Desa - Desa Sopaah</title>
</svelte:head>

<div class="bg-gray-50 min-h-screen py-12">
	<div class="container mx-auto px-4 max-w-6xl">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl font-bold text-gray-800 mb-4">Data & Transparansi Desa Sopaah</h1>
			<div class="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
			<p class="text-gray-600 text-lg max-w-2xl mx-auto">
				Informasi statistik kependudukan, demografi sosial, dan transparansi anggaran desa untuk mewujudkan tata kelola pemerintahan yang terbuka.
			</p>
		</div>

		<!-- Section 1: Ringkasan Penduduk (Cards) -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
			<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
				<div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
					<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
				</div>
				<h3 class="text-3xl font-bold text-gray-800 mb-1">2.450</h3>
				<p class="text-gray-500 font-medium">Total Jiwa</p>
			</div>

			<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
				<div class="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
					<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
				</div>
				<h3 class="text-3xl font-bold text-gray-800 mb-1">720</h3>
				<p class="text-gray-500 font-medium">Kepala Keluarga</p>
			</div>

			<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
				<div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
					<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
				</div>
				<h3 class="text-3xl font-bold text-gray-800 mb-1">1.215</h3>
				<p class="text-gray-500 font-medium">Laki-Laki</p>
			</div>

			<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
				<div class="w-14 h-14 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4">
					<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
				</div>
				<h3 class="text-3xl font-bold text-gray-800 mb-1">1.235</h3>
				<p class="text-gray-500 font-medium">Perempuan</p>
			</div>
		</div>

		<!-- Section 2: Demografi (Pendidikan & Pekerjaan) -->
		<div class="grid md:grid-cols-2 gap-8 mb-16">
			<!-- Pendidikan -->
			<div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
				<h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
					<span class="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center mr-3">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
					</span>
					Tingkat Pendidikan
				</h2>
				<div class="space-y-5">
					<div>
						<div class="flex justify-between text-sm mb-1"><span class="font-medium text-gray-700">SD / Sederajat</span><span class="text-gray-500">40%</span></div>
						<div class="w-full bg-gray-100 rounded-full h-2.5"><div class="bg-blue-500 h-2.5 rounded-full" style="width: 40%"></div></div>
					</div>
					<div>
						<div class="flex justify-between text-sm mb-1"><span class="font-medium text-gray-700">SMP / Sederajat</span><span class="text-gray-500">30%</span></div>
						<div class="w-full bg-gray-100 rounded-full h-2.5"><div class="bg-blue-400 h-2.5 rounded-full" style="width: 30%"></div></div>
					</div>
					<div>
						<div class="flex justify-between text-sm mb-1"><span class="font-medium text-gray-700">SMA / Sederajat</span><span class="text-gray-500">20%</span></div>
						<div class="w-full bg-gray-100 rounded-full h-2.5"><div class="bg-blue-300 h-2.5 rounded-full" style="width: 20%"></div></div>
					</div>
					<div>
						<div class="flex justify-between text-sm mb-1"><span class="font-medium text-gray-700">Diploma / Sarjana</span><span class="text-gray-500">10%</span></div>
						<div class="w-full bg-gray-100 rounded-full h-2.5"><div class="bg-blue-200 h-2.5 rounded-full" style="width: 10%"></div></div>
					</div>
				</div>
			</div>

			<!-- Pekerjaan -->
			<div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
				<h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
					<span class="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center mr-3">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
					</span>
					Mata Pencaharian
				</h2>
				<div class="space-y-5">
					<div>
						<div class="flex justify-between text-sm mb-1"><span class="font-medium text-gray-700">Petani / Pekebun</span><span class="text-gray-500">55%</span></div>
						<div class="w-full bg-gray-100 rounded-full h-2.5"><div class="bg-green-500 h-2.5 rounded-full" style="width: 55%"></div></div>
					</div>
					<div>
						<div class="flex justify-between text-sm mb-1"><span class="font-medium text-gray-700">Wiraswasta / Pedagang</span><span class="text-gray-500">20%</span></div>
						<div class="w-full bg-gray-100 rounded-full h-2.5"><div class="bg-green-400 h-2.5 rounded-full" style="width: 20%"></div></div>
					</div>
					<div>
						<div class="flex justify-between text-sm mb-1"><span class="font-medium text-gray-700">Karyawan Swasta</span><span class="text-gray-500">15%</span></div>
						<div class="w-full bg-gray-100 rounded-full h-2.5"><div class="bg-green-300 h-2.5 rounded-full" style="width: 15%"></div></div>
					</div>
					<div>
						<div class="flex justify-between text-sm mb-1"><span class="font-medium text-gray-700">PNS / TNI / Polri</span><span class="text-gray-500">10%</span></div>
						<div class="w-full bg-gray-100 rounded-full h-2.5"><div class="bg-green-200 h-2.5 rounded-full" style="width: 10%"></div></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Section 3: Transparansi Anggaran -->
		<div class="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 mb-16 relative overflow-hidden">
			<!-- Background decoration -->
			<div class="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-bl-full -mr-10 -mt-10 opacity-50 pointer-events-none"></div>
			
			<div class="relative z-10 text-center max-w-3xl mx-auto mb-10">
				<h2 class="text-3xl font-bold text-gray-800 mb-3">Transparansi APBDes 2026</h2>
				<p class="text-gray-600">Laporan ringkas mengenai rincian Anggaran Pendapatan dan Belanja Desa (APBDes) Sopaah untuk mewujudkan pemerintahan desa yang terbuka dan akuntabel.</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8">
				<!-- Pendapatan -->
				<div class="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
					<div class="flex items-center justify-between mb-6">
						<h3 class="text-xl font-bold text-emerald-800">Pendapatan Desa</h3>
						<span class="bg-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Rp 1.450.000.000</span>
					</div>
					<div class="space-y-4">
						<div class="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
							<div>
								<h4 class="font-bold text-gray-700 text-sm">Dana Desa (DD)</h4>
								<p class="text-xs text-gray-500">Pusat</p>
							</div>
							<span class="font-bold text-emerald-600">Rp 950 Juta</span>
						</div>
						<div class="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
							<div>
								<h4 class="font-bold text-gray-700 text-sm">Alokasi Dana Desa (ADD)</h4>
								<p class="text-xs text-gray-500">Kabupaten</p>
							</div>
							<span class="font-bold text-emerald-600">Rp 400 Juta</span>
						</div>
						<div class="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
							<div>
								<h4 class="font-bold text-gray-700 text-sm">Pendapatan Asli Desa (PADes)</h4>
								<p class="text-xs text-gray-500">BUMDes & Hasil Tanah</p>
							</div>
							<span class="font-bold text-emerald-600">Rp 100 Juta</span>
						</div>
					</div>
				</div>

				<!-- Belanja -->
				<div class="bg-orange-50 rounded-2xl p-6 border border-orange-100">
					<div class="flex items-center justify-between mb-6">
						<h3 class="text-xl font-bold text-orange-800">Belanja Desa</h3>
						<span class="bg-orange-200 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">Rp 1.450.000.000</span>
					</div>
					<div class="space-y-4">
						<div class="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
							<div>
								<h4 class="font-bold text-gray-700 text-sm">Pelaksanaan Pembangunan</h4>
								<p class="text-xs text-gray-500">Infrastruktur & Kesehatan</p>
							</div>
							<span class="font-bold text-orange-600">Rp 750 Juta</span>
						</div>
						<div class="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
							<div>
								<h4 class="font-bold text-gray-700 text-sm">Penyelenggaraan Pemerintahan</h4>
								<p class="text-xs text-gray-500">Operasional & Gaji</p>
							</div>
							<span class="font-bold text-orange-600">Rp 450 Juta</span>
						</div>
						<div class="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
							<div>
								<h4 class="font-bold text-gray-700 text-sm">Pemberdayaan Masyarakat</h4>
								<p class="text-xs text-gray-500">Pelatihan & Pertanian</p>
							</div>
							<span class="font-bold text-orange-600">Rp 250 Juta</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
