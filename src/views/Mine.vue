<template>
<div class="warp">
    <div class="user-info">
        <img src="//s.yezgea02.com/1604040746310/aaaddd.png" alt="头像" />
        <ul>
            <li>
                <div>昵称</div>
                <span>{{ info ? info.nickName : "" }}</span>
            </li>
            <li>
                <div>登录名</div>
                <span>{{ info ? info.loginName : "" }}</span>
            </li>
            <li>
                <div>个性签名</div>
                <span>{{ info ? info.introduceSign : "" }}</span>
            </li>
        </ul>
    </div>

    <nav>
        <van-cell title="我的订单" is-link to="/order" />
        <van-cell title="账号管理" is-link to="/user" />
        <van-cell title="地址管理" is-link to="/address" />
    </nav>

    <NavBarComp />
</div>
</template>

<script lang="ts">
import NavBarComp from "../components/NavBarComp.vue";
import {
    getUserInfo
} from "../api/api";
import {
    reactive,
    toRefs,
    onMounted
} from "vue";
import * as ResTypes from "../types/response";
export default {
    name: "Mine",
    components: {
        NavBarComp,
    },
    setup() {
        const state = reactive({
            info: null as ResTypes.UserInfoData | null,
        });

        onMounted(async () => {
            const res = await getUserInfo();
            state.info = res;
        });

        return {
            ...toRefs(state),
        };
    },
};
</script>

<style lang="less" scoped>
.user-info {
    display: flex;
    padding: 6.67vw 5.33vw;
    background: linear-gradient(90deg, #1baeae, #51c7c7);
    box-shadow: 0 0.53vw 1.33vw #269090;
    border-radius: 1.6vw;
    margin: 2.67vw;

    img {
        width: 16vw;
        height: 16vw;
        border-radius: 50%;
    }

    ul {
        margin-left: 5.33vw;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    li {
        display: flex;
        align-items: center;
    }

    div {
        padding-right: 2.67vw;
    }

    div,
    span {
        color: #fff;
        font-size: 3.73vw;
    }
}
</style>
