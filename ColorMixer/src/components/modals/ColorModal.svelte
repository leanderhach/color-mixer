<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { _colorStore } from "../../store";
    import ColorChip from "../ColorChip.svelte";
    import FancyButton from "../FancyButton.svelte";
    import TextField from "../TextField.svelte";
    import Modal from "./Modal.svelte";
    import { nanoid } from 'nanoid';
    import Select from 'svelte-select';

    const dispatch = createEventDispatcher();

    export let editing = false;
    export let color = undefined;

    // extra props for editing
    export let group = undefined;
    export let subGroup = undefined;

    let colorName = "";
    let colorValue = "";
    let colorGroup = {value: "", label: ""};
    let colorSubGroup = {value: "", label: ""};
    let tags = "";

    // if editing
    let oldName = "";

    function editColor() {
        if(colorName === "" || colorValue === "" || !(_colorStore.getGroups().includes(colorGroup.value)) || !(_colorStore.getSubGroups(colorGroup.value).includes(colorSubGroup.value))) {
            console.log("not complete form")
            return
        }

        if(editing) {
            _colorStore.updateColor(colorGroup.value, colorSubGroup.value, oldName, {
                name: colorName,
                color: colorValue,
                tags: tags.split(",").map(tag => tag.trim())
            })
        } else {
            _colorStore.addColor(colorGroup.value, colorSubGroup.value, {
                name: colorName,
                color: colorValue,
                tags: tags.split(",").map(tag => tag.trim())
            })
        }

        dispatch("close");
    }

    onMount(() => {
        if(editing) {
            colorName = color.name;
            oldName = JSON.parse(JSON.stringify(color.name));
            colorGroup.value = group.name;
            colorSubGroup.value = subGroup.name;
            colorValue = color.color;
            tags = color.tags.join(",");
        }
    })
</script>


<Modal on:close={()=> dispatch("close")}>
    <svelte:fragment slot="title">
        {editing ? "Edit" : "Add"} Colour
    </svelte:fragment>
    <svelte:fragment slot="content">
        <div class="flex--row">
            <TextField label="Colour Name" id="colorName" bind:value={colorName}></TextField>
            <div style="margin-left:2rem;"></div>
            <ColorChip editable bind:color={colorValue}/>
        </div>
        {#if !editing}
            <div class="flex--row">
                <div class="input-group">
                    <Select id="colorGroup" items={_colorStore.getGroups()} bind:value={colorGroup} clearable={false}></Select>
                    <label for="colorGroup">Group</label>
                </div>
                {#if colorGroup.value !== "" && _colorStore.getGroups().includes(colorGroup.value)}
                    <div class="input-group">
                        <Select id="colorSubGroup" items={_colorStore.getSubGroups(colorGroup.value)} bind:value={colorSubGroup} clearable={false}></Select>
                        <label for="colorSubGroup">Sub Group</label>
                    </div>
                {/if}
            </div>
        {/if}
        <TextField label="Tags (comma separated)" id="colorTags" bind:value={tags}></TextField>
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <FancyButton label={editing ? "Update" : "Create"} icon="fa-jet-fighter" on:click={editColor}></FancyButton>
    </svelte:fragment>
</Modal>