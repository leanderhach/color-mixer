<script>
  import { _colorStore } from "../store";
    import { menuFade } from "../transitions";
    import FancyButton from "./FancyButton.svelte";
    import ColorModal from "./modals/ColorModal.svelte";
    import ColorGroupModal from "./modals/ColorGroupModal.svelte";
    import ColorGroup from "./ColorGroup.svelte";
    import ColorSubGroupModal from "./modals/ColorSubGroupModal.svelte";
    import TextField from "./TextField.svelte";
  import Search from "./Search.svelte";

  let createMenuOpen = false;

  let creatingColor = false;
  let creatingGroup = false;
  let creatingSubgroup = false;


  function toggleCreateMenu() {
    createMenuOpen = !createMenuOpen;
  }

  function toggleCreateColor() {
    toggleCreateMenu();

    creatingColor = !creatingColor;
    creatingGroup = false;
    creatingSubgroup = false;
  }

  function toggleCreateGroup() {
    toggleCreateMenu();

    creatingColor = false;
    creatingGroup = !creatingGroup;
    creatingSubgroup = false;
  }

  function toggleCreateSubgroup() {
    toggleCreateMenu();

    creatingColor = false;
    creatingGroup = false;
    creatingSubgroup = !creatingSubgroup;
  }

</script>



<div class="palette-panel">
    <h2>Palette</h2>
    <Search></Search>
    <div class="palette-add">
        <FancyButton label="Add New" icon="fa-plus" on:click={toggleCreateMenu}>
        </FancyButton>
        {#if createMenuOpen}
            <div class="popup-menu" transition:menuFade>
                <div class="popup-menu__item" on:click={toggleCreateColor}>Create color</div>
                <div class="popup-menu__item" on:click={toggleCreateGroup}>Create group</div>
                <div class="popup-menu__item" on:click={toggleCreateSubgroup}>Add Subgroup</div>
            </div>
        {/if}
    </div>
    <div class="colors">
      {#each $_colorStore as group, index}
          <ColorGroup {group}></ColorGroup>
      {/each}
    </div>
</div>

{#if creatingColor}
    <ColorModal on:close={() => creatingColor = false}/>
{/if}

{#if creatingGroup}
    <ColorGroupModal on:close={() => creatingGroup = false}/>
{/if}

{#if creatingSubgroup}
    <ColorSubGroupModal on:close={() => creatingSubgroup = false} />
{/if}

<style>
    .palette-panel {
      padding-right: 0.25rem;
      box-sizing: border-box;
      height: 100%;
    }
    .colors {
        display: flex;
        flex-direction: column;
        border-left: var(--border-thickness) solid var(--border-color);
        padding-left: 0.25rem;
        height: 100%;
        overflow:scroll;
    }

    .palette-add {
        position: relative;
        width: 100%;
        border-left: var(--border-thickness) solid var(--border-color);
        padding-left: 0.25rem;
        margin-top: 1rem;
        box-sizing: border-box;
    }
</style>