<script lang="ts">
	import { onMount } from 'svelte';
	let { data } = $props();

	// Data form umum
	let jenisSurat = $state('kehilangan');
	let nama = $state('');
	let nik = $state('');
	let ttl = $state('');
	let agama = $state('');
	let pekerjaan = $state('');
	let alamat = $state('');

	let jenisKelamin = $state('');
	let statusPerkawinan = $state('');
	let kewarganegaraan = $state('Indonesia');

	// Khusus SKU
	let jenisUsaha = $state('');
	let usahaSampingan = $state('');
	let tempatUsaha = $state('');

	// Khusus SKCK
	let keperluan = $state('');

	// Khusus Kehilangan
	let tanggalHilang = $state('');
	let rincianBarangHilang = $state('');

	// Khusus SKTM
	let tujuanSKTM = $state('');
	let namaTujuan = $state('');
	let ttlTujuan = $state('');
	let pendidikanTujuan = $state('');
	let alamatTujuan = $state('');

	// Khusus Kematian
	let umurMeninggal = $state('');
	let hariMeninggal = $state('');
	let tanggalMeninggal = $state('');
	let tempatMeninggal = $state('');
	let penyebabKematian = $state('');

	let namaPelapor = $state('');
	let nikPelapor = $state('');
	let umurPelapor = $state('');
	let pekerjaanPelapor = $state('');
	let alamatPelapor = $state('');
	let hubunganPelapor = $state('');

	// Khusus Wali
	let namaAnakWali = $state('');

	// Khusus Ahli Waris
	let namaAlmarhum = $state('');

	// Tanggal Surat (Bisa diubah)
	let inputTanggal = $state(new Date().toISOString().split('T')[0]);
	let tanggalSurat = $derived(
		new Date(inputTanggal).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	);

	let html2pdf: any = null;
	let isGenerating = $state(false);
	let isPdfReady = $state(false);

	onMount(async () => {
		// Import html2pdf dynamically to avoid SSR issues in SvelteKit
		try {
			const module = await import('html2pdf.js');
			html2pdf = module.default;
			isPdfReady = true;
		} catch (error) {
			console.error('Failed to load html2pdf', error);
		}
	});

	function generatePDF() {
		if (!html2pdf) {
			alert('Library PDF belum siap, silakan coba lagi.');
			return;
		}

		isGenerating = true;

		const element = document.getElementById('letter-preview');
		if (!element) return;

		// Hide borders temporarily for clean print
		element.classList.remove('border', 'border-gray-300', 'shadow-md');

		const opt = {
			margin: 0, // We handle margins in HTML
			filename: `Surat_${jenisSurat}_${nama.replace(/\s+/g, '_') || 'Desa_Sopaah'}.pdf`,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2, useCORS: true },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
		};

		html2pdf()
			.set(opt)
			.from(element)
			.save()
			.then(() => {
				isGenerating = false;
				// Restore borders
				element.classList.add('border', 'border-gray-300', 'shadow-md');
			});
	}
</script>

<svelte:head>
	<title>Layanan Surat - Desa Sopaah</title>
</svelte:head>

<div class="bg-gray-50 min-h-screen py-12">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="text-center mb-10">
			<h1 class="text-3xl font-bold text-gray-800 mb-3">Layanan Surat Online</h1>
			<p class="text-gray-600">
				Isi form di bawah ini dan langsung cetak surat resmi dalam format PDF.
			</p>
		</div>

		<div class="grid lg:grid-cols-12 gap-8">
			<!-- KOLOM KIRI: FORM PENGISIAN -->
			<div class="lg:col-span-5 space-y-6">
				<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
					<h2 class="text-xl font-bold text-green-700 mb-4 border-b pb-2">
						Data Pemohon / Keterangan
					</h2>

					<div class="space-y-4">
						<!-- Pilihan Surat -->
						<div>
							<label class="block text-sm font-bold text-gray-700 mb-1">Jenis Surat</label>
							<select
								bind:value={jenisSurat}
								class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-50 py-2.5 px-3"
							>
								<option value="kehilangan">Surat Keterangan Kehilangan</option>
								<option value="sktm">Surat Keterangan Tidak Mampu</option>
								<option value="kematian">Surat Keterangan Kematian</option>
								<option value="wali">Surat Keterangan Wali</option>
								<option value="domisili">Surat Keterangan Domisili</option>
								<option value="sku">Surat Keterangan Usaha</option>
								<option value="ahli-waris">Surat Keterangan Ahli Waris</option>
								<option value="skck">Surat Pengantar SKCK</option>
							</select>
						</div>

						<!-- Field Umum -->
						<div>
							<label class="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
							<input
								type="text"
								bind:value={nama}
								placeholder="Contoh: Budi Santoso"
								class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
							/>
						</div>

						<div class="grid grid-cols-2 gap-4">
							{#if jenisSurat !== 'kehilangan'}
								<div>
									<label class="block text-sm font-bold text-gray-700 mb-1">NIK</label>
									<input
										type="text"
										bind:value={nik}
										placeholder="Contoh: 3528xxxxxxxxxxxx"
										class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
									/>
								</div>
							{/if}
							{#if ['kehilangan', 'kematian', 'domisili', 'sku', 'ahli-waris'].includes(jenisSurat)}
								<div>
									<label class="block text-sm font-bold text-gray-700 mb-1">Jenis Kelamin</label>
									<select
										bind:value={jenisKelamin}
										class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-50 px-3 py-2"
									>
										<option value="">Pilih</option>
										<option value="Laki-laki">Laki-laki</option>
										<option value="Perempuan">Perempuan</option>
									</select>
								</div>
							{/if}
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-bold text-gray-700 mb-1">Tempat/Tgl Lahir</label>
								<input
									type="text"
									bind:value={ttl}
									placeholder="Pamekasan, 12-08-1990"
									class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
								/>
							</div>
							<div>
								<label class="block text-sm font-bold text-gray-700 mb-1">Tanggal Surat</label>
								<input
									type="date"
									bind:value={inputTanggal}
									class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
								/>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4">
							{#if ['kehilangan', 'sktm', 'kematian', 'domisili', 'sku', 'skck'].includes(jenisSurat)}
								<div>
									<label class="block text-sm font-bold text-gray-700 mb-1">Agama</label>
									<select
										bind:value={agama}
										class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-50 px-3 py-2"
									>
										<option value="">Pilih Agama</option>
										<option value="Islam">Islam</option>
										<option value="Kristen">Kristen</option>
										<option value="Katolik">Katolik</option>
										<option value="Hindu">Hindu</option>
										<option value="Buddha">Buddha</option>
									</select>
								</div>
							{/if}
							{#if ['kehilangan', 'sktm', 'domisili', 'sku', 'ahli-waris', 'skck'].includes(jenisSurat)}
								<div>
									<label class="block text-sm font-bold text-gray-700 mb-1">Pekerjaan</label>
									<input
										type="text"
										bind:value={pekerjaan}
										placeholder="Petani / Wiraswasta"
										class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
									/>
								</div>
							{/if}
						</div>

						<div class="grid grid-cols-2 gap-4">
							{#if ['kehilangan', 'domisili', 'sku', 'ahli-waris'].includes(jenisSurat)}
								<div>
									<label class="block text-sm font-bold text-gray-700 mb-1">Status Perkawinan</label
									>
									<select
										bind:value={statusPerkawinan}
										class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-50 px-3 py-2"
									>
										<option value="">Pilih Status</option>
										<option value="Belum Kawin">Belum Kawin</option>
										<option value="Kawin">Kawin</option>
										<option value="Cerai Hidup">Cerai Hidup</option>
										<option value="Cerai Mati">Cerai Mati</option>
									</select>
								</div>
							{/if}
							{#if jenisSurat === 'kehilangan'}
								<div>
									<label class="block text-sm font-bold text-gray-700 mb-1">Kewarganegaraan</label>
									<input
										type="text"
										bind:value={kewarganegaraan}
										class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
									/>
								</div>
							{/if}
						</div>

						<div>
							<label class="block text-sm font-bold text-gray-700 mb-1">Alamat Lengkap</label>
							<textarea
								bind:value={alamat}
								rows="2"
								placeholder="Dusun Timur RT 01 RW 02"
								class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
							></textarea>
						</div>

						<!-- ============================================== -->
						<!-- Field Khusus per Jenis Surat -->
						<!-- ============================================== -->

						{#if jenisSurat === 'kehilangan'}
							<div class="p-4 bg-gray-100 rounded-lg border border-gray-200">
								<h3 class="font-bold text-gray-800 mb-3 border-b pb-1">Detail Kehilangan</h3>
								<div class="space-y-3">
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1">Tanggal Hilang</label>
										<input
											type="text"
											bind:value={tanggalHilang}
											placeholder="contoh: 12 Juli 2026"
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1"
											>Rincian Barang & Lokasi Hilang</label
										>
										<textarea
											bind:value={rincianBarangHilang}
											rows="2"
											placeholder="contoh: KTP elektronik sekitar jalan panglegur tlanakan pamekasan"
											class="w-full rounded-lg border-gray-300 px-3 py-2"></textarea>
									</div>
								</div>
							</div>
						{/if}

						{#if jenisSurat === 'sktm'}
							<div class="p-4 bg-gray-100 rounded-lg border border-gray-200">
								<h3 class="font-bold text-gray-800 mb-3 border-b pb-1">
									Tujuan & Identitas Pemohon Bantuan
								</h3>
								<div class="space-y-3">
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1">Tujuan Surat</label>
										<input
											type="text"
											bind:value={tujuanSKTM}
											placeholder="contoh: Kebutuhan Sekolah"
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1"
											>Nama (Anak/Penerima)</label
										>
										<input
											type="text"
											bind:value={namaTujuan}
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1"
											>Tempat/Tgl Lahir</label
										>
										<input
											type="text"
											bind:value={ttlTujuan}
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1">Pendidikan</label>
										<input
											type="text"
											bind:value={pendidikanTujuan}
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1">Alamat</label>
										<input
											type="text"
											bind:value={alamatTujuan}
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
								</div>
							</div>
						{/if}

						{#if jenisSurat === 'kematian'}
							<div class="p-4 bg-gray-100 rounded-lg border border-gray-200 space-y-4">
								<div>
									<h3 class="font-bold text-gray-800 mb-3 border-b pb-1">Detail Kematian</h3>
									<div class="grid grid-cols-2 gap-3 mb-3">
										<div>
											<label class="block text-sm font-bold text-gray-700 mb-1"
												>Umur (Almarhum)</label
											>
											<input
												type="text"
												bind:value={umurMeninggal}
												class="w-full rounded-lg border-gray-300 px-3 py-2"
											/>
										</div>
										<div>
											<label class="block text-sm font-bold text-gray-700 mb-1"
												>Penyebab Kematian</label
											>
											<input
												type="text"
												bind:value={penyebabKematian}
												class="w-full rounded-lg border-gray-300 px-3 py-2"
											/>
										</div>
									</div>
									<div class="grid grid-cols-2 gap-3 mb-3">
										<div>
											<label class="block text-sm font-bold text-gray-700 mb-1"
												>Hari Meninggal</label
											>
											<input
												type="text"
												bind:value={hariMeninggal}
												class="w-full rounded-lg border-gray-300 px-3 py-2"
											/>
										</div>
										<div>
											<label class="block text-sm font-bold text-gray-700 mb-1"
												>Tanggal Meninggal</label
											>
											<input
												type="text"
												bind:value={tanggalMeninggal}
												placeholder="DD-MM-YYYY"
												class="w-full rounded-lg border-gray-300 px-3 py-2"
											/>
										</div>
									</div>
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1"
											>Tempat Meninggal</label
										>
										<input
											type="text"
											bind:value={tempatMeninggal}
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
								</div>

								<div>
									<h3 class="font-bold text-gray-800 mb-3 border-b pb-1">Data Pelapor</h3>
									<div class="grid grid-cols-2 gap-3 mb-3">
										<div>
											<label class="block text-sm font-bold text-gray-700 mb-1">Nama Pelapor</label>
											<input
												type="text"
												bind:value={namaPelapor}
												class="w-full rounded-lg border-gray-300 px-3 py-2"
											/>
										</div>
										<div>
											<label class="block text-sm font-bold text-gray-700 mb-1">NIK Pelapor</label>
											<input
												type="text"
												bind:value={nikPelapor}
												class="w-full rounded-lg border-gray-300 px-3 py-2"
											/>
										</div>
									</div>
									<div class="grid grid-cols-2 gap-3 mb-3">
										<div>
											<label class="block text-sm font-bold text-gray-700 mb-1">Umur Pelapor</label>
											<input
												type="text"
												bind:value={umurPelapor}
												class="w-full rounded-lg border-gray-300 px-3 py-2"
											/>
										</div>
										<div>
											<label class="block text-sm font-bold text-gray-700 mb-1"
												>Pekerjaan Pelapor</label
											>
											<input
												type="text"
												bind:value={pekerjaanPelapor}
												class="w-full rounded-lg border-gray-300 px-3 py-2"
											/>
										</div>
									</div>
									<div class="mb-3">
										<label class="block text-sm font-bold text-gray-700 mb-1"
											>Hubungan dengan Almarhum</label
										>
										<input
											type="text"
											bind:value={hubunganPelapor}
											placeholder="Anak kandung / Istri"
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1">Alamat Pelapor</label>
										<input
											type="text"
											bind:value={alamatPelapor}
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
								</div>
							</div>
						{/if}

						{#if jenisSurat === 'wali'}
							<div class="p-4 bg-gray-100 rounded-lg border border-gray-200">
								<h3 class="font-bold text-gray-800 mb-3 border-b pb-1">Data Anak (Diwalian)</h3>
								<div>
									<label class="block text-sm font-bold text-gray-700 mb-1">Nama Anak</label>
									<input
										type="text"
										bind:value={namaAnakWali}
										class="w-full rounded-lg border-gray-300 px-3 py-2"
									/>
								</div>
							</div>
						{/if}

						{#if jenisSurat === 'sku'}
							<div class="p-4 bg-gray-100 rounded-lg border border-gray-200">
								<h3 class="font-bold text-gray-800 mb-3 border-b pb-1">Detail Usaha</h3>
								<div class="space-y-3">
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1">Nama Usaha</label>
										<input
											type="text"
											bind:value={jenisUsaha}
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1">Usaha Sampingan</label
										>
										<input
											type="text"
											bind:value={usahaSampingan}
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
									<div>
										<label class="block text-sm font-bold text-gray-700 mb-1">Tempat Usaha</label>
										<input
											type="text"
											bind:value={tempatUsaha}
											class="w-full rounded-lg border-gray-300 px-3 py-2"
										/>
									</div>
								</div>
							</div>
						{/if}

						{#if jenisSurat === 'ahli-waris'}
							<div class="p-4 bg-gray-100 rounded-lg border border-gray-200">
								<h3 class="font-bold text-gray-800 mb-3 border-b pb-1">
									Detail Pewaris (Almarhum)
								</h3>
								<div>
									<label class="block text-sm font-bold text-gray-700 mb-1">Nama Almarhum</label>
									<input
										type="text"
										bind:value={namaAlmarhum}
										class="w-full rounded-lg border-gray-300 px-3 py-2"
									/>
								</div>
							</div>
						{/if}

						{#if jenisSurat === 'skck'}
							<div class="p-4 bg-gray-100 rounded-lg border border-gray-200">
								<h3 class="font-bold text-gray-800 mb-3 border-b pb-1">Keperluan SKCK</h3>
								<div>
									<label class="block text-sm font-bold text-gray-700 mb-1"
										>Keperluan Pembuatan SKCK</label
									>
									<input
										type="text"
										bind:value={keperluan}
										placeholder="Melamar Pekerjaan"
										class="w-full rounded-lg border-gray-300 px-3 py-2"
									/>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<div class="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-sm text-yellow-800">
					<strong>Peringatan:</strong> Pastikan seluruh data yang Anda masukkan sesuai dengan KTP dan
					KK asli. Surat ini wajib ditandatangani dan distempel basah oleh Kepala Desa Sopaah agar sah
					secara hukum.
				</div>
			</div>

			<!-- KOLOM KANAN: PREVIEW SURAT -->
			<div class="lg:col-span-7 flex flex-col items-center">
				<div class="w-full flex justify-between items-center mb-4 px-2">
					<h3 class="font-bold text-gray-700 flex items-center">
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							></path><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							></path></svg
						>
						Live Preview Kertas A4
					</h3>
					<button
						onclick={generatePDF}
						disabled={isGenerating || !isPdfReady || !nama.trim()}
						class="bg-green-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-green-700 transition flex items-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{#if isGenerating}
							Mencetak...
						{:else}
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
								></path></svg
							>
							Download PDF
						{/if}
					</button>
				</div>

				<!-- A4 Paper Container -->
				<div class="w-full bg-gray-200 p-2 sm:p-4 rounded-xl flex justify-center overflow-x-auto">
					<div
						id="letter-preview"
						class="bg-white border border-gray-300 shadow-md text-black"
						style="width: 210mm; min-height: 297mm; padding: 20mm; font-family: 'Times New Roman', Times, serif; font-size: 12pt; box-sizing: border-box; position: relative;"
					>
						<!-- KOP SURAT -->
						<div class="flex items-center border-b-4 border-double border-black pb-4 mb-6">
							<div class="w-28 flex-shrink-0 text-center flex justify-center">
								<!-- Logo Desa Sopaah (based on screenshot: Madura logo) -->
								<img
									src="/img/logo.png"
									alt="Logo"
									class="w-24 h-auto"
									onerror={(e) => {
										(e.currentTarget as HTMLImageElement).style.display = 'none';
									}}
								/>
							</div>
							<div class="flex-grow text-center">
								<div class="text-lg font-bold uppercase">Pemerintah Kabupaten Pamekasan</div>
								<div class="text-lg font-bold uppercase">Kecamatan Pademawu</div>
								{#if jenisSurat === 'kehilangan'}
									<div class="text-2xl font-bold uppercase mt-1 mb-1">Desa Sopa'ah</div>
								{:else if jenisSurat === 'kematian'}
									<div class="text-xl font-bold uppercase mt-1 mb-1">Kepala Desa Sopaah</div>
								{:else}
									<div class="text-xl font-bold uppercase mt-1 mb-1">
										Kantor Kepala Desa Sopa'ah
									</div>
								{/if}
								<div class="text-xs">
									Jln. Raya Desa Sopa'ah Kecamatan Pademawu Kabupaten Pamekasan 69381
								</div>
							</div>
							<div class="w-28 flex-shrink-0"></div>
							<!-- Balancer -->
						</div>

						<!-- JUDUL SURAT -->
						<div class="text-center mb-6">
							{#if jenisSurat === 'kehilangan'}
								<div class="text-xl font-bold uppercase underline mb-1 tracking-wide">
									Surat Keterangan Kehilangan
								</div>
								<div>Nomor : 470/..../432.502.10/{inputTanggal.split('-')[0]}</div>
							{:else if jenisSurat === 'sktm'}
								<div class="text-xl font-bold uppercase underline mb-1 tracking-wide">
									Surat Keterangan Tidak Mampu
								</div>
								<div>Nomor : 470/..../432.502.10/{inputTanggal.split('-')[0]}</div>
							{:else if jenisSurat === 'kematian'}
								<div class="text-xl font-bold uppercase underline mb-1 tracking-wide">
									Surat Keterangan Kematian
								</div>
								<div>NO : 470/..../432.502.10/{inputTanggal.split('-')[0]}</div>
							{:else if jenisSurat === 'wali'}
								<div class="text-xl font-bold uppercase underline mb-1 tracking-wide">
									Surat Keterangan Wali
								</div>
								<div>Nomor : 470/..../432.502.10/{inputTanggal.split('-')[0]}</div>
							{:else if jenisSurat === 'domisili'}
								<div class="text-xl font-bold uppercase underline mb-1 tracking-wide">
									Surat Keterangan Domisili
								</div>
								<div>Nomor : 470/..../432.502.10/{inputTanggal.split('-')[0]}</div>
							{:else if jenisSurat === 'sku'}
								<div class="text-xl font-bold uppercase underline mb-1 tracking-wide">
									Surat Keterangan Usaha
								</div>
								<div>Nomor : 470/..../432.502.10/{inputTanggal.split('-')[0]}</div>
							{:else if jenisSurat === 'ahli-waris'}
								<div class="text-xl font-bold uppercase underline mb-1 tracking-wide">
									Surat Keterangan Ahli Waris
								</div>
								<div>Nomor : 470/..../432.502.10/{inputTanggal.split('-')[0]}</div>
							{:else if jenisSurat === 'skck'}
								<div class="text-xl font-bold uppercase underline mb-1 tracking-wide">
									Surat Pengantar SKCK
								</div>
								<div>Nomor : 330/..../432.502.10/{inputTanggal.split('-')[0]}</div>
							{/if}
						</div>

						<!-- ISI SURAT -->
						<div class="leading-relaxed space-y-4 text-justify">
							<!-- Pembuka Surat -->
							{#if jenisSurat === 'kehilangan'}
								<p class="indent-10">
									Yang bertanda tangan di bawah ini, kepala desa sopa'ah kecamatan pademawu
									kabupaten pamekasan, menerangkan bahwa :
								</p>
							{:else if jenisSurat === 'sktm' || jenisSurat === 'wali' || jenisSurat === 'domisili'}
								<p class="indent-10">
									Yang bertandatangan di bawah ini kepala Desa Sopa'ah Kecamatan Pademawu Kabupaten
									Pamekasan menerangkan bahwa :
								</p>
							{:else if jenisSurat === 'kematian' || jenisSurat === 'sku' || jenisSurat === 'ahli-waris'}
								<p>Yang Bertanda Tangan Dibawah Ini Menerangkan Bahwa :</p>
							{:else}
								<p class="indent-10">
									Yang bertanda tangan di bawah ini Kepala Desa Sopa'ah, Kecamatan Pademawu,
									Kabupaten Pamekasan, menerangkan dengan sebenarnya bahwa:
								</p>
							{/if}

							<!-- Tabel Data Diri 1 -->
							<table class="w-full ml-10 mb-2">
								<tbody>
									{#if jenisSurat === 'kehilangan'}
										<tr><td class="w-48 py-1">Nama</td><td class="w-4">:</td><td>{nama}</td></tr>
										<tr><td class="py-1">Jenis Kelamin</td><td>:</td><td>{jenisKelamin}</td></tr>
										<tr><td class="py-1">Tempat/Tgl Lahir</td><td>:</td><td>{ttl}</td></tr>
										<tr><td class="py-1">Pekerjaan</td><td>:</td><td>{pekerjaan}</td></tr>
										<tr
											><td class="py-1">Status Perkawinan</td><td>:</td><td>{statusPerkawinan}</td
											></tr
										>
										<tr><td class="py-1">Agama</td><td>:</td><td>{agama}</td></tr>
										<tr
											><td class="py-1">Kewarganegaraan</td><td>:</td><td>{kewarganegaraan}</td></tr
										>
										<tr
											><td class="py-1 align-top">Alamat</td><td class="align-top">:</td><td
												>{alamat}</td
											></tr
										>
									{:else if jenisSurat === 'sktm'}
										<tr><td class="w-48 py-1">Nama</td><td class="w-4">:</td><td>{nama}</td></tr>
										<tr><td class="py-1">NIK</td><td>:</td><td>{nik}</td></tr>
										<tr><td class="py-1">Tempat,Tgl Lahir</td><td>:</td><td>{ttl}</td></tr>
										<tr><td class="py-1">Pekerjaan</td><td>:</td><td>{pekerjaan}</td></tr>
										<tr><td class="py-1">Agama</td><td>:</td><td>{agama}</td></tr>
										<tr
											><td class="py-1 align-top">Alamat</td><td class="align-top">:</td><td
												>{alamat}</td
											></tr
										>
									{:else if jenisSurat === 'kematian'}
										<tr
											><td class="w-48 py-1">Nama lengkap</td><td class="w-4">:</td><td>{nama}</td
											></tr
										>
										<tr><td class="py-1">NIK</td><td>:</td><td>{nik}</td></tr>
										<tr><td class="py-1">Jenis Kelamin</td><td>:</td><td>{jenisKelamin}</td></tr>
										<tr
											><td class="py-1">Tanggal Lahir/Umur</td><td>:</td><td
												>{ttl} / {umurMeninggal}</td
											></tr
										>
										<tr><td class="py-1">Agama</td><td>:</td><td>{agama}</td></tr>
										<tr
											><td class="py-1 align-top">Alamat</td><td class="align-top">:</td><td
												>{alamat}</td
											></tr
										>
									{:else if jenisSurat === 'wali'}
										<tr><td class="w-48 py-1">Nama</td><td class="w-4">:</td><td>{nama}</td></tr>
										<tr><td class="py-1">NIK</td><td>:</td><td>{nik}</td></tr>
										<tr><td class="py-1">Tempat Tanggal Lahir</td><td>:</td><td>{ttl}</td></tr>
										<tr
											><td class="py-1 align-top">Alamat</td><td class="align-top">:</td><td
												>{alamat}</td
											></tr
										>
									{:else if jenisSurat === 'domisili'}
										<tr><td class="w-48 py-1">Nama</td><td class="w-4">:</td><td>{nama}</td></tr>
										<tr><td class="py-1">Nik</td><td>:</td><td>{nik}</td></tr>
										<tr><td class="py-1">Tempat/TglLahir</td><td>:</td><td>{ttl}</td></tr>
										<tr><td class="py-1">Jenis Kelamin</td><td>:</td><td>{jenisKelamin}</td></tr>
										<tr><td class="py-1">Agama</td><td>:</td><td>{agama}</td></tr>
										<tr><td class="py-1">Pekerjaan</td><td>:</td><td>{pekerjaan}</td></tr>
										<tr
											><td class="py-1 align-top">Alamat</td><td class="align-top">:</td><td
												>{alamat}</td
											></tr
										>
										<tr><td class="py-1">Status</td><td>:</td><td>{statusPerkawinan}</td></tr>
									{:else if jenisSurat === 'sku'}
										<tr><td class="w-48 py-1">Nama</td><td class="w-4">:</td><td>{nama}</td></tr>
										<tr><td class="py-1">N I K</td><td>:</td><td>{nik}</td></tr>
										<tr><td class="py-1">Tempat Tanggal Lahir</td><td>:</td><td>{ttl}</td></tr>
										<tr><td class="py-1">Jenis Kelamin</td><td>:</td><td>{jenisKelamin}</td></tr>
										<tr><td class="py-1">Agama</td><td>:</td><td>{agama}</td></tr>
										<tr
											><td class="py-1">Status Perkawinan</td><td>:</td><td>{statusPerkawinan}</td
											></tr
										>
										<tr><td class="py-1">Pekerjaan</td><td>:</td><td>{pekerjaan}</td></tr>
										<tr
											><td class="py-1 align-top">Alamat</td><td class="align-top">:</td><td
												>{alamat}</td
											></tr
										>
									{:else if jenisSurat === 'ahli-waris'}
										<tr><td class="w-48 py-1">Nama</td><td class="w-4">:</td><td>{nama}</td></tr>
										<tr><td class="py-1">NIK</td><td>:</td><td>{nik}</td></tr>
										<tr><td class="py-1">Tempat, Tgl Lahir</td><td>:</td><td>{ttl}</td></tr>
										<tr><td class="py-1">Jenis kelamin</td><td>:</td><td>{jenisKelamin}</td></tr>
										<tr
											><td class="py-1 align-top">Alamat</td><td class="align-top">:</td><td
												>{alamat}</td
											></tr
										>
										<tr><td class="py-1">Pekerjaan</td><td>:</td><td>{pekerjaan}</td></tr>
										<tr><td class="py-1">Status</td><td>:</td><td>{statusPerkawinan}</td></tr>
									{:else}
										<tr
											><td class="w-48 py-1">Nama Lengkap</td><td class="w-4">:</td><td
												class="font-bold">{nama}</td
											></tr
										>
										<tr><td class="py-1">NIK</td><td>:</td><td>{nik}</td></tr>
										<tr><td class="py-1">Tempat, Tgl Lahir</td><td>:</td><td>{ttl}</td></tr>
										<tr><td class="py-1">Agama</td><td>:</td><td>{agama}</td></tr>
										<tr><td class="py-1">Pekerjaan</td><td>:</td><td>{pekerjaan}</td></tr>
										<tr
											><td class="py-1 align-top">Alamat</td><td class="align-top">:</td><td
												>{alamat}</td
											></tr
										>
									{/if}
								</tbody>
							</table>

							<!-- Teks Sambungan dan Tabel Kedua (jika ada) -->
							{#if jenisSurat === 'kehilangan'}
								<p class="indent-10">
									Benar yang namanya tersebut di atas penduduk desa sopa'ah kecamatan pademawu
									kabupaten pamekasan.
								</p>
								<p>
									Dengan ini menerangkan bahwa pada tanggal {tanggalHilang ||
										'...............................'} telah kehilangan {rincianBarangHilang ||
										'....................................................................'}
								</p>
								<p class="indent-10">
									Demikian Surat Keterangan Kehilangan ini dibuat dengan sebenarnya, agar dapat
									dipergunakan sebagai mana mestinya.
								</p>
							{:else if jenisSurat === 'sktm'}
								<p class="indent-10">
									Adalah benar-benar penduduk Desa Sopa'ah Kecamatan pademawu kabupaten Pamekasan
									dan tergolong tidak mampu (ekonomi lemah).
								</p>
								<p class="font-bold my-4">
									Surat keterangan ini di berikan untuk mengajukan PERSYARATAN permohonan {tujuanSKTM ||
										'................................................'}
								</p>
								<table class="w-full ml-10 mb-4">
									<tbody>
										<tr
											><td class="w-48 py-1">Nama</td><td class="w-4">:</td><td>{namaTujuan}</td
											></tr
										>
										<tr><td class="py-1">Tempat,Tgl lahir</td><td>:</td><td>{ttlTujuan}</td></tr>
										<tr><td class="py-1">Pendidikan</td><td>:</td><td>{pendidikanTujuan}</td></tr>
										<tr
											><td class="py-1 align-top">Alamat</td><td class="align-top">:</td><td
												>{alamatTujuan}</td
											></tr
										>
									</tbody>
								</table>
								<p class="indent-10">
									Demikian surat keterangan ini dibuat dengan sebenarnya untuk dipergunakan
									sebagaimana mestinya.
								</p>
							{:else if jenisSurat === 'kematian'}
								<p class="font-bold my-3">Telah Meninggal Dunia Pada</p>
								<table class="w-full ml-10 mb-4">
									<tbody>
										<tr
											><td class="w-48 py-1">Hari</td><td class="w-4">:</td><td>{hariMeninggal}</td
											></tr
										>
										<tr><td class="py-1">Tanggal</td><td>:</td><td>{tanggalMeninggal}</td></tr>
										<tr><td class="py-1">Bertempat di</td><td>:</td><td>{tempatMeninggal}</td></tr>
										<tr
											><td class="py-1">Penyebab Kematian</td><td>:</td><td>{penyebabKematian}</td
											></tr
										>
									</tbody>
								</table>
								<p class="font-bold my-3">
									Surat keterangan ini dibuat berdasarkan keterangan pelapor
								</p>
								<table class="w-full ml-10 mb-4">
									<tbody>
										<tr
											><td class="w-48 py-1">Nama Lengkap</td><td class="w-4">:</td><td
												>{namaPelapor}</td
											></tr
										>
										<tr><td class="py-1">NIK</td><td>:</td><td>{nikPelapor}</td></tr>
										<tr><td class="py-1">Umur</td><td>:</td><td>{umurPelapor}</td></tr>
										<tr><td class="py-1">Pekerjaan</td><td>:</td><td>{pekerjaanPelapor}</td></tr>
										<tr
											><td class="py-1 align-top">Alamat</td><td class="align-top">:</td><td
												>{alamatPelapor}</td
											></tr
										>
										<tr
											><td class="py-1">Hubungan Pelapor<br />Dengan yang</td><td class="align-top"
												>:</td
											><td class="align-top">{hubunganPelapor}</td></tr
										>
									</tbody>
								</table>
							{:else if jenisSurat === 'wali'}
								<p class="indent-10">
									Orang tersebut di atas adalah benar-benar warga desa sopa'ah kecamatan pademawu
									kabupaten pamekasan dan benar-benar wali dari anak yang Bernama <strong
										>{namaAnakWali || '...........................................'}</strong
									>
								</p>
								<p class="indent-10">
									Demikian surat keterangan ini dinuat dengan sebenarnya untuk dipergunakan
									sebagaimana mestinya.
								</p>
							{:else if jenisSurat === 'domisili'}
								<p class="indent-10">
									Nama tersebut diatas benar-benar penduduk DesaSopa'ah dan sekarang berdomisili di
									Desa Sopa'ah Kecamatan Pademawu Kabupaten Pamekasan.
								</p>
								<p class="indent-10">
									Demikian surat keterangan ini dibuat dengan sebenarnya dan untuk dapat
									dipergunakan sebagaimana mestinya.
								</p>
							{:else if jenisSurat === 'sku'}
								<p>Nama Tersebut Diatas Benar Benar Penduduk Desa yang memiliki usaha:`</p>
								<table class="w-full ml-10 mb-4 mt-2">
									<tbody>
										<tr
											><td class="w-48 py-1">Nama Usaha</td><td class="w-4">:</td><td
												>{jenisUsaha}</td
											></tr
										>
										<tr><td class="py-1">Usaha Sampingan</td><td>:</td><td>{usahaSampingan}</td></tr
										>
										<tr><td class="py-1">Tempat Usaha</td><td>:</td><td>{tempatUsaha}</td></tr>
									</tbody>
								</table>
								<p class="indent-10">
									Demikian Surat Keterangan Ini Dibuat Untuk dapat dipergunakan Sebagaimana
									Mestinya.
								</p>
							{:else if jenisSurat === 'ahli-waris'}
								<p>
									Nama tersebut diatas <strong
										>benar-benar warga Desa Sopa'ah dan sebagai ahli waris yang sah dari almarhum {namaAlmarhum ||
											'.........'}</strong
									>
								</p>
								<p>
									Demikian surat keretangan ini kami buat dengan sebenarnya untuk dipergunakan
									sebagaimana mestinya.
								</p>
							{:else if jenisSurat === 'skck'}
								<p class="indent-10">
									Orang tersebut di atas adalah benar-benar warga Desa Sopaah dan sepengetahuan kami
									selalu berkelakuan baik dan tidak pernah tersangkut tindak pidana kejahatan.
								</p>
								<p class="indent-10">
									Surat pengantar ini diberikan untuk keperluan: <strong
										>{keperluan ||
											'.......................................................'}</strong
									>.
								</p>
								<p class="indent-10">
									Demikian surat pengantar ini dibuat untuk dapat dipergunakan sebagai lampiran
									pembuatan SKCK.
								</p>
							{/if}
						</div>

						<!-- TANDA TANGAN -->
						<div class="mt-16 flex justify-between">
							<div class="w-64 text-center">
								{#if jenisSurat === 'wali'}
									<div class="mt-8">Wali Murid</div>
									<div class="mt-24 font-bold">(...................................)</div>
								{/if}
							</div>

							<div class="w-64 text-center">
								<div>Pamekasan, ...........................</div>
								{#if jenisSurat === 'domisili'}
									<div class="mb-20 mt-2">KepalaDesaSopa'ah</div>
								{:else}
									<div class="mb-20 mt-2">Kepala Desa Sopa'ah</div>
								{/if}
								<div class="font-bold underline uppercase">{data.kepalaDesa}</div>
							</div>
						</div>
					</div>
				</div>
				<p class="text-xs text-gray-400 mt-4 text-center max-w-lg">
					*Tampilan di atas adalah ukuran standar kertas A4 (21x29.7 cm). Jika terlihat kecil di
					layar, hasil download PDF akan tetap jernih dan berukuran penuh.
				</p>
			</div>
		</div>
	</div>
</div>
