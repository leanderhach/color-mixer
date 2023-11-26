<script>
  import { _pickedColor, _pickingColor, _pickingTileField, _tileStore } from "../store";
  import TextField from "./TextField.svelte";

    export let color;
    export let tile;
    export let label = "";
    export let foreground = false;

    _pickedColor.subscribe(value => {
        if(value && tile && $_pickingTileField.id === tile.id) {
            if($_pickingTileField.field === "foregroundColor") {
                _tileStore.changeForeground(tile.id, value)
            } else if($_pickingTileField.field === "backgroundColor") {
                _tileStore.changeBackground(tile.id, value)
            }

            $_pickingColor = false;
            $_pickingTileField = {id: "", field: ""};
        }
    })


    function pick() {
        $_pickingColor = !$_pickingColor;
        $_pickingTileField = {id: tile.id, field: foreground ? "foregroundColor" : "backgroundColor"};
    }
</script>
<div class="color-picker" class:picking={$_pickingColor && $_pickingTileField.id === tile.id && $_pickingTileField.field === (foreground ? "foregroundColor" : "backgroundColor")}>
    <div class="color-picker__input" class:picking={$_pickingColor}>
        <TextField editable={false} bind:value={color.name} {label} id="{color.color}" />
    </div>
    <div class="color-picker__button">
        <button on:click={pick}>
            <i class="fa fa-eyedropper"></i>
        </button>
    </div>
</div>

<style>
    .color-picker {
        display: flex;
        flex-direction: row;
    }

    .color-picker__button > button {
        border-radius: var(--border-radius);
        outline: none;
        padding: 0.5rem;
        box-sizing: border-box;
        margin-top: 1.45rem;
        border: var(--border-thickness) solid var(--border-color);
        font-size: 0.85rem;
    }

    .color-picker__input > input {
        border-right: none;
    }

    .color-picker.picking button{
        background-color: var(--brand-color);
        color: white;
    }
</style>