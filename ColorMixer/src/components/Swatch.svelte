<script>
    import { _tileStore } from "../store";

    export let tileId;

    $: tile = _tileStore.getTile(tileId);

    _tileStore.subscribe(() => {
        tile = _tileStore.getTile(tileId);
    })
</script>

{#if tile.foregroundColor && tile.backgroundColor}
<div class="swatch" style="background-color: {tile.backgroundColor.color};color:{tile.foregroundColor.color};">
    {tile.glyph}
</div>
{/if}


<style>
    .swatch {
        text-align: center;
        line-height:4rem;
        width:4rem;
        height:4rem;
    }
</style>