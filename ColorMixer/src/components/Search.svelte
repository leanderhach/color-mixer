<script>
  import { get } from "svelte/store";
  import { _colorStore, _searchMatches } from "../store";
  import TextField from "./TextField.svelte";
  import Fuse from "fuse.js";

    let searchQuery = "";

    function flattenData(data) {
    let result = [];


    for(let group of data) {
        if(group.values) {
            for(let subGroup of group.values) {
                if(subGroup.values) {
                    for(let color of subGroup.values) {
                        result.push(color);
                    }
                } else if (subGroup.color) {
                    result.push(subGroup);
                }
            }
        }
    }
    return result;
}

$: if(searchQuery.length > 0) {
    if(searchQuery.length < 3) {
        _searchMatches.set([]);
    } else {
        const items = flattenData($_colorStore);

        const options = {
            keys: ['name', 'tags']
        };
        const fuse = new Fuse(items, options);

        const searchResult = fuse.search(searchQuery);
        const names = searchResult.map(result => result.item.name);
        console.log(names);
        _searchMatches.set(names);
    }
}
</script>

<TextField bind:value={searchQuery} label="Search" id="search"></TextField>
<style></style>