<template>
    <div class="idea__delete-modal">
        <h1>アイデアを削除してもよろしいですか？</h1>
        <div class="delete__choice">
            <div><span @click="deleteIdea" class="delete__yes">はい</span></div>
            <div><span @click="cancelDelete" class="delete__no">いいえ</span></div>
        </div>
    </div>
</template>

<script>
import asyncProcessing from '@/services/asyncProcessing.js';

export default {
    props: {
        ideaId: {
            required: true
        }
    },
    methods: {
        deleteIdea() {
            asyncProcessing.deleteIdea(this.ideaId)
            .then(() => {
                // 削除後はideasページに遷移
                this.$router.replace({ name: 'ideas' });
            }).catch( err => {
                console.log("error to delete idea: ", err);
            })
        },
        cancelDelete() {
            this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId } });
        }
    }
}
</script>

<style lang="scss" scoped>
.delete__choice {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    div {
        margin: 0 1rem;
        font-size: 20px;
        cursor: pointer;
    }
}

$color-delete: #ff3535;
$color-no-delete: #eee;
%delete-btn-padding {
    padding: 0.7rem 1.2rem;
}

.delete__yes {
    @extend %delete-btn-padding;

    &:hover {
        color: #fff;
        background-color: $color-delete;
    }

    &:active {
        background-color: darken($color-delete, 15%);
    }
}

.delete__no {
    @extend %delete-btn-padding;

    &:hover {
        background-color: $color-no-delete;
    }

    &:active {
        background-color: darken($color-no-delete, 15%);
    }
}
</style>