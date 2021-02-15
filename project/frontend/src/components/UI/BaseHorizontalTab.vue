<template>
    <div class="horizontal__tab">
        <ul class="horizontal__tab-list" 
            :class="{'border-bottom': isBorderBottom}"
            :style="{'justify-content': justifyContentType}">
            <slot name="horizontal-tab"></slot>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['justifyContentType', 'isBorderBottom'],
}
</script>

<style lang="scss" scoped>
.horizontal__tab {
    width: 100%;
    
    ul {
        list-style: none;
    }
}

.horizontal__tab-list {
    display: flex;
    align-items: center;
    text-align: center;
}

.border-bottom {
    border-bottom: 1px solid #ddd;
}
</style>