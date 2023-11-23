<script>
  import { onMount } from "svelte";
  import { _tileStore } from "../store";
  import Tile from "./Tile.svelte";

  export let editable = false;

  function addTile() {
    _tileStore.addTile({
        foregroundColor: "",
        backgroundColor: "",
        tags: [""],
        glyph: ""
    })
  }
</script>



<div class="tile-panel">
    <div class="tile-add">
        <button class="button is-icon" on:click={addTile}><i class="fa fa-plus"></i></button>
    </div>
    {#each $_tileStore as tile, index}
    <div class="tile">
        <Tile bind:tile></Tile>
    </div>
    {/each}
</div>

<style>
    .tile-panel {
        display: flex;
        flex-direction: row;
        overflow-y: scroll;
        align-items: center;
        padding: 1rem 1rem 0 1rem;
    }
    .tile {
        border: var(--border-thickness) solid var(--border-color);
    }

    .tile-add {
        display: flex;
        margin-left: 1rem;
        height: 3.5rem;
    }
</style>