<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { colorList } from '$lib/utils/colorList';
	import L from 'leaflet';

	let mapElement: HTMLDivElement | null = null;
	let map: L.Map | null = null;

	function getIcon(i: number) {
		return L.divIcon({
			className: 'custom-div-icon',
			html: `<svg class="${colorList[i]}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
</svg>
`,
			// iconSize: [30, 42],
			iconAnchor: [20, 40]
		});
	}

	export let markerCoords: Array<[number, number]> | null;
	export let activePins: Array<number>;
	let myMarkers: Array<L.Marker> | null = null;

	$: if (markerCoords && map) {
		if (myMarkers) {
			myMarkers.forEach((marker) => marker.remove());
		}

		myMarkers = markerCoords.map((coords, i) => L.marker(coords, { icon: getIcon(i) }));
	}

	$: if (activePins && map) {
		if (myMarkers) {
			myMarkers.forEach((marker, i) => {
				if (activePins.includes(i)) {
					marker.addTo(map!);
				} else {
					marker.remove();
				}
			});
		}
	}

	onMount(async () => {
		if (browser && mapElement) {
			map = L.map(mapElement).setView([0, 0], 2);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			// myMarker = leaflet.marker([51.5, -0.09]);
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
