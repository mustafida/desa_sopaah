<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	
	let ketuaYayasan = $state(data.struktur?.ketuaYayasan ?? '');
	let kepalaSekolah = $state(data.struktur?.kepalaSekolah ?? '');
	let operatorSekolah = $state(data.struktur?.operatorSekolah ?? '');
	let sekretaris = $state(data.struktur?.sekretaris ?? '');
	let bendahara = $state(data.struktur?.bendahara ?? '');
	let guruKelompokA = $state(data.struktur?.guruKelompokA ?? '');
	let guruKelompokB = $state(data.struktur?.guruKelompokB ?? '');

	let npsn = $state(data.struktur?.npsn ?? '');
	let status = $state(data.struktur?.status ?? '');
	let akreditasi = $state(data.struktur?.akreditasi ?? '');
	let alamat = $state(data.struktur?.alamat ?? '');
	let email = $state(data.struktur?.email ?? '');
	let noWhatsapp = $state(data.struktur?.noWhatsapp ?? '');
	
	let visi = $state(data.struktur?.visi ?? '');
	let misiArray = $state<string[]>(data.struktur?.misi ?? []);
	let tujuanArray = $state<string[]>(data.struktur?.tujuan ?? []);

	let isAddingDoc = $state(false);
	let newDocJudul = $state('');

	let activeTab = $state('struktur');

	function addMisi() {
		misiArray = [...misiArray, ''];
	}

	function removeMisi(index: number) {
		misiArray = misiArray.filter((_, i) => i !== index);
	}

	function updateMisi(index: number, val: string) {
		misiArray[index] = val;
	}

	function addTujuan() {
		tujuanArray = [...tujuanArray, ''];
	}

	function removeTujuan(index: number) {
		tujuanArray = tujuanArray.filter((_, i) => i !== index);
	}

	function updateTujuan(index: number, val: string) {
		tujuanArray[index] = val;
	}

	$effect(() => {
		if (form?.success) {
			isAddingDoc = false;
			newDocJudul = '';
		}
	});
</script>

<svelte:head>
	<title>Kelola TK PKK - Admin Desa Sopaah</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-slate-800">Kelola Lembaga TK PKK</h1>
		<p class="text-slate-500 text-sm mt-1">Kelola data profil sekolah, struktur kepengurusan, visi & misi, serta dokumentasi galeri.</p>
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
			class="pb-3 text-sm font-semibold transition-colors relative {activeTab === 'struktur' ? 'text-yellow-600' : 'text-slate-500 hover:text-slate-700'}"
		>
			Struktur Pengurus
			{#if activeTab === 'struktur'}
				<div class="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-t-full"></div>
			{/if}
		</button>
		<button 
			onclick={() => activeTab = 'profil'} 
			class="pb-3 text-sm font-semibold transition-colors relative {activeTab === 'profil' ? 'text-yellow-600' : 'text-slate-500 hover:text-slate-700'}"
		>
			Profil & Kontak
			{#if activeTab === 'profil'}
				<div class="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-t-full"></div>
			{/if}
		</button>
		<button 
			onclick={() => activeTab = 'visimisi'} 
			class="pb-3 text-sm font-semibold transition-colors relative {activeTab === 'visimisi' ? 'text-yellow-600' : 'text-slate-500 hover:text-slate-700'}"
		>
			Visi & Misi
			{#if activeTab === 'visimisi'}
				<div class="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-t-full"></div>
			{/if}
		</button>
		<button 
			onclick={() => activeTab = 'dokumentasi'} 
			class="pb-3 text-sm font-semibold transition-colors relative {activeTab === 'dokumentasi' ? 'text-yellow-600' : 'text-slate-500 hover:text-slate-700'}"
		>
			Galeri Dokumentasi ({data.dokumentasi.length})
			{#if activeTab === 'dokumentasi'}
				<div class="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-t-full"></div>
			{/if}
		</button>
	</div>

	<!-- Form Settings -->
	<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden {activeTab === 'dokumentasi' ? 'hidden' : 'block'}">
		<form method="POST" action="?/simpan" use:enhance class="p-6 sm:p-8 space-y-8">
			
			<!-- Hidden inputs for lists -->
			<input type="hidden" name="misi" value={JSON.stringify(misiArray)} />
			<input type="hidden" name="tujuan" value={JSON.stringify(tujuanArray)} />

			<!-- TAB 1: STRUKTUR PENGURUS -->
			<div class={activeTab === 'struktur' ? 'block space-y-6' : 'hidden'}>
				<h3 class="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Struktur Organisasi Sekolah</h3>
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<label for="ketuaYayasan" class="block text-sm font-semibold text-slate-700 mb-2">Ketua Yayasan</label>
						<input
							type="text"
							id="ketuaYayasan"
							name="ketuaYayasan"
							bind:value={ketuaYayasan}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
							placeholder="Nama Ketua Yayasan"
							required
						/>
					</div>

					<div>
						<label for="kepalaSekolah" class="block text-sm font-semibold text-slate-700 mb-2">Kepala Sekolah</label>
						<input
							type="text"
							id="kepalaSekolah"
							name="kepalaSekolah"
							bind:value={kepalaSekolah}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
							placeholder="Nama Kepala Sekolah"
							required
						/>
					</div>

					<div>
						<label for="operatorSekolah" class="block text-sm font-semibold text-slate-700 mb-2">Operator Sekolah</label>
						<input
							type="text"
							id="operatorSekolah"
							name="operatorSekolah"
							bind:value={operatorSekolah}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
							placeholder="Nama Operator Sekolah"
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
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
							placeholder="Nama Sekretaris"
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
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
							placeholder="Nama Bendahara"
							required
						/>
					</div>

					<div>
						<label for="guruKelompokA" class="block text-sm font-semibold text-slate-700 mb-2">Guru Kelompok A</label>
						<input
							type="text"
							id="guruKelompokA"
							name="guruKelompokA"
							bind:value={guruKelompokA}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
							placeholder="Nama Guru Kelompok A"
							required
						/>
					</div>

					<div class="md:col-span-2">
						<label for="guruKelompokB" class="block text-sm font-semibold text-slate-700 mb-2">Guru Kelompok B (Gunakan baris baru / Enter untuk nama lebih dari satu)</label>
						<textarea
							id="guruKelompokB"
							name="guruKelompokB"
							bind:value={guruKelompokB}
							rows="3"
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800 font-medium"
							placeholder="Contoh:&#10;Sri Astutik, S.Pd&#10;Rina Paramita, S.Pd"
							required
						></textarea>
				</div>
			</div>

			<!-- TAB 2: PROFIL & KONTAK -->
			<div class={activeTab === 'profil' ? 'block space-y-6' : 'hidden'}>
				<h3 class="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Profil Legalitas & Kontak Sekolah</h3>
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<label for="npsn" class="block text-sm font-semibold text-slate-700 mb-2">NPSN Sekolah</label>
						<input
							type="text"
							id="npsn"
							name="npsn"
							bind:value={npsn}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
							placeholder="Contoh: 60726043"
							required
						/>
					</div>

					<div>
						<label for="status" class="block text-sm font-semibold text-slate-700 mb-2">Status Sekolah</label>
						<input
							type="text"
							id="status"
							name="status"
							bind:value={status}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
							placeholder="Contoh: Swasta / Yayasan"
							required
						/>
					</div>

					<div>
						<label for="akreditasi" class="block text-sm font-semibold text-slate-700 mb-2">Status Akreditasi</label>
						<input
							type="text"
							id="akreditasi"
							name="akreditasi"
							bind:value={akreditasi}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
							placeholder="Contoh: Terakreditasi C"
							required
						/>
					</div>

					<div>
						<label for="noWhatsapp" class="block text-sm font-semibold text-slate-700 mb-2">Nomor WhatsApp Kontak (Tanpa angka 0 di depan)</label>
						<div class="relative">
							<span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">+62</span>
							<input
								type="text"
								id="noWhatsapp"
								name="noWhatsapp"
								bind:value={noWhatsapp}
								class="w-full pl-16 pr-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800 font-medium"
								placeholder="Contoh: 81935168460"
								required
							/>
						</div>
					</div>

					<div class="md:col-span-2">
						<label for="email" class="block text-sm font-semibold text-slate-700 mb-2">Email Sekolah</label>
						<input
							type="email"
							id="email"
							name="email"
							bind:value={email}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
							placeholder="Contoh: tksopaah@gmail.com"
							required
						/>
					</div>

					<div class="md:col-span-2">
						<label for="alamat" class="block text-sm font-semibold text-slate-700 mb-2">Alamat Lengkap</label>
						<textarea
							id="alamat"
							name="alamat"
							bind:value={alamat}
							rows="3"
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
							placeholder="Tuliskan alamat lengkap sekolah..."
							required
						></textarea>
					</div>
				</div>
			</div>

			<!-- TAB 3: VISI, MISI, TUJUAN -->
			<div class={activeTab === 'visimisi' ? 'block space-y-6' : 'hidden'}>
				<h3 class="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Visi, Misi, & Tujuan</h3>
				
				<div class="mb-6">
					<label for="visi" class="block text-sm font-semibold text-slate-700 mb-2">Visi Sekolah</label>
					<textarea
						id="visi"
						name="visi"
						bind:value={visi}
						rows="3"
						class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800 italic"
						placeholder="Tuliskan Visi TK..."
						required
					></textarea>
				</div>

				<!-- Misi Section -->
				<div class="border-t border-slate-100 pt-6">
					<div class="flex items-center justify-between mb-4">
						<label class="block text-sm font-semibold text-slate-700">Misi Sekolah</label>
						<button type="button" onclick={addMisi} class="text-xs px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg font-bold transition-colors">
							+ Tambah Misi
						</button>
					</div>
					
					<div class="space-y-3">
						{#each misiArray as m, i}
							<div class="flex gap-3">
								<div class="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm mt-1">{i + 1}</div>
								<textarea
									value={m}
									oninput={(e) => updateMisi(i, e.currentTarget.value)}
									rows="2"
									class="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800 text-sm"
									placeholder="Tuliskan misi..."
									required
								></textarea>
								<button type="button" onclick={() => removeMisi(i)} class="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg h-fit mt-1 transition-colors">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
								</button>
							</div>
						{/each}
						{#if misiArray.length === 0}
							<div class="text-center p-6 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
								Belum ada misi. Silakan tambah misi.
							</div>
						{/if}
					</div>
				</div>

				<!-- Tujuan Section -->
				<div class="border-t border-slate-100 pt-6">
					<div class="flex items-center justify-between mb-4">
						<label class="block text-sm font-semibold text-slate-700">Tujuan Sekolah</label>
						<button type="button" onclick={addTujuan} class="text-xs px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg font-bold transition-colors">
							+ Tambah Tujuan
						</button>
					</div>
					
					<div class="space-y-3">
						{#each tujuanArray as t, i}
							<div class="flex gap-3">
								<div class="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm mt-1">{i + 1}</div>
								<textarea
									value={t}
									oninput={(e) => updateTujuan(i, e.currentTarget.value)}
									rows="2"
									class="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800 text-sm"
									placeholder="Tuliskan tujuan..."
									required
								></textarea>
								<button type="button" onclick={() => removeTujuan(i)} class="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg h-fit mt-1 transition-colors">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
								</button>
							</div>
						{/each}
						{#if tujuanArray.length === 0}
							<div class="text-center p-6 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
								Belum ada tujuan. Silakan tambah tujuan.
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- SUBMIT BUTTON -->
			<div class="mt-8 pt-6 border-t border-slate-100 flex justify-end">
				<button
					type="submit"
					class="px-6 py-2.5 bg-yellow-500 text-white font-medium rounded-xl hover:bg-yellow-600 transition-colors shadow-sm flex items-center gap-2"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
					Simpan Perubahan
				</button>
			</div>
		</form>
	</div>

	<!-- TAB 4: DOKUMENTASI (GALERI) -->
	<div class={activeTab === 'dokumentasi' ? 'block' : 'hidden'}>
		<div class="flex justify-between items-center mb-6">
			<div>
				<h2 class="text-2xl font-bold text-slate-800">Dokumentasi TK PKK</h2>
				<p class="text-slate-500 text-sm mt-1">Kelola foto-foto kegiatan TK PKK Desa Sopaah.</p>
			</div>
			<button
				type="button"
				onclick={() => isAddingDoc = !isAddingDoc}
				class="px-5 py-2.5 bg-yellow-500 text-white font-medium rounded-xl hover:bg-yellow-600 transition-colors shadow-sm flex items-center gap-2"
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
								class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-500 bg-slate-50 text-slate-800"
								placeholder="Contoh: Kegiatan Belajar Mengajar"
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
								class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
								required
							/>
						</div>
					</div>
					<div class="flex justify-end pt-4 border-t border-slate-100">
						<button type="submit" class="px-6 py-2.5 bg-yellow-500 text-white font-medium rounded-xl hover:bg-yellow-600 transition-colors shadow-sm flex items-center gap-2">
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
					<p class="text-slate-500 max-w-sm mx-auto mt-2">Tambahkan foto-foto kegiatan TK PKK untuk ditampilkan di halaman pengunjung.</p>
				</div>
			{/each}
		</div>
	</div>

</div>
