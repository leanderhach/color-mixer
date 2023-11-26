import { derived, get, writable } from "svelte/store";
import { nanoid } from "nanoid";

function CreateColorStore(initialValue) {
    const store = writable(initialValue);

    store.subscribe((store) => {
        console.log(store)
    })

    /********************************** */
    /*          COLOR FUNCTIONS         */
    /********************************** */
    function addColor(group, subgroup, color) {
        store.update((store) => {
            store.find((item) => item.name === group).values.find((item) => item.name === subgroup).values.push(color);
            return store;
        });
    }

    function removeColor(group, subgroup, color) {
        store.update((store) => {
            store.find((item) => item.name === group).values.find((item) => item.name === subgroup).values.splice(store.find((item) => item.name === group).values.find((item) => item.name === subgroup).values.findIndex(item => item.name === color), 1);
            store = store;
            return store;
        });
    }

    function updateColor(group, subGroup, colorName, newColor) {
        store.update((store) => {
            let color = store.find((item) => item.name === group).values.find((item) => item.name === subGroup).values.find(color => color.name === colorName);
            Object.assign(color, newColor);
            store = store;
            return store;
        });
    }

    /********************************** */
    /*          GROUP FUNCTIONS         */
    /********************************** */

    function addGroup(group) {
        store.update((store) => {
            store.push({name: group, values: []})
            store = store;
            return store;
        });
    }

    function removeGroup(group) {
       store.update((store) => {
            store.splice(store.indexOf(group), 1);
            store = store;
            return store;
        });
    }

    function updateGroup(group, newGroup) {
        store.update((store) => {
            let groupToUpdate = store.find((item) => item.name === group);
            Object.assign(groupToUpdate, newGroup);
            store = store;
            return store;
        });
    }

    /********************************** */
    /*        SUBGROUP FUNCTIONS        */
    /********************************** */


    function addSubGroup(group, subgroup) {
        store.update((store) => {
            store.find((item) => item.name === group).values.push({name: subgroup, values: []});
            return store;
        });
    }

    function removeSubGroup(group, subgroup) {
        store.update((store) => {
            delete store[group][subgroup];
            store = store;
            return store;
        });
    }

    function updateSubGroup(group, subgroup, newSubGroup) {
        store.update((store) => {
            let subGroupToUpdate = store.find((item) => item.name === group).values.find((item) => item.name === subgroup);
            Object.assign(subGroupToUpdate, newSubGroup);
            store = store;
            return store;
        });
    }

    /********************************** */
    /*          GET FUNCTIONS           */
    /********************************** */

    function getGroups() {
        return get(store).map(group => group.name)
    }

    function getSubGroups(groupName) {
        console.log(groupName)
        const group = get(store).find(group => group.name === groupName)
        return group.values.map(item => item.name)
    }

    function getGroup(groupName) {
        return get(store).find(group => group.name === groupName)
    }

    function getSubGroup(groupName, subGroupName) {
        const group = get(store).find(group => group.name === groupName)
        return group.values.find(item => item.name === subGroupName)
    }

    function getColors() {
        return get(store).map(group => group.values.map(subgroup => subgroup.values.map(color => color.name))).flat(2)
    }

    /********************************** */
    /*       EXPORT FUNCTIONS           */
    /********************************** */

    function exportColors() {
        let colorMap = {};
        
        get(store).forEach(group => {
            group.values.forEach(subGroup => {
                subGroup.values.forEach(color => {
                    colorMap[color.name] = color.color;
                });
            });
        });
    
        return colorMap;
    }

	return {
        set: store.set,
        addColor,
        removeColor,
        updateColor,
        addGroup,
        removeGroup,
        updateGroup,
        addSubGroup,
        updateSubGroup,
        getGroups,
        getSubGroups,
        getColors,
        removeSubGroup,
        exportColors,
		update: store.update,
		subscribe: store.subscribe,
        getGroup,
        getSubGroup
	};
}

function CreateTileStore() {
    const store = writable([]);

    /********************************** */
    /*          EDIT FUNCTIONS          */
    /********************************** */

    function addTile(tile) {
        store.update((store) => {
            Object.assign(tile, {id: nanoid()});
            store.push(tile);
            return store;
        });
    }

    function removeTile(tile) {
        store.update((store) => {
            store.splice(store.indexOf(tile), 1);
            return store;
        });
    }

    function updateTile(tile, index) {
        store.update((store) => {
            store[index] = tile;
            return store;
        });
    }

    /********************************** */
    /*          COLOR FUNCTIONS         */
    /********************************** */

    function changeForeground(tile, foreground) {
        store.update((store) => {
            console.log("updating foreground")
            store.find((item) => item.id === tile).foregroundColor = foreground;
            console.log(store)
            return store;
        });
    }

    function changeBackground(tile, background) {
        store.update((store) => {
            store.find((item) => item.id === tile).backgroundColor = background;
            return store;
        });
    }

    /********************************** */
    /*          GET FUNCTIONS           */
    /********************************** */

    function getTiles() {
        return get(store);
    }

    function getTile(id) {
        return get(store).find(tile => tile.id === id);
    }

    return {
        set: store.set,
        addTile,
        removeTile,
        updateTile,
        changeForeground,
        changeBackground,
        getTile,
        getTiles,
        subscribe: store.subscribe,
    }
}

export const _colorStore = CreateColorStore([]);
export const _tileStore = CreateTileStore();
export const _pickingColor = writable(false);
export const _pickingTileField = writable({id: null, field: null});
export const _pickedColor = writable(null);
export const _currentViewedTileId = writable(null);