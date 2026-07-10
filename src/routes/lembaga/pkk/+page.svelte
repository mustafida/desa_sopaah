<svelte:head>
	<title>PKK - Desa Sopaah</title>
</svelte:head>

<div class="bg-gray-50 min-h-screen py-12">
	<div class="container mx-auto px-4 max-w-5xl">
		
		<!-- Header/Banner -->
		<div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-12 relative">
			<!-- Dekorasi Background -->
			<div class="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
			<div class="relative p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
				<div class="w-32 h-32 md:w-40 md:h-40 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner border-4 border-white">
					<!-- Ikon Teratai (mirip logo PKK) -->
					<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
				</div>
				<div class="text-center md:text-left">
					<span class="text-pink-600 font-bold tracking-wider uppercase text-sm mb-2 block">Pemberdayaan Kesejahteraan Keluarga</span>
					<h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Tim Penggerak PKK</h1>
					<p class="text-gray-600 text-lg leading-relaxed max-w-2xl">
						Gerakan nasional dalam pembangunan masyarakat yang tumbuh dari bawah, yang pengelolaannya dari, oleh, dan untuk masyarakat menuju keluarga sejahtera.
					</p>
				</div>
			</div>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			
			<!-- Main Content: Visi Misi & 10 Program Pokok -->
			<div class="md:col-span-2 space-y-8">
				
				<!-- Deskripsi & Tujuan -->
				<div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
					<h2 class="text-2xl font-bold text-pink-700 mb-6 border-b-2 border-gray-100 pb-4">Tujuan Gerakan PKK</h2>
					<div class="text-gray-700 leading-relaxed space-y-4">
						<p>
							PKK Desa Sopaah bertujuan untuk memberdayakan keluarga dalam mencapai kesejahteraan keluarga. Kegiatan ini difokuskan pada peran wanita sebagai penggerak kesejahteraan di tingkat keluarga maupun lingkungan desa.
						</p>
						<p>
							Kami aktif melakukan pembinaan ke seluruh dusun melalui wadah Dasawisma dan Posyandu untuk memastikan tercapainya keluarga yang beriman, berakhlak mulia, sehat jasmani dan rohani.
						</p>
					</div>
				</div>

				<!-- 10 Program Pokok PKK -->
				<div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
					<h2 class="text-2xl font-bold text-pink-700 mb-6 border-b-2 border-gray-100 pb-4">10 Program Pokok PKK</h2>
					<div class="grid sm:grid-cols-2 gap-x-4 gap-y-3">
						<div class="flex items-start">
							<span class="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">1</span>
							<span class="text-gray-700">Penghayatan dan Pengamalan Pancasila</span>
						</div>
						<div class="flex items-start">
							<span class="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">6</span>
							<span class="text-gray-700">Pendidikan dan Keterampilan</span>
						</div>
						<div class="flex items-start">
							<span class="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">2</span>
							<span class="text-gray-700">Gotong Royong</span>
						</div>
						<div class="flex items-start">
							<span class="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">7</span>
							<span class="text-gray-700">Kesehatan (Posyandu)</span>
						</div>
						<div class="flex items-start">
							<span class="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">3</span>
							<span class="text-gray-700">Pangan (Pemanfaatan Pekarangan)</span>
						</div>
						<div class="flex items-start">
							<span class="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">8</span>
							<span class="text-gray-700">Pengembangan Kehidupan Berkoperasi</span>
						</div>
						<div class="flex items-start">
							<span class="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">4</span>
							<span class="text-gray-700">Sandang</span>
						</div>
						<div class="flex items-start">
							<span class="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">9</span>
							<span class="text-gray-700">Kelestarian Lingkungan Hidup</span>
						</div>
						<div class="flex items-start">
							<span class="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">5</span>
							<span class="text-gray-700">Perumahan dan Tata Laksana Rumah Tangga</span>
						</div>
						<div class="flex items-start">
							<span class="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">10</span>
							<span class="text-gray-700">Perencanaan Sehat</span>
						</div>
					</div>
				</div>
				
				<!-- Pokja (Kelompok Kerja) -->
				<div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
					<h2 class="text-2xl font-bold text-pink-700 mb-6 border-b-2 border-gray-100 pb-4">Pembagian Pokja (Kelompok Kerja)</h2>
					<div class="grid sm:grid-cols-2 gap-4">
						<div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
							<h4 class="font-bold text-blue-800 mb-1">Pokja I</h4>
							<p class="text-sm text-gray-600">Membidangi Penghayatan & Pengamalan Pancasila serta Gotong Royong.</p>
						</div>
						<div class="bg-green-50 p-4 rounded-xl border border-green-100">
							<h4 class="font-bold text-green-800 mb-1">Pokja II</h4>
							<p class="text-sm text-gray-600">Membidangi Pendidikan, Keterampilan, dan Pengembangan Berkoperasi (UP2K).</p>
						</div>
						<div class="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
							<h4 class="font-bold text-yellow-800 mb-1">Pokja III</h4>
							<p class="text-sm text-gray-600">Membidangi Pangan, Sandang, Perumahan & Tata Laksana Rumah Tangga.</p>
						</div>
						<div class="bg-red-50 p-4 rounded-xl border border-red-100">
							<h4 class="font-bold text-red-800 mb-1">Pokja IV</h4>
							<p class="text-sm text-gray-600">Membidangi Kesehatan, Kelestarian Lingkungan Hidup, dan Perencanaan Sehat.</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Sidebar: Struktur Pengurus -->
			<div class="space-y-8">
				<div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
					<div class="bg-pink-600 p-4 text-center text-white">
						<h3 class="font-bold text-lg">Struktur TP PKK</h3>
						<p class="text-pink-100 text-sm">Desa Sopaah</p>
					</div>
					<div class="p-6 space-y-4">
						
						<!-- Ketua -->
						<div class="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
							<div class="w-12 h-12 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold mr-4">K</div>
							<div>
								<div class="font-bold text-gray-800">[Nama Ketua TP PKK]</div>
								<div class="text-sm text-pink-600 font-medium">Ketua TP PKK</div>
							</div>
						</div>
						
						<!-- Wakil -->
						<div class="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
							<div class="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold mr-4">W</div>
							<div>
								<div class="font-bold text-gray-800">[Nama Wakil]</div>
								<div class="text-sm text-gray-500">Wakil Ketua</div>
							</div>
						</div>

						<!-- Sekretaris -->
						<div class="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
							<div class="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold mr-4">S</div>
							<div>
								<div class="font-bold text-gray-800">[Nama Sekretaris]</div>
								<div class="text-sm text-gray-500">Sekretaris</div>
							</div>
						</div>

						<!-- Bendahara -->
						<div class="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
							<div class="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold mr-4">B</div>
							<div>
								<div class="font-bold text-gray-800">[Nama Bendahara]</div>
								<div class="text-sm text-gray-500">Bendahara</div>
							</div>
						</div>

					</div>
				</div>
				
				<!-- Galeri Singkat -->
				<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
					<h3 class="font-bold text-gray-800 mb-4 border-b pb-2">Dokumentasi PKK</h3>
					<div class="grid grid-cols-2 gap-2">
						<div class="h-24 bg-gray-200 rounded-lg overflow-hidden">
							<img src="/img/slider3.jpg" class="w-full h-full object-cover" alt="Kegiatan 1">
						</div>
						<div class="h-24 bg-gray-200 rounded-lg overflow-hidden">
							<img src="/img/slider1.jpg" class="w-full h-full object-cover" alt="Kegiatan 2">
						</div>
					</div>
					<a href="/informasi/galeri" class="block text-center mt-4 text-sm text-pink-600 font-bold hover:underline">Lihat Galeri PKK</a>
				</div>
			</div>
		</div>
	</div>
</div>
