<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { UploadSolid, FileImageSolid } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	let containerElement: HTMLDivElement | null = null;
	let bgElement: HTMLDivElement | null = null;

	const dispatch = createEventDispatcher();

	let files: FileList;
	$: noFileSelected = !files || files.length === 0;

	function computeBackground() {
		if (!noFileSelected) {
			const file = files[0];
			if (file && file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = () => {
					const imageUrl = reader.result;

					if (bgElement) bgElement.style.backgroundImage = `url(${imageUrl})`;

					const img = new Image();
					img.onload = () => {
						// Calculate aspect ratio
						const aspectRatio = img.naturalWidth / img.naturalHeight;

						if (bgElement && containerElement) {
							const max_h = 800;
							const max_w = containerElement.clientWidth;

							bgElement.style.height = ''; // Clear height
							bgElement.style.width = ''; // Clear height
							let new_height = containerElement.clientWidth / aspectRatio;

							if (new_height > max_h) {
								bgElement.style.height = `${max_h}px`;
								bgElement.style.width = `${max_h * aspectRatio}px`;
							} else {
								bgElement.style.height = `${new_height}px`;
								bgElement.style.width = `${containerElement.clientWidth}px`;
							}
						}
					};
					img.src = reader.result as string;
				};
				reader.readAsDataURL(file);
			}
		} else {
			if (document) {
				let imgDropzone = document.getElementById('img-dropzone');
				if (imgDropzone) {
					imgDropzone.style.backgroundImage = '';
					imgDropzone.style.height = ''; // Clear height
					imgDropzone.style.width = ''; // Clear height
				}
			}
		}
	}

	function onChangeHandler(e: Event): void {
		computeBackground();

		// Create a new FormData object
		const formData = new FormData();

		// Append the file to the FormData object
		formData.append('img', files[0]);

		const response1 = fetch(`${process.env.API_URL}/predict`, {
			method: 'POST',
			body: formData
		})
			.then((response) => response.json())
			.then((data) => {
				dispatch('prediction', data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
</script>

<div
	bind:this={containerElement}
	class="flex justify-center max-h-[800px] h-fit max-w-[100%] overflow-hidden"
>
	<div
		bind:this={bgElement}
		class="bg-cover bg-center rounded-lg w-full transition-all max-w- max-h-[800px] overflow-hidden"
	>
		<FileDropzone
			name="files"
			on:change={onChangeHandler}
			bind:files
			id="test"
			padding={noFileSelected ? 'p-24' : 'p-24 !bg-white/[0] h-full hover:backdrop-blur-sm'}
			regionInterface={noFileSelected
				? 'p-8'
				: 'p-8 bg-black/[0.5] backdrop-blur-xl rounded-md drop-shadow-lg'}
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
					Only <code class="code">.jpg</code> files are supported - support for more files coming soon(ish)!</small
				>
			</svelte:fragment>
		</FileDropzone>
	</div>
</div>
