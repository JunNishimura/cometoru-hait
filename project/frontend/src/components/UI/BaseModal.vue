<template>
    <div class="base-modal">
        <div class="modal__overlay" @click="$emit('input', false)" />
        <div class="modal__card">
            <FontAwesomeIcon @click="$emit('input', false)" class="close__btn" :icon="['fas', 'times']" size="sm" />
            <slot name="card"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value'],
}
</script>

<style scoped>
.base-modal {
    position: relative;
}

.modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    background-color: #0004;
    cursor: pointer;
}

.modal__card {
    z-index: 99;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    background-color: #fff;
}

.close__btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
</style>