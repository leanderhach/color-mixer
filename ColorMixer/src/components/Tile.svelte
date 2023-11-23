<script>
    import ColorPicker from "./ColorPicker.svelte";
import TextField from "./TextField.svelte";

    export let tile;
    
</script>


<div class="tile">
    <ColorPicker bind:color={tile.foregroundColor} label="Foreground Color"></ColorPicker>
    <ColorPicker bind:color={tile.backgroundColor} label="Background Color"></ColorPicker>
</div>
<style>
    :global(.tile:not(:first-of-type)) {
        margin-left: 1rem;
    }
</style>