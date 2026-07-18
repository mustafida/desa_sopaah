<script lang="ts">
	let { data } = $props();
	let showContactModal = $state(false);
</script>

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

		{#if !data.featured && data.recentBerita.length === 0}
			<!-- Empty State -->
			<div class="text-center py-20">
				<svg
					class="w-20 h-20 mx-auto mb-6 text-gray-300"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
					></path></svg
				>
				<h2 class="text-2xl font-bold text-gray-600 mb-2">Belum Ada Berita</h2>
				<p class="text-gray-400">Berita dan pengumuman desa akan segera ditampilkan di sini.</p>
			</div>
		{:else}
			<div class="grid lg:grid-cols-3 gap-10">
				<!-- Kolom Kiri: Berita Utama & Daftar Berita -->
				<div class="lg:col-span-2 space-y-10">
					<!-- Berita Utama (Featured) -->
					{#if data.featured}
						<a
							href="/informasi/berita/{data.featured.id}"
							class="block bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow"
						>
							<div class="relative h-72 md:h-96 overflow-hidden bg-gray-200">
								{#if data.featured.gambarUrl}
									<img
										src={data.featured.gambarUrl}
										alt={data.featured.judul}
										class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								{:else}
									<img
										src="/img/slider1.jpg"
										alt="Berita Utama"
										class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								{/if}
								<div
									class="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
								>
									Berita Utama
								</div>
							</div>
							<div class="p-8">
								<div class="flex items-center text-sm text-gray-500 mb-3">
									<svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										></path></svg
									>
									{data.featured.createdAt
										? new Date(data.featured.createdAt).toLocaleDateString('id-ID', {
												day: 'numeric',
												month: 'long',
												year: 'numeric'
											})
										: '-'}
									<span class="mx-3">•</span>
									<svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
										></path></svg
									>
									{data.featured.kategori}
								</div>
								<h2
									class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors"
								>
									{data.featured.judul}
								</h2>
								<p class="text-gray-600 leading-relaxed mb-6 line-clamp-4">
									{data.featured.isi}
								</p>
							</div>
						</a>
					{/if}

					<!-- Grid Berita Lainnya -->
					{#if data.recentBerita.length > 0}
						<h3
							class="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 inline-block"
						>
							Berita Terbaru
						</h3>
						<div class="grid md:grid-cols-2 gap-6">
							{#each data.recentBerita as item}
								<a
									href="/informasi/berita/{item.id}"
									class="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all"
								>
									<div class="h-48 bg-gray-200 overflow-hidden relative">
										{#if item.gambarUrl}
											<img
												src={item.gambarUrl}
												alt={item.judul}
												class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										{:else}
											<div
												class="w-full h-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center"
											>
												<svg
													class="w-12 h-12 text-green-300"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
													></path></svg
												>
											</div>
										{/if}
									</div>
									<div class="p-6">
										<div class="text-xs text-green-600 font-bold mb-2">{item.kategori}</div>
										<h4
											class="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors line-clamp-2"
										>
											{item.judul}
										</h4>
										<p class="text-gray-600 text-sm mb-4 line-clamp-3">
											{item.isi}
										</p>
										<div class="text-xs text-gray-400">
											{item.createdAt
												? new Date(item.createdAt).toLocaleDateString('id-ID', {
														day: 'numeric',
														month: 'long',
														year: 'numeric'
													})
												: '-'}
										</div>
									</div>
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Kolom Kanan: Pengumuman & Layanan Cepat -->
				<div class="space-y-8">
					<!-- Kotak Pengumuman Penting -->
					<div
						class="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 text-white shadow-md relative overflow-hidden"
					>
						<div class="absolute top-0 right-0 p-4 opacity-20">
							<svg class="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"
								><path
									d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
								></path></svg
							>
						</div>
						<h3 class="text-xl font-bold mb-6 flex items-center relative z-10">
							<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
								></path></svg
							>
							Papan Pengumuman
						</h3>

						<div class="space-y-5 relative z-10">
							{#each data.announcements as announcement}
								<a
									href="/informasi/berita/{announcement.id}"
									class="block bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer text-left"
								>
									<div class="text-green-200 text-xs font-bold mb-1">
										{announcement.createdAt
											? new Date(announcement.createdAt).toLocaleDateString('id-ID', {
													day: 'numeric',
													month: 'long',
													year: 'numeric'
												})
											: '-'}
									</div>
									<h4 class="font-bold text-white text-sm mb-1">{announcement.judul}</h4>
									<p class="text-green-50 text-xs line-clamp-2">{announcement.isi}</p>
								</a>
							{/each}
							{#if data.announcements.length === 0}
								<p class="text-green-100 text-xs text-center py-4">Belum ada pengumuman baru.</p>
							{/if}
						</div>
					</div>

					<!-- Link Cepat -->
					<div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
						<h3 class="text-lg font-bold text-gray-800 mb-4">Layanan Cepat</h3>
						<div class="space-y-3">
							<a
								href="/layanan-surat"
								class="flex items-center p-3 text-gray-700 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-green-700 transition-colors font-medium"
							>
								<svg
									class="w-5 h-5 mr-3 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									></path></svg
								>
								Buat Surat Pengantar
							</a>
							<button
								onclick={() => (showContactModal = true)}
								class="w-full flex items-center p-3 text-gray-700 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-green-700 transition-colors font-medium text-left cursor-pointer"
							>
								<svg
									class="w-5 h-5 mr-3 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
									></path></svg
								>
								Kontak Perangkat Desa
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- Modal Kontak Perangkat Desa -->
{#if showContactModal}
	<div
		class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
		onclick={() => (showContactModal = false)}
		onkeydown={(e) => e.key === 'Escape' && (showContactModal = false)}
		role="dialog"
		tabindex="-1"
	>
		<div
			class="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
			role="document"
			tabindex="-1"
		>
			<!-- Close Button -->
			<button
				onclick={() => (showContactModal = false)}
				class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path></svg
				>
			</button>

			<h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
				<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
					></path></svg
				>
				Kontak Perangkat Desa
			</h3>

			<div class="space-y-4 mb-6">
				<div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
					<div class="text-xs text-green-600 font-bold uppercase mb-1">Kepala Desa</div>
					<div class="font-bold text-gray-800">{data.kepalaDesa}</div>
				</div>
				<div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
					<div class="text-xs text-green-600 font-bold uppercase mb-1">Sekretaris Desa</div>
					<div class="font-bold text-gray-800">{data.struktur?.sekdes || '-'}</div>
				</div>
				<div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
					<div class="text-xs text-green-600 font-bold uppercase mb-1">Kasi Pelayanan</div>
					<div class="font-bold text-gray-800">{data.struktur?.kasiPelayanan || '-'}</div>
				</div>
			</div>

			<a
				href="https://wa.me/6281935168460"
				target="_blank"
				class="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
					><path
						d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
					></path></svg
				>
				Hubungi via WhatsApp
			</a>
		</div>
	</div>
{/if}
