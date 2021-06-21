<template>
    <div class="pagination">
        <div class="item-list">
            <IdeaElement
                v-for="item in displayItems"
                :key="item.idea_id"
                :idea_id="item.idea_id"
                :user_id="item.user_id"
                :title="item.title"
                :overview="item.overview"
                :idea_date="item.idea_date"
                :deadline="item.deadline"
            ></IdeaElement>
        </div>
        <div class="page-btns">
            <page-button @changePage="changePage" v-for="n in pageNum" 
                :key="n" 
                :pageNumber="n"
                :curPage="curPage"
            />
        </div>
    </div>
</template>

<script>
import IdeaElement from '@/components/Idea/IdeaElement.vue';
import PageButton from '@/components/Layout/PageButton.vue';

export default {
    components: {
        IdeaElement,
        PageButton
    },
    props: {
        items: Array,
        itemNumPerPage: Number,
    },
    data() {
        return {
            curPage: 1, // curPage starts from 1
            pageNum: 0, // number os pages
        }
    },
    created() {
        this.calcPageNum();
    },
    computed: {
        displayItems() {
            const startIdx = (this.curPage - 1) * this.itemNumPerPage;
            const endIdx   = startIdx + this.itemNumPerPage;
            return this.items.slice(startIdx, endIdx);
        },
    },
    methods: {
        changePage(value) {
            this.curPage = value;
        },
        calcPageNum() {
            this.pageNum =  Math.ceil(this.items.length / this.itemNumPerPage);
        }
    }
}
</script>

<style scoped lang="scss">
.pagination {
    width: 100%;
    .page-btns {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>