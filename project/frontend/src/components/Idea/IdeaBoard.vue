<template>
    <div class="idea__board">
        <Pagination
            :items="ideas"
            :itemNumPerPage="5" 
        />
    </div>
</template>

<script>
import Pagination from '@/components/Layout/Pagination.vue'

export default {
    components: {
        Pagination
    },
    props: ['ideas']
}
</script>