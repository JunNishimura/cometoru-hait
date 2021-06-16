<template>
    <div class="auth__template">
        <BaseForm @submitFunc="submitForm" :headerTitle="title">
            <template #form-content>
                <div class="form-control" :class="{invalid: !username.isValid }">
                    <label for="username">ユーザー名 <span class="necessary">[必須]</span></label>
                    <p v-if="!username.isValid">ユーザー名が不適切です</p>
                    <input type="text" id="username" name="username" v-model.trim="username.val" @blur="clearValidity('username')">
                </div>
                <div class="form-control" :class="{invalid: !email.isValid }">
                    <label for="email">メールアドレス <span class="necessary">[必須]</span></label>
                    <p v-if="!email.isValid">メールアドレスが不適切です</p>
                    <input type="email" id="email" name="email" v-model.trim="email.val" @blur="clearValidity('email')">
                </div>
                <div class="form-control" :class="{invalid: !password1.isValid}">
                    <label for="password1">パスワード <span class="necessary">[必須]</span></label>
                    <p v-if="!password1.isValid">パスワードが不適切です</p>
                    <input type="password" id="password1" name="password1" v-model="password1.val" @blur="clearValidity('password1'); clearMatchPassword();">
                </div>
                <div class="form-control" :class="{invalid: !password2.isValid || !matchPassword }" v-if="authType=='signup'">
                    <label for="password2">パスワード（確認用） <span class="necessary">[必須]</span></label>
                    <p v-if="!password2.isValid">パスワード（確認用）が不適切です</p>
                    <p v-if="password1.isValid && password2.isValid && !matchPassword">パスワードが一致していません</p>
                    <input type="password" id="password2" name="password2" v-model="password2.val" @blur="clearValidity('password2')">
                </div>
            </template>
        </BaseForm>
    </div>
</template>

<script>
export default {
    props: {
        authType: String,
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
            password1: {
                val: '',
                isValid: true,
            },
            password2: {
                val: '',
                isValid: true,
            },
            isFormValid: true,
            matchPassword: true,
        }
    },
    computed: {
        title() {
            if (this.authType === 'signup') {
                return '新規登録';
            } else {
                return 'ログイン';
            }
        }
    },
    methods: {
        clearValidity(input) {
            this[input].isValid = true;
        },
        clearMatchPassword() {
            this.matchPassword = true;
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
            this.password1 = {
                val: '',
                isValid: true,
            };
            this.password2 = {
                val: '',
                isValid: true,
            };
            this.matchPassword = true;
        },
        emailValidation() {
            // 正規表現によるメールアドレスのチェック
            if (!this.email.val.match(/.+@.+\..+/)) {
                this.email.isValid = false;
                return false;
            }
            return true;
        },
        passwordValidation(password) {
            // 6文字以上を認める
            if (password.length < 6) {
                return false;
            }

            if (!password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) || // 英小文字と英大文字を含む
                !(password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) ) // 英字と数字を含む
            {
                return false;
            }

            return true;
        },
        validateForm() {
            this.isFormValid = true;

            if (this.username.val === '') {
                this.username.isValid = false;
                this.isFormValid = false;
            }

            if (!this.emailValidation()) {
                this.isFormValid = false;
            }

            // password1のチェック
            if (!this.passwordValidation(this.password1.val)) {
                this.password1.isValid = false;
                this.isFormValid = false;
            }

            // password2のチェック
            if (!this.passwordValidation(this.password2.val)) {
                this.password2.isValid = false;
                this.isFormValid = false;
            }

            // password1とpassword2の一致を確認
            if (this.password1.val != this.password2.val) {
                this.matchPassword = false;
                this.isFormValid = false;
            }

            // passwordエラーの場合はアラートを起動
            if (!(this.password1.val && this.password2.val)) {
                alert("パスワードは英小文字、英大文字、数字を含み6文字以上のみ有効です");
            }
        },
        signUp() {
            const userData = {
                username: this.username.val,
                email: this.email.val,
                password1: this.password1.val,
                password2: this.password2.val,
            };
            this.$store.dispatch('auth/signup', userData);

            // clear input
            this.clearForm();

            // redirect to /ideas'
            this.$router.replace({ name: 'ideas' });
        },
        login() {
            const userData = {
                username: this.username.val,
                email: this.email.val,
                password: this.password1.val,
            };
            this.$store.dispatch('auth/login', userData)
            .then( res => {
                console.log("result: ", res);
            })
            .catch(e => {
                console.log("error: ", e)
            })

            // clear input
            this.clearForm();

            // redirect to /ideas
            this.$router.replace({ name: 'ideas' });
        },
        submitForm() {
            // formのvalidationを確認
            this.validateForm();

            if (this.isFormValid) {
                if (this.authType === 'signup') {
                    this.signUp();
                } else if (this.authType === 'login') {
                    this.login();
                }
            }
        }
    }
}
</script>