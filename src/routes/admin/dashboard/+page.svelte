<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Dashboard - Admin Desa Sopaah</title>
</svelte:head>

<div>
	<!-- Welcome -->
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-slate-800">Selamat Datang, {data.user?.namaLengkap ?? 'Admin'} 👋</h1>
		<p class="text-slate-500 mt-1">Kelola konten website Desa Sopaah dari sini.</p>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
		<!-- Total Berita -->
		<div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
			<div class="flex items-center justify-between mb-4">
				<div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
					<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
				</div>
			</div>
			<p class="text-3xl font-bold text-slate-800">{data.totalBerita}</p>
			<p class="text-sm text-slate-500 mt-1">Total Berita</p>
		</div>

		<!-- Total UMKM -->
		<div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
			<div class="flex items-center justify-between mb-4">
				<div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
					<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
				</div>
			</div>
			<p class="text-3xl font-bold text-slate-800">{data.totalUmkm}</p>
			<p class="text-sm text-slate-500 mt-1">Total UMKM</p>
		</div>

		<!-- Quick Actions -->
		<div class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-sm sm:col-span-2 lg:col-span-1">
			<h3 class="font-bold text-lg mb-4">Aksi Cepat</h3>
			<div class="space-y-2">
				<a href="/admin/berita?tambah=true" class="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
					Tambah Berita Baru
				</a>
				<a href="/admin/umkm?tambah=true" class="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
					Tambah UMKM Baru
				</a>
			</div>
		</div>
	</div>

	<!-- Recent Berita -->
	<div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
		<div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
			<h2 class="font-bold text-slate-800">Berita Terbaru</h2>
			<a href="/admin/berita" class="text-sm text-green-600 hover:text-green-700 font-medium">Lihat Semua →</a>
		</div>
		{#if data.recentBerita.length === 0}
			<div class="p-8 text-center text-slate-400">
				<svg class="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
				<p>Belum ada berita. <a href="/admin/berita?tambah=true" class="text-green-600 font-medium hover:underline">Buat berita pertama</a></p>
			</div>
		{:else}
			<div class="divide-y divide-slate-100">
				{#each data.recentBerita as item}
					<div class="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
						<div class="flex-1 min-w-0">
							<p class="font-medium text-slate-800 truncate">{item.judul}</p>
							<div class="flex items-center gap-3 mt-1">
								<span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{item.kategori}</span>
								<span class="text-xs text-slate-400">{item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</span>
							</div>
						</div>
						{#if item.isFeatured}
							<span class="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">⭐ Utama</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
