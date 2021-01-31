<template>
    <div class="edit__btn" @click="edit">
        <FontAwesomeIcon class="icon" :icon="['fas', 'cog']" />
    </div>
</template>

<script>
export default {
    methods: {
        edit() {
            this.$emit('edit');
        }
    }
}
</script>

<style scoped>
.edit__btn {
    width: 30px;
    height: 30px;
    background-color: #bbb;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
}

.edit__btn:hover {
    background-color: #aaa;
}

.icon {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>