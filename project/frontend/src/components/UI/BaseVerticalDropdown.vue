<template>
    <!-- base component for vertical dropdown -->
    <div class="vertical__dropdown">
        <ul>
            <slot name="dropdown-item"></slot>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.vertical__dropdown {
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    width: 10rem;
    z-index: 90;
    text-align: center;
    ul {
        list-style: none;
    }
}
</style>