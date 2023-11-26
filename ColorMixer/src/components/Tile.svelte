<script>
    import { _currentViewedTileId } from "../store";
    import ColorPicker from "./ColorPicker.svelte";
    import TextField from "./TextField.svelte";

    export let tile;
    
</script>

<div class="tile" on:click={() => $_currentViewedTileId = tile.id} class:active={$_currentViewedTileId === tile.id}>
    <ColorPicker bind:color={tile.foregroundColor} {tile} foreground label="Foreground Color"></ColorPicker>
    <ColorPicker bind:color={tile.backgroundColor} {tile} label="Background Color"></ColorPicker>
    <TextField label="Glyph" id="glyph" bind:value={tile.glyph}></TextField>
</div>
<style>
    :global(.tile:not(:first-of-type)) {
        margin-left: 1rem;
    }

    .tile {
        border: var(--border-thickness) solid var(--border-color);
        padding: var(--input-padding);
    }

    .tile.active {
        border-color: var(--brand-color);
    }
</style>