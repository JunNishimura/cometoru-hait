<template>
    <div id="login-page">
        <AuthModel mode="login">
            <template #form>
                <BaseForm @submitFunc="login" headerTitle="ログイン">
                    <template #form-content>
                        <div class="form-control" :class="{invalid: !username.isValid}">
                            <label for="username">ユーザー名 <span class="necessary">[必須]</span></label>
                            <p v-if="!username.isValid">ユーザー名は必須項目です</p>
                            <input type="text" id="username" name="username" v-model.trim="username.val" @blur="clearValidity('username')">
                        </div>
                        <div class="form-control" :class="{invalid: !email.isValid}">
                            <label for="email">メールアドレス <span class="necessary">[必須]</span></label>
                            <p v-if="!email.isValid">メールアドレスは必須項目です</p>
                            <input type="email" id="email" name="email" v-model.trim="email.val" @blur="clearValidity('email')">
                        </div>
                        <div class="form-control" :class="{invalid: !password.isValid}">
                            <label for="password">パスワード <span class="necessary">[必須]</span></label>
                            <p v-if="!password.isValid">パスワードは必須項目です</p>
                            <input type="password" id="password" name="password" v-model="password.val" @blur="clearValidity('password')">
                        </div>
                        <div class="form-control forget">
                            <a href="#">パスワードを忘れましたか?</a>
                        </div>
                    </template>
                </BaseForm>
            </template>
        </AuthModel>
    </div>
</template>

<script>
import AuthModel from '@/components/Auth/AuthModel.vue';
export default {
    components: {
        AuthModel,
    },
    data() {
        return {
            username: {
                val: '',
                isValid: true,
            },
            email: {
                val: '',
                isValid: true,
            },
            password: {
                val: '',
                isValid: true,
            },
            isFormValid: true,
        };
    },
    methods: {
        clearValidity(input) {
            this[input].isValid = true;
        },
        clearForm() {
            this.username = {
                val: '',
                isValid: true,
            };
            this.email = {
                val: '',
                isValid: true,
            };
            this.password = {
                val: '',
                isValid: true,
            };
        },
        formValidation() {
            this.isFormValid = true;

            if (this.username.val === '') {
                this.username.isValid = false;
                this.isFormValid = false;
            }

            if (this.email.val === '') {
                this.email.isValid = false;
                this.isFormValid = false;
            }

            if (this.password.val === '') {
                this.password.isValid = false;
                this.isFormValid = false;
            }
        },
        login() {
            this.formValidation();

            // not to login if the form is invalid
            if (!this.isFormValid) {
                return;
            }

            const userData = {
                username: this.username.val,
                email: this.email.val,
                password: this.password.val,
            };
            this.$store.dispatch('auth/login', userData);

            // clear input
            this.clearForm();

            // redirect to /ideas
            this.$router.replace({ name: 'ideas' });
        }
    }
}
</script>