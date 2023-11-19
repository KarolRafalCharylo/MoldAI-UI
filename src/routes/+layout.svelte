<script lang="ts">
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Logo from '$lib/components/Logo.svelte';
	import AppBarActions from '$lib/components/AppBarActions.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppBar>
	<svelte:fragment slot="lead"><Logo /></svelte:fragment>
	<svelte:fragment slot="trail"><AppBarActions /></svelte:fragment>
	<svelte:fragment slot="headline"><h1 class="h1">Locus</h1></svelte:fragment>
</AppBar>

<slot />
