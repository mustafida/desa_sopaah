<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	
	let ketua = $state(data.struktur?.ketua ?? '');
	let wakil = $state(data.struktur?.wakil ?? '');
	let sekretaris = $state(data.struktur?.sekretaris ?? '');
	let bendahara = $state(data.struktur?.bendahara ?? '');
	let deskripsi = $state(data.struktur?.deskripsi ?? '');
	let gambarUrl = $state(data.struktur?.gambarUrl ?? '');
	let pokja1 = $state(data.struktur?.pokja1 ?? '');
	let pokja2 = $state(data.struktur?.pokja2 ?? '');
	let pokja3 = $state(data.struktur?.pokja3 ?? '');
	let pokja4 = $state(data.struktur?.pokja4 ?? '');
	
	let isAddingDoc = $state(false);
	let newDocJudul = $state('');
	
	let activeTab = $state('struktur');

	$effect(() => {
		if (form?.success) {
			isAddingDoc = false;
			newDocJudul = '';
		}
	});
</script>

<svelte:head>
	<title>Kelola Lembaga PKK - Admin Desa Sopaah</title>
</svelte:head>

<div class="max-w-3xl mx-auto">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-slate-800">Struktur Pengurus PKK</h1>
		<p class="text-slate-500 text-sm mt-1">Kelola nama-nama pengurus inti Tim Penggerak PKK Desa Sopaah.</p>
	</div>

	{#if form?.success}
		<div class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3">
			<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<p>{form.message}</p>
		</div>
	{/if}
	
	{#if form?.error}
		<div class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
			<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<p>{form.error}</p>
		</div>
	{/if}

	<!-- Tabs Navigation -->
	<div class="flex gap-6 border-b border-slate-200 mb-6">
		<button 
			onclick={() => activeTab = 'struktur'} 
			class="pb-3 text-sm font-semibold transition-colors relative {activeTab === 'struktur' ? 'text-pink-600' : 'text-slate-500 hover:text-slate-700'}"
		>
			Profil & Struktur Pengurus
			{#if activeTab === 'struktur'}
				<div class="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 rounded-t-full"></div>
			{/if}
		</button>
		<button 
			onclick={() => activeTab = 'dokumentasi'} 
			class="pb-3 text-sm font-semibold transition-colors relative {activeTab === 'dokumentasi' ? 'text-pink-600' : 'text-slate-500 hover:text-slate-700'}"
		>
			Galeri Dokumentasi ({data.dokumentasi.length})
			{#if activeTab === 'dokumentasi'}
				<div class="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 rounded-t-full"></div>
			{/if}
		</button>
	</div>

	{#if activeTab === 'struktur'}
	<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
		<form method="POST" action="?/simpan" use:enhance enctype="multipart/form-data" class="p-6 sm:p-8 space-y-6">
			
			<h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Informasi Umum</h2>
			
			<div>
				<label for="deskripsi" class="block text-sm font-semibold text-slate-700 mb-2">Deskripsi (Tujuan Gerakan PKK)</label>
				<textarea
					id="deskripsi"
					name="deskripsi"
					bind:value={deskripsi}
					rows="4"
					class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-pink-500 bg-slate-50 text-slate-800"
					placeholder="Tuliskan tujuan gerakan PKK..."
				></textarea>
			</div>
			
			<div>
				<label for="gambar" class="block text-sm font-semibold text-slate-700 mb-2">Foto/Gambar (Banner PKK)</label>
				{#if gambarUrl}
					<div class="mb-3 relative w-fit">
						<img src={gambarUrl} alt="Foto PKK" class="h-32 object-contain rounded-xl border border-slate-200" />
						<input type="hidden" name="existing_gambar" value={gambarUrl} />
					</div>
				{/if}
				<input
					type="file"
					id="gambar"
					name="gambar"
					accept="image/*"
					class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
				/>
				<p class="text-xs text-slate-500 mt-2">Biarkan kosong jika tidak ingin mengubah foto saat ini.</p>
			</div>

			<h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2 mt-8">Struktur Inti</h2>
			
			<div>
				<label for="ketua" class="block text-sm font-semibold text-slate-700 mb-2">Ketua TP PKK</label>
				<input
					type="text"
					id="ketua"
					name="ketua"
					bind:value={ketua}
					class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-pink-500 bg-slate-50 text-slate-800"
					placeholder="Contoh: Ny. Hj. Fulanah"
					required
				/>
			</div>

			<div>
				<label for="wakil" class="block text-sm font-semibold text-slate-700 mb-2">Wakil Ketua</label>
				<input
					type="text"
					id="wakil"
					name="wakil"
					bind:value={wakil}
					class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-pink-500 bg-slate-50 text-slate-800"
					placeholder="Contoh: Ny. Siti"
					required
				/>
			</div>

			<div>
				<label for="sekretaris" class="block text-sm font-semibold text-slate-700 mb-2">Sekretaris</label>
				<input
					type="text"
					id="sekretaris"
					name="sekretaris"
					bind:value={sekretaris}
					class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-pink-500 bg-slate-50 text-slate-800"
					placeholder="Contoh: Bpk. Ahmad"
					required
				/>
			</div>

			<div>
				<label for="bendahara" class="block text-sm font-semibold text-slate-700 mb-2">Bendahara</label>
				<input
					type="text"
					id="bendahara"
					name="bendahara"
					bind:value={bendahara}
					class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-pink-500 bg-slate-50 text-slate-800"
					placeholder="Contoh: Ibu Rina"
					required
				/>
			</div>

			<h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2 mt-8">Pembagian Pokja (Kelompok Kerja)</h2>
			<p class="text-sm text-slate-500 mb-4">Isi dengan nama Ketua Pokja atau deskripsi singkat tugas masing-masing Pokja.</p>
			
			<div class="grid sm:grid-cols-2 gap-6">
				<div>
					<label for="pokja1" class="block text-sm font-semibold text-slate-700 mb-2">Pokja I</label>
					<textarea id="pokja1" name="pokja1" bind:value={pokja1} rows="2" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 bg-slate-50" placeholder="Membidangi Penghayatan & Pengamalan Pancasila serta Gotong Royong."></textarea>
				</div>
				<div>
					<label for="pokja2" class="block text-sm font-semibold text-slate-700 mb-2">Pokja II</label>
					<textarea id="pokja2" name="pokja2" bind:value={pokja2} rows="2" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 bg-slate-50" placeholder="Membidangi Pendidikan, Keterampilan, dan Pengembangan Berkoperasi."></textarea>
				</div>
				<div>
					<label for="pokja3" class="block text-sm font-semibold text-slate-700 mb-2">Pokja III</label>
					<textarea id="pokja3" name="pokja3" bind:value={pokja3} rows="2" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 bg-slate-50" placeholder="Membidangi Pangan, Sandang, Perumahan & Tata Laksana Rumah Tangga."></textarea>
				</div>
				<div>
					<label for="pokja4" class="block text-sm font-semibold text-slate-700 mb-2">Pokja IV</label>
					<textarea id="pokja4" name="pokja4" bind:value={pokja4} rows="2" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 bg-slate-50" placeholder="Membidangi Kesehatan, Kelestarian Lingkungan Hidup, dan Perencanaan Sehat."></textarea>
				</div>
			</div>

		</form>
	</div>
	{/if}

	{#if activeTab === 'dokumentasi'}
	<!-- Bagian Dokumentasi PKK (Galeri) -->
	<div class="flex justify-between items-center mb-6">
		<div>
			<h2 class="text-2xl font-bold text-slate-800">Dokumentasi PKK</h2>
			<p class="text-slate-500 text-sm mt-1">Kelola foto-foto kegiatan TP PKK Desa Sopaah.</p>
		</div>
		<button
			type="button"
			onclick={() => isAddingDoc = !isAddingDoc}
			class="px-5 py-2.5 bg-pink-600 text-white font-medium rounded-xl hover:bg-pink-700 transition-colors shadow-sm flex items-center gap-2"
		>
			{#if isAddingDoc}
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
				Batal
			{:else}
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
				Tambah Foto
			{/if}
		</button>
	</div>

	{#if isAddingDoc}
		<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
			<form method="POST" action="?/tambahDokumentasi" use:enhance enctype="multipart/form-data" class="p-6 sm:p-8 space-y-6">
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<label for="judul_doc" class="block text-sm font-semibold text-slate-700 mb-2">Judul/Keterangan Foto</label>
						<input
							type="text"
							id="judul_doc"
							name="judul"
							bind:value={newDocJudul}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 bg-slate-50"
							placeholder="Contoh: Rapat Koordinasi PKK"
							required
						/>
					</div>
					<div>
						<label for="gambar_doc" class="block text-sm font-semibold text-slate-700 mb-2">Pilih Foto</label>
						<input
							type="file"
							id="gambar_doc"
							name="gambar"
							accept="image/*"
							class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
							required
						/>
					</div>
				</div>
				<div class="flex justify-end pt-4 border-t border-slate-100">
					<button type="submit" class="px-6 py-2.5 bg-pink-600 text-white font-medium rounded-xl hover:bg-pink-700 transition-colors shadow-sm flex items-center gap-2">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
						Simpan Foto
					</button>
				</div>
			</form>
		</div>
	{/if}

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
		{#each data.dokumentasi as foto}
			<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
				<div class="h-48 bg-slate-100 relative overflow-hidden">
					<img src={foto.gambarUrl} alt={foto.judul} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
				</div>
				<div class="p-5 flex justify-between items-start gap-4">
					<div>
						<h3 class="font-bold text-slate-800 leading-tight mb-1">{foto.judul}</h3>
						{#if foto.createdAt}
							<p class="text-xs text-slate-500">{new Date(foto.createdAt).toLocaleDateString('id-ID')}</p>
						{/if}
					</div>
					<form method="POST" action="?/hapusDokumentasi" use:enhance onsubmit={() => confirm('Yakin ingin menghapus foto dokumentasi ini?')}>
						<input type="hidden" name="id" value={foto.id} />
						<button type="submit" class="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors shrink-0" title="Hapus Foto">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
						</button>
					</form>
				</div>
			</div>
		{:else}
			<div class="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
				<svg class="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
				<h3 class="text-lg font-bold text-slate-600">Belum ada dokumentasi</h3>
				<p class="text-slate-500 max-w-sm mx-auto mt-2">Tambahkan foto-foto kegiatan PKK untuk ditampilkan di halaman pengunjung.</p>
			</div>
		{/each}
	</div>
	{/if}

</div>
