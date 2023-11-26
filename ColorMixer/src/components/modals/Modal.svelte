<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import { menuFade } from "../../transitions";

    const dispatch = createEventDispatcher();

    function emitClose() {
        dispatch("close");
    }
</script>

<div class="modal-background" on:click|self={emitClose} transition:fade>
    <div class="modal" transition:menuFade>
        <div class="modal__heading">
            <h2><slot name="title"></slot></h2>
        </div>
        <div class="modal__body">
            <slot name="content"></slot>
        </div>
        <div class="modal__footer">
            <slot name="footer"></slot>
        </div>
    </div>
</div>


<style>
    .modal-background {
        height:100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.5);
        z-index: 1000;
    }

    .modal {
        background-color: white;
        border: var(--border-thickness) solid var(--border-color);
        padding: var(--input-padding);
    }

    .modal__body {
        margin-bottom: 1rem;
    }
</style>