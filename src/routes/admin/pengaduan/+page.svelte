<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	let { data, form } = $props();
	let laporanList = $state(data.pengaduanList || []);

	// Update list on form success
	$effect(() => {
		if (form?.success) {
			// Trigger reload handled by SvelteKit automatically via enhance, but we can also sync it:
			laporanList = data.pengaduanList;
		}
	});

	let showModal = $state(false);
	let selectedLaporan = $state<any>(null);
	let deleteConfirmId = $state<number | null>(null);


	function openDetail(item: any) {
		selectedLaporan = { ...item };
		showModal = true;
		
		if (!item.isRead) {
			item.isRead = true;
			const index = laporanList.findIndex((l: any) => l.id === item.id);
			if (index !== -1) {
				laporanList[index].isRead = true;
			}
			
			const formData = new FormData();
			formData.append('id', item.id);
			fetch('?/markRead', {
				method: 'POST',
				body: formData
			}).then(() => {
				// Refresh layout data so the notification badge updates
				invalidateAll();
			});
		}
	}

	function closeDetail() {
		showModal = false;
		selectedLaporan = null;
	}

	const formatDate = (date: string | Date | null) => {
		if (!date) return '-';
		return new Date(date).toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};
</script>

<svelte:head>
	<title>Kelola Pengaduan - Admin Desa Sopa'ah</title>
</svelte:head>

<div class="mb-6">
	<h1 class="text-2xl font-bold text-slate-800">Pengaduan & Aspirasi Masyarakat</h1>
	<p class="text-slate-500 text-sm mt-1">Kelola laporan dan saran yang dikirimkan oleh warga.</p>
</div>

{#if form?.success}
	<div class="bg-green-50 text-green-600 p-4 rounded-lg mb-6 border border-green-100 flex items-center justify-between">
		<span class="font-medium">{form.message}</span>
	</div>
{/if}
{#if form?.error}
	<div class="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100 font-medium">
		{form.error}
	</div>
{/if}

<div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
	<div class="overflow-x-auto">
		<table class="w-full text-left border-collapse">
			<thead>
				<tr class="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
					<th class="py-4 px-6 font-semibold w-16 text-center">No</th>
					<th class="py-4 px-6 font-semibold w-40">Tanggal</th>
					<th class="py-4 px-6 font-semibold">Pelapor</th>
					<th class="py-4 px-6 font-semibold w-48">Kategori</th>
					<th class="py-4 px-6 font-semibold w-24 text-center">Aksi</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-slate-100">
				{#each laporanList as item, i}
					<tr class="hover:bg-slate-50/50 transition-colors">
						<td class="py-4 px-6 text-center text-slate-500">{i + 1}</td>
						<td class="py-4 px-6 text-sm text-slate-500 whitespace-nowrap">
							{formatDate(item.createdAt)}
						</td>
						<td class="py-4 px-6">
							<div class="flex items-center gap-2">
								<div class="font-medium text-slate-800">{item.nama}</div>
								{#if !item.isRead}
									<span class="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Baru</span>
								{/if}
							</div>
							<div class="text-xs text-slate-500 flex flex-col gap-0.5 mt-1">
								{#if item.noHp}<span>WA: {item.noHp}</span>{/if}
								{#if item.nik}<span>NIK: {item.nik}</span>{/if}
							</div>
						</td>
						<td class="py-4 px-6">
							<span class="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded font-medium">
								{item.kategori}
							</span>
						</td>
						<td class="py-4 px-6">
							<div class="flex items-center justify-center gap-2">
								<!-- Tombol Detail / Tindak Lanjut -->
								<button
									onclick={() => openDetail(item)}
									class="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
									title="Tindak Lanjut"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
								</button>
								
								<!-- Tombol Hapus -->
								{#if deleteConfirmId === item.id}
									<form method="POST" action="?/hapus" use:enhance class="inline">
										<input type="hidden" name="id" value={item.id} />
										<button
											type="submit"
											class="p-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors text-xs font-bold"
										>
											Yakin?
										</button>
									</form>
								{:else}
									<button
										onclick={() => (deleteConfirmId = item.id)}
										class="p-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors"
										title="Hapus"
									>
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
									</button>
								{/if}
							</div>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="6" class="py-12 text-center text-slate-500">
							Belum ada laporan atau pengaduan yang masuk.
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- Modal Tindak Lanjut -->
{#if showModal && selectedLaporan}
	<div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
		<div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
			<div class="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur z-10">
				<h2 class="text-xl font-bold text-slate-800">Detail Laporan</h2>
				<button
					onclick={closeDetail}
					class="text-slate-400 hover:text-slate-600 transition-colors"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
				</button>
			</div>
			
			<div class="p-6">
				<!-- Info Pelapor -->
				<div class="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 grid grid-cols-2 gap-4 text-sm">
					<div>
						<div class="text-slate-500 mb-1">Nama Pelapor</div>
						<div class="font-medium text-slate-800">{selectedLaporan.nama}</div>
					</div>
					<div>
						<div class="text-slate-500 mb-1">Kategori</div>
						<div class="font-medium text-slate-800">{selectedLaporan.kategori}</div>
					</div>
					<div>
						<div class="text-slate-500 mb-1">WhatsApp</div>
						<div class="font-medium text-slate-800">{selectedLaporan.noHp || 'Tidak dicantumkan'}</div>
					</div>
					<div>
						<div class="text-slate-500 mb-1">Waktu Masuk</div>
						<div class="font-medium text-slate-800">{formatDate(selectedLaporan.createdAt)}</div>
					</div>
				</div>

				<!-- Isi Laporan -->
				<div class="mb-6">
					<div class="text-sm font-semibold text-slate-800 mb-2">Isi Laporan / Keluhan:</div>
					<div class="bg-white border border-slate-200 p-4 rounded-xl text-slate-700 whitespace-pre-line text-sm leading-relaxed">
						{selectedLaporan.isiLaporan}
					</div>
				</div>

				<!-- Lampiran Foto -->
				{#if selectedLaporan.lampiranUrl}
					<div class="mb-8">
						<div class="text-sm font-semibold text-slate-800 mb-2">Lampiran Foto Bukti:</div>
						<a href={selectedLaporan.lampiranUrl} target="_blank" rel="noopener noreferrer" class="block rounded-xl overflow-hidden border border-slate-200 hover:border-green-500 transition-colors">
							<img src={selectedLaporan.lampiranUrl} alt="Lampiran Laporan" class="w-full max-h-64 object-cover" />
						</a>
						<p class="text-xs text-slate-500 mt-1">Klik gambar untuk melihat ukuran penuh</p>
					</div>
				{/if}

				<!-- Aksi Bawah -->
				<div class="border-t border-slate-200 pt-6 mt-4 flex justify-end">
					<button
						type="button"
						onclick={closeDetail}
						class="px-5 py-2.5 text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 rounded-xl transition-colors"
					>
						Tutup
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
