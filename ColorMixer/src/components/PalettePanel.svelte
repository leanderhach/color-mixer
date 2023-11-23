<script>
  import { _colorStore } from "../store";
  import ColorChip from "./ColorChip.svelte";
  import FancyButton from "./FancyButton.svelte";

  let createMenuOpen = false;

  function toggleCreateMenu() {
    createMenuOpen = !createMenuOpen;
  }

</script>




<div class="palette-panel">
    <div class="palette-add">
        <FancyButton label="Add New" icon="fa-plus" on:click={toggleCreateMenu}>
        </FancyButton>
        {#if createMenuOpen}
            <div class="popup-menu">
                <div class="popup-menu__item" on:click={}>Create color</div>
                <div class="popup-menu__item" on:click={}>Create group</div>
                <div class="popup-menu__item" on:click={}>Add Subgroup</div>
            </div>
        {/if}
    </div>
    <div class="colors">
        {#each $_colorStore as group, index}
        <div class="color-group">
            <h2 class="color-group__name">
                {group.name}
            </h2>
            <div class="color-group__colors">
                {#each group.values as subgroup, index}
                <div class="color-subgroup">
                    <h4 class="color-subgroup__name">
                        {subgroup.name}
                    </h4>
                    <div class="color-subgroup__colors">
                        {#each subgroup.values as color, index}
                            <ColorChip bind:color={color}></ColorChip>
                        {/each}
                    </div>
                </div>
                {/each}
            </div>
        </div>
        {/each}
    </div>
</div>

<style>
    .colors {
        display: flex;
        flex-direction: column;
        border-left: var(--border-thickness) solid var(--border-color);
    }

    .color-group {
        margin-bottom: 1rem;
    }

    .color-group__name {
        font-size: 1.2rem;
        font-weight: 700;
        text-transform: capitalize;
    }

    .color-subgroup {

    }

    .color-subgroup__name {
        color: var(--secondary-text-color);
        text-transform: capitalize;
    }

    .palette-add {
        position: relative;
        width: 70%;
    }
</style>