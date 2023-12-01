<script>
    import { _colorStore, _currentViewedTileId } from "../store";
  import Mosaic from "./Mosaic.svelte";
    import Swatch from "./Swatch.svelte";
</script>


<div class="preview-panel">
    <h2>Preview</h2>
    <div class="preview-panel__swatches">
        {#if $_currentViewedTileId}
            <Swatch tileId={$_currentViewedTileId} />
            <Swatch tileId={$_currentViewedTileId} />
            <Swatch tileId={$_currentViewedTileId} />
            <Swatch tileId={$_currentViewedTileId} />
        {/if}
    </div>
    <div class="preview-panel__mosaic">
        <Mosaic></Mosaic>
    </div>
</div>

<style>
    .preview-panel {
        display: flex;
        flex-direction: column;
        padding-left: 2rem;
        box-sizing: border-box;
    }
    .preview-panel__swatches {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>