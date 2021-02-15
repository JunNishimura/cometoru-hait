<template>
    <div class="input__tag-comp">
        <label for="tag">
            {{ tagLabel }}
            <span v-if="!isTagValid" class="invalid">タグはこれ以上追加できません</span>
        </label>
        <input type="text" id="tag" name="tag" placeholder="e.g. Python" @keydown.enter="addTag" @blur="clearValidity">
        <div class="added-tags">
            <div v-for="(tag, id) in tags" :key="id" class="tag">
                <span class="name">{{tag}}</span>
                <span class="delete" @click="deleteTag(id)"><FontAwesomeIcon :icon="['fas', 'times']" /></span>
            </div>
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
        tags: {
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
            if (this.tags.length >= this.maximum) {
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
                this.tags.push(val);
                event.target.value = '';
            }
        },
        deleteTag(index) {
            this.tags.splice(index, 1);
        }
    }
}
</script>

<style lang="scss" scoped>
.input__tag-comp {
    label {
        font-size: 17px;
        font-weight: bold;
        display: block;
        text-align: left;
        margin-bottom: 0.25rem;
    }

    input {
        font-size: 16px;
        width: 100%;
        line-height: 1.5rem;
        padding-left: 0.5rem;
        outline: none;
        border: none;
        border-bottom: 1px solid #aaaaaa;

        &:focus {
            border-bottom: 2px solid $color-primary;
        }
    }
}

.added-tags {
    margin-top: 0.5rem;
    @include clear-float();

    .tag {
        min-width: 4rem;
        float: left;
        background-color: #eee;
        padding: 0.1rem 0.2rem;
        margin: 0.2rem;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .name {
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
</style>