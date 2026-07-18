<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let kepalaDesa = $state(data.kepalaDesa ?? '');
	let visi = $state(data.visiMisi?.visi ?? '');
	let misiArray = $state<string[]>(data.visiMisi?.misi ?? []);

	let activeTab = $state('struktur');

	let sekdes = $state(data.struktur?.sekdes ?? '');
	let kaurPerencanaan = $state(data.struktur?.kaurPerencanaan ?? '');
	let kepalaTataUsaha = $state(data.struktur?.kepalaTataUsaha ?? '');
	let kepalaKeuangan = $state(data.struktur?.kepalaKeuangan ?? '');
	let kasiPemerintahan = $state(data.struktur?.kasiPemerintahan ?? '');
	let kasiPelayanan = $state(data.struktur?.kasiPelayanan ?? '');
	let kasunBarat = $state(data.struktur?.kasunBarat ?? '');
	let kasunTimur = $state(data.struktur?.kasunTimur ?? '');
	let fotoKepalaDesa = $state(data.struktur?.fotoKepalaDesa ?? '');

	function addMisi() {
		misiArray = [...misiArray, ''];
	}

	function removeMisi(index: number) {
		misiArray = misiArray.filter((_, i) => i !== index);
	}

	function updateMisi(index: number, value: string) {
		misiArray[index] = value;
	}

	$effect(() => {
		kepalaDesa = data.kepalaDesa ?? '';
		visi = data.visiMisi?.visi ?? '';
		misiArray = data.visiMisi?.misi ?? [];
		sekdes = data.struktur?.sekdes ?? '';
		kaurPerencanaan = data.struktur?.kaurPerencanaan ?? '';
		kepalaTataUsaha = data.struktur?.kepalaTataUsaha ?? '';
		kepalaKeuangan = data.struktur?.kepalaKeuangan ?? '';
		kasiPemerintahan = data.struktur?.kasiPemerintahan ?? '';
		kasiPelayanan = data.struktur?.kasiPelayanan ?? '';
		kasunBarat = data.struktur?.kasunBarat ?? '';
		kasunTimur = data.struktur?.kasunTimur ?? '';
		fotoKepalaDesa = data.struktur?.fotoKepalaDesa ?? '';
	});
</script>

<svelte:head>
	<title>Kelola Profil Desa - Admin Desa Sopaah</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-slate-800">Profil Desa Sopaah</h1>
		<p class="text-slate-500 text-sm mt-1">
			Kelola narasi Visi, Misi, dan Struktur Organisasi Desa.
		</p>
	</div>

	{#if form?.success}
		<div
			class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3"
		>
			<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				></path></svg
			>
			<p>{form.message}</p>
		</div>
	{/if}

	{#if form?.error}
		<div
			class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3"
		>
			<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				></path></svg
			>
			<p>{form.error}</p>
		</div>
	{/if}

	<!-- Tabs Navigation -->
	<div class="flex gap-6 border-b border-slate-200 mb-6">
		<button
			type="button"
			onclick={() => (activeTab = 'struktur')}
			class="pb-3 text-sm font-semibold transition-colors relative {activeTab === 'struktur'
				? 'text-green-600'
				: 'text-slate-500 hover:text-slate-700'}"
		>
			Struktur Organisasi
			{#if activeTab === 'struktur'}
				<div class="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-full"></div>
			{/if}
		</button>
		<button
			type="button"
			onclick={() => (activeTab = 'visimisi')}
			class="pb-3 text-sm font-semibold transition-colors relative {activeTab === 'visimisi'
				? 'text-green-600'
				: 'text-slate-500 hover:text-slate-700'}"
		>
			Visi & Misi
			{#if activeTab === 'visimisi'}
				<div class="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-full"></div>
			{/if}
		</button>
	</div>

	<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
		<form
			method="POST"
			action="?/simpan"
			use:enhance
			enctype="multipart/form-data"
			class="p-6 sm:p-8"
		>
			<div class={activeTab === 'struktur' ? 'block' : 'hidden'}>
				<h2 class="text-xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">
					Struktur Pemerintahan Desa
				</h2>

				<div class="grid md:grid-cols-2 gap-6">
					<div class="md:col-span-2">
						<label for="kepalaDesa" class="block text-sm font-semibold text-slate-700 mb-2"
							>Kepala Desa</label
						>
						<input
							type="text"
							id="kepalaDesa"
							name="kepalaDesa"
							bind:value={kepalaDesa}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
							placeholder="Contoh: Cicik Ernawati"
							required
						/>
					</div>

					<div class="md:col-span-2">
						<label for="fotoKepalaDesa" class="block text-sm font-semibold text-slate-700 mb-2"
							>Foto Kepala Desa</label
						>
						{#if fotoKepalaDesa}
							<div class="mb-3 relative w-fit">
								<img
									src={fotoKepalaDesa}
									alt="Foto Kades"
									class="h-32 w-32 object-cover rounded-xl border border-slate-200 shadow-sm"
								/>
								<input type="hidden" name="existing_foto" value={fotoKepalaDesa} />
							</div>
						{/if}
						<input
							type="file"
							id="fotoKepalaDesa"
							name="fotoKepalaDesa"
							accept="image/*"
							class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
						/>
					</div>

					<div>
						<label for="sekdes" class="block text-sm font-semibold text-slate-700 mb-2"
							>Sekretaris Desa</label
						>
						<input
							type="text"
							id="sekdes"
							name="sekdes"
							bind:value={sekdes}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						/>
					</div>
					<div>
						<label for="kaurPerencanaan" class="block text-sm font-semibold text-slate-700 mb-2"
							>Kaur Perencanaan</label
						>
						<input
							type="text"
							id="kaurPerencanaan"
							name="kaurPerencanaan"
							bind:value={kaurPerencanaan}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						/>
					</div>
					<div>
						<label for="kepalaTataUsaha" class="block text-sm font-semibold text-slate-700 mb-2"
							>Kepala Tata Usaha</label
						>
						<input
							type="text"
							id="kepalaTataUsaha"
							name="kepalaTataUsaha"
							bind:value={kepalaTataUsaha}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						/>
					</div>
					<div>
						<label for="kepalaKeuangan" class="block text-sm font-semibold text-slate-700 mb-2"
							>Kepala Keuangan</label
						>
						<input
							type="text"
							id="kepalaKeuangan"
							name="kepalaKeuangan"
							bind:value={kepalaKeuangan}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						/>
					</div>
					<div>
						<label for="kasiPemerintahan" class="block text-sm font-semibold text-slate-700 mb-2"
							>Kasi Pemerintahan</label
						>
						<input
							type="text"
							id="kasiPemerintahan"
							name="kasiPemerintahan"
							bind:value={kasiPemerintahan}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						/>
					</div>
					<div>
						<label for="kasiPelayanan" class="block text-sm font-semibold text-slate-700 mb-2"
							>Kasi Pelayanan</label
						>
						<input
							type="text"
							id="kasiPelayanan"
							name="kasiPelayanan"
							bind:value={kasiPelayanan}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						/>
					</div>
					<div>
						<label for="kasunBarat" class="block text-sm font-semibold text-slate-700 mb-2"
							>Kepala Dusun Barat</label
						>
						<input
							type="text"
							id="kasunBarat"
							name="kasunBarat"
							bind:value={kasunBarat}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						/>
					</div>
					<div>
						<label for="kasunTimur" class="block text-sm font-semibold text-slate-700 mb-2"
							>Kepala Dusun Timur</label
						>
						<input
							type="text"
							id="kasunTimur"
							name="kasunTimur"
							bind:value={kasunTimur}
							class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						/>
					</div>
				</div>
			</div>

			<div class={activeTab === 'visimisi' ? 'block' : 'hidden'}>
				<h2 class="text-xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">
					Visi & Misi Desa
				</h2>

				<div class="mb-8">
					<label for="visi" class="block text-sm font-semibold text-slate-700 mb-2">Visi Desa</label
					>
					<textarea
						id="visi"
						name="visi"
						bind:value={visi}
						rows="3"
						class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-green-500 bg-slate-50 text-slate-800"
						placeholder="Tuliskan Visi Desa..."></textarea>
				</div>

				<div class="mb-6">
					<div class="flex items-center justify-between mb-4">
						<label class="block text-sm font-semibold text-slate-700">Misi Desa</label>
						<button
							type="button"
							onclick={addMisi}
							class="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium transition-colors"
						>
							+ Tambah Misi
						</button>
					</div>

					<!-- Hidden input to store JSONified misi -->
					<input type="hidden" name="misi" value={JSON.stringify(misiArray)} />

					<div class="space-y-3">
						{#each misiArray as m, i}
							<div class="flex gap-3">
								<div
									class="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm mt-1"
								>
									{i + 1}
								</div>
								<textarea
									value={m}
									oninput={(e) => updateMisi(i, e.currentTarget.value)}
									rows="2"
									class="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-green-500 bg-slate-50 text-slate-800"
									placeholder="Tuliskan misi..."></textarea>
								<button
									type="button"
									onclick={() => removeMisi(i)}
									class="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg h-fit mt-1 transition-colors"
								>
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										></path></svg
									>
								</button>
							</div>
						{/each}
						{#if misiArray.length === 0}
							<div
								class="text-center p-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-400"
							>
								Belum ada misi. Klik "Tambah Misi".
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="mt-8 pt-6 border-t border-slate-100 flex justify-end">
				<button
					type="submit"
					class="px-6 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						></path></svg
					>
					Simpan Perubahan
				</button>
			</div>
		</form>
	</div>
</div>
