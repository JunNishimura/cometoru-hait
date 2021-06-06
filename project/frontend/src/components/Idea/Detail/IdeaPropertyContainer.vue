<template>
    <div class="idea__property-container">
        <div class="header">
            <h3>{{ title }}</h3>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title'],
}
</script>

<style lang="scss" scoped>
.idea__property-container {
    padding: 1rem 0;
}

.header {
    margin-bottom: 0.5rem;
    
    h3 {
        display: inline-block;
        border-bottom: 1px solid #000;
        letter-spacing: 10px;
    }
}
</style>