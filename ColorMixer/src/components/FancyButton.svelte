<script>
  import { createEventDispatcher } from "svelte";

    export let label;
    export let icon;

    const dispatch = createEventDispatcher();

    function emitClick() {
        dispatch("click");
    }
</script>



<button class="fancy-button" on:click={emitClick}>
    <div class="fancy-button__text">
        <span>{label}</span>
    </div>
    <div class="fancy-button__icon">
        <i class="fa {icon}"></i>
    </div>
</button>

<style>
    .fancy-button {
        position: relative;
        border: var(--border-thickness) solid var(--border-color);
        background-color: transparent;
        color: var(--primary-text-color);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        cursor:pointer;
        font-family: var(--font-family);
        font-weight: 500;
        width: 100%;
        font-size: 1rem;
    }

    .fancy-button span {
        color: var(--primary-text-color);
        transition: all .2s ease;
    }

    .fancy-button__text {
        padding: var(--input-padding);
        padding-right: 3rem;
        pointer-events: none;
    }

    .fancy-button__text::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        width: 2rem;
        height: 100%;
        background-color: var(--brand-color);
        opacity: 1;
        transition: all 0.2s ease-in-out;
    }

    .fancy-button__icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 2rem;
        height: 100%;
        background-color: var(--brand-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    .fancy-button__text span {
        position: relative;
        z-index: 10;
    }

    .fancy-button > .fancy-button__icon > i {
        transition: all .2s ease;
    }

    .fancy-button:hover > .fancy-button__text::after {
        width: 100%;
    }

    .fancy-button:hover span {
        color: white;
    }

    .fancy-button:hover > .fancy-button__icon > i {
        transform: rotate(90deg);
    }
</style>