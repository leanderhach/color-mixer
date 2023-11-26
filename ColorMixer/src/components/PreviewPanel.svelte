<script>
    import { _currentViewedTileId } from "../store";
    import Swatch from "./Swatch.svelte";
</script>


<div class="preview-panel">
    {#if $_currentViewedTileId}
        <Swatch tileId={$_currentViewedTileId} />
        <Swatch tileId={$_currentViewedTileId} />
        <Swatch tileId={$_currentViewedTileId} />
        <Swatch tileId={$_currentViewedTileId} />
    {/if}
</div>