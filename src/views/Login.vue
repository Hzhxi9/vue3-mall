<template>
<van-nav-bar :title="isLogin ? '登录' : '注册'" left-arrow @click-left="goBack" />
<div class="main">
    <img class="logo" src="//s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png" alt="" />
    <van-form @submit="submit">
        <van-field v-model="username" name="username" label="用户名" placeholder="请填写用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="请填写密码" :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field v-model="verify" name="verify" label="用户名" placeholder="请填写验证码" clearable :rules="[{ required: true, message: '请填写验证码' }]" :style="{ alignItems: 'center' }">
            <template #extra>
                <ImageVerifyComp ref="verifyRef" />
            </template>
        </van-field>
        <div class="footer-btn">
            <p @click="toggle">{{ isLogin ? "立即注册" : "已有登录账号" }}</p>
            <van-button round block color="#1baeae" native-type="submit">
                {{ isLogin ? "登录" : "注册" }}
            </van-button>
        </div>
    </van-form>
</div>
</template>

<script lang="ts">
import mixins from "../mixins";
import ImageVerifyComp from "../components/ImageVerifyComp.vue";
import md5 from "js-md5";
import {
    login,
    register
} from "../api/api";
import {
    reactive,
    toRefs,
    ref
} from "vue";
import {
    useStore
} from "vuex";
import {
    useRouter
} from "vue-router";
import {
    Toast
} from "vant";
import {
    UserMutations
} from "../store/mutation-types";

export default {
    name: "Login",
    mixins: [mixins],
    components: {
        ImageVerifyComp,
    },
    setup() {
        const verifyRef = ref(null) as any | null;
        const store = useStore();
        const router = useRouter();
        const state = reactive({
            isLogin: true,
            username: "",
            password: "",
            verify: "",
        });

        const submit = async (value: {
            username: string;
            password: string;
            verify: string;
        }) => {
            if (value.verify.toUpperCase !== verifyRef.value.imgCode.toUpperCase) {
                Toast.fail("验证码有误");
                return;
            }
            if (state.isLogin) {
                const res = await login({
                    loginName: value.username,
                    passwordMd5: md5(value.password),
                });

                store.commit(UserMutations.SET_TOKEN, res);
                localStorage.setItem("token", res);
                Toast.success("登录成功");
                router.back();
            } else {
                try {
                    await register({
                        loginName: value.username,
                        password: value.password,
                    });
                    Toast.success("注册成功");
                    state.isLogin = true;
                    state.verify = "";
                    state.username = "";
                    state.password = "";
                } catch (error) {
                    console.error(error);
                }
            }
        };

        const toggle = () => {
            state.isLogin = !state.isLogin;
            state.verify = "";
            state.username = "";
            state.password = "";
            verifyRef.value && verifyRef.value.handleDraw();
        };

        return {
            ...toRefs(state),
            submit,
            toggle,
            verifyRef,
        };
    },
};
</script>

<style lang="less" scoped>
.main {
    height: calc(100vh - 46px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
        width: 32vw;
        height: 32vw;
        display: block;
        margin-bottom: 5.33vw;
    }

    .footer-btn {
        margin: 8.533vw;

        p {
            margin-bottom: 5.33vw;
            font-size: 3.73vw;
            color: #1989fa;
        }
    }
}
</style>
