<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let mapElement: HTMLDivElement | null = null;
	let map: L.Map | null = null;

	export let markerCoords: [number, number] | null;
	let myMarker: L.Marker | null = null;

	$: if (myMarker && markerCoords && map) {
		myMarker.setLatLng(markerCoords);
		myMarker.addTo(map);
	} else {
		if (myMarker) {
			myMarker.remove();
		}
	}

	onMount(async () => {
		if (browser && mapElement) {
			const leaflet = await import('leaflet');

			map = leaflet.map(mapElement).setView([0, 0], 2);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			myMarker = leaflet.marker([51.5, -0.09]);
			// .addTo(map)
			// .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
			// .openPopup();
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<div id="map" class="w-full aspect-[3/1] rounded-lg max-w-[100%]">
	<div bind:this={mapElement} class="rounded-lg" />
</div>

<style>
	@import 'leaflet/dist/leaflet.css';
	div div {
		height: 100%;
	}
</style>
