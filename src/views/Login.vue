<template>
  <van-nav-bar title="登陆" left-arrow @click-left="goBack" />
  <div class="main">
    <img
      class="logo"
      src="//s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png"
      alt=""
    />
    <van-form @submit="submit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写验证码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import mixins from "../mixins";
import { reactive, toRefs } from "vue";

export default {
  name: "Login",
  mixins: [mixins],
  setup() {
    const state = reactive({});

    const submit = () => {
      //
    };

    return {
      ...toRefs(state),
      submit,
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
}
</style>
