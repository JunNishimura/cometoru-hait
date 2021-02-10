<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('auth/autoLogin');
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Noto Serif JP', serif;
    margin: 0;
    padding: 0;
}

button, input, textarea {
    font-family: inherit;
}

h1, h2, h3, h4, h5 {
    padding: 0;
    margin: 0;
}

ul {
    padding: 0;
    margin: 0;
}
</style>