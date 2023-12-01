<script>
  import { _colorStore, _tileStore } from "../store";
  import FancyButton from "./FancyButton.svelte";


    function saveTemplateAsFile (data, name, format) {
        const blob = new Blob([data], { type: format });
        const link = document.createElement("a");

        link.download = name;
        link.href = window.URL.createObjectURL(blob);
        link.dataset.downloadurl = [format, link.download, link.href].join(":");

        const evt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        link.dispatchEvent(evt);
        link.remove()
    };


    function saveColors() {
        saveTemplateAsFile(JSON.stringify(_colorStore.exportColors()), "colors.json", "text/json");
    }

    function saveTiles() {
        saveTemplateAsFile(_tileStore.exportTiles(), "tiles.csv", "text/csv;charset=utf-8;");
    }
</script>


<div class="actions-panel">
    <div class="actions-panel__set">
        <div class="actions-panel__actions">
            <span>
                <FancyButton label="Export Colours" icon="fa-arrow-down" on:click={saveColors}>
                </FancyButton>
            </span>
            <span>
                <FancyButton label="Export Tiles" icon="fa-arrow-down" on:click={saveTiles}>
                </FancyButton>
            </span>
        </div>
    </div>
</div>

<style>
    .actions-panel {
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 2rem;
        border-top: var(--border-thickness) solid var(--border-color);
        width: 80%;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
    }

    .actions-panel span:not(:first-of-type) {
        margin-left: 1rem;
    }

    .actions-panel__actions {
        display: flex;
        flex-direction: row;
    }
</style>