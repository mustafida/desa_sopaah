<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	let { children, data } = $props();
	let isSidebarOpen = $state(false);

	const menuItems = [
		{ href: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
		{ href: '/admin/berita', label: 'Kelola Berita', icon: 'berita' },
		{ href: '/admin/umkm', label: 'Kelola UMKM', icon: 'umkm' },
		{ href: '/admin/profil-desa', label: 'Profil Desa', icon: 'profil' },
		{ href: '/admin/data-desa', label: 'Data Desa', icon: 'data' },
		{ href: '/admin/lembaga-pkk', label: 'Lembaga PKK', icon: 'lembaga' },
		{ href: '/admin/lembaga-tk-pkk', label: 'Lembaga TK PKK', icon: 'tk' },
		{ href: '/admin/pengaduan', label: 'Pengaduan', icon: 'pengaduan' }
	];
</script>

<!-- Skip the admin layout for login page -->
{#if $page.url.pathname === '/admin/login'}
	{@render children()}
{:else}
	<div class="min-h-screen bg-slate-100 flex">
		<!-- Sidebar Overlay for mobile -->
		{#if isSidebarOpen}
			<div
				class="fixed inset-0 bg-black/50 z-40 lg:hidden"
				onclick={() => (isSidebarOpen = false)}
				onkeydown={(e) => e.key === 'Escape' && (isSidebarOpen = false)}
				role="button"
				tabindex="-1"
			></div>
		{/if}

		<!-- Sidebar -->
		<aside
			class="fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white transform transition-transform duration-300 ease-in-out {isSidebarOpen
				? 'translate-x-0'
				: '-translate-x-full'} lg:translate-x-0 flex flex-col shadow-2xl"
		>
			<!-- Brand -->
			<div class="p-6 border-b border-white/10">
				<div class="flex items-center gap-3">
					<div
						class="w-10 h-10 rounded-xl bg-green-500/20 border border-green-400/30 flex items-center justify-center"
					>
						<svg
							class="w-6 h-6 text-green-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
							></path>
						</svg>
					</div>
					<div>
						<h2 class="font-bold text-lg leading-tight">Admin Panel</h2>
						<p class="text-xs text-slate-400">Desa Sopaah</p>
					</div>
				</div>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 p-4 space-y-1 overflow-y-auto">
				{#each menuItems as item}
					<a
						href={item.href}
						class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 {$page
							.url.pathname === item.href || $page.url.pathname.startsWith(item.href + '/')
							? 'bg-green-500/20 text-green-400 border border-green-500/20'
							: 'text-slate-300 hover:bg-white/5 hover:text-white'}"
					>
						{#if item.icon === 'dashboard'}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
								></path></svg
							>
						{:else if item.icon === 'berita'}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
								></path></svg
							>
						{:else if item.icon === 'umkm'}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
								></path></svg
							>
						{:else if item.icon === 'profil'}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
								></path></svg
							>
						{:else if item.icon === 'data'}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								></path></svg
							>
						{:else if item.icon === 'lembaga'}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								></path></svg
							>
						{:else if item.icon === 'tk'}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 14l9-5-9-5-9 5 9 5z"
								></path><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
								></path><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
								></path></svg>
						{:else if item.icon === 'pengaduan'}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
						{/if}
						<span class="flex-1">{item.label}</span>
						{#if item.icon === 'pengaduan' && data.unreadPengaduanCount > 0}
							<span class="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
								{data.unreadPengaduanCount}
							</span>
						{/if}
					</a>
				{/each}
			</nav>

			<!-- User Section -->
			<div class="p-4 border-t border-white/10">
				<div class="flex items-center gap-3 px-4 py-3">
					<div
						class="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm"
					>
						{data.user?.namaLengkap?.charAt(0) ?? 'A'}
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium text-white truncate">
							{data.user?.namaLengkap ?? 'Admin'}
						</p>
						<p class="text-xs text-slate-400 truncate">@{data.user?.username ?? 'admin'}</p>
					</div>
				</div>
				<form method="POST" action="/admin/logout" use:enhance>
					<button
						type="submit"
						class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all mt-1"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							></path></svg
						>
						Keluar
					</button>
				</form>
			</div>
		</aside>

		<!-- Main Content Area -->
		<div class="flex-1 flex flex-col min-h-screen">
			<!-- Top Bar -->
			<header
				class="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30"
			>
				<button
					onclick={() => (isSidebarOpen = !isSidebarOpen)}
					class="lg:hidden text-slate-600 hover:text-slate-900 transition-colors"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path></svg
					>
				</button>
				<div class="flex-1"></div>
				<a
					href="/"
					target="_blank"
					class="text-sm text-slate-500 hover:text-green-600 transition-colors flex items-center gap-1"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						></path></svg
					>
					Lihat Website
				</a>
			</header>

			<!-- Page Content -->
			<main class="flex-1 p-6 lg:p-8">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
