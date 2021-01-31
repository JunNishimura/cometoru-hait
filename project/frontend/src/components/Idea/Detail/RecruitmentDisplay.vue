<template>
    <div class="recruitment__display">
        <div class="idea__header-subcontainer">
            <span class="subcontainer__icon"><FontAwesomeIcon :icon="['far', 'handshake']" size="lg" /></span>
            <h4>募集人材</h4>
        </div>
        <div class="recruitment__info">
            <div v-for="(rec, index) in currentRecruitments" :key="index">
                <h3 class="sentence">{{ rec.kind }} / {{ rec.number }}人</h3>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['currentRecruitments'],
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