<template>
    <div class="vertical__tab">
        <div class="vertical__tab-title">
            <h1>{{title}}</h1>
        </div>
        <ul class="vertical__tab-links">
            <slot name="tab-link"></slot>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style lang="scss" scoped>
.vertical__tab {
    width: 15rem;
    color: #000;
}

.vertical__tab ul {
    list-style: none;
}

.vertical__tab a:hover {
    color: #182b3e;
    background-color: $color-secondary;
}

.vertical__tab-title {
    font-weight: bold;
    padding: 0.5rem 1rem;
    text-align: left;
}

.vertical__tab-links a {
    color: #000;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    padding: .5rem;
    transition: all .15s ease-out;
    display: block;
    cursor: pointer;
}

.router-link-active {
    background-color: $color-primary !important;
}
</style>