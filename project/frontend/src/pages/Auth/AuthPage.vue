<template>
    <div id="auth__page">
        <BaseCard>
            <router-view />
        </BaseCard>
    </div>
</template>

<style scoped>
#auth__page {
    padding: 2rem 0;
}

.card {
    max-width: 30rem;
    padding: 2rem;
}
</style>
