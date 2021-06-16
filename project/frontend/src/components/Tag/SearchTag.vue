<template>
    <div class="search__tag">
        <div class="search">
            <span v-if="!isTagValid" class="invalid">タグはこれ以上追加できません</span>
            <div class="search-box">
                <FontAwesomeIcon class="search-box__icon" :icon="['fas', 'search']" size="lg" />
                <input type="text" id="tag" name="tag" class="search-box__input" placeholder="タグで検索" @keydown.enter="addTag" @blur="clearValidity">
            </div>
            <div class="added-tags">
                <div v-for="(tag, id) in searchTags" :key="id" class="tag">
                    <span class="name">{{tag}}</span>
                    <span class="delete" @click="deleteTag(id)"><FontAwesomeIcon :icon="['fas', 'times']" /></span>
                </div>
            </div>
        </div>
        <div class="hit-tags">
            <h4>人気なタグ</h4>
            <BaseTag v-for="(tag, index) in hitTags"
                :key="index"
                :name="tag.tag_name"
                :clickable="true"
                @clickTag="clickTag"
            ></BaseTag>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tagLabel: {
            type: String,
            required: false,
        },
        searchTags: {
            type: Array,
            required: true,
        },
        hitTags: {
            type: Array,
            required: true,
        },
        maximum: {
            type: Number,
            required: false,
            default: 10,
        }
    },
    data() {
        return {
            isTagValid : true,
        }
    },
    methods: {
        clearValidity() {
            this.isTagValid = true;
        },
        tagValidation() {
            // tagの数が上限を超えていたら追加できないようにする
            if (this.searchTags.length >= this.maximum) {
                this.isTagValid = false;
            }
        },
        addTag(event) {
            event.preventDefault();

            // 追加の認証
            this.tagValidation();
            if (!this.isTagValid) {
                return;
            }

            // 追加
            const val = event.target.value.trim();
            if (val.length > 0) {
                this.searchTags.push(val);
                event.target.value = '';
            }
        },
        deleteTag(index) {
            this.searchTags.splice(index, 1);
        },
        clickTag(name) {
             // 追加の認証
            this.tagValidation();
            if (!this.isTagValid) {
                return;
            }

            this.searchTags.push(name);
        }
    }
}
</script>

<style lang="scss" scoped>
.search__tag {
    .base-tag {
        background-color: #fff;
    }
}

.search {
    margin-bottom: 1.52rem; // 2.47 / 1.618
}

.search-box {
    position: relative;
}

.search-box__icon {
    position: absolute;
    top: 12px;
    left: 10px;
}

.search-box__input {
    font-size: 20px;
    width: 100%;
    padding-left: 40px;
    height: 45px;
    border: 1px solid #fff;
    background-color: #fff;
    outline: none;
}

.added-tags {
    @include clear-float();
    
    .tag {
        float: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 6rem;
        margin: 0.96rem 0.96rem 0 0;
        padding: 0.3rem 0.5rem;
        color: #333;
        background-color: #fff;
        
        .name {
            font-size: 16px;
            font-weight: bold;
            margin-right: .5rem;
        }

        .delete {
            cursor: pointer;
        }
    }
}

.invalid {
    color: #ff4a4a;
}

.hit-tags { 
    @include clear-float();
    margin-bottom: 1rem;

    h4 {
        margin-bottom: 0.94rem; // 1.52 / 1.618
    }
}
</style>