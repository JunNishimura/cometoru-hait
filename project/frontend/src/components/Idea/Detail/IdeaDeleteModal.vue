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
import apiHelper from '@/services/apiHelper.js';

export default {
    props: {
        ideaId: {
            required: true
        }
    },
    methods: {
        deleteIdea() {
            apiHelper.deleteIdea(this.ideaId)
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

<style scoped>
.delete__choice {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}

.delete__choice div {
    margin: 0 1rem;
    font-size: 20px;
    cursor: pointer;
}

.delete__yes, 
.delete__no {
    padding: 0.7rem 1.2rem;
}

.delete__yes:hover {
    color: #fff;
    background-color: #ff3535;
}
</style>