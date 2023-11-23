<script>
    export let color;
    export let editable = false;
</script>


<div class="color-chip">
    <div class="color-chip__text">{color.name}</div>
    <div class="color-chip__swatch" style="background-color: {color.color};"></div>
</div>


<style>
    .color-chip {
        border: var(--border-thickness) solid var(--border-color);
        padding: var(--input-padding);
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        position: relative;
    }

    .color-chip__swatch {
        position: absolute;
        height: 100%;
        width: 3rem;
        right: 0;
        top:0;
    }
</style>