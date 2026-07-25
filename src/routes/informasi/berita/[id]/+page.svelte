<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.article.judul} - Desa Sopaah</title>
</svelte:head>

<div class="bg-gray-50 min-h-screen py-12">
	<div class="container mx-auto px-4 max-w-7xl">
		<!-- Breadcrumb & Back Button -->
		<div class="mb-8">
			<a
				href="/informasi/berita"
				class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					></path>
				</svg>
				Kembali ke Berita & Pengumuman
			</a>
		</div>

		<div class="grid lg:grid-cols-3 gap-10">
			<!-- Kolom Kiri: Detail Berita -->
			<div class="lg:col-span-2 space-y-8">
				<article
					class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-6 md:p-10"
				>
					<!-- Kategori & Tanggal -->
					<div class="flex items-center text-sm text-gray-500 mb-4">
						<span
							class="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide mr-4"
						>
							{data.article.kategori}
						</span>
						<svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							></path>
						</svg>
						{data.article.createdAt
							? new Date(data.article.createdAt).toLocaleDateString('id-ID', {
									day: 'numeric',
									month: 'long',
									year: 'numeric'
								})
							: '-'}
					</div>

					<!-- Judul Utama -->
					<h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
						{data.article.judul}
					</h1>

					<!-- Gambar Utama -->
					<div
						class="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 mb-8 flex justify-center items-center"
					>
						{#if data.article.gambarUrl}
							<img
								src={data.article.gambarUrl}
								alt={data.article.judul}
								class="w-full h-auto max-h-[600px] object-contain rounded-2xl"
							/>
						{:else}
							<img
								src="/img/slider1.jpeg"
								alt="Placeholder Berita"
								class="w-full h-auto max-h-[600px] object-contain rounded-2xl"
							/>
						{/if}
					</div>

					<!-- Isi Berita -->
					<div
						class="prose max-w-none text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line text-justify"
					>
						{data.article.isi}
					</div>
				</article>
			</div>

			<!-- Kolom Kanan: Berita Terbaru Lainnya -->
			<div class="space-y-8">
				<div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
					<h3 class="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100 font-bold">
						Berita Lainnya
					</h3>

					{#if data.recentBerita.length === 0}
						<p class="text-gray-400 text-sm">Tidak ada berita lain saat ini.</p>
					{:else}
						<div class="space-y-6">
							{#each data.recentBerita as item}
								<a href="/informasi/berita/{item.id}" class="flex gap-4 group cursor-pointer">
									<div class="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
										{#if item.gambarUrl}
											<img
												src={item.gambarUrl}
												alt={item.judul}
												class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										{:else}
											<div
												class="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center"
											>
												<svg
													class="w-8 h-8 text-green-200"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
													></path>
												</svg>
											</div>
										{/if}
									</div>
									<div class="flex-grow min-w-0 flex flex-col justify-between py-0.5">
										<div class="min-w-0">
											<span class="text-xs text-green-600 font-semibold block mb-1"
												>{item.kategori}</span
											>
											<h4
												class="font-bold text-gray-800 text-sm group-hover:text-green-700 transition-colors line-clamp-2 leading-snug"
											>
												{item.judul}
											</h4>
										</div>
										<span class="text-[10px] text-gray-400 block mt-1">
											{item.createdAt
												? new Date(item.createdAt).toLocaleDateString('id-ID', {
														day: 'numeric',
														month: 'short',
														year: 'numeric'
													})
												: '-'}
										</span>
									</div>
								</a>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
