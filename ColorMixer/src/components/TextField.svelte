<script>
    export let label;
    export let value;
    export let id;
</script>

<div class="text-field">
    <input {id} type="text" bind:value>
    <label for="{id}">{label}</label>
</div>


<style>
    .text-field {
        display: flex;
        flex-direction: column-reverse;
    }

    input {
        border: var(--border-thickness) solid var(--border-color);
        padding: var(--input-padding);
        background-color: transparent;
        color: var(--primary-text-color);
        font-family: "Julia Mono";
        outline: none;
        transition: all .2s ease-in-out;
    }

    label {
        color: var(--border-color);
        transition: all .2s ease-in-out;
        font-family: "Julia Mono";
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
    }

    .text-field input:hover, .text-field input:focus {
        border-color: var(--hover-border-color);
    }

    .text-field input:hover + label, .text-field input:focus + label {
            color: var(--hover-border-color);
        }
</style>