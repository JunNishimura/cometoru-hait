<template>
    <BaseForm @submitFunc="updateDetailInfo">
        <template #form-content>
            <div class="form-control idea__edit-overview">
                <h3 class="input__title">概要</h3>
                <ResizableTextarea v-model="overview"/>
            </div>
            <div class="form-control idea__edit-target">
                <h3 class="input__title">ターゲット</h3>
                <ResizableTextarea v-model="target"/>
            </div>
            <div class="form-control idea__edit-background">
                <h3 class="input__title">背景</h3>
                <ResizableTextarea v-model="background"/>   
            </div>
            <div class="form-control idea__edit-value">
                <h3 class="input__title">価値創造</h3>
                <ResizableTextarea v-model="createdValue"/>
            </div>
            <div class="form-control idea__edit-passion">
                <h3 class="input__title">情熱</h3>
                <ResizableTextarea v-model="passion"/>
            </div>
        </template>
    </BaseForm>
</template>

<script>
import asyncProcessing from '@/services/asyncProcessing.js';
import ResizableTextarea from '@/components/UI/ResizableTextarea.vue';

export default {
    components: {
        ResizableTextarea
    },
    props: {
        myUserId: {
            required: true
        },
        ideaId: {
            required: true
        },
        ideaDetail: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            overview: '',
            target: '',
            background: '',
            createdValue: '',
            passion: '',
        }
    },
    methods: {
        updateDetailInfo() {
            const ideaData = {
                user_id: this.myUserId,
                title: this.ideaDetail.title,
                overview: this.overview,
                target: this.target,
                background: this.background,
                value: this.createdValue,
                passion: this.passion,
                state: this.ideaDetail.state,
                deadline: this.ideaDetail.deadline,
                idea_image: this.ideaDetail.idea_image
            }

            asyncProcessing.putIdea(ideaData, this.ideaId)
            .then(() => {
                this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId } })
            }).catch( err => {
                console.log("error to post new idea: ", err);
            });
        }
    },  
    created() {
        // 既存のデータを反映する
        this.overview     = this.ideaDetail.overview;
        this.target       = this.ideaDetail.target;
        this.background   = this.ideaDetail.background;
        this.createdValue = this.ideaDetail.value;
        this.passion      = this.ideaDetail.passion;
    },
}
</script>