<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let { data, form } = $props();

	let showForm = $state(false);
	let editingItem = $state<any>(null);
	let deleteConfirmId = $state<number | null>(null);
	let existingPhotos = $state<string[]>([]);
	let isLoading = $state(false);
	let additionalPhotoInputs = $state<number[]>([0]);
	let nextPhotoInputId = $state(1);

	$effect(() => {
		if ($page.url.searchParams.get('tambah') === 'true') {
			showForm = true;
			editingItem = null;
			existingPhotos = [];
			additionalPhotoInputs = [0];
			nextPhotoInputId = 1;
		}
	});

	$effect(() => {
		if (form?.success) {
			showForm = false;
			editingItem = null;
			deleteConfirmId = null;
			existingPhotos = [];
			additionalPhotoInputs = [0];
			nextPhotoInputId = 1;
		}
	});

	function openEdit(item: any) {
		editingItem = { ...item };
		existingPhotos = item.fotoProduk ? JSON.parse(item.fotoProduk) : [];
		additionalPhotoInputs = [0];
		nextPhotoInputId = 1;
		showForm = true;
	}

	function closeForm() {
		showForm = false;
		editingItem = null;
		existingPhotos = [];
		additionalPhotoInputs = [0];
		nextPhotoInputId = 1;
	}

	const kategoriOptions = [
		'Makanan & Minuman',
		'Kerajinan',
		'Pertanian',
		'Peternakan',
		'Jasa',
		'Konveksi',
		'Lainnya'
	];
</script>

<svelte:head>
	<title>Kelola UMKM - Admin Desa Sopaah</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
		<div>
			<h1 class="text-2xl font-bold text-slate-800">Kelola UMKM</h1>
			<p class="text-slate-500 text-sm mt-1">Tambah, edit, atau hapus data UMKM warga desa.</p>
		</div>
		<button
			onclick={() => {
				showForm = true;
				editingItem = null;
			}}
			class="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
				></path></svg
			>
			Tambah UMKM
		</button>
	</div>

	<!-- Messages -->
	{#if form?.success}
		<div
			class="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3"
		>
			<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
				></path></svg
			>
			<span class="text-green-700 text-sm font-medium">{form.message}</span>
		</div>
	{/if}
	{#if form?.error}
		<div class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
			<svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				></path></svg
			>
			<span class="text-red-700 text-sm font-medium">{form.error}</span>
		</div>
	{/if}

	<!-- Modal Form -->
	{#if showForm}
		<div
			class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			onclick={closeForm}
			onkeydown={(e) => e.key === 'Escape' && closeForm()}
			role="dialog"
			tabindex="-1"
		>
			<div
				class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
				onclick={(e) => e.stopPropagation()}
				onkeydown={() => {}}
				role="document"
				tabindex="-1"
			>
				<div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
					<h2 class="text-lg font-bold text-slate-800">
						{editingItem ? 'Edit UMKM' : 'Tambah UMKM Baru'}
					</h2>
					<button onclick={closeForm} class="text-slate-400 hover:text-slate-600 transition-colors">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path></svg
						>
					</button>
				</div>
				<form
					method="POST"
					action={editingItem ? '?/edit' : '?/tambah'}
					use:enhance={() => {
						isLoading = true;
						return async ({ update }) => {
							await update();
							isLoading = false;
						};
					}}
					enctype="multipart/form-data"
					class="p-6 space-y-5"
				>
					{#if editingItem}
						<input type="hidden" name="id" value={editingItem.id} />
					{/if}

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label for="nama_usaha" class="block text-sm font-medium text-slate-700 mb-1.5"
								>Nama Usaha *</label
							>
							<input
								type="text"
								id="nama_usaha"
								name="nama_usaha"
								value={editingItem?.namaUsaha ?? ''}
								required
								class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800"
								placeholder="Contoh: Warung Bu Siti"
							/>
						</div>
						<div>
							<label for="pemilik" class="block text-sm font-medium text-slate-700 mb-1.5"
								>Nama Pemilik *</label
							>
							<input
								type="text"
								id="pemilik"
								name="pemilik"
								value={editingItem?.pemilik ?? ''}
								required
								class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800"
								placeholder="Contoh: Ibu Siti"
							/>
						</div>
					</div>

					<div>
						<label for="deskripsi" class="block text-sm font-medium text-slate-700 mb-1.5"
							>Deskripsi Usaha *</label
						>
						<textarea
							id="deskripsi"
							name="deskripsi"
							rows="4"
							required
							class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800 resize-y"
							placeholder="Jelaskan tentang usaha ini...">{editingItem?.deskripsi ?? ''}</textarea
						>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label for="kategori" class="block text-sm font-medium text-slate-700 mb-1.5"
								>Kategori</label
							>
							<select
								id="kategori"
								name="kategori"
								class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800"
							>
								{#each kategoriOptions as kat}
									<option value={kat} selected={editingItem?.kategori === kat}>{kat}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="no_whatsapp" class="block text-sm font-medium text-slate-700 mb-1.5"
								>No. WhatsApp</label
							>
							<input
								type="text"
								id="no_whatsapp"
								name="no_whatsapp"
								value={editingItem?.noWhatsapp ?? ''}
								class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800"
								placeholder="08xxxxxxxxxx"
							/>
						</div>
					</div>

					<div>
						<label for="alamat" class="block text-sm font-medium text-slate-700 mb-1.5"
							>Alamat</label
						>
						<input
							type="text"
							id="alamat"
							name="alamat"
							value={editingItem?.alamat ?? ''}
							class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800"
							placeholder="Dusun / RT / RW"
						/>
					</div>

					<div>
						<label for="maps_url" class="block text-sm font-medium text-slate-700 mb-1.5"
							>Link Google Maps (Opsional)</label
						>
						<input
							type="url"
							id="maps_url"
							name="maps_url"
							value={editingItem?.mapsUrl ?? ''}
							class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800"
							placeholder="https://maps.app.goo.gl/..."
						/>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label for="link_instagram" class="block text-sm font-medium text-slate-700 mb-1.5"
								>Link Instagram (Opsional)</label
							>
							<input
								type="url"
								id="link_instagram"
								name="link_instagram"
								value={editingItem?.linkInstagram ?? ''}
								class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800"
								placeholder="https://instagram.com/..."
							/>
						</div>
						<div>
							<label for="link_facebook" class="block text-sm font-medium text-slate-700 mb-1.5"
								>Link Facebook (Opsional)</label
							>
							<input
								type="url"
								id="link_facebook"
								name="link_facebook"
								value={editingItem?.linkFacebook ?? ''}
								class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800"
								placeholder="https://facebook.com/..."
							/>
						</div>
						<div>
							<label for="link_tiktok" class="block text-sm font-medium text-slate-700 mb-1.5"
								>Link TikTok (Opsional)</label
							>
							<input
								type="url"
								id="link_tiktok"
								name="link_tiktok"
								value={editingItem?.linkTiktok ?? ''}
								class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800"
								placeholder="https://tiktok.com/@..."
							/>
						</div>
						<div>
							<label for="link_shopee" class="block text-sm font-medium text-slate-700 mb-1.5"
								>Link Shopee/Toko (Opsional)</label
							>
							<input
								type="url"
								id="link_shopee"
								name="link_shopee"
								value={editingItem?.linkShopee ?? ''}
								class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-slate-800"
								placeholder="https://shopee.co.id/..."
							/>
						</div>
					</div>

					<div>
						<label for="video" class="block text-sm font-medium text-slate-700 mb-1.5"
							>Video Dokumenter KKN</label
						>
						{#if editingItem?.videoUrl}
							<input type="hidden" name="existing_video" value={editingItem.videoUrl} />
							<div
								class="mb-2 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between"
							>
								<span class="text-xs text-slate-500 font-medium">Video saat ini terunggah</span>
								<a
									href={editingItem.videoUrl}
									target="_blank"
									class="text-xs text-green-600 hover:underline font-bold">Putar Video ↗</a
								>
							</div>
						{/if}
						<input
							type="file"
							id="video"
							name="video"
							accept="video/*"
							class="w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all cursor-pointer"
						/>
					</div>

					<div>
						<label for="gambar" class="block text-sm font-medium text-slate-700 mb-1.5"
							>Gambar Produk</label
						>
						{#if editingItem?.gambarUrl}
							<input type="hidden" name="existing_gambar" value={editingItem.gambarUrl} />
							<div class="mb-2 relative">
								<img
									src={editingItem.gambarUrl}
									alt="Preview"
									class="w-full h-24 object-cover rounded-lg border border-slate-200"
								/>
								<span
									class="absolute bottom-1 right-1 text-xs bg-black/60 text-white px-2 py-0.5 rounded"
									>Gambar saat ini</span
								>
							</div>
						{/if}
						<input
							type="file"
							id="gambar"
							name="gambar"
							accept="image/*"
							class="w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all cursor-pointer"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-slate-700 mb-1.5"
							>Galeri Foto Produk</label
						>
						{#if existingPhotos.length > 0}
							{#each existingPhotos as foto}
								<input type="hidden" name="kept_foto_produk" value={foto} />
							{/each}
							<div class="mb-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
								{#each existingPhotos as foto, idx}
									<div class="relative group">
										<img
											src={foto}
											alt="Produk"
											class="w-full h-20 object-cover rounded border border-slate-200"
										/>
										<button
											type="button"
											onclick={() => { existingPhotos = existingPhotos.filter((_, i) => i !== idx) }}
											class="absolute top-1 right-1 bg-red-600/90 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
										>
											×
										</button>
									</div>
								{/each}
							</div>
							<p class="text-xs text-slate-500 font-medium mb-3">Foto lama yang masih tampil di atas akan tetap dipertahankan. Anda bisa menyilang (x) jika ingin menghapusnya.</p>
						{/if}
						<div class="space-y-3">
							{#each additionalPhotoInputs as inputId (inputId)}
								<div class="flex items-center gap-2">
									<input
										type="file"
										name="foto_produk"
										accept="image/*"
										class="flex-1 text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all cursor-pointer"
									/>
									{#if additionalPhotoInputs.length > 1}
										<button
											type="button"
											onclick={() => { additionalPhotoInputs = additionalPhotoInputs.filter(id => id !== inputId) }}
											class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
											aria-label="Hapus Input"
										>
											<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
										</button>
									{/if}
								</div>
							{/each}
							
							<button
								type="button"
								onclick={() => { additionalPhotoInputs = [...additionalPhotoInputs, nextPhotoInputId++] }}
								class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-colors mt-2"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
								Tambah Foto Katalog Lagi
							</button>
							<p class="text-xs text-slate-500 font-medium">Bisa tambahkan kotak upload sebanyak yang Anda butuhkan (unlimited).</p>
						</div>

					<div class="flex gap-3 pt-2">
						<button
							type="submit"
							disabled={isLoading}
							class="flex-1 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
						>
							{#if isLoading}
								<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Menyimpan...
							{:else}
								{editingItem ? 'Simpan Perubahan' : 'Tambah UMKM'}
							{/if}
						</button>
						<button
							type="button"
							onclick={closeForm}
							disabled={isLoading}
							class="px-6 py-2.5 bg-slate-100 text-slate-600 font-medium rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Batal
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- UMKM Cards Grid -->
	{#if data.umkmList.length === 0}
		<div
			class="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center text-slate-400"
		>
			<svg
				class="w-16 h-16 mx-auto mb-4 text-slate-300"
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
			<p class="text-lg font-medium text-slate-500 mb-2">Belum ada data UMKM</p>
			<p class="text-sm">Klik tombol "Tambah UMKM" untuk menambahkan data UMKM pertama.</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{#each data.umkmList as item}
				<div
					class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
				>
					{#if item.gambarUrl}
						<div class="h-48 bg-slate-100 overflow-hidden">
							<img src={item.gambarUrl} alt={item.namaUsaha} class="w-full h-full object-cover" />
						</div>
					{:else}
						<div
							class="h-32 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center"
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
									d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
								></path></svg
							>
						</div>
					{/if}
					<div class="p-5">
						<div class="flex items-start justify-between gap-2 mb-2">
							<h3 class="font-bold text-slate-800">{item.namaUsaha}</h3>
							<span
								class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium flex-shrink-0"
								>{item.kategori}</span
							>
						</div>
						<p class="text-sm text-slate-500 mb-1">👤 {item.pemilik}</p>
						{#if item.alamat}
							<p class="text-sm text-slate-400 mb-3">📍 {item.alamat}</p>
						{/if}
						<p class="text-sm text-slate-600 line-clamp-2 mb-4">{item.deskripsi}</p>

						<div class="flex items-center gap-2">
							<button
								onclick={() => openEdit(item)}
								class="flex-1 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors font-medium"
							>
								Edit
							</button>
							{#if deleteConfirmId === item.id}
								<form method="POST" action="?/hapus" use:enhance class="flex items-center gap-1">
									<input type="hidden" name="id" value={item.id} />
									<button
										type="submit"
										class="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
										>Yakin?</button
									>
									<button
										type="button"
										onclick={() => (deleteConfirmId = null)}
										class="px-3 py-2 text-sm bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors font-medium"
										>Batal</button
									>
								</form>
							{:else}
								<button
									onclick={() => (deleteConfirmId = item.id)}
									class="flex-1 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors font-medium"
								>
									Hapus
								</button>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
