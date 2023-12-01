<script>
  import { _tileStore } from "../store";


  $: tiles = _tileStore.getTiles();
</script>