<script context="module" lang="ts">
	export interface Prediction {
		cell: string;
		lat: number;
		lon: number;
		prob: number;
	}
</script>

<script lang="ts">
	import { MapPinAltSolid } from 'flowbite-svelte-icons';
	import { colorList } from '$lib/utils/colorList';
	import { onMount } from 'svelte';
	import haversine from 'haversine';

	export let predictions: Prediction[] | null;
	export let activePins: Array<number>;

	interface Marker {
		city: string;
		lat: number;
		lon: number;
	}

	let cities: Marker[] = [];

	$: top10 = predictions
		? predictions.slice(0, 10).map((p, i) => ({ ...p, index: i, active: activePins.includes(i) }))
		: [];

	onMount(async () => {
		try {
			const response = await fetch(`/worldcities.csv`);
			const csvData = await response.text();
			cities = parseCSV(csvData);
			console.log(cities);
		} catch (error) {
			console.error('Error fetching or parsing CSV:', error);
		}
	});

	function parseCSV(csvData: string): Marker[] {
		const lines = csvData.split('\n');
		const headers = lines[0].split(',').map((header) => header.replace(/"/g, '')); // Remove double quotes from headers
		const parsedData: Marker[] = [];

		for (let i = 1; i < lines.length; i++) {
			const line = lines[i].split(',');
			const entry: Marker = { city: '', lat: 0, lon: 0 };

			for (let j = 0; j < headers.length; j++) {
				if (headers[j] === 'city') {
					entry.city = line[j].replace(/"/g, '');
				}
				if (headers[j] === 'lat') {
					entry.lat = parseFloat(line[j].replace(/"/g, ''));
				}
				if (headers[j] === 'lng') {
					entry.lon = parseFloat(line[j].replace(/"/g, ''));
				}
			}

			parsedData.push(entry);
		}

		return parsedData;
	}

	function closestCity(
		lat: number,
		lon: number
	): { city: string; distance: number; coords: [number, number] } {
		let closestCity = '';
		let closestDistance = Infinity;
		let closestCityCoords: [number, number] = [0, 0];

		for (const city of cities) {
			const cityCoords = {
				latitude: city.lat,
				longitude: city.lon
			};

			const myCoords = {
				latitude: lat,
				longitude: lon
			};
			const distance = haversine(cityCoords, myCoords, { unit: 'km' });
			if (distance < closestDistance) {
				closestDistance = distance;
				closestCity = city.city;
				closestCityCoords = [city.lat, city.lon];
			}
		}

		return { city: closestCity, distance: closestDistance, coords: closestCityCoords };
	}

	function getDirection(start: [number, number], end: [number, number]): string {
		const [fromX, fromY] = start;
		const [toX, toY] = end;

		const deltaX = toX - fromX;
		const deltaY = toY - fromY;

		const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

		if (angle >= -22.5 && angle < 22.5) {
			return 'South';
		} else if (angle >= 22.5 && angle < 67.5) {
			return 'South West';
		} else if (angle >= 67.5 && angle < 112.5) {
			return 'West';
		} else if (angle >= 112.5 && angle < 157.5) {
			return 'North West';
		} else if (angle >= 157.5 || angle < -157.5) {
			return 'North';
		} else if (angle >= -157.5 && angle < -112.5) {
			return 'North East';
		} else if (angle >= -112.5 && angle < -67.5) {
			return 'East';
		} else if (angle >= -67.5 && angle < -22.5) {
			return 'South East';
		} else {
			return 'Missing direction';
		}
	}

	function formatLocation(lat: number, lon: number) {
		const { city, distance, coords } = closestCity(lat, lon);
		const direction = getDirection([lat, lon], coords);

		return `${distance.toFixed(2)} km ${direction} of ${city}`;
	}

	function formatProb(prob: number) {
		return `${(prob * 100).toFixed(2)}%`;
	}

	function badgeColor(prob: number) {
		if (prob < 0.05) {
			return 'variant-soft-surface';
		} else if (prob < 0.7) {
			return 'variant-soft-warning';
		} else {
			return 'variant-soft-primary';
		}
	}

	function handleClick(index: number) {
		if (activePins.includes(index)) {
			activePins = activePins.filter((i) => i !== index);
		} else {
			activePins = [...activePins, index];
		}
	}
</script>

<div class="table-container text-token">
	<table class="table table-hover">
		<thead>
			<tr>
				<th></th>
				<th>Prediction</th>
				<th>Latitude</th>
				<th>Longitude</th>
				<th>Probability</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each top10 as row}
				<tr on:click={() => handleClick(row.index)} class="cursor-pointer">
					<td>{row.index + 1}</td>
					<td>{formatLocation(row.lat, row.lon)}</td>
					<td>{row.lat}</td>
					<td>{row.lon}</td>
					<td><span class={`badge ${badgeColor(row.prob)}`}>{formatProb(row.prob)}</span></td>
					<td>
						{#if row.active}
							<MapPinAltSolid class={colorList[row.index]} />
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
