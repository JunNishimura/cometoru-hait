<template>
    <div class="base__form">
        <form @submit.prevent="$emit('submitFunc')">
            <div class="form__header-title">
                <h1>{{ headerTitle }}</h1>
            </div>
            <div class="form__content">
                <slot name="form-content"></slot>
            </div>
            <div class="form__submit">
                <BaseButton class="submit-button">送信</BaseButton>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        headerTitle: {
            style: String,
            required: false,
        }
    }
}
</script>

<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.base__form {
    color: #000;
    background: #fff;
}

.form__header-title h1 {
    font-weight: bold;
    margin-bottom: 2rem;
}

.form-control {
    margin-bottom: 1.25rem;

    p {
        margin: 0;
        font-size: 12px;
    }
    
    label {
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        display: block;
    }

    input:not([type="file"]) {
        font-size: 16px;
        width: 100%;
        line-height: 1.5rem;
        outline: none;
        border: none;
        border-bottom: 1px solid #aaaaaa;

        &:focus {
            border-bottom: 2px solid $color-primary;
        }
    }

    textarea {
        font-size: 16px;
        width: 100%;

        &:focus {
            border-bottom: 2px solid $color-primary;
        }
    }
}

.form__submit {
    margin-top: auto;
}

.submit-button {
    margin-top: 2rem;
    font-size: 18px;
    font-weight: bold;
    background-color: $color-tertiary;
    
    &:hover {
        background-color: $color-secondary;
    }
}

.necessary,
.forget a,
.invalid p {
    color: #ff3535;
}

.necessary {
    font-size: 12px;
}

.forget {
    text-align: center;
}

.invalid input {
    border-color: #ff3535;
}
</style>