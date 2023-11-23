<script>
  import { onMount } from 'svelte';
  import ActionsPanel from './components/ActionsPanel.svelte';
  import PalettePanel from './components/PalettePanel.svelte';
  import PreviewPanel from './components/PreviewPanel.svelte';
  import TilePanel from './components/TilePanel.svelte';
  import { _colorStore } from './store';
  
  // sample structure for colorstore
  //   [
  //     {
  //     "name": "blue",
  //     "values": [
  //                 {"name": "ocean", "values": [
  //                     {
  //                         "name": "deepOcean", 
  //                         "color": "#0000FF",
  //                         "tags": ["mare"]
  //                     }
  //                 ]
  //             }
  //         ]
  //     },
  //     {
  //     "name": "green",
  //     "values": [
  //                 {"name": "ocean", "values": [
  //                     {
  //                         "name": "deepOcean", 
  //                         "color": "#0000FF",
  //                         "tags": ["mare"]
  //                     }
  //                 ]
  //             }
  //         ]
  //     }
  // ]

  // sample structure for tilestore
  // [
  //   {
  //     "foregroundColor": "#0000FF",
  //     "backgroundColor": "#0000FF",
  //     "tags": ["mare"],
  //     "glyph": "."
  //   }
  // ]

  onMount(() => {
    _colorStore.addGroup("blue");
    _colorStore.addGroup("green");
    _colorStore.addSubGroup("blue", "ocean");

    
    _colorStore.addColor("blue", "ocean",{
      name: 'deepOcean',
      color: '#0000FF',
      tags: ['mare'],
    })
  })
  
</script>

<main>
  <div class="content">
    <TilePanel />
    <PreviewPanel/>
    <ActionsPanel/>
  </div>
  <div class="sidebar">
    <PalettePanel/>
  </div>
</main>

<style>
  :global(body), :global(html) {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  main {
    display: flex;
    flex-direction: row;
    height: 100%;

  }

  .content {
    width: 80%;
  }

  .sidebar {
    width: 20%;
  }
</style>
