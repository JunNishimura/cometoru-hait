<template>
    <div class="base__form">
        <form @submit.prevent="$emit('submitFunc')">
            <div class="form__header-title">
                <h1>{{ headerTitle }}</h1>
                <slot name="form-header"></slot>
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

.form__content {
    text-align: left;
}

.form-control {
    margin-bottom: 1.25rem;
}

.form-control p {
    font-size: 14px;
}

.form-control label {
    font-size: 17px;
    font-weight: bold;
    display: block;
    margin-bottom: 0.25rem;
}

.form__content .form-control input[type="text"],
.form__content .form-control input[type="email"],
.form__content .form-control input[type="url"],
.form__content .form-control textarea {
    font-size: 16px;
    width: 100%;
}

.form__content .form-control input[type="text"],
.form__content .form-control input[type="email"],
.form__content .form-control input[type="url"] {
    line-height: 1.5rem;
    padding-left: 0.5rem;
    outline: none;
    border: none;
    border-bottom: 1px solid #aaaaaa;
}

.form__content .form-control textarea:focus,
.form__content .form-control input[type="text"]:focus
.form__content .form-control input[type="email"]:focus,
.form__content .form-control input[type="url"]:focus {
    border-bottom: 2px solid $color-primary;
}

.form__submit {
    margin-top: auto;
}

.submit-button {
    margin-top: 2rem;
    font-size: 18px;
    font-weight: bold;
    background-color: $color-tertiary;
}

.submit-button:hover {
    background-color: $color-secondary;
}

.necessary,
.forget a,
.invalid p {
    color: #ff3535;
}

.forget {
    text-align: center;
}

.invalid input {
    border-color: #ff3535;
}
</style>