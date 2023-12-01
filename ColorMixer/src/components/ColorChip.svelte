<script>
    import TextField from "./TextField.svelte";
    import ColorModal from "./modals/ColorModal.svelte";
    import { _colorStore, _pickedColor, _pickingColor, _searchMatches } from "../store";

    export let color;
    export let editable = false;

    // optional props for editing color
    export let group = undefined;
    export let subGroup = undefined;

    // if the chip itself is not editable, then it should open the color modal to edit the color in the store
    export let canUpdate = false;
    let editing = false;

    function pick() {
        if($_pickingColor) {
            _pickedColor.set(color);
        }
    }

</script>
{#if (canUpdate && $_searchMatches.length === 0) || editable || (canUpdate && $_searchMatches.length > 0 && $_searchMatches.includes(color.name))}
    <div class="color-chip" class:editable class:picking={$_pickingColor} on:click={pick}>
        {#if !editable}
            <div class="flex--row">
                <div class="color-chip__text">{color.name}</div>
                {#if canUpdate && !$_pickingColor}
                    <div class="inline-actions">
                        <button class="button is-icon is-inline" on:click={()=> canUpdate ? editing = true : editing = editing}>
                            <i class="fa fa-pen"></i>
                        </button>
                        <button class="button is-icon is-inline" on:click={()=> _colorStore.removeColor(group.name, subGroup ? subGroup.name : "", color.name)}>
                            <i class="fa fa-trash-can"></i>
                        </button>
                    </div>
                {/if}
            </div>
            <div class="color-chip__swatch" style="background-color: {color.color};"></div>
        {:else}
            <TextField label="Colour Value" bind:value={color} id="colorValue"></TextField>
            <div class="color-chip__swatch editable" style="background-color: {color};"></div>
        {/if}
    </div>
{/if}

{#if editing && group}
    <ColorModal editing {color} on:close={() => editing = false} {group} {subGroup} />
{/if}
<style>
    .color-chip {
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        position: relative;
    }

    :global(.color-chip:not(:first-of-type)) {
        margin-top: 1rem;
    }

    .color-chip:not(.editable) {
        border: var(--border-thickness) solid var(--border-color);
        padding: var(--input-padding);
    }

    .color-chip__swatch {
        position: absolute;
        height: 100%;
        width: 3rem;
        right: 0;
        top: 0;
    }

    .color-chip__text {
        transition: color 0.2s ease-in-out;
    }

    .color-chip__swatch.editable {
        height: 33px;
        bottom: 3px;
        right: 3px;
        top: auto;
    }

    :global(.color-chip__text:hover + .inline-actions) {
        opacity: 1;
    }

    .color-chip.picking {
        cursor:pointer;
    }

    .color-chip.picking::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        background-color: var(--brand-color);
        transition: width 0.2s ease-in-out;
        z-index: 0;
    }

    .color-chip.picking:hover::before {
        width: 100%;
    }

    .color-chip.picking:hover .color-chip__text {
       z-index:10;
       color: white;
       pointer-events: none;
    }
</style>