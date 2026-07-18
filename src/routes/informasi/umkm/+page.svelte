<script lang="ts">
	let { data } = $props();
	let activeFilter = $state('Semua');
	let selectedUmkm = $state<any>(null);

	let filteredUmkm = $derived(
		activeFilter === 'Semua'
			? data.umkmList
			: data.umkmList.filter((u) => u.kategori === activeFilter)
	);

	function formatWhatsapp(number: string | null) {
		if (!number) return '';
		// Remove leading 0 and add 62
		let clean = number.replace(/\D/g, '');
		if (clean.startsWith('0')) clean = '62' + clean.slice(1);
		if (!clean.startsWith('62')) clean = '62' + clean;
		return `https://wa.me/${clean}`;
	}

	function getYoutubeEmbedUrl(url: string | null) {
		if (!url) return null;
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		if (match && match[2].length === 11) {
			return `https://www.youtube.com/embed/${match[2]}`;
		}
		return null;
	}
</script>

<svelte:head>
	<title>Katalog UMKM - Desa Sopaah</title>
</svelte:head>

<div class="bg-gray-50 min-h-screen py-12">
	<div class="container mx-auto px-4 max-w-7xl">
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-gray-800 mb-4">Katalog UMKM Desa Sopaah</h1>
			<div class="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
			<p class="text-gray-600 text-lg max-w-2xl mx-auto">
				Temukan beragam produk dan jasa dari pelaku usaha warga Desa Sopaah. Dukung ekonomi lokal!
				🚀
			</p>
		</div>

		{#if data.umkmList.length === 0}
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
						d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
					></path></svg
				>
				<h2 class="text-2xl font-bold text-gray-600 mb-2">Segera Hadir</h2>
				<p class="text-gray-400">Data UMKM Desa Sopaah akan segera ditampilkan di sini.</p>
			</div>
		{:else}
			<!-- Category Filter -->
			<div class="flex flex-wrap gap-2 justify-center mb-10">
				<button
					onclick={() => (activeFilter = 'Semua')}
					class="px-5 py-2 rounded-full text-sm font-medium transition-all {activeFilter === 'Semua'
						? 'bg-green-600 text-white shadow-md shadow-green-600/25'
						: 'bg-white text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200'}"
				>
					Semua ({data.umkmList.length})
				</button>
				{#each data.categories as cat}
					<button
						onclick={() => (activeFilter = cat)}
						class="px-5 py-2 rounded-full text-sm font-medium transition-all {activeFilter === cat
							? 'bg-green-600 text-white shadow-md shadow-green-600/25'
							: 'bg-white text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200'}"
					>
						{cat}
					</button>
				{/each}
			</div>

			<!-- UMKM Cards Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each filteredUmkm as item (item.id)}
					<div
						class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
						role="button"
						tabindex="0"
						onclick={() => (selectedUmkm = item)}
						onkeydown={(e) => e.key === 'Enter' && (selectedUmkm = item)}
					>
						<!-- Image -->
						{#if item.gambarUrl}
							<div class="h-56 overflow-hidden bg-gray-100">
								<img
									src={item.gambarUrl}
									alt={item.namaUsaha}
									class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
						{:else}
							<div
								class="h-40 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center"
							>
								<svg
									class="w-16 h-16 text-green-300"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
									></path></svg
								>
							</div>
						{/if}

						<!-- Content -->
						<div class="p-6">
							<div class="flex items-start justify-between gap-2 mb-3">
								<h3
									class="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors"
								>
									{item.namaUsaha}
								</h3>
							</div>

							<span
								class="inline-block text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium mb-3"
								>{item.kategori}</span
							>

							<div class="space-y-1 mb-4">
								<p class="text-sm text-gray-500 flex items-center gap-2">
									<svg
										class="w-4 h-4 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										></path></svg
									>
									{item.pemilik}
								</p>
								{#if item.alamat}
									<p class="text-sm text-gray-400 flex items-center gap-2">
										<svg
											class="w-4 h-4 flex-shrink-0"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
											></path><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
											></path></svg
										>
										{item.alamat}
									</p>
								{/if}
							</div>

							<p class="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5">
								{item.deskripsi}
							</p>

							<!-- WhatsApp Button -->
							{#if item.noWhatsapp}
								<a
									href={formatWhatsapp(item.noWhatsapp)}
									target="_blank"
									rel="noopener noreferrer"
									onclick={(e) => e.stopPropagation()}
									class="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-sm hover:shadow-md"
								>
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
										><path
											d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
										></path></svg
									>
									Hubungi via WhatsApp
								</a>
							{:else}
								<div class="text-center py-2 text-sm text-gray-400">
									Nomor kontak belum tersedia
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			{#if filteredUmkm.length === 0}
				<div class="text-center py-12">
					<p class="text-gray-400 text-lg">Tidak ada UMKM dalam kategori "{activeFilter}"</p>
				</div>
			{/if}
		{/if}
	</div>
</div>

<!-- UMKM Detail Modal -->
{#if selectedUmkm}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm"
		onclick={() => (selectedUmkm = null)}
		role="presentation"
	>
		<!-- Modal Content -->
		<div
			class="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col relative"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
		>
			<!-- Close Button -->
			<button
				class="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full text-gray-800 hover:bg-white transition-colors shadow-sm"
				onclick={() => (selectedUmkm = null)}
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

			<div class="overflow-y-auto">
				<!-- Header Modal: Judul dan Kategori -->
				<div class="p-6 md:px-8 md:pt-8 md:pb-4 border-b border-gray-100">
					<div class="flex flex-col gap-3">
						<h2 class="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
							{selectedUmkm.namaUsaha}
						</h2>
						<div>
							<span
								class="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full"
								>{selectedUmkm.kategori}</span
							>
						</div>
					</div>
				</div>

				<!-- Gambar -->
				{#if selectedUmkm.gambarUrl}
					<div class="w-full bg-gray-100">
						<img
							src={selectedUmkm.gambarUrl}
							alt={selectedUmkm.namaUsaha}
							class="w-full max-h-[500px] object-contain"
						/>
					</div>
				{:else}
					<div
						class="h-64 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center"
					>
						<svg
							class="w-20 h-20 text-green-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
							></path></svg
						>
					</div>
				{/if}

				<!-- Detail Konten -->
				<div class="p-6 md:p-8">
					<div class="grid md:grid-cols-3 gap-8">
						<!-- Kiri: Deskripsi Detail -->
						<div class="md:col-span-2">
							<h3
								class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 inline-block pb-1"
							>
								Tentang Usaha
							</h3>
							<div
								class="prose prose-green max-w-none text-gray-700 leading-relaxed text-justify mb-6"
							>
								<p class="whitespace-pre-line text-lg">{selectedUmkm.deskripsi}</p>
							</div>

							{#if selectedUmkm.videoUrl}
								<div class="mt-8">
									<h3
										class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 inline-block pb-1"
									>
										Video Dokumenter KKN
									</h3>
									{#if getYoutubeEmbedUrl(selectedUmkm.videoUrl)}
										<!-- YouTube Player -->
										<div
											class="relative w-full pb-[56.25%] h-0 rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-black"
										>
											<iframe
												class="absolute top-0 left-0 w-full h-full"
												src={getYoutubeEmbedUrl(selectedUmkm.videoUrl)}
												title="Video Dokumenter {selectedUmkm.namaUsaha}"
												frameborder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												allowfullscreen
											></iframe>
										</div>
									{:else}
										<!-- Native HTML5 Video Player for direct uploads -->
										<div
											class="rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-black"
										>
											<video
												class="w-full h-auto aspect-video object-contain"
												controls
												preload="metadata"
											>
												<source src={selectedUmkm.videoUrl} />
												Your browser does not support the video tag.
											</video>
										</div>
									{/if}
								</div>
							{/if}
						</div>

						<!-- Kanan: Info Kontak & Pemilik -->
						<div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
							<h3 class="text-lg font-bold text-gray-800 mb-4">Informasi Kontak</h3>
							<div class="space-y-4 mb-6">
								<div class="flex items-start gap-3 text-gray-700">
									<svg
										class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										></path></svg
									>
									<div>
										<div class="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">
											Pemilik
										</div>
										<div class="font-semibold text-gray-800">{selectedUmkm.pemilik}</div>
									</div>
								</div>

								{#if selectedUmkm.alamat}
									<div class="flex items-start gap-3 text-gray-700">
										<svg
											class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
											></path><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
											></path></svg
										>
										<div>
											<div
												class="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5"
											>
												Alamat
											</div>
											<div class="font-medium text-gray-800 leading-snug">
												{selectedUmkm.alamat}
											</div>
										</div>
									</div>
								{/if}
							</div>

							{#if selectedUmkm.noWhatsapp}
								<a
									href={formatWhatsapp(selectedUmkm.noWhatsapp)}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center justify-center gap-2 w-full py-3.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
								>
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
										><path
											d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
										></path></svg
									>
									Hubungi Sekarang
								</a>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
