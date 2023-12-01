<script>
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


{JSON.stringify($_tileStore)}
<div class="tile-panel">
    <div class="tile-add">
        <button class="button is-icon" on:click={addTile}><i class="fa fa-plus"></i></button>
    </div>
    {#each $_tileStore as tile}
        <Tile bind:tile></Tile>
    {/each}
</div>

<style>
    .tile-panel {
        display: flex;
        flex-direction: row;
        overflow-y: scroll;
        align-items: center;
        padding: 1rem;
        position: relative;
    }

    .tile-add {
        display: flex;
        margin-left: 1rem;
        height: 3.5rem;
    }
</style>