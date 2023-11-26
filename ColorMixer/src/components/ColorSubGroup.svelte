<script>
    import { _colorStore } from "../store";
    import ColorChip from "./ColorChip.svelte";
    import ColorSubGroupModal from "./modals/ColorSubGroupModal.svelte";
    export let subGroup;
    export let group;

    let editing = false;
</script>

{#if subGroup}
    <div class="color-subgroup">
        <div class="flex--row">
            <h3 class="color-subgroup__name">{subGroup.name}</h3>
            <div class="inline-actions">
                <button class="button is-icon is-inline" on:click={() => editing = true}>
                    <i class="fas fa-pen"></i>
                </button>
                <button class="button is-icon is-inline" on:click={() => _colorStore.removeSubGroup(group.name, subGroup.name)}>
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        {#each subGroup.values as color}
            <ColorChip {color} {group} {subGroup} canUpdate></ColorChip>
        {/each}
    </div>
{/if}

{#if editing}
    <ColorSubGroupModal editing {subGroup} {group} on:close={() => editing = false} />
{/if}

<style>
    .color-subgroup__name {
        color: var(--secondary-text-color);
        text-transform: capitalize;
        margin: 0.5rem 0 0.25rem 0;
        font-size: 1rem;
    }

    :global(.color-subgroup__name:hover + .inline-actions) {
        opacity: 1;
    }
</style>


