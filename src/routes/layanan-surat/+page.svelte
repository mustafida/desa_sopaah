<script>
	import { onMount } from 'svelte';

	// Data form
	let jenisSurat = $state('sku');
	let nama = $state('');
	let nik = $state('');
	let ttl = $state('');
	let agama = $state('');
	let pekerjaan = $state('');
	let alamat = $state('');
	
	// Khusus SKU
	let jenisUsaha = $state('');
	
	// Khusus SKCK
	let keperluan = $state('');
	
	// Tanggal Surat (Bisa diubah)
	let inputTanggal = $state(new Date().toISOString().split('T')[0]);
	let tanggalSurat = $derived(
		new Date(inputTanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
	);

	let html2pdf = null;
	let isGenerating = $state(false);

	onMount(async () => {
		// Import html2pdf dynamically to avoid SSR issues in SvelteKit
		try {
			const module = await import('html2pdf.js');
			html2pdf = module.default;
		} catch (error) {
			console.error("Failed to load html2pdf", error);
		}
	});

	function generatePDF() {
		if (!html2pdf) {
			alert("Library PDF belum siap, silakan coba lagi.");
			return;
		}
		
		isGenerating = true;
		
		const element = document.getElementById('letter-preview');
		
		// Hide borders temporarily for clean print
		element.classList.remove('border', 'border-gray-300', 'shadow-md');
		
		const opt = {
			margin:       0, // We handle margins in HTML
			filename:     `Surat_${jenisSurat}_${nama.replace(/\s+/g, '_') || 'Desa_Sopaah'}.pdf`,
			image:        { type: 'jpeg', quality: 0.98 },
			html2canvas:  { scale: 2, useCORS: true },
			jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
		};
		
		html2pdf().set(opt).from(element).save().then(() => {
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
			<p class="text-gray-600">Isi form di bawah ini dan langsung cetak surat resmi dalam format PDF.</p>
		</div>

		<div class="grid lg:grid-cols-12 gap-8">
			
			<!-- KOLOM KIRI: FORM PENGISIAN -->
			<div class="lg:col-span-5 space-y-6">
				<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
					<h2 class="text-xl font-bold text-green-700 mb-4 border-b pb-2">Data Pemohon</h2>
					
					<div class="space-y-4">
						<!-- Pilihan Surat -->
						<div>
							<label class="block text-sm font-bold text-gray-700 mb-1">Jenis Surat</label>
							<select bind:value={jenisSurat} class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-50 py-2.5 px-3">
								<option value="sku">Surat Keterangan Usaha (SKU)</option>
								<option value="skck">Surat Pengantar SKCK</option>
								<option value="domisili">Surat Keterangan Domisili</option>
							</select>
						</div>

						<!-- Field Umum -->
						<div>
							<label class="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
							<input type="text" bind:value={nama} placeholder="Contoh: Budi Santoso" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2">
						</div>
						
						<div>
							<label class="block text-sm font-bold text-gray-700 mb-1">Nomor Induk Kependudukan (NIK)</label>
							<input type="text" bind:value={nik} placeholder="Contoh: 3528xxxxxxxxxxxx" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2">
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-bold text-gray-700 mb-1">Tempat Lahir</label>
								<input type="text" bind:value={ttl} placeholder="Contoh: Pamekasan, 12 Agustus 1990" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2">
							</div>
							<div>
								<label class="block text-sm font-bold text-gray-700 mb-1">Tanggal Surat</label>
								<input type="date" bind:value={inputTanggal} class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2">
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-bold text-gray-700 mb-1">Agama</label>
								<select bind:value={agama} class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-50 px-3 py-2">
									<option value="">Pilih Agama</option>
									<option value="Islam">Islam</option>
									<option value="Kristen">Kristen</option>
									<option value="Katolik">Katolik</option>
									<option value="Hindu">Hindu</option>
									<option value="Buddha">Buddha</option>
								</select>
							</div>
							<div>
								<label class="block text-sm font-bold text-gray-700 mb-1">Pekerjaan</label>
								<input type="text" bind:value={pekerjaan} placeholder="Contoh: Petani / Wiraswasta" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2">
							</div>
						</div>

						<div>
							<label class="block text-sm font-bold text-gray-700 mb-1">Alamat Lengkap</label>
							<textarea bind:value={alamat} rows="2" placeholder="Contoh: Dusun Timur RT 01 RW 02, Desa Sopaah" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"></textarea>
						</div>

						<!-- Field Khusus SKU -->
						{#if jenisSurat === 'sku'}
							<div class="p-4 bg-blue-50 rounded-lg border border-blue-100">
								<label class="block text-sm font-bold text-blue-800 mb-1">Jenis Usaha / Nama Usaha</label>
								<input type="text" bind:value={jenisUsaha} placeholder="Contoh: Warung Kopi / Budi Taylor" class="w-full rounded-lg border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2">
							</div>
						{/if}

						<!-- Field Khusus SKCK -->
						{#if jenisSurat === 'skck'}
							<div class="p-4 bg-orange-50 rounded-lg border border-orange-100">
								<label class="block text-sm font-bold text-orange-800 mb-1">Keperluan Pembuatan SKCK</label>
								<input type="text" bind:value={keperluan} placeholder="Contoh: Melamar Pekerjaan di PT. ABC" class="w-full rounded-lg border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-3 py-2">
							</div>
						{/if}
						
					</div>
				</div>

				<div class="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-sm text-yellow-800">
					<strong>Peringatan:</strong> Pastikan seluruh data yang Anda masukkan sesuai dengan KTP dan Kartu Keluarga asli. Surat yang digenerate ini wajib ditandatangani dan distempel basah oleh Kepala Desa Sopaah agar sah secara hukum.
				</div>
			</div>

			<!-- KOLOM KANAN: PREVIEW SURAT -->
			<div class="lg:col-span-7 flex flex-col items-center">
				<div class="w-full flex justify-between items-center mb-4 px-2">
					<h3 class="font-bold text-gray-700 flex items-center">
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
						Live Preview Kertas A4
					</h3>
					<button 
						onclick={generatePDF} 
						disabled={isGenerating || !html2pdf}
						class="bg-green-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-green-700 transition flex items-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
						{#if isGenerating}
							Mencetak...
						{:else}
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
							Download PDF
						{/if}
					</button>
				</div>

				<!-- A4 Paper Container -->
				<div class="w-full bg-gray-200 p-2 sm:p-4 rounded-xl flex justify-center overflow-x-auto">
					
					<!-- A4 Dimensions: 210mm x 297mm (Ratio: ~1:1.414). We'll set a fixed width for the preview that scales nicely -->
					<div id="letter-preview" class="bg-white border border-gray-300 shadow-md text-black" style="width: 210mm; min-height: 297mm; padding: 20mm; font-family: 'Times New Roman', Times, serif; font-size: 12pt; box-sizing: border-box; position: relative;">
						
						<!-- KOP SURAT -->
						<div class="flex items-center border-b-4 border-double border-black pb-4 mb-8">
							<div class="w-24 flex-shrink-0 text-center">
								<!-- Logo Desa Sopaah (dummy or real logo.png) -->
								<img src="/img/logo.png" alt="Logo" class="w-20 h-auto mx-auto grayscale" onerror={(e) => { e.currentTarget.src='/img/slider1.jpg'; e.currentTarget.classList.add('rounded-full', 'object-cover', 'h-20'); }} />
							</div>
							<div class="flex-grow text-center">
								<div class="text-xl font-bold uppercase tracking-wide">Pemerintah Kabupaten Pamekasan</div>
								<div class="text-xl font-bold uppercase tracking-wide">Kecamatan Pademawu</div>
								<div class="text-2xl font-bold uppercase tracking-wider mt-1 mb-1">Kepala Desa Sopaah</div>
								<div class="text-sm">Jalan Raya Desa Sopaah No. 1, Kec. Pademawu, Pamekasan (69323)</div>
							</div>
							<div class="w-24 flex-shrink-0"></div> <!-- Balancer -->
						</div>

						<!-- JUDUL SURAT -->
						<div class="text-center mb-8">
							{#if jenisSurat === 'sku'}
								<div class="text-xl font-bold uppercase underline underline-offset-4 mb-1">Surat Keterangan Usaha</div>
								<div>Nomor: 470 / <span class="tracking-widest">.....</span> / 432.302.XX / {inputTanggal.split('-')[0]}</div>
							{:else if jenisSurat === 'skck'}
								<div class="text-xl font-bold uppercase underline underline-offset-4 mb-1">Surat Pengantar SKCK</div>
								<div>Nomor: 330 / <span class="tracking-widest">.....</span> / 432.302.XX / {inputTanggal.split('-')[0]}</div>
							{:else if jenisSurat === 'domisili'}
								<div class="text-xl font-bold uppercase underline underline-offset-4 mb-1">Surat Keterangan Domisili</div>
								<div>Nomor: 474 / <span class="tracking-widest">.....</span> / 432.302.XX / {inputTanggal.split('-')[0]}</div>
							{/if}
						</div>

						<!-- ISI SURAT -->
						<div class="leading-relaxed space-y-4 text-justify">
							<p class="indent-10">
								Yang bertanda tangan di bawah ini Kepala Desa Sopaah, Kecamatan Pademawu, Kabupaten Pamekasan, menerangkan dengan sebenarnya bahwa:
							</p>

							<table class="w-full ml-10 mb-4">
								<tbody>
									<tr><td class="w-40 py-1 align-top">Nama Lengkap</td><td class="w-4 align-top">:</td><td class="font-bold uppercase align-top">{nama || '.......................................................'}</td></tr>
									<tr><td class="py-1 align-top">NIK</td><td class="align-top">:</td><td class="align-top">{nik || '.......................................................'}</td></tr>
									<tr><td class="py-1 align-top">Tempat, Tgl Lahir</td><td class="align-top">:</td><td class="align-top">{ttl || '.......................................................'}</td></tr>
									<tr><td class="py-1 align-top">Agama</td><td class="align-top">:</td><td class="align-top">{agama || '.......................................................'}</td></tr>
									<tr><td class="py-1 align-top">Pekerjaan</td><td class="align-top">:</td><td class="align-top">{pekerjaan || '.......................................................'}</td></tr>
									<tr><td class="py-1 align-top">Alamat</td><td class="align-top">:</td><td class="align-top">{alamat || '.......................................................'}</td></tr>
								</tbody>
							</table>

							{#if jenisSurat === 'sku'}
								<p class="indent-10">
									Berdasarkan pengamatan kami, nama tersebut di atas memang benar-benar penduduk Desa Sopaah yang saat ini memiliki dan menjalankan usaha di bidang <strong>{jenisUsaha || '.......................................................'}</strong>.
								</p>
								<p class="indent-10">
									Demikian Surat Keterangan Usaha ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
								</p>
							{:else if jenisSurat === 'skck'}
								<p class="indent-10">
									Orang tersebut di atas adalah benar-benar warga Desa Sopaah dan sepengetahuan kami selama berdomisili di desa ini selalu berkelakuan baik dan tidak pernah tersangkut tindak pidana kejahatan.
								</p>
								<p class="indent-10">
									Surat pengantar ini diberikan untuk keperluan: <strong>{keperluan || '.......................................................'}</strong>.
								</p>
								<p class="indent-10">
									Demikian surat pengantar ini dibuat untuk dapat dipergunakan sebagai lampiran pembuatan Surat Keterangan Catatan Kepolisian (SKCK).
								</p>
							{:else if jenisSurat === 'domisili'}
								<p class="indent-10">
									Berdasarkan data kependudukan dan sepengetahuan kami, orang tersebut di atas adalah benar-benar berdomisili atau bertempat tinggal di alamat yang tertera di atas yang merupakan wilayah administrasi Desa Sopaah, Kecamatan Pademawu.
								</p>
								<p class="indent-10">
									Demikian Surat Keterangan Domisili ini dibuat untuk dapat dipergunakan sebagaimana mestinya.
								</p>
							{/if}
						</div>

						<!-- TANDA TANGAN -->
						<div class="mt-20 flex justify-end text-center">
							<div class="w-64">
								<div>Sopaah, {tanggalSurat}</div>
								<div class="mb-20">Kepala Desa Sopaah</div>
								<!-- Stempel & TTD Placeholder space -->
								<div class="font-bold underline uppercase">Cicik Ernawati</div>
							</div>
						</div>

					</div>
				</div>
				<p class="text-xs text-gray-400 mt-4 text-center max-w-lg">
					*Tampilan di atas adalah ukuran standar kertas A4 (21x29.7 cm). Jika terlihat kecil di layar, hasil download PDF akan tetap jernih dan berukuran penuh.
				</p>
			</div>

		</div>
	</div>
</div>
