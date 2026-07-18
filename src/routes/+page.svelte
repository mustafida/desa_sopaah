<script lang="ts">
	import { onMount } from 'svelte';

	let currentSlide = $state(0);
	const slides = ['/img/slider1.jpg', '/img/slider2.jpg', '/img/slider3.jpg'];

	onMount(() => {
		const interval = setInterval(() => {
			currentSlide = (currentSlide + 1) % slides.length;
		}, 4000);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Desa Sopaah - Beranda</title>
</svelte:head>

<section
	class="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gray-900"
>
	<!-- Background Slider -->
	{#each slides as slide, i}
		<div
			class="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out {i === currentSlide
				? 'opacity-100'
				: 'opacity-0'}"
		>
			<!-- Image with subtle zoom animation -->
			<div
				class="absolute inset-0 bg-cover bg-center animate-zoom"
				style="background-image: url('{slide}');"
			></div>
		</div>
	{/each}

	<!-- Dark Overlay -->
	<div class="absolute inset-0 bg-black/50 z-10"></div>

	<!-- Content -->
	<div class="relative z-20 container mx-auto px-4 text-center text-white">
		<h1 class="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg tracking-tight">
			Selamat Datang di Website Desa Sopaah
		</h1>
		<p class="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md text-gray-200">
			Website ini menjadi media informasi, dokumentasi kegiatan, dan pelayanan surat otomatis untuk
			masyarakat.
		</p>
	</div>
</section>

<style>
	/* Custom animation for the slow zoom effect */
	@keyframes zoom {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(1.1);
		}
	}
	.animate-zoom {
		animation: zoom 20s infinite alternate ease-in-out;
	}
</style>
