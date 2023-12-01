<script>
    import { _currentViewedTileId, _tileStore } from "../store";
    import ColorPicker from "./ColorPicker.svelte";
    import TextField from "./TextField.svelte";

    export let tile;


    function removeTile() {
        $_currentViewedTileId = null;
        _tileStore.removeTile(tile.id);
    }
    
</script>

<div class="tile" on:click|self={() => $_currentViewedTileId = tile.id} class:active={$_currentViewedTileId === tile.id}>
    <ColorPicker bind:color={tile.foregroundColor} {tile} foreground label="Foreground Color"></ColorPicker>
    <ColorPicker bind:color={tile.backgroundColor} {tile} label="Background Color"></ColorPicker>
    <TextField label="Glyph" id="glyph" bind:value={tile.glyph}></TextField>
    <button class="button is-icon is-inline" on:click={removeTile}>
        <i class="fas fa-trash"></i>
    </button>
</div>
<style>
    :global(.tile:not(:first-of-type)) {
        margin-left: 1rem;
    }

    .tile {
        border: var(--border-thickness) solid var(--border-color);
        padding: var(--input-padding);
        position: relative;
    }

    .tile.active {
        border-color: var(--brand-color);
    }

    .button {
        position: absolute;
        top: 0;
        right: 0;
        color: red !important;
        font-size: 1rem !important;
    }
</style>