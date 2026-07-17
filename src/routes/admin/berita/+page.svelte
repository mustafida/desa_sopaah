<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let { data, form } = $props();

	let showForm = $state(false);
	let editingItem = $state<any>(null);
	let deleteConfirmId = $state<number | null>(null);

	// Open form if ?tambah=true in URL
	$effect(() => {
		if ($page.url.searchParams.get('tambah') === 'true') {
			showForm = true;
			editingItem = null;
		}
	});

	// Close form on success
	$effect(() => {
		if (form?.success) {
			showForm = false;
			editingItem = null;
			deleteConfirmId = null;
		}
	});

	function openEdit(item: any) {
		editingItem = { ...item };
		showForm = true;
	}

	function closeForm() {
		showForm = false;
		editingItem = null;
	}

	const kategoriOptions = ['Umum', 'Infrastruktur', 'Kesehatan', 'Pendidikan', 'Pertanian', 'Sosial', 'Ekonomi', 'Keagamaan'];
</script>

<svelte:head>
	<title>Kelola Berita - Admin Desa Sopaah</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
		<div>
			<h1 class="text-2xl font-bold text-slate-800">Kelola Berita</h1>
			<p class="text-slate-500 text-sm mt-1">Tambah, edit, atau hapus berita dan pengumuman desa.</p>
		</div>
		<button
			onclick={() => { showForm = true; editingItem = null; }}
			class="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
			Tambah Berita
		</button>
	</div>

	<!-- Success/Error Messages -->
	{#if form?.success}
		<div class="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
			<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
			<span class="text-green-700 text-sm font-medium">{form.message}</span>
		</div>
	{/if}
	{#if form?.error}
		<div class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
			<svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<span class="text-red-700 text-sm font-medium">{form.error}</span>
		</div>
	{/if}

	<!-- Modal Form -->
	{#if showForm}
		<div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onclick={closeForm} onkeydown={(e) => e.key === 'Escape' && closeForm()} role="dialog" tabindex="-1">
			<div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onclick={(e) => e.stopPropagation()} onkeydown={() => {}} role="document" tabindex="-1">
				<div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
					<h2 class="text-lg font-bold text-slate-800">{editingItem ? 'Edit Berita' : 'Tambah Berita Baru'}</h2>
					<button onclick={closeForm} class="text-slate-400 hover:text-slate-600 transition-colors">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
					</button>
				</div>
				<form method="POST" action={editingItem ? '?/edit' : '?/tambah'} use:enhance enctype="multipart/form-data" class="p-6 space-y-5">
					{#if editingItem}
						<input type="hidden" name="id" value={editingItem.id} />
					{/if}

					<div>
						<label for="judul" class="block text-sm font-medium text-slate-700 mb-1.5">Judul Berita *</label>
						<input type="text" id="judul" name="judul" value={editingItem?.judul ?? ''} required
							class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800" placeholder="Masukkan judul berita" />
					</div>

					<div>
						<label for="isi" class="block text-sm font-medium text-slate-700 mb-1.5">Isi Berita *</label>
						<textarea id="isi" name="isi" rows="6" required
							class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800 resize-y" placeholder="Tulis isi berita...">{editingItem?.isi ?? ''}</textarea>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label for="kategori" class="block text-sm font-medium text-slate-700 mb-1.5">Kategori</label>
							<select id="kategori" name="kategori"
								class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800">
								{#each kategoriOptions as kat}
									<option value={kat} selected={editingItem?.kategori === kat}>{kat}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="gambar" class="block text-sm font-medium text-slate-700 mb-1.5">Gambar Berita</label>
							{#if editingItem?.gambarUrl}
								<input type="hidden" name="existing_gambar" value={editingItem.gambarUrl} />
								<div class="mb-2 relative">
									<img src={editingItem.gambarUrl} alt="Preview" class="w-full h-24 object-cover rounded-lg border border-slate-200" />
									<span class="absolute bottom-1 right-1 text-xs bg-black/60 text-white px-2 py-0.5 rounded">Gambar saat ini</span>
								</div>
							{/if}
							<input type="file" id="gambar" name="gambar" accept="image/*"
								class="w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all cursor-pointer" />
						</div>
					</div>

					<div class="flex items-center gap-3">
						<input type="checkbox" id="is_featured" name="is_featured" class="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500" checked={editingItem?.isFeatured ?? false} />
						<label for="is_featured" class="text-sm font-medium text-slate-700">Jadikan Berita Utama (Featured)</label>
					</div>

					<div class="flex gap-3 pt-2">
						<button type="submit"
							class="flex-1 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors">
							{editingItem ? 'Simpan Perubahan' : 'Tambah Berita'}
						</button>
						<button type="button" onclick={closeForm}
							class="px-6 py-2.5 bg-slate-100 text-slate-600 font-medium rounded-xl hover:bg-slate-200 transition-colors">
							Batal
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- Berita Table -->
	<div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
		{#if data.beritaList.length === 0}
			<div class="p-12 text-center text-slate-400">
				<svg class="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
				<p class="text-lg font-medium text-slate-500 mb-2">Belum ada berita</p>
				<p class="text-sm">Klik tombol "Tambah Berita" untuk mulai membuat berita.</p>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left">
					<thead class="bg-slate-50 border-b border-slate-200">
						<tr>
							<th class="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Judul</th>
							<th class="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Kategori</th>
							<th class="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Tanggal</th>
							<th class="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100">
						{#each data.beritaList as item}
							<tr class="hover:bg-slate-50 transition-colors">
								<td class="px-6 py-4">
									<div class="flex items-center gap-3">
										{#if item.gambarUrl}
											<img src={item.gambarUrl} alt="" class="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-slate-100" />
										{/if}
										<div class="min-w-0">
											<p class="font-medium text-slate-800 truncate max-w-xs">{item.judul}</p>
											{#if item.isFeatured}
												<span class="text-xs text-amber-600 font-medium">⭐ Berita Utama</span>
											{/if}
										</div>
									</div>
								</td>
								<td class="px-6 py-4 hidden md:table-cell">
									<span class="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">{item.kategori}</span>
								</td>
								<td class="px-6 py-4 text-sm text-slate-500 hidden sm:table-cell">
									{item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
								</td>
								<td class="px-6 py-4">
									<div class="flex items-center justify-end gap-2">
										<button onclick={() => openEdit(item)} class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
											<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
										</button>
										{#if deleteConfirmId === item.id}
											<form method="POST" action="?/hapus" use:enhance class="flex items-center gap-1">
												<input type="hidden" name="id" value={item.id} />
												<button type="submit" class="px-2 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Yakin?</button>
												<button type="button" onclick={() => deleteConfirmId = null} class="px-2 py-1 text-xs bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors">Batal</button>
											</form>
										{:else}
											<button onclick={() => deleteConfirmId = item.id} class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
												<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
											</button>
										{/if}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
