<template>
    <div class="page-btn">
        <button @click="btnPressed"
            :class="{active: isCurrentPage}"
        >{{ pageNumber }} </button>
    </div>
</template>

<script>
export default {
    props: {
        pageNumber: Number,
        curPage: Number
    },
    computed: {
        isCurrentPage() {
            return this.pageNumber === this.curPage;
        }
    },
    methods: {
        btnPressed() {
            this.$emit('changePage', this.pageNumber);
        }
    }
}
</script>

<style scoped lang="scss">
.page-btn {
    margin: 0 8px;
    button {
        width: 32px;
        height: 32px;
        border: none;
        outline: none;
        background-color: #f6f6f6;
        box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.15);
        cursor: pointer;
        transition: 0.1s;
        &:hover {
            background-color: #f2f2f2;
            box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.25);
        }
    }
    .active {
        color: #fff;
        background-color: #bfbfbf;
    }
}
</style>