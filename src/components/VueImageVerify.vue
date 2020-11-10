<template>
  <canvas
    ref="verify"
    :width="width"
    :height="height"
    @click="handleDraw"
  ></canvas>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, ref } from "vue";
export default {
  name: "VueImageVerify",
  setup() {
    const verify = ref<HTMLCanvasElement | null>(null);
    const state = reactive({
      width: 120,
      height: 40,
      pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", // 字符串
      imgCode: "",
    });

    onMounted(() => {
      state.imgCode = draw();
    });

    const handleDraw = () => {
      state.imgCode = draw();
    };

    const randomNum = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min) + min);
    };

    const randomColor = (min: number, max: number) => {
      const r = randomNum(min, max);
      const g = randomNum(min, max);
      const b = randomNum(min, max);
      return `rgb(${r},${g},${b})`;
    };

    const draw = () => {
      const ctx = verify.value && verify.value.getContext("2d");
      let imgCode = "";
      if (ctx) {
        ctx.fillStyle = randomColor(180, 230);
        ctx.fillRect(0, 0, state.width, state.height);

        for (let i = 0; i < 4; i++) {
          const text = state.pool[randomNum(0, state.pool.length)];
          imgCode += text;

          const fontSize = randomNum(18, 24);
          const deg = randomNum(-30, 30);

          ctx.font = fontSize + "px Simhei";
          ctx.textBaseline = "top";
          ctx.fillStyle = randomColor(80, 150);

          ctx.save();
          ctx.translate(30 * i + 15, 15);
          ctx.rotate((deg * Math.PI) / 100);
          ctx.fillText(text, 15 + 5, 15);
          ctx.restore();
        }

        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(randomNum(0, state.width), randomNum(0, state.height));
          ctx.lineTo(randomNum(0, state.width), randomNum(0, state.height));
          ctx.strokeStyle = randomColor(180, 230);
          ctx.closePath();
          ctx.stroke();
        }

        for (let i = 0; i < 40; i++) {
          ctx.beginPath();
          ctx.arc(
            randomNum(0, state.width),
            randomNum(0, state.height),
            1,
            0,
            2 * Math.PI
          );
          ctx.closePath();
          ctx.fillStyle = randomColor(150, 200);
          ctx.fill();
        }
      }
      return imgCode;
    };

    return {
      ...toRefs(state),
      handleDraw,
      verify,
    };
  },
};
</script>

<style lang="less"></style>
