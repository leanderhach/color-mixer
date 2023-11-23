import { writable } from "svelte/store";

function CreateColorStore(initialValue) {
    const { set, update, subscribe } = writable(initialValue);

    subscribe((value) => {
        console.log(value);
    })

    
    function addColor(group, subgroup, color) {
        update((store) => {
            store.find((item) => item.name === group).values.find((item) => item.name === subgroup).values.push(color);
            return store;
        });
    }

    function removeColor(group, subgroup, color) {
        update((store) => {
            store = store;
            return store;
        });
    }

    function updateColor(group, subgroup, color, index) {
        update((store) => {
            store[group][index] = color;
        });
    }

    function addGroup(group) {
        update((store) => {
            store.push({name: group, values: []})
            store = store;
            return store;
        });
    }

    function removeGroup(group) {
        update((store) => {
            delete store[group];
            store = store;
            return store;
        });
    }

    function addSubGroup(group, subgroup) {
        update((store) => {
            store.find((item) => item.name === group).values.push({name: subgroup, values: []});
            return store;
        });
    }

    function removeSubGroup(group, subgroup) {
        update((store) => {
            delete store[group][subgroup];
            store = store;
            return store;
        });
    }

	return {
        set: (value) => {
			set(value);
        },
        addColor,
        removeColor,
        updateColor,
        addGroup,
        removeGroup,
        addSubGroup,
        removeSubGroup,
		update: update,
		subscribe: subscribe,
	};
}

function CreateTileStore() {
    const { set, update, subscribe } = writable([]);

    function addTile(tile) {
        update((store) => {
            store.push(tile);
            return store;
        });
    }

    function removeTile(tile) {
        update((store) => {
            store.splice(store.indexOf(tile), 1);
            return store;
        });
    }

    function updateTile(tile, index) {
        update((store) => {
            store[index] = tile;
            return store;
        });
    }

    return {
        set: set,
        addTile,
        removeTile,
        updateTile,
        subscribe: subscribe,
    }
}

export const _colorStore = CreateColorStore([]);
export const _tileStore = CreateTileStore();
export const _pickingColor = writable(false);