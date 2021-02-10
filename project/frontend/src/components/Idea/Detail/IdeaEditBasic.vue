<template>
    <BaseForm @submitFunc="updateHeaderInfo">
        <template #form-content>
            <div class="form-control idea__edit-title">
                <h3 class="input__title">タイトル</h3>
                <input type="text" id="edit-title" name="edit-title" v-model="inputData.title">
            </div>
            <div class="form-control idea__edit-tag">
                <h3 class="input__title">タグ</h3>
                <InputTag :tags="inputData.tags" :maximum="5" />
            </div>
            <div class="form-control idea__edit-deadline">   
                <h3 class="input__title">期限 / 締め切り</h3>
                <input type="datetime-local" id="date" name="date" v-model="inputData.deadline">
            </div>
            <div class="form-control idea__edit-recruitment">
                <div class="recruit__input-header">
                    <h3 class="input__title">募集人材</h3>
                    <span @click="addRecruitInput" class="add__recruit-btn">+</span>
                </div>
                <div class="recruit__input-list">
                    <RecruitInput 
                        v-for="(rec, index) in inputData.recruitments"
                        :key="index"
                        :index="index"
                        :recruit="rec"
                        @removeInput="removeRecruitInput"
                    />
                </div>
            </div>
        </template>
    </BaseForm>
</template>

<script>
import utils from '@/services/utils.js';
import apiHelper from '@/services/apiHelper.js';
import InputTag from '@/components/Tag/InputTag.vue';
import RecruitInput from '@/components/Idea/Detail/RecruitInput.vue';

export default {
    components: {
        InputTag,
        RecruitInput,
    },
    props: {
        myUserId: {
            type: String,
        },
        ideaId: {
            type: String,
        },
        currentTitle: {
            type: String,
        },
        currentTags: {
            type: Array,
        },
        currentState: {
            type: String,
        },
        currentDeadline: {
            type: Date,
        },
        currentRecruitments: {
            type: Array,
        }
    },
    data() {
        return {
            inputData: {
                title: '',
                tags: [],
                deadline: null,
                recruitments: [{
                    kind: '',
                    number: 1,
                }]
            }
        }
    },
    methods: {
        removeRecruitInput(index) {
            this.inputData.recruitments.splice(index, 1);
        },
        addRecruitInput() {
            const newRecInput = { type: '', number: 1 };
            this.inputData.recruitments.push(newRecInput);
        },
        updateIdeaHeader() {
            const updateData = {
                user_id: this.myUserId,
                title: this.inputData.title,
                state: this.currentState,
                deadline: this.inputData.deadline,
            };

            apiHelper.putDate(updateData, this.ideaId)
            .then( () => {

            }).catch( err => {
                console.log("error to add date: ", err);
            })
        },
        updateTag() {
            // もしタグが未登録の場合はそのまま登録
            if(this.currentTags.length === 0) {
                const promises = [];
                for (const tag of this.inputData.tags) {
                    promises.push(apiHelper.postIdeaTag(this.ideaId, tag));
                }

                Promise.all(promises)
                .then( () => {
                    this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId } });
                }).catch( err => {
                    console.log("error to post new idea: ", err);
                });
            } else if (!utils.arrayEqual(this.currentTags, this.inputData.tags) ) {
                // もし元々のタグから変更があるなら全部消してから全てを追加する
                apiHelper.deleteAllIdeaTag(this.ideaId)
                .then(() => {
                    const promises = [];
                    for (const tag of this.inputTags) {
                        promises.push(apiHelper.postIdeaTag(this.ideaId, tag));
                    }

                    return Promise.all(promises)
                }).then( () => {
                    this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId } });
                }).catch(err => {
                    console.log("error to update tag: ", err)
                })
            } else {
                this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId } });
            }
        },
        updateRecruitments() {
            if (this.currentRecruitments.length === 0 && 
                (this.inputData.recruitments.length > 1 && this.inputData.recruitments[0] != '')) {
                const promises = [];
                for (const rec of this.inputData.recruitments) {
                    promises.push(apiHelper.postRecruitment(this.ideaId, rec.kind, rec.number));
                }

                Promise.all(promises)
                .then(() => {
                    this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId }});
                }).catch(err => {
                    console.log("error to add recruitments: ", err);
                })
            } else if (!utils.recruitmentsEqual(this.currentRecruitments, this.inputData.recruitments)) {
                apiHelper.deleteAllRecruitments(this.ideaId)
                .then(() => {
                    const promises = [];
                    for (const rec of this.inputData.recruitments) {
                        promises.push(apiHelper.postRecruitment(this.ideaId, rec.kind, rec.number))
                    }

                    return Promise.all(promises)
                }).then(() => {
                    this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId }});
                }).catch(err => {
                    console.log("error to update recruitments: ", err);
                })
            } else {
                this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId }});
            }
        },
        updateHeaderInfo() {
            this.updateIdeaHeader();
            this.updateRecruitments();
            this.updateTag();
        }
    },  
    created() {
        // 既存のデータを反映する
        this.inputData.title = this.currentTitle;
        this.inputData.tags  = this.currentTags.slice();
        this.inputData.deadline = this.currentDeadline;
        this.inputData.recruitments = this.currentRecruitments.slice();
    },
}
</script>

<style scoped>
.recruit__input-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.add__recruit-btn {
    cursor: pointer;
}
</style>