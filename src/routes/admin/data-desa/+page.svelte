<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let kependudukan = $state({ ...data.kependudukan });
	let pendidikan = $state([...data.pendidikan]);
	let pekerjaan = $state([...data.pekerjaan]);

	$effect(() => {
		kependudukan = { ...data.kependudukan };
	});
	$effect(() => {
		pendidikan = [...data.pendidikan];
	});
	$effect(() => {
		pekerjaan = [...data.pekerjaan];
	});

	function updatePendidikan(index: number, field: string, value: any) {
		pendidikan[index][field] = value;
	}
	function updatePekerjaan(index: number, field: string, value: any) {
		pekerjaan[index][field] = value;
	}

	function addPendidikan() {
		pendidikan = [...pendidikan, { nama: '', persentase: 0 }];
	}
	function removePendidikan(idx: number) {
		pendidikan = pendidikan.filter((_, i) => i !== idx);
	}

	function addPekerjaan() {
		pekerjaan = [...pekerjaan, { nama: '', persentase: 0 }];
	}
	function removePekerjaan(idx: number) {
		pekerjaan = pekerjaan.filter((_, i) => i !== idx);
	}
</script>

<svelte:head>
	<title>Kelola Data Desa - Admin Desa Sopaah</title>
</svelte:head>

<div class="max-w-5xl mx-auto">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-slate-800">Data Statistik Desa</h1>
		<p class="text-slate-500 text-sm mt-1">
			Kelola angka kependudukan dan demografi yang tampil di halaman Data Desa.
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

	<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
		<form method="POST" action="?/simpan" use:enhance class="p-6 sm:p-8">
			<input type="hidden" name="kependudukan" value={JSON.stringify(kependudukan)} />
			<input type="hidden" name="pendidikan" value={JSON.stringify(pendidikan)} />
			<input type="hidden" name="pekerjaan" value={JSON.stringify(pekerjaan)} />

			<!-- Bagian 1: Ringkasan Penduduk -->
			<h2 class="text-lg font-bold text-slate-800 mb-6 border-b pb-2">Ringkasan Penduduk (Jiwa)</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
				<div>
					<label class="block text-sm font-semibold text-slate-700 mb-2">Total Jiwa</label>
					<input
						type="number"
						bind:value={kependudukan.totalJiwa}
						class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						required
					/>
				</div>
				<div>
					<label class="block text-sm font-semibold text-slate-700 mb-2">Kepala Keluarga</label>
					<input
						type="number"
						bind:value={kependudukan.kepalaKeluarga}
						class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						required
					/>
				</div>
				<div>
					<label class="block text-sm font-semibold text-slate-700 mb-2">Laki-Laki</label>
					<input
						type="number"
						bind:value={kependudukan.lakiLaki}
						class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						required
					/>
				</div>
				<div>
					<label class="block text-sm font-semibold text-slate-700 mb-2">Perempuan</label>
					<input
						type="number"
						bind:value={kependudukan.perempuan}
						class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-green-500 bg-slate-50"
						required
					/>
				</div>
			</div>

			<div class="grid md:grid-cols-2 gap-10">
				<!-- Bagian 2: Pendidikan -->
				<div>
					<div class="flex items-center justify-between mb-4 border-b pb-2">
						<h2 class="text-lg font-bold text-slate-800">Pendidikan (%)</h2>
						<button
							type="button"
							onclick={addPendidikan}
							class="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
							>+ Tambah</button
						>
					</div>
					<div class="space-y-3">
						{#each pendidikan as p, i}
							<div class="flex gap-3 items-center">
								<input
									type="text"
									value={p.nama}
									oninput={(e) => updatePendidikan(i, 'nama', e.currentTarget.value)}
									class="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
									placeholder="Kategori"
									required
								/>
								<input
									type="number"
									value={p.persentase}
									oninput={(e) => updatePendidikan(i, 'persentase', Number(e.currentTarget.value))}
									class="w-20 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
									placeholder="%"
									min="0"
									max="100"
									required
								/>
								<button
									type="button"
									onclick={() => removePendidikan(i)}
									class="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg h-fit transition-colors"
									>✕</button
								>
							</div>
						{/each}
					</div>
				</div>

				<!-- Bagian 3: Pekerjaan -->
				<div>
					<div class="flex items-center justify-between mb-4 border-b pb-2">
						<h2 class="text-lg font-bold text-slate-800">Pekerjaan (%)</h2>
						<button
							type="button"
							onclick={addPekerjaan}
							class="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
							>+ Tambah</button
						>
					</div>
					<div class="space-y-3">
						{#each pekerjaan as p, i}
							<div class="flex gap-3 items-center">
								<input
									type="text"
									value={p.nama}
									oninput={(e) => updatePekerjaan(i, 'nama', e.currentTarget.value)}
									class="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
									placeholder="Kategori"
									required
								/>
								<input
									type="number"
									value={p.persentase}
									oninput={(e) => updatePekerjaan(i, 'persentase', Number(e.currentTarget.value))}
									class="w-20 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
									placeholder="%"
									min="0"
									max="100"
									required
								/>
								<button
									type="button"
									onclick={() => removePekerjaan(i)}
									class="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg h-fit transition-colors"
									>✕</button
								>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="mt-10 flex justify-end">
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
					Simpan Data Desa
				</button>
			</div>
		</form>
	</div>
</div>
