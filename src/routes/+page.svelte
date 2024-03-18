<script lang="ts">
	import MyMap from '$lib/components/MyMap/MyMap.svelte';
	import FileUpload from '$lib/components/FileUpload/FileUpload.svelte';

	function handlePrediction(event: { detail: any; }) {
		console.log("mypred", event.detail);

        // find cell with highest probability
        let max = 0;
        
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
		<p>Drop an image below to get started!</p>
		<FileUpload on:prediction={handlePrediction} />
		<MyMap />
	</div>
</div>
