<template>
    <div class="edit__button" @click="switchDropdownState">
        <FontAwesomeIcon class="icon" :icon="['fas', 'cog']" size="lg" />
        <FontAwesomeIcon class="icon" :icon="['fas', 'caret-down']" size="lg" />
        <BaseVerticalDropdown class="edit__button-dropdown" v-if="isDropdownOn">
            <template #dropdown-item>
                <slot name="dropdown-item" />
            </template>
        </BaseVerticalDropdown>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isDropdownOn: false,
        }
    },
    methods: {
        switchDropdownState() {
            this.isDropdownOn = !this.isDropdownOn;
        },
        closeDropdown() {
            // 主に親コンポーネントからドロップダウンんを閉じたい時に呼びだされる
            this.isDropdownOn = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.edit__button {
    cursor: pointer;
    position: relative;

    .edit__button-dropdown {
        padding: 0;
        position: absolute;
        top: 150%;
        right: -180%;
        // transform: translate(-50%, 0%);
        z-index: 90;
    }
}
</style>