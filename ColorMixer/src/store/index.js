import { derived, get, writable } from "svelte/store";
import { nanoid } from "nanoid";

function CreateColorStore(initialValue) {
    const store = writable(initialValue);

    let loadedFromStore = false;

    store.subscribe((store) => {
        // if the store is empty, try to load from local storage
        if (store.length === 0 && !loadedFromStore) {
            const localStore = localStorage.getItem("colorStore");
            if (localStore) {
                setColors(JSON.parse(localStore));
            }

            loadedFromStore = true;
        }

        // otherwise, save to local storage
        else {
            localStorage.setItem("colorStore", JSON.stringify(store));
        }
    })

    function setColors(colors) {
        store.set(colors);
    }



    /********************************** */
    /*          COLOR FUNCTIONS         */
    /********************************** */
    function addColor(group, subgroup, color) {
      
      if(subgroup === "") {
        store.update((store) => {
            store.find((item) => item.name === group).values.push(color);
            return store;
        });
      } else {
        store.update((store) => {
            store.find((item) => item.name === group).values.find((item) => item.name === subgroup).values.push(color);
            return store;
        });
      }
    }

    function removeColor(group, subgroup, color) {
      
      if(subgroup === "") {
        store.update((store) => {
            store.find((item) => item.name === group).values.splice(store.find((item) => item.name === group).values.findIndex(item => item.name === color), 1);
            store = store;
            return store;
        });
      } else {
        store.update((store) => {
            store.find((item) => item.name === group).values.find((item) => item.name === subgroup).values.splice(store.find((item) => item.name === group).values.find((item) => item.name === subgroup).values.findIndex(item => item.name === color), 1);
            store = store;
            return store;
        });
      }
    }

    function updateColor(group, subGroup, colorName, newColor) {
      if(subGroup === "") {
          store.update((store) => {
            let color = store.find((item) => item.name === group).values.find(color => color.name === colorName);
            Object.assign(color, newColor);
            store = store;
            return store;
        });
      } else {
        store.update((store) => {
            let color = store.find((item) => item.name === group).values.find((item) => item.name === subGroup).values.find(color => color.name === colorName);
            Object.assign(color, newColor);
            store = store;
            return store;
        });
      }
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
            store.splice(store.findIndex(item => item.name === group), 1);
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
            store.find((item) => item.name === group).values.splice(store.find((item) => item.name === group).values.findIndex(item => item.name === subgroup), 1);
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
              
              if(subGroup.color) {
                colorMap[subGroup.name] = subGroup.color.trim()
              } else {
                subGroup.values.forEach(color => {
                    colorMap[color.name] = color.color.trim();
                });
              }
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

    let loadedFromStore = false;

    store.subscribe((store) => {
        // if the store is empty, try to load from local storage
        if (store.length === 0 && !loadedFromStore) {
            const localStore = localStorage.getItem("tileStore");
            if (localStore) {
                setTiles(JSON.parse(localStore));
            }

            loadedFromStore = true;
        }

        // otherwise, save to local storage
        else {
            localStorage.setItem("tileStore", JSON.stringify(store));
        }
    })

    function setTiles(tiles) {
        store.set(tiles);
    }

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

    function removeTile(tileId) {
        console.log("trying to remove tile")
        store.update((store) => {
            store.splice(store.findIndex(tile => tile.id === tileId), 1);
            // update the local storage
            localStorage.setItem("tileStore", JSON.stringify(store));
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

    /********************************** */
    /*       EXPORT FUNCTIONS           */
    /********************************** */

    function exportTiles() {
    const data = get(store);
    let csvContent = "name,glyph,background,foreground,description,type,switchTo\n";

    data.forEach(item => {
        const name = item.foregroundColor?.name || '';
        const glyph = item.glyph || '';
        const background = item.backgroundColor?.name || '';
        const foreground = item.foregroundColor?.name || '';
        const description =  '';
        const type = '';  
        const switchTo = '';  

        // Construct the CSV row
        const row = `${name},${glyph},${background},${foreground},${description},${type},${switchTo}`;

        csvContent += row + "\r\n";
    });

    return csvContent;
}


    return {
        set: store.set,
        addTile,
        removeTile,
        changeForeground,
        changeBackground,
        getTile,
        getTiles,
        exportTiles,
        subscribe: store.subscribe,
    }
}

export const _colorStore = CreateColorStore([]);
export const _tileStore = CreateTileStore();
export const _pickingColor = writable(false);
export const _pickingTileField = writable({id: null, field: null});
export const _pickedColor = writable(null);
export const _currentViewedTileId = writable(null);
export const _searchMatches = writable([]);