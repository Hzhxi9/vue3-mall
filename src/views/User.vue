<template>
<div>
    <van-nav-bar title="账号管理" left-arrow @click-left="goBack" />
    <van-form @submit="submit">
        <van-field v-model="nickName" name="nickName" label="昵称" />
        <van-field v-model="introduceSign" name="introduceSign" label="个性签名" />
        <van-field v-model="password" type="password" name="password" label="修改密码" placeholder="请输入密码" />
        <van-field v-model="passwordConfirm" type="password" name="passwordConfirm" label="确认密码" placeholder="请确认密码" />
        <div class="footer-btn">
            <van-button round block color="#1baeae" native-type="submit">
                保存
            </van-button>
            <van-button round block color="#1baeae" @click="logout">
                退出登录
            </van-button>
        </div>
    </van-form>
</div>
</template>

<script lang="ts">
import {
    Toast
} from "vant";
import {
    useRoute,
    useRouter
} from "vue-router";
import {
    reactive,
    toRefs,
    onMounted
} from "vue";
import {
    editUserInfo,
    getUserInfo,
    logout
} from "../api/api";
import mixins from "../mixins";
// import md5 from "js-md5";
import {
    useStore
} from "vuex";
import {
    UserMutations
} from "../store/mutation-types";

export default {
    name: "User",
    mixins: [mixins],
    setup() {
        const route = useRoute();
        const store = useStore();
        const router = useRouter();
        const state = reactive({
            nickName: "",
            introduceSign: "",
            password: "",
            passwordConfirm: "",
        });

        onMounted(async () => {
            const {
                nickName,
                introduceSign
            } = await getUserInfo();
            state.nickName = nickName;
            state.introduceSign = introduceSign;
        });

        const submit = async (values: {
            nickName: string;
            introduceSign: string;
            password: string;
            passwordConfirm: string;
        }) => {
            if (values.password !== values.passwordConfirm) {
                Toast.fail("两次密码输入不一致");
                return;
            }
            const params = {
                introduceSign: state.introduceSign,
                nickName: state.nickName,
                passwordMd5: undefined,
            };
            values.password && (params.passwordMd5 = mvalues.password);
            // values.password && (params.passwordMd5 = md5(values.password));
            await editUserInfo(params);
            Toast.success("保存成功");
        };

        const logout = async () => {
            try {
                await logout();
                localStorage.clear();
                store.commit(UserMutations.SET_TOKEN, null);
                Toast.success("退出成功");
                window.location.href = "/";
            } catch (error) {
                console.log(error);
            }
        };

        return {
            ...toRefs(state),
            submit,
            logout,
        };
    },
};
</script>

<style lang="less" scoped>
.footer-btn {
    margin: 8.533vw;

    button {
        margin-top: 2.67vw;
    }
}
</style>
