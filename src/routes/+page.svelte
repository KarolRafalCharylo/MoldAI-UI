<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { UploadSolid, FileImageSolid } from 'flowbite-svelte-icons';

	let files: FileList;
	$: noFileSelected = !files || files.length === 0;
	$: {
		if (!noFileSelected) {
			const file = files[0];
			if (file && file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = () => {
					const imageUrl = reader.result;
					let imgDropzone = document.getElementById('img-dropzone');
					if (imgDropzone) imgDropzone.style.backgroundImage = `url(${imageUrl})`;
				};
				reader.readAsDataURL(file);
			}
		}
	}

	let backgroundImage: string;

	function onChangeHandler(e: Event): void {
		// console.log('file data:', e);
	}
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

		<div id="img-dropzone" class="bg-cover bg-center rounded-lg">
			<FileDropzone
				name="files"
				on:change={onChangeHandler}
				bind:files
				id="test"
				padding={noFileSelected ? 'p-24' : 'p-24 !bg-white/[0] backdrop-blur-sm'}
				regionInterface={noFileSelected ? 'p-8' : 'p-8 bg-black/[0.5] backdrop-blur-xl rounded-md'}
			>
				<svelte:fragment slot="lead">
					{#if noFileSelected}
						<UploadSolid class="w-[48px] h-[48px] text-gray-800 dark:text-white block mx-auto" />
					{:else}
						<FileImageSolid class="w-[48px] h-[48px] text-gray-800 dark:text-white block mx-auto" />
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="message">
					{#if noFileSelected}
						<b>Upload a file</b> or drag and drop
					{:else}
						Predicting location of <code class="code">{files[0].name}</code>
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="meta">
					<small>
						Please only upload <code class="code">.jpg</code> files - support for more files coming soon(ish)!</small
					>
				</svelte:fragment>
			</FileDropzone>
		</div>
		<div class="h-[200px] w-[200px]" id="test" />
	</div>
</div>

<style>
	#test {
		width: 100%;
	}
</style>
