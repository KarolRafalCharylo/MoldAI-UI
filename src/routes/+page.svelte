<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { UploadSolid } from 'flowbite-svelte-icons';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5 mt-4">
		<h1 class="h1">Welcome to Locus!</h1>
		<p>
			The LOCUS project (LOCalisation of Unidentified imageS) aims to offer a practical and
			accessible solution for predicting the location of where an image on Earth was captured.
		</p>
		<p>
			This website is your portal to interact with LOCUS. Please keep in mind that both the models
			and this website are under active development.
		</p>
		<p>To get started, upload a file into the dropzone below:</p>

		<FileDropzone name="files">
			<svelte:fragment slot="lead">
				<UploadSolid class="w-[48px] h-[48px] text-gray-800 dark:text-white block mx-auto" />
			</svelte:fragment>
			<svelte:fragment slot="message"><b>Upload a file</b> or drag and drop</svelte:fragment>
			<svelte:fragment slot="meta"
				><small>
					Please upload only <code class="code">.png</code> files - support for more files coming soon(ish)!</small
				></svelte:fragment
			>
		</FileDropzone>
	</div>
</div>
