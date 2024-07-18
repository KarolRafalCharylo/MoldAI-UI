<script lang="ts">
	import FileUpload from '$lib/components/FileUpload/FileUpload.svelte';
	import { cellCenter } from '$lib/utils/cellUtils';
	import PredList from '$lib/components/PredList/PredList.svelte';
	import type { Prediction } from '$lib/components/PredList/PredList.svelte';

	let predictions: Prediction[] | null = null;

	function handlePrediction(event: { detail: Array<{class_name: string, probability: number}> }) {
		const a = event.detail;

	function splitClassName(class_name: string) {
		const [genus, ...speciesParts] = class_name.split('-');
		const species = speciesParts.join('-');
		return { genus, species };
	}

		predictions = a.map((p) => {
			const {class_name, probability} = p;
			const {genus, species} = splitClassName(class_name);
			return { class_name, probability, genus, species };
		});
	}
</script>

<div class="container h-fit mx-auto flex justify-center my-8 max-w-full">
	<div class="space-y-5 mt-2 mx-2 flex flex-col items-center max-w-full px-2">
		<!-- <h2 class="h2">Welcome to Locus!</h2>-->
		<p class="max-w-[300px] sm:max-w-[400px] text-justify">
			
				The <b>MoldAI</b> project aims to assist in fungi classification process conducted 
				at DTU Bioengineering utilizing the Visual Transformers (ViT16). 
				The model outputs top 5 predictions with the respected certainty.
			
		</p> 

		<p class="text-center text-sm"><i>Drop an image below to get started!</i></p>
		<FileUpload on:prediction={handlePrediction} />
		<PredList {predictions}/>
	</div>
</div>
