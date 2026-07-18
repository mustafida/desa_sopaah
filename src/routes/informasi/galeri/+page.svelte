<script lang="ts">
	import { page } from '$app/stores';

	let { data } = $props();

	// Cek jika ada query parameter kategori
	let activeTab = $state($page.url.searchParams.get('kategori') || 'Semua');

	let filteredGaleri = $derived(
		activeTab === 'Semua'
			? data.fotoGaleri
			: data.fotoGaleri.filter((f) => f.kategori === activeTab)
	);

	const tabs = ['Semua', 'Umum', 'PKK', 'TK PKK'];
</script>

<svelte:head>
	<title>Galeri Desa Sopa'ah</title>
</svelte:head>

<!-- Hero Section -->
<div class="relative bg-slate-900 py-20 px-4 mt-[-64px] overflow-hidden">
	<div class="absolute inset-0 overflow-hidden">
		<img
			src="/img/slider3.jpg"
			alt="Background Galeri"
			class="w-full h-full object-cover opacity-20"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"
		></div>
	</div>

	<div class="relative container mx-auto text-center max-w-3xl mt-12">
		<h1 class="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
			Galeri Desa Sopa'ah
		</h1>
		<p class="text-xl text-slate-300 leading-relaxed font-light">
			Dokumentasi berbagai kegiatan, pembangunan, dan momen penting di Desa Sopa'ah.
		</p>
	</div>
</div>

<!-- Filter Tabs & Gallery Grid -->
<div class="container mx-auto px-4 py-12 -mt-8 relative z-10">
	<div class="max-w-6xl mx-auto">
		<!-- Tabs -->
		<div
			class="flex flex-wrap justify-center gap-2 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 max-w-fit mx-auto"
		>
			{#each tabs as tab}
				<button
					onclick={() => (activeTab = tab)}
					class="px-6 py-2.5 rounded-xl font-medium transition-all duration-300 {activeTab === tab
						? 'bg-green-600 text-white shadow-md'
						: 'text-slate-600 hover:bg-slate-50'}"
				>
					{tab}
				</button>
			{/each}
		</div>

		<!-- Grid Galeri -->
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
			{#each filteredGaleri as foto}
				<div
					class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
				>
					<div class="h-64 bg-slate-100 relative overflow-hidden">
						<img
							src={foto.gambarUrl}
							alt={foto.judul}
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							loading="lazy"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						></div>

						<div
							class="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold rounded-full shadow-sm"
						>
							<span
								class={foto.kategori === 'PKK'
									? 'text-pink-600'
									: foto.kategori === 'TK PKK'
										? 'text-yellow-600'
										: 'text-blue-600'}
							>
								{foto.kategori}
							</span>
						</div>
					</div>
					<div class="p-6">
						<h3
							class="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-green-600 transition-colors"
						>
							{foto.judul}
						</h3>
						<p class="text-sm text-slate-500 flex items-center gap-2">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								></path></svg
							>
							{#if foto.createdAt}
								{new Date(foto.createdAt).toLocaleDateString('id-ID', {
									day: 'numeric',
									month: 'long',
									year: 'numeric'
								})}
							{/if}
						</p>
					</div>
				</div>
			{:else}
				<div class="col-span-full py-20 text-center">
					<div
						class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6"
					>
						<svg
							class="w-12 h-12 text-slate-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							></path></svg
						>
					</div>
					<h3 class="text-2xl font-bold text-slate-700 mb-2">Tidak Ada Foto</h3>
					<p class="text-slate-500">
						Belum ada dokumentasi untuk kategori <strong>{activeTab}</strong> saat ini.
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>
