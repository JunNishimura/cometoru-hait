<template>
    <BaseForm @submitFunc="addQuestion">
        <template #form-content>
            <div class="form-control">
                <h3 class="input__title">質問</h3>
                <input type="text" id="question" name="question" placeholder="質問を入力" v-model.trim="inputQuestion">
            </div>
        </template>
    </BaseForm>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    props: {
        ideaId: {
            required: true,
        },
    },
    methods: {
        addQuestion() {
            apiHelper.addQuestion(this.ideaId, this.inputQuestion) 
            .then( () => {
                this.$router.go({name: 'feedback', params: { ideaId: this.ideaId }});
            }).catch( err => {
                console.log("error to add question: ", err);
            })
        },
    },
    data() {
        return {
            inputQuestion: '',
        }
    },
}
</script>