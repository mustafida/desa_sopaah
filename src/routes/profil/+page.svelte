<script lang="ts">
	let { data } = $props();

	// Helper untuk mendapatkan inisial dari nama
	let inisial = $derived(
		data.kepalaDesa
			? data.kepalaDesa
					.split(' ')
					.map((n: string) => n[0])
					.slice(0, 2)
					.join('')
					.toUpperCase()
			: 'KD'
	);
</script>

<svelte:head>
	<title>Profil Desa - Desa Sopaah</title>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-6xl">
	<!-- Header -->
	<div class="text-center mb-16">
		<h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Profil Desa Sopaah</h1>
		<div class="w-32 h-1.5 bg-green-600 mx-auto rounded-full mb-6"></div>
		<p class="text-gray-600 text-lg">Kecamatan Pademawu, Kabupaten Pamekasan, Jawa Timur</p>
	</div>

	<!-- Struktur Organisasi Pemerintah Desa Section -->
	<section
		class="mb-20 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 overflow-x-auto"
	>
		<h2 class="text-3xl font-bold text-center text-green-700 mb-6 flex items-center justify-center">
			<svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
				></path></svg
			>
			Struktur Organisasi Pemerintahan Desa
		</h2>

		<div class="tree flex justify-center pb-8 pt-2 min-w-[1000px]">
			<ul>
				<li>
					<!-- Kepala Desa -->
					<div class="org-node kades-node">
						{#if data.struktur?.fotoKepalaDesa}
							<img
								src={data.struktur.fotoKepalaDesa}
								alt={data.kepalaDesa}
								class="w-32 h-32 mx-auto rounded-full object-cover border-4 border-green-500 shadow-md mb-3 bg-white"
							/>
						{:else}
							<div
								class="w-32 h-32 mx-auto rounded-full border-4 border-green-500 shadow-md mb-3 bg-green-50 flex items-center justify-center text-4xl font-bold text-green-600"
							>
								{inisial}
							</div>
						{/if}
						<h3 class="font-bold text-lg text-gray-800">{data.kepalaDesa}</h3>
						<div
							class="text-green-700 font-bold text-sm bg-green-100 px-3 py-1 rounded-full mt-2 inline-block"
						>
							Kepala Desa
						</div>
					</div>

					<ul>
						<li>
							<!-- Sekretaris Desa -->
							<div class="org-node sekdes-node">
								<h3 class="font-bold text-gray-800">{data.struktur.sekdes}</h3>
								<div class="text-emerald-600 font-semibold text-xs mt-1">Sekretaris Desa</div>
							</div>

							<ul>
								<!-- Invisible Connector Node to route line down to Perangkat -->
								<li style="padding-top: 0; padding-left: 0; padding-right: 0;">
									<!-- No node content, just the sub-tree -->
									<ul>
										<li>
											<div class="org-node perangkat-node">
												<h3 class="font-bold text-gray-800 text-sm">
													{data.struktur.kaurPerencanaan}
												</h3>
												<div class="text-gray-500 text-xs mt-1">Kaur Perencanaan</div>
											</div>
										</li>
										<li>
											<div class="org-node perangkat-node">
												<h3 class="font-bold text-gray-800 text-sm">
													{data.struktur.kepalaTataUsaha}
												</h3>
												<div class="text-gray-500 text-xs mt-1">Kepala Tata Usaha</div>
											</div>
										</li>
										<li>
											<div class="org-node perangkat-node">
												<h3 class="font-bold text-gray-800 text-sm">
													{data.struktur.kepalaKeuangan}
												</h3>
												<div class="text-gray-500 text-xs mt-1">Kepala Keuangan</div>
											</div>
										</li>
										<li>
											<div class="org-node perangkat-node">
												<h3 class="font-bold text-gray-800 text-sm">
													{data.struktur.kasiPemerintahan}
												</h3>
												<div class="text-gray-500 text-xs mt-1">Kasi Pemerintahan</div>
											</div>
										</li>
										<li>
											<div class="org-node perangkat-node">
												<h3 class="font-bold text-gray-800 text-sm">
													{data.struktur.kasiPelayanan}
												</h3>
												<div class="text-gray-500 text-xs mt-1">Kasi Pelayanan</div>
											</div>
										</li>
										<!-- Kepala Dusun Barat -->
										<li>
											<div class="org-node kasun-node">
												<h3 class="font-bold text-green-900 text-sm">{data.struktur.kasunBarat}</h3>
												<div class="text-green-700 font-medium text-xs mt-1">
													Kepala Dusun Barat
												</div>
											</div>
										</li>
										<!-- Kepala Dusun Timur -->
										<li>
											<div class="org-node kasun-node">
												<h3 class="font-bold text-green-900 text-sm">{data.struktur.kasunTimur}</h3>
												<div class="text-green-700 font-medium text-xs mt-1">
													Kepala Dusun Timur
												</div>
											</div>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</section>

	<div class="grid lg:grid-cols-3 gap-8">
		<!-- Visi & Misi Section (Takes up 2 columns) -->
		<div class="lg:col-span-2 flex flex-col gap-8">
			<section class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex-1">
				<h2 class="text-3xl font-bold text-green-700 mb-8 flex items-center">
					<svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						></path></svg
					>
					Visi & Misi
				</h2>
				<div class="grid md:grid-cols-2 gap-10 text-gray-700">
					<div>
						<h3 class="font-bold text-xl mb-4 inline-block border-b-2 border-green-500 pb-2">
							Visi:
						</h3>
						<p
							class="italic leading-relaxed text-xl text-green-900 font-medium"
						>
							"{data.visiMisi?.visi}"
						</p>
					</div>
					<div>
						<h3 class="font-bold text-xl mb-6 inline-block border-b-2 border-green-500 pb-2">
							Misi:
						</h3>
						<ul class="space-y-5 leading-relaxed text-lg">
							{#each data.visiMisi?.misi || [] as misiItem, index}
								<li class="flex items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
									<span
										class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold mr-4 mt-0.5 transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:rotate-12 hover:bg-green-500 hover:text-white hover:shadow-md cursor-pointer"
										>{index + 1}</span
									>
									<div class="text-gray-800 transition-all duration-300 hover:translate-x-2 hover:text-green-700 cursor-default">
										{misiItem}
									</div>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</section>
			
			<!-- Peta Administrasi Section -->
			<section class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
				<h2 class="text-3xl font-bold text-green-700 mb-6 flex items-center">
					<svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
					Peta Administrasi Desa
				</h2>
				<p class="text-gray-600 mb-6">Klik gambar peta di bawah ini untuk melihat dalam ukuran penuh (agar QR Code dapat di-scan dengan jelas).</p>
				<a href="/img/peta-desa-sopaah.jpg" target="_blank" rel="noopener noreferrer" class="block overflow-hidden rounded-2xl border border-slate-200 hover:shadow-2xl transition-all group relative">
					<img src="/img/peta-desa-sopaah.jpg" alt="Peta Administrasi Desa Sopaah" class="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-500" />
					<div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
						<div class="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-emerald-700 font-bold">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
							Perbesar Peta
						</div>
					</div>
				</a>
			</section>
		</div>

		<!-- Profil Umum & Sejarah (Takes up 1 column on the right) -->
		<div class="space-y-8">
			<!-- Profil Umum & Geografis -->
			<section class="bg-gradient-to-r from-white via-green-600 to-green-900 p-8 rounded-3xl shadow-lg border border-green-700/20">
				<h2 class="text-2xl font-bold text-green-900 mb-6 flex items-center drop-shadow-sm">
					<svg class="w-6 h-6 mr-2 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path></svg
					>
					Profil Umum & Geografis
				</h2>
				<div class="flex flex-col gap-4 text-gray-700 leading-relaxed relative z-10">
					<div class="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-md hover:-translate-y-1 transition-transform">
						<span class="block text-sm text-green-700 font-extrabold mb-1 uppercase tracking-wider"
							>Nama Wilayah</span
						>
						<span class="font-bold text-gray-900 text-lg">Desa Sopaah</span>
					</div>
					<div class="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-md hover:-translate-y-1 transition-transform">
						<span class="block text-sm text-green-700 font-extrabold mb-1 uppercase tracking-wider"
							>Lokasi Administratif</span
						>
						<span class="font-medium text-gray-900">Kec. Pademawu, Kab. Pamekasan (Madura)</span>
					</div>
					<div class="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-md hover:-translate-y-1 transition-transform">
						<span class="block text-sm text-green-700 font-extrabold mb-1 uppercase tracking-wider"
							>Karakteristik</span
						>
						<span class="text-gray-900 font-medium"
							>Daerah pedesaan agraris dengan kondisi tanah yang subur.</span
						>
					</div>
				</div>
			</section>

			<!-- Sejarah Section -->
			<section class="bg-gradient-to-r from-white via-green-600 to-green-900 p-8 rounded-3xl shadow-lg border border-green-700/20">
				<h2 class="text-2xl font-bold text-green-900 mb-6 flex items-center drop-shadow-sm">
					<svg class="w-6 h-6 mr-2 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						></path></svg
					>
					Sejarah Singkat
				</h2>

				<div class="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-md relative z-10 space-y-4 text-gray-900 font-medium leading-relaxed">
					<p>
						Secara historis, penamaan desa ini mengakar kuat pada budaya dan legenda tutur
						masyarakat. Nama Sopa'ah dipercaya berasal dari dialek bahasa Madura, gabungan kata "so"
						(sapa/tegur) dan "pa'ah" (paha).
					</p>
					<p>
						Nama tersebut disematkan untuk mengenang tokoh pendahulu yang memiliki tanda khusus di
						bagian paha saat babat alas membuka area permukiman ini.
					</p>
				</div>
			</section>
		</div>
	</div>
</div>

<style>
	/* Tree Org Chart Styles */
	.tree ul {
		padding-top: 20px;
		position: relative;
		transition: all 0.5s;
		display: flex;
		justify-content: center;
	}

	.tree li {
		float: left;
		text-align: center;
		list-style-type: none;
		position: relative;
		padding: 20px 10px 0 10px;
		transition: all 0.5s;
	}

	/*We will use ::before and ::after to draw the connectors*/
	.tree li::before,
	.tree li::after {
		content: '';
		position: absolute;
		top: 0;
		right: 50%;
		border-top: 2px solid #86efac; /* Tailwind green-300 */
		width: 50%;
		height: 20px;
	}
	.tree li::after {
		right: auto;
		left: 50%;
		border-left: 2px solid #86efac;
	}

	/*We need to remove left-right connectors from elements without any siblings*/
	.tree li:only-child::after,
	.tree li:only-child::before {
		display: none;
	}

	/*Remove space from the top of single children*/
	.tree li:only-child {
		padding-top: 0;
	}

	/*Remove left connector from first child and right connector from last child*/
	.tree li:first-child::before,
	.tree li:last-child::after {
		border: 0 none;
	}

	/*Adding back the vertical connector to the last nodes*/
	.tree li:last-child::before {
		border-right: 2px solid #86efac;
		border-radius: 0 5px 0 0;
	}
	.tree li:first-child::after {
		border-radius: 5px 0 0 0;
	}

	/*Time to add downward connectors from parents*/
	.tree ul ul::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		border-left: 2px solid #86efac;
		width: 0;
		height: 20px;
		margin-left: -1px;
	}

	/* Styling the nodes */
	.org-node {
		display: inline-block;
		text-decoration: none;
		transition: all 0.3s;
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 1rem;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		width: 140px;
	}

	.org-node:hover {
		transform: translateY(-2px);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		border-color: #4ade80; /* Tailwind green-400 */
	}

	/* Specific Node Styles */
	.kades-node {
		width: auto;
		min-width: 200px;
		border: 2px solid #bbf7d0; /* green-200 */
		background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
	}

	.sekdes-node {
		width: auto;
		min-width: 180px;
		border: 2px solid #bbf7d0;
	}

	.perangkat-node {
		width: 125px;
	}

	.kasun-node {
		width: 125px;
		background: #f0fdf4; /* green-50 */
		border-color: #bbf7d0;
	}
</style>
