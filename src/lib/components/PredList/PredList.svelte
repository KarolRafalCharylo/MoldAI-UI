<script context="module" lang="ts">
	export interface Prediction {
		class_name: string;
		probability: number;
		genus: string;
		species: string;
	}
</script>

<script lang="ts">
	import { MapPinAltSolid } from 'flowbite-svelte-icons';
	import { colorList } from '$lib/utils/colorList';
	import { onMount } from 'svelte';
	import haversine from 'haversine';

	export let predictions: Prediction[] | null;




	$: top10 = predictions
		? predictions.slice(0, 5).map((p, i) => ({ ...p, index: i }))
		: [];

	function formatProb(prob: number) {
		return `${(prob).toFixed(2)}%`;
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

	function splitClassName(class_name: string) {
		const [genus, ...speciesParts] = class_name.split('-');
		const species = speciesParts.join('-');
		return {genus, species};
	}
</script>

<div class="table-container text-token">
	<table class="table table-hover">
		<thead>
			<tr>
				<th></th>
				<th>Genus</th>
				<th>Species</th>
				<th>Probability</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each top10 as row}
				<tr>
					<td>{row.index + 1}</td>
					<td>{row.genus}</td>
					<td>{row.species}</td>					
					<td><span class={`badge ${badgeColor(row.probability)}`}>{formatProb(row.probability)}</span></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
