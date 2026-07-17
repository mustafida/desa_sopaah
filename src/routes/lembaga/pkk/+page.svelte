<script lang="ts">
	let { data } = $props();

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
					{#if data.struktur.gambarUrl}
						<img src={data.struktur.gambarUrl} alt="PKK Desa Sopaah" class="w-full h-64 md:h-80 object-cover rounded-xl mb-6 shadow-sm" />
					{/if}
					<div class="text-gray-700 leading-relaxed space-y-4">
						{#each data.struktur.deskripsi.split('\n') as p}
							{#if p.trim()}
								<p>{p}</p>
							{/if}
						{/each}
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
							<p class="text-sm text-gray-600">{data.struktur.pokja1}</p>
						</div>
						<div class="bg-green-50 p-4 rounded-xl border border-green-100">
							<h4 class="font-bold text-green-800 mb-1">Pokja II</h4>
							<p class="text-sm text-gray-600">{data.struktur.pokja2}</p>
						</div>
						<div class="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
							<h4 class="font-bold text-yellow-800 mb-1">Pokja III</h4>
							<p class="text-sm text-gray-600">{data.struktur.pokja3}</p>
						</div>
						<div class="bg-red-50 p-4 rounded-xl border border-red-100">
							<h4 class="font-bold text-red-800 mb-1">Pokja IV</h4>
							<p class="text-sm text-gray-600">{data.struktur.pokja4}</p>
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
								<div class="font-bold text-gray-800">{data.struktur.ketua}</div>
								<div class="text-sm text-pink-600 font-medium">Ketua TP PKK</div>
							</div>
						</div>
						
						<!-- Wakil -->
						<div class="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
							<div class="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold mr-4">W</div>
							<div>
								<div class="font-bold text-gray-800">{data.struktur.wakil}</div>
								<div class="text-sm text-gray-500">Wakil Ketua</div>
							</div>
						</div>

						<!-- Sekretaris -->
						<div class="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
							<div class="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold mr-4">S</div>
							<div>
								<div class="font-bold text-gray-800">{data.struktur.sekretaris}</div>
								<div class="text-sm text-gray-500">Sekretaris</div>
							</div>
						</div>

						<!-- Bendahara -->
						<div class="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
							<div class="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold mr-4">B</div>
							<div>
								<div class="font-bold text-gray-800">{data.struktur.bendahara}</div>
								<div class="text-sm text-gray-500">Bendahara</div>
							</div>
						</div>

					</div>
				</div>
				
				<ul class="space-y-4">
					<li class="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
						<div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold shrink-0">1</div>
						<div>
							<h4 class="font-bold text-slate-800">Penghayatan dan Pengamalan Pancasila</h4>
						</div>
					</li>
					<li class="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
						<div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold shrink-0">2</div>
						<div>
							<h4 class="font-bold text-slate-800">Gotong Royong</h4>
						</div>
					</li>
					<li class="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
						<div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold shrink-0">3</div>
						<div>
							<h4 class="font-bold text-slate-800">Pangan</h4>
						</div>
					</li>
					<li class="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
						<div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold shrink-0">4</div>
						<div>
							<h4 class="font-bold text-slate-800">Sandang</h4>
						</div>
					</li>
					<li class="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
						<div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold shrink-0">5</div>
						<div>
							<h4 class="font-bold text-slate-800">Perumahan dan Tata Laksana Rumah Tangga</h4>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<!-- Dokumentasi PKK Full Width -->
		{#if data.dokumentasi && data.dokumentasi.length > 0}
			<div class="mt-16">
				<div class="text-center mb-10">
					<h2 class="text-3xl font-bold text-slate-800 mb-4 relative inline-block">
						Dokumentasi Kegiatan
						<div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-pink-500 rounded-full"></div>
					</h2>
					<p class="text-slate-600 max-w-2xl mx-auto">Galeri kegiatan dan program kerja TP PKK Desa Sopaah.</p>
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
								<img src={foto.gambarUrl} alt={foto.judul} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
							</div>
							<div class="p-4 flex-1 flex flex-col justify-between">
								<h3 class="font-bold text-slate-800 text-sm leading-snug line-clamp-2">{foto.judul}</h3>
								{#if foto.createdAt}
									<p class="text-slate-400 text-[10px] mt-2 font-medium">{new Date(foto.createdAt).toLocaleDateString('id-ID')}</p>
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
				onclick={(e) => { e.stopPropagation(); closeLightbox(); }}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			
			<!-- Image Container -->
			<div 
				class="relative max-w-4xl max-h-[85vh] overflow-hidden flex flex-col items-center gap-4"
				onclick={(e) => e.stopPropagation()}
				role="none"
			>
				<img src={activeImage} alt={activeImageTitle} class="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10" />
				{#if activeImageTitle}
					<p class="text-white text-lg font-bold text-center drop-shadow-md">{activeImageTitle}</p>
				{/if}
			</div>
		</div>
	{/if}
</div>
