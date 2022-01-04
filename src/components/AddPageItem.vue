<template>
  <div class="item relative flex items-center">
    <div class="mb-2">
      <div
        class="flex w-56 px-3"
        @mouseover="activeHover = true"
        @mouseleave="activeHover = false"
      >
        <div class="pr-2">
          <svg width="20" height="20">
            <use :xlink:href="`/src/assets/icons.svg#${page.icon}`"></use>
          </svg>
        </div>
        <div>
          <div class="font-medium text-gray-200">{{ page.name }}</div>
          <div>{{ page.desc }}</div>
        </div>
      </div>
    </div>

    <div
      class="absolute right-0 text-black w-72 bg-gray-300 p-1"
      v-if="activeHover"
    >
      <div class="w-full h-36 bg-green-600">image</div>
      <div>
        {{ page.desc }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: ["page"],

  setup() {
    const activeHover = ref(false);

    return { activeHover };
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 512px;
}
</style>