<script lang="ts">
	import MyMap from '$lib/components/MyMap/MyMap.svelte';
	import FileUpload from '$lib/components/FileUpload/FileUpload.svelte';
	import { cellCenter } from '$lib/utils/cellUtils';
	import PredList from '$lib/components/PredList/PredList.svelte';
	import type { Prediction } from '$lib/components/PredList/PredList.svelte';

	let predictions: Prediction[] | null = null;

	let activePins: Array<number> = [];
	$: markerCoords = predictions
		? (predictions.slice(0, 10).map((p) => [p.lat, p.lon]) as Array<[number, number]>)
		: null;

	function handlePrediction(event: { detail: Array<[string, number]> }) {
		const a = event.detail;
		a.sort((a, b) => b[1] - a[1]);

		predictions = a.map((p) => {
			const [cell, prob] = p;
			const [lat, lon] = cellCenter(cell);
			return { cell, lat, lon, prob };
		});
		activePins = [0, 1, 2];
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center my-8">
	<div class="space-y-5 mt-4 mx-2">
		<h2 class="h2">Welcome to Locus!</h2>
		<p>
			<b>
				The LOCUS project (LOCalisation of Unidentified imageS) aims to offer a practical and
				accessible solution for predicting the location of where an image on Earth was captured.
			</b>
		</p>

		<p class="text-center">Drop an image below to get started!</p>
		<FileUpload on:prediction={handlePrediction} />
		<MyMap {markerCoords} {activePins} />
		<PredList {predictions} bind:activePins />
	</div>
</div>
