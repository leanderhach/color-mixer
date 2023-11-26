<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { _colorStore } from "../../store";
    import FancyButton from "../FancyButton.svelte";
    import TextField from "../TextField.svelte";
    import Modal from "./Modal.svelte";
    import Select from 'svelte-select';

    const dispatch = createEventDispatcher();

    export let editing = false;
    export let subGroup = undefined;

    // if editing
    export let group = undefined;

    let subGroupName = "";
    let groupName = { value: "", label: '' };

    // if editing
    let oldName = "";

    function editGroup() {
        if(subGroupName === "" || groupName.value === "" || !(_colorStore.getGroups().includes(groupName.value))) {
            console.log("not complete form")
            return
        }

        if(editing) {
            _colorStore.updateSubGroup(group.name, oldName, {
                name: subGroupName
            })
        } else {
            _colorStore.addSubGroup(groupName.value, subGroupName);
        }

        dispatch("close");
    }

    onMount(() => {
        if(editing) {
            subGroupName = subGroup.name;
            oldName = JSON.parse(JSON.stringify(subGroup.name));
            groupName.value = group.name;
        }
    })
</script>


<Modal on:close={()=> dispatch("close")}>
    <svelte:fragment slot="title">
        {editing ? "Edit" : "Add"} Sub-Group
    </svelte:fragment>
    <svelte:fragment slot="content">
        <TextField label="Sub-Group Name" id="colorName" bind:value={subGroupName}></TextField>
        {#if !editing}
            <div class="input-group">
                <Select id="group" items={_colorStore.getGroups()} bind:value={groupName} clearable={false}></Select>
                <label for="group">Group</label>
            </div>
        {/if}
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <FancyButton label={editing ? "Update" : "Create"} icon="fa-jet-fighter" on:click={editGroup}></FancyButton>
    </svelte:fragment>
</Modal>