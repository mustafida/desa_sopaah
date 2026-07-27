<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page, navigating } from '$app/stores';

	let { children, data } = $props();

	let isMenuOpen = $state(false);
	let isSosmedOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Chat Widget States
	let isChatWidgetOpen = $state(false);
	let chatWidgetNama = $state('');
	let chatWidgetPesan = $state('');
	let chatWidgetStatus = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let chatWidgetError = $state('');

	async function submitChatWidget(e: Event) {
		e.preventDefault();
		chatWidgetStatus = 'loading';
		chatWidgetError = '';
		try {
			const res = await fetch('/api/pengaduan', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					nama: chatWidgetNama,
					isiLaporan: chatWidgetPesan
				})
			});
			const result = await res.json();
			if (result.success) {
				chatWidgetStatus = 'success';
				setTimeout(() => {
					isChatWidgetOpen = false;
					chatWidgetStatus = 'idle';
					chatWidgetNama = '';
					chatWidgetPesan = '';
				}, 3000);
			} else {
				chatWidgetStatus = 'error';
				chatWidgetError = result.error || 'Terjadi kesalahan.';
			}
		} catch (e) {
			chatWidgetStatus = 'error';
			chatWidgetError = 'Gagal mengirim pesan, periksa koneksi Anda.';
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if $page.url.pathname.startsWith('/admin')}
	{@render children()}
{:else}
	<div class="flex flex-col min-h-screen font-['Inter']">
		<!-- Navbar -->
		<nav
			class="bg-gradient-to-r from-white via-green-600 to-green-900 shadow-lg fixed w-full z-50 transition-all duration-300"
		>
			<div class="container mx-auto px-4 lg:px-8">
				<div class="flex justify-between items-center h-20">
					<!-- Logo / Brand -->
					<a href="/" class="flex items-center gap-3 group">
						<div class="flex items-center gap-2">
							<!-- Logo Desa -->
							<img
								src="/img/logo.png"
								alt="Logo Desa Sopaah"
								class="h-12 w-auto object-contain transition-transform group-hover:scale-105"
							/>
							<!-- Logo KKN -->
							<img
								src="/img/logo-kkn.png"
								alt="Logo KKN Kelompok 14"
								class="h-16 w-auto object-contain transition-transform group-hover:scale-105 -ml-1.5"
							/>
						</div>
						<div class="flex flex-col">
							<span class="text-xl font-extrabold tracking-tight text-green-900 leading-tight">
								Desa Sopaah
							</span>
							<span
								class="text-xs font-bold text-green-700 uppercase tracking-wider leading-tight"
							>
								Kec. Pademawu, Kab. Pamekasan
							</span>
						</div>
					</a>

					<!-- Desktop Menu -->
					<div
						class="hidden md:flex space-x-6 lg:space-x-8 items-center font-bold text-sm lg:text-base drop-shadow-sm"
					>
						<a
							href="/"
							class="transition-all duration-300 {$page.url.pathname === '/'
								? 'text-white underline underline-offset-8 decoration-white decoration-2'
								: 'text-green-50 hover:text-white hover:-translate-y-0.5'}"
						>
							Beranda
						</a>
						<a
							href="/profil"
							class="transition-all duration-300 {$page.url.pathname === '/profil'
								? 'text-white underline underline-offset-8 decoration-white decoration-2'
								: 'text-green-50 hover:text-white hover:-translate-y-0.5'}"
						>
							Profil Desa
						</a>
						<a
							href="/data-desa"
							class="transition-all duration-300 {$page.url.pathname === '/data-desa'
								? 'text-white underline underline-offset-8 decoration-white decoration-2'
								: 'text-green-50 hover:text-white hover:-translate-y-0.5'}"
						>
							Data Desa
						</a>

						<!-- Lembaga Dropdown -->
						<div class="relative group py-2">
							<button
								class="flex items-center transition-all duration-300 {$page.url.pathname.startsWith(
									'/lembaga'
								)
									? 'text-white underline underline-offset-8 decoration-white decoration-2'
									: 'text-green-50 hover:text-white hover:-translate-y-0.5'}"
							>
								Lembaga <svg
									class="w-4 h-4 ml-1 transition-transform group-hover:rotate-180 duration-300"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg
								>
							</button>
							<!-- Hover Bridge Container -->
							<div class="absolute left-0 top-full pt-2 w-48 hidden group-hover:block transition-all duration-300 origin-top-left">
								<div
									class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden text-gray-700 font-medium"
								>
									<a
										href="/lembaga/pkk"
										class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors"
										>PKK</a
									>
									<a
										href="/lembaga/tk-pkk"
										class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors"
										>TK PKK</a
									>
								</div>
							</div>
						</div>

						<!-- Informasi Dropdown -->
						<div class="relative group py-2">
							<button
								class="flex items-center transition-all duration-300 {$page.url.pathname.startsWith(
									'/informasi'
								)
									? 'text-white underline underline-offset-8 decoration-white decoration-2'
									: 'text-green-50 hover:text-white hover:-translate-y-0.5'}"
							>
								Informasi <svg
									class="w-4 h-4 ml-1 transition-transform group-hover:rotate-180 duration-300"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg
								>
							</button>
							<!-- Hover Bridge Container -->
							<div class="absolute left-0 top-full pt-2 w-56 hidden group-hover:block transition-all duration-300 origin-top-left">
								<div
									class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden text-gray-700 font-medium"
								>
									<a
										href="/informasi/berita"
										class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors"
										>Berita & Pengumuman</a
									>
									<a
										href="/informasi/umkm"
										class="block px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors"
										>UMKM</a
									>
								</div>
							</div>
						</div>

						<a
							href="/layanan-surat"
							class="px-6 py-2.5 bg-green-700 text-white hover:bg-green-600 rounded-full transition-all duration-300 shadow-md hover:shadow-lg font-extrabold transform hover:-translate-y-1 border border-green-600"
						>
							Layanan Surat
						</a>
					</div>

					<!-- Mobile menu button -->
					<div class="md:hidden flex items-center">
						<button
							onclick={toggleMenu}
							class="outline-none mobile-menu-button text-white hover:text-green-200"
						>
							<svg
								class="w-7 h-7"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path d="M4 6h16M4 12h16M4 18h16"></path>
							</svg>
						</button>
					</div>
				</div>
			</div>

			<!-- Mobile Menu -->
			{#if isMenuOpen}
				<div class="md:hidden bg-gradient-to-b from-green-900 to-green-800 border-t border-green-700 shadow-2xl">
					<ul class="flex flex-col px-4 pt-4 pb-8 space-y-4 font-bold">
						<li>
							<a
								href="/"
								onclick={() => isMenuOpen = false}
								class="block py-2 transition-colors {$page.url.pathname === '/'
									? 'text-white underline underline-offset-4 decoration-2'
									: 'text-green-100 hover:text-white'}">Beranda</a
							>
						</li>
						<li>
							<a
								href="/profil"
								onclick={() => isMenuOpen = false}
								class="block py-2 transition-colors {$page.url.pathname === '/profil'
									? 'text-white underline underline-offset-4 decoration-2'
									: 'text-green-100 hover:text-white'}">Profil Desa</a
							>
						</li>
						<li>
							<a
								href="/data-desa"
								onclick={() => isMenuOpen = false}
								class="block py-2 transition-colors {$page.url.pathname === '/data-desa'
									? 'text-white underline underline-offset-4 decoration-2'
									: 'text-green-100 hover:text-white'}">Data Desa</a
							>
						</li>

						<li class="border-t border-green-700/50 pt-2">
							<div class="py-2 text-white font-extrabold text-sm uppercase tracking-wider">Lembaga</div>
							<ul class="pl-4 space-y-3 mt-1 font-medium text-green-100">
								<li><a href="/lembaga/pkk" onclick={() => isMenuOpen = false} class="block hover:text-white transition-colors">PKK</a></li>
								<li><a href="/lembaga/tk-pkk" onclick={() => isMenuOpen = false} class="block hover:text-white transition-colors">TK PKK</a></li>
							</ul>
						</li>

						<li class="border-t border-green-700/50 pt-2">
							<div class="py-2 text-white font-extrabold text-sm uppercase tracking-wider">Informasi</div>
							<ul class="pl-4 space-y-3 mt-1 font-medium text-green-100">
								<li>
									<a href="/informasi/berita" onclick={() => isMenuOpen = false} class="block hover:text-white transition-colors"
										>Berita & Pengumuman</a
									>
								</li>
								<li><a href="/informasi/umkm" onclick={() => isMenuOpen = false} class="block hover:text-white transition-colors">UMKM</a></li>
							</ul>
						</li>

						<li class="pt-4">
							<a
								href="/layanan-surat"
								onclick={() => isMenuOpen = false}
								class="block py-3 mt-2 bg-green-700 text-white text-center rounded-xl hover:bg-green-600 transition-all font-extrabold shadow-md border border-green-600"
								>Layanan Surat</a
							>
						</li>
					</ul>
				</div>
			{/if}
		</nav>

		<!-- Main Content -->
		<main class="flex-grow pt-16">
			{@render children()}
		</main>

		<!-- Footer -->
		<footer class="bg-gray-50 border-t border-gray-200 text-gray-600 py-8 text-sm">
			<div class="container mx-auto px-4 text-center">
				<p class="mb-0">
					&copy; {new Date().getFullYear()} Website Desa Sopaah - Program Kerja KKN Universitas Madura
				</p>
			</div>
		</footer>

			<!-- Floating Right-Side Widgets (Sosmed + Pengaduan) -->
		<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

			<!-- Social Media Expanded Icons (appear above sosmed button when open) -->
			{#if isSosmedOpen}
				<div class="flex flex-col gap-3 animate-fade-in-up">
					{#if data.sosialMedia?.youtube}
						<a
							href={data.sosialMedia.youtube}
							target="_blank"
							rel="noopener noreferrer"
							class="group relative flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-110 transition-all duration-300"
							aria-label="YouTube"
							style="animation-delay: 0ms"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path fill-rule="evenodd" d="M21.582 6.186a2.586 2.586 0 00-1.816-1.825C18.163 3.93 12 3.93 12 3.93s-6.163 0-7.766.431a2.587 2.587 0 00-1.816 1.825c-.43 1.614-.43 4.98-.43 4.98s0 3.366.43 4.98a2.586 2.586 0 001.816 1.825C7.837 20.07 14 20.07 14 20.07s6.163 0 7.766-.43a2.587 2.587 0 001.816-1.826c.43-1.614.43-4.98.43-4.98s0-3.366-.43-4.98zM10 15V9l5.2 3-5.2 3z" clip-rule="evenodd" />
							</svg>
							<!-- Tooltip -->
							<span class="absolute right-full mr-3 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
								YouTube
								<span class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></span>
							</span>
						</a>
					{/if}
					{#if data.sosialMedia?.facebook}
						<a
							href={data.sosialMedia.facebook}
							target="_blank"
							rel="noopener noreferrer"
							class="group relative flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-110 transition-all duration-300"
							aria-label="Facebook"
							style="animation-delay: 50ms"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
							</svg>
							<span class="absolute right-full mr-3 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
								Facebook
								<span class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></span>
							</span>
						</a>
					{/if}
					{#if data.sosialMedia?.tiktok}
						<a
							href={data.sosialMedia.tiktok}
							target="_blank"
							rel="noopener noreferrer"
							class="group relative flex items-center justify-center w-12 h-12 rounded-full bg-black text-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-110 transition-all duration-300"
							aria-label="TikTok"
							style="animation-delay: 100ms"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
							</svg>
							<span class="absolute right-full mr-3 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
								TikTok
								<span class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></span>
							</span>
						</a>
					{/if}
					{#if data.sosialMedia?.instagram}
						<a
							href={data.sosialMedia.instagram}
							target="_blank"
							rel="noopener noreferrer"
							class="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-110 transition-all duration-300"
							aria-label="Instagram"
							style="animation-delay: 150ms"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
							</svg>
							<span class="absolute right-full mr-3 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
								Instagram
								<span class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></span>
							</span>
						</a>
					{/if}
				</div>
			{/if}

			<!-- Sosmed FAB Button -->
			<button
				onclick={() => isSosmedOpen = !isSosmedOpen}
				class="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
				aria-label="Sosial Media Desa"
			>
				<!-- Pulse ring -->
				{#if !isSosmedOpen}
					<span class="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-40 animate-ig-ping"></span>
				{/if}
				
				{#if isSosmedOpen}
					<svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
				{:else}
					<!-- Globe/Social icon -->
					<svg class="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
				{/if}

				<!-- Tooltip -->
				{#if !isSosmedOpen}
					<span class="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
						Sosial Media
						<span class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></span>
					</span>
				{/if}
			</button>

			<!-- Chat Widget Pengaduan (popup) -->
			{#if isChatWidgetOpen}
				<div class="bg-white rounded-2xl shadow-2xl w-[320px] sm:w-[350px] overflow-hidden mb-4 border border-gray-100 transition-all duration-300 origin-bottom-right absolute bottom-16 right-0">
					<div class="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white flex justify-between items-center relative">
						<div class="flex items-center gap-2 relative z-10">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
							<h3 class="font-bold text-sm">Pengaduan & Aspirasi</h3>
						</div>
						<button class="text-green-100 hover:text-white transition-colors relative z-10" onclick={() => isChatWidgetOpen = false}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
						</button>
						<div class="absolute right-0 top-0 w-16 h-16 bg-white/10 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2"></div>
					</div>

					<div class="p-4 bg-gray-50 max-h-[400px] overflow-y-auto">
						{#if chatWidgetStatus === 'success'}
							<div class="text-center py-8">
								<div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
									<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
								</div>
								<h4 class="font-bold text-green-800 text-sm mb-1">Pesan Terkirim!</h4>
								<p class="text-xs text-gray-500">Terima kasih atas laporan Anda. Akan segera diproses oleh Admin.</p>
							</div>
						{:else}
							<form onsubmit={submitChatWidget} class="space-y-3">
								<div class="bg-green-50/50 p-3 rounded-lg border border-green-100 mb-2">
									<p class="text-xs text-green-800 leading-relaxed text-center">Silakan tuliskan laporan atau aspirasi Anda di sini. Pesan Anda rahasia dan hanya dapat dibaca oleh Admin Desa.</p>
								</div>
								{#if chatWidgetError}
									<p class="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100">{chatWidgetError}</p>
								{/if}
								<div>
									<input type="text" bind:value={chatWidgetNama} required class="w-full text-sm px-3 py-2 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500" placeholder="Nama Anda *" />
								</div>
								<div>
									<textarea bind:value={chatWidgetPesan} required rows="3" class="w-full text-sm px-3 py-2 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500" placeholder="Tuliskan isi laporan/aspirasi... *"></textarea>
								</div>
								<button type="submit" disabled={chatWidgetStatus === 'loading'} class="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 shadow-md">
									{#if chatWidgetStatus === 'loading'}
										<div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
										Mengirim...
									{:else}
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
										Kirim Pesan
									{/if}
								</button>
							</form>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Pengaduan FAB Button -->
			<button
				onclick={() => isChatWidgetOpen = !isChatWidgetOpen}
				class="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
				aria-label="Pengaduan"
			>
				{#if isChatWidgetOpen}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
				{:else}
					<svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
				{/if}

				<!-- Tooltip -->
				{#if !isChatWidgetOpen}
					<span class="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
						Pengaduan
						<span class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></span>
					</span>
				{/if}
			</button>
		</div>
	</div>
{/if}

<!-- Global Loading Indicator -->
{#if $navigating}
	<div class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm transition-all duration-300">
		<div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 shadow-lg"></div>
		<p class="mt-4 font-bold text-green-700 animate-pulse">Memuat halaman...</p>
	</div>
{/if}
