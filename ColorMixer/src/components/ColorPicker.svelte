<script>
  import { _pickingColor } from "../store";
  import TextField from "./TextField.svelte";

    export let color;
    export let label = "";


    function pick() {
        $_pickingColor = !$_pickingColor;
    }
</script>
<div class="color-picker">
    <div class="color-picker__input" class:picking={$_pickingColor}>
        <TextField bind:value={color} {label} id="{color.color}" />
    </div>
    <div class="color-picker__button">
        <button on:click={pick}>
            <i class="fa fa-eyedropper"></i>
        </button>
    </div>
</div>

<style>
    .color-picker {
        padding: var(--input-padding);
        display: flex;
        flex-direction: row;
    }

    .color-picker__button {
        
    }

    .color-picker__button > button {
        font-size: 1rem;
        border-radius: var(--border-radius);
        border: none;
        outline: none;
        padding: 0.5rem;
        box-sizing: border-box;
    }
</style>