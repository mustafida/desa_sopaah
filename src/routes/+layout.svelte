<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';

	let { children } = $props();
	
	let isMenuOpen = $state(false);
	
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="flex flex-col min-h-screen font-['Inter']">
	<!-- Navbar -->
	<nav class="bg-green-600 text-white shadow-md fixed w-full z-50">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="flex justify-between items-center h-20">
				<!-- Logo / Brand -->
				<a href="/" class="flex items-center gap-3 group">
					<!-- Pastikan gambar logo disimpan di static/img/logo.png -->
					<img src="/img/logo.png" alt="Logo" class="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
					<div class="flex flex-col">
						<span class="text-xl font-bold tracking-tight text-white leading-tight">
							Desa Sopaah
						</span>
						<span class="text-xs font-semibold text-green-100 uppercase tracking-wider leading-tight">
							Kabupaten Pamekasan
						</span>
					</div>
				</a>
				
				<!-- Desktop Menu -->
				<div class="hidden md:flex space-x-6 lg:space-x-8 items-center font-bold text-sm lg:text-base">
					<a href="/" class="transition-colors {$page.url.pathname === '/' ? 'text-white underline underline-offset-4 decoration-2' : 'text-green-100 hover:text-white'}">Beranda</a>
					<a href="/profil" class="transition-colors {$page.url.pathname === '/profil' ? 'text-white underline underline-offset-4 decoration-2' : 'text-green-100 hover:text-white'}">Profil Desa</a>
					
					<!-- Lembaga Dropdown -->
					<div class="relative group py-2">
						<button class="flex items-center transition-colors {$page.url.pathname.startsWith('/lembaga') ? 'text-white underline underline-offset-4 decoration-2' : 'text-green-100 hover:text-white'}">
							Lembaga <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
						</button>
						<!-- Hover Bridge Container -->
						<div class="absolute left-0 top-full pt-1 w-48 hidden group-hover:block">
							<div class="bg-white rounded-md shadow-lg py-2 border border-gray-100 text-gray-700 font-medium">
								<a href="/lembaga/karang-taruna" class="block px-4 py-2 hover:bg-green-50 hover:text-green-700">Karang Taruna</a>
								<a href="/lembaga/pkk" class="block px-4 py-2 hover:bg-green-50 hover:text-green-700">PKK</a>
							</div>
						</div>
					</div>

					<!-- Informasi Dropdown -->
					<div class="relative group py-2">
						<button class="flex items-center transition-colors {$page.url.pathname.startsWith('/informasi') ? 'text-white underline underline-offset-4 decoration-2' : 'text-green-100 hover:text-white'}">
							Informasi <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
						</button>
						<!-- Hover Bridge Container -->
						<div class="absolute left-0 top-full pt-1 w-48 hidden group-hover:block">
							<div class="bg-white rounded-md shadow-lg py-2 border border-gray-100 text-gray-700 font-medium">
								<a href="/informasi/berita" class="block px-4 py-2 hover:bg-green-50 hover:text-green-700">Berita & Pengumuman</a>
								<a href="/informasi/galeri" class="block px-4 py-2 hover:bg-green-50 hover:text-green-700">Galeri</a>
							</div>
						</div>
					</div>

					<a href="/data-desa" class="transition-colors {$page.url.pathname === '/data-desa' ? 'text-white underline underline-offset-4 decoration-2' : 'text-green-100 hover:text-white'}">Data Desa</a>
					
					<a href="/layanan-surat" class="px-5 py-2 bg-white text-green-700 hover:bg-green-50 rounded-full transition-all shadow-sm hover:shadow-md text-sm font-bold transform hover:-translate-y-0.5">Layanan Surat</a>
				</div>

				<!-- Mobile menu button -->
				<div class="md:hidden flex items-center">
					<button onclick={toggleMenu} class="outline-none mobile-menu-button text-white hover:text-green-200">
						<svg class="w-7 h-7" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
		
		<!-- Mobile Menu -->
		{#if isMenuOpen}
			<div class="md:hidden bg-green-700 border-t border-green-600 shadow-lg">
				<ul class="flex flex-col px-4 pt-2 pb-6 space-y-3 font-bold">
					<li><a href="/" class="block py-2 transition-colors {$page.url.pathname === '/' ? 'text-white underline underline-offset-4 decoration-2' : 'text-green-100 hover:text-white'}">Beranda</a></li>
					<li><a href="/profil" class="block py-2 transition-colors {$page.url.pathname === '/profil' ? 'text-white underline underline-offset-4 decoration-2' : 'text-green-100 hover:text-white'}">Profil Desa</a></li>
					
					<li><div class="py-2 text-white">Lembaga</div>
						<ul class="pl-4 space-y-2 font-medium text-sm text-green-100">
							<li><a href="/lembaga/karang-taruna" class="block py-1 hover:text-white">Karang Taruna</a></li>
							<li><a href="/lembaga/pkk" class="block py-1 hover:text-white">PKK</a></li>
						</ul>
					</li>

					<li><div class="py-2 text-white">Informasi</div>
						<ul class="pl-4 space-y-2 font-medium text-sm text-green-100">
							<li><a href="/informasi/berita" class="block py-1 hover:text-white">Berita & Pengumuman</a></li>
							<li><a href="/informasi/galeri" class="block py-1 hover:text-white">Galeri</a></li>
						</ul>
					</li>

					<li><a href="/data-desa" class="block py-2 transition-colors {$page.url.pathname === '/data-desa' ? 'text-white underline underline-offset-4 decoration-2' : 'text-green-100 hover:text-white'}">Data Desa</a></li>
					
					<li><a href="/layanan-surat" class="block py-3 mt-2 bg-white text-green-700 text-center rounded-md hover:bg-green-50 transition-colors">Layanan Surat</a></li>
				</ul>
			</div>
		{/if}
	</nav>

	<!-- Main Content -->
	<main class="flex-grow pt-16">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-gray-50 border-t border-gray-200 text-gray-600 py-6 text-center text-sm">
		<div class="container mx-auto px-4">
			<p>&copy; {new Date().getFullYear()} Website Desa Sopaah - Program Kerja KKN Universitas Madura</p>
		</div>
	</footer>
</div>
