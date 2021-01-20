<template>
    <div class="recruitment__display">
        <div class="idea__header-subcontainer">
            <span class="subcontainer__icon"><FontAwesomeIcon :icon="['far', 'handshake']" size="lg" /></span>
            <h4>募集人材</h4>
        </div>
        <div class="recruitment__info">
            <div v-for="(rec, index) in recruitmentsSaved" :key="index">
                <h3 class="sentence">{{ rec.kind }} / {{ rec.number }}人</h3>
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    data() {
        return {
            loadComplete: false,
            recruitmentsSaved: [], // 現在DBで格納されているrecruitment情報
        }
    },
    props: ['ideaId'],
    created() {
        apiHelper.loadRecruitments(this.ideaId)
        .then (res => {
            if (res != null) {
                for (const item of res) {
                    const kind = item.kind;
                    const number = item.number;
                    this.recruitmentsSaved.push({
                        kind: kind,
                        number: number,
                    });
                }
            }
            
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get idea data at IdeaRecruitmentPage: ", err);
        })
    },
}
</script>

<style scoped>
.idea__header-subcontainer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.subcontainer__icon {
    width: 2rem;
    text-align: center;
}

.recruitment__info {
    margin: 0.5rem 0 0 1rem;
}

.recruitment__info h3 {
    color: #fa2e27;
}
</style>