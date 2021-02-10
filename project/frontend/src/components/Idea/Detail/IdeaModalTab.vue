<template>
    <BaseHorizontalTab justifyContentType="flex-start">
        <template #horizontal-tab>
            <li>
                <button @click="$emit('setEditPage', 'basic'); selectTab('basic')" 
                        class="modal__tab-btn" 
                        :class="{'selected-colored': selectedTab === 'basic'}">
                    基本
                </button>
            </li>
            <li>
                <button @click="$emit('setEditPage', 'detail'); selectTab('detail')" 
                        class="modal__tab-btn" 
                        :class="{'selected-colored': selectedTab === 'detail'}">
                    詳細
                </button>
            </li>
            <li>
                <button @click="$emit('setEditPage', 'image'); selectTab('image')" 
                        class="modal__tab-btn" 
                        :class="{'selected-colored': selectedTab === 'image'}">
                    画像
                </button>
            </li>
            <li>
                <button @click="$emit('setEditPage', 'question'); selectTab('question')" 
                        class="modal__tab-btn" 
                        :class="{'selected-colored': selectedTab === 'question'}">
                    質問
                </button>
            </li>
        </template>
    </BaseHorizontalTab>
</template>

<script>
export default {
    data() {
        return {
            selectedTab: 'basic'
        }
    },
    methods: {
        selectTab(name) {
            this.selectedTab = name;      
        }
    }
}
</script>

<style lang="scss" scoped>
.horizontal__tab-list {
    justify-content: flex-start;
}

.modal__tab-btn {
    background-color: #fff;
    width: 8rem;
    padding: 1rem;
    font-size: 20px;
    font-weight: 700;
    border: none;
    outline: none;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}

.selected-colored {
    background-color: $color-tertiary;
    border-bottom: 3px solid $color-primary;
}
</style>