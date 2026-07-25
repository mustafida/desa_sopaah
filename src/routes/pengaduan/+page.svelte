<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let isSubmitting = $state(false);

	let nama = $state('');
	let nik = $state('');
	let noHp = $state('');
	let kategori = $state('');
	let isiLaporan = $state('');

	// Reset form after success
	$effect(() => {
		if (form?.success) {
			nama = '';
			nik = '';
			noHp = '';
			kategori = '';
			isiLaporan = '';
			isSubmitting = false;
		}
		if (form?.error) {
			isSubmitting = false;
		}
	});
</script>

<svelte:head>
	<title>Pengaduan & Aspirasi - Desa Sopa'ah</title>
</svelte:head>

<div class="bg-gray-50 min-h-screen py-12">
	<div class="container mx-auto px-4 max-w-3xl">
		<div class="text-center mb-10">
			<h1 class="text-3xl font-bold text-gray-800 mb-3">Layanan Pengaduan & Aspirasi</h1>
			<p class="text-gray-600">
				Sampaikan laporan, keluhan, atau aspirasi Anda secara langsung kepada Pemerintah Desa Sopa'ah.
			</p>
		</div>

		{#if form?.success}
			<div class="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-center shadow-sm">
				<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
				</div>
				<h2 class="text-xl font-bold text-green-800 mb-2">Laporan Berhasil Dikirim!</h2>
				<p class="text-green-700">Terima kasih atas laporan/aspirasi Anda. Kami akan segera menindaklanjutinya.</p>
				<a href="/" class="inline-block mt-4 text-green-600 font-medium hover:underline">Kembali ke Beranda</a>
			</div>
		{:else}
			<div class="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
				{#if form?.error}
					<div class="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100 text-sm">
						{form.error}
					</div>
				{/if}

				<form
					method="POST"
					enctype="multipart/form-data"
					use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							await update({ reset: false });
						};
					}}
					class="space-y-5"
				>
					<div class="grid md:grid-cols-2 gap-5">
						<div>
							<label for="nama" class="block text-sm font-bold text-gray-700 mb-1.5">Nama Lengkap *</label>
							<input
								type="text"
								id="nama"
								name="nama"
								bind:value={nama}
								required
								class="w-full px-4 py-2.5 rounded-xl border-gray-300 bg-gray-50 focus:ring-green-500 focus:border-green-500"
								placeholder="Sesuai KTP"
							/>
						</div>
						<div>
							<label for="nik" class="block text-sm font-bold text-gray-700 mb-1.5">NIK (Opsional)</label>
							<input
								type="text"
								id="nik"
								name="nik"
								bind:value={nik}
								class="w-full px-4 py-2.5 rounded-xl border-gray-300 bg-gray-50 focus:ring-green-500 focus:border-green-500"
								placeholder="16 Digit NIK"
							/>
						</div>
					</div>

					<div class="grid md:grid-cols-2 gap-5">
						<div>
							<label for="no_hp" class="block text-sm font-bold text-gray-700 mb-1.5">Nomor WhatsApp (Opsional)</label>
							<input
								type="text"
								id="no_hp"
								name="no_hp"
								bind:value={noHp}
								class="w-full px-4 py-2.5 rounded-xl border-gray-300 bg-gray-50 focus:ring-green-500 focus:border-green-500"
								placeholder="0812xxxxxx"
							/>
						</div>
						<div>
							<label for="kategori" class="block text-sm font-bold text-gray-700 mb-1.5">Kategori Laporan *</label>
							<select
								id="kategori"
								name="kategori"
								bind:value={kategori}
								required
								class="w-full px-4 py-2.5 rounded-xl border-gray-300 bg-gray-50 focus:ring-green-500 focus:border-green-500"
							>
								<option value="">Pilih Kategori</option>
								<option value="Infrastruktur & Lingkungan">Infrastruktur & Lingkungan</option>
								<option value="Pelayanan Desa">Pelayanan Desa</option>
								<option value="Keamanan & Ketertiban">Keamanan & Ketertiban</option>
								<option value="Bantuan Sosial">Bantuan Sosial</option>
								<option value="Lainnya">Lainnya / Aspirasi Umum</option>
							</select>
						</div>
					</div>

					<div>
						<label for="isi_laporan" class="block text-sm font-bold text-gray-700 mb-1.5">Detail Laporan / Aspirasi *</label>
						<textarea
							id="isi_laporan"
							name="isi_laporan"
							bind:value={isiLaporan}
							required
							rows="5"
							class="w-full px-4 py-2.5 rounded-xl border-gray-300 bg-gray-50 focus:ring-green-500 focus:border-green-500 resize-none"
							placeholder="Jelaskan secara detail keluhan atau saran Anda..."
						></textarea>
					</div>

					<div>
						<label for="lampiran" class="block text-sm font-bold text-gray-700 mb-1.5">Lampiran Foto (Opsional)</label>
						<input
							type="file"
							id="lampiran"
							name="lampiran"
							accept="image/*"
							class="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition cursor-pointer"
						/>
						<p class="mt-1.5 text-xs text-gray-500">Unggah foto sebagai bukti jika ada (Maks 2MB)</p>
					</div>

					<div class="pt-4 border-t border-gray-100">
						<button
							type="submit"
							disabled={isSubmitting}
							class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
						>
							{#if isSubmitting}
								<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Mengirim Laporan...
							{:else}
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
								Kirim Laporan
							{/if}
						</button>
					</div>
				</form>
			</div>
		{/if}
	</div>
</div>
