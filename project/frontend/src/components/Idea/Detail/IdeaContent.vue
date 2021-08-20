<template>
    <div class="idea__content">
        <div class="idea__content-title">
            <h3>{{title}}</h3>
        </div>
        <div class="idea__content-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>


<style lang="scss" scoped>
.idea__content {
    padding: 1rem 0;

    .idea__content-header {
        margin-bottom: 0.5rem;
        
        h3 {
            display: inline-block;
            border-bottom: 1px solid #000;
            letter-spacing: 10px;
        }
    }
}

</style>