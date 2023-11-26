<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { _colorStore } from "../../store";
    import FancyButton from "../FancyButton.svelte";
    import TextField from "../TextField.svelte";
    import Modal from "./Modal.svelte";

    const dispatch = createEventDispatcher();

    export let editing = false;
    export let group = undefined;

    let groupName = "";

    // if editing
    let oldName = "";

    function editGroup() {
        if(groupName === "") {
            console.log("not complete form")
            return
        }

        if(editing) {
            _colorStore.updateGroup(oldName, {
                name: groupName
            })
        } else {
            _colorStore.addGroup(groupName);
        }

        dispatch("close");
    }

    onMount(() => {
        if(editing) {
            groupName = group.name;
            oldName = JSON.parse(JSON.stringify(group.name));
        }
    })
</script>


<Modal on:close={()=> dispatch("close")}>
    <svelte:fragment slot="title">
        {editing ? "Edit" : "Add"} Group
    </svelte:fragment>
    <svelte:fragment slot="content">
        <div class="flex--row">
            <TextField label="Group Name" id="colorName" bind:value={groupName}></TextField>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <FancyButton label={editing ? "Update" : "Create"} icon="fa-jet-fighter" on:click={editGroup}></FancyButton>
    </svelte:fragment>
</Modal>