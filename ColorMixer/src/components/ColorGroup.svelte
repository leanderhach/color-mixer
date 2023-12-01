<script>
    import { _colorStore } from "../store";
    import ColorSubGroup from "./ColorSubGroup.svelte";
    import ColorChip from "./ColorChip.svelte";
    import ColorGroupModal from "./modals/ColorGroupModal.svelte";

    export let group;

    let editing = false;
</script>

{#if group}
    <div class="color-group">
        <div class="flex--row">
            <h2 class="color-group__name">{group.name}</h2>
            <div class="inline-actions">
                <button class="button is-icon is-inline" on:click={() => editing = true}>
                    <i class="fas fa-pen"></i>
                </button>
                <button class="button is-icon is-inline" on:click={() => _colorStore.removeGroup(group.name)}>
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        {#each group.values as subGroup}
            {#if subGroup.color}
              <div style="padding-top:1rem;"></div>
              <ColorChip color={subGroup} {group} canUpdate></ColorChip>
            {:else}
              <ColorSubGroup {subGroup} {group}></ColorSubGroup>
            {/if}
        {/each}
    </div>
{/if}

{#if editing}
    <ColorGroupModal editing {group} on:close={() => editing = false}></ColorGroupModal>
{/if}


<style>
    .color-group {
        margin-bottom: 1rem;
    }

    .color-group__name {
        font-size: 1.2rem;
        font-weight: 700;
        text-transform: capitalize;
        margin: 0.5rem 0 0.25rem 0;
    }

    :global(.color-group__name:hover + .inline-actions) {
        opacity: 1;
    }
</style>
