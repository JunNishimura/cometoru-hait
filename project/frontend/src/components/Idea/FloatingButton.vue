<template>
    <div class="floating__button">
        <div class="floating__button-icon" >
            <router-link :to="linkTo">
                <slot name="icon"></slot>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        linkTo: {
            type: String,
            required: true,
        },
        bgColor: {
            type: String,
            required: false,
        },
        fixed: {
            type: String,
            default: 'fixed'
        }
    }
}
</script>

<style lang="scss" scoped>
.floating__button {
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    cursor: pointer;
    background-color: $color-primary;
}

.floating__button-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        display: block;
        color: #fff;
        width: 100%;
        padding: 0.5rem;
        border-radius: 50%;
        text-align: center;
    }
}
</style>