<template>
  <div class="w-46 shrink bg-gray-800 h-full p-3 shadow-lg">
    <div class="flex items-center">
      <img
        :src="user.photo"
        alt=""
        class="
          rounded-md
          h-8
          w-8
          flex
          items-center
          justify-center
          border-2 border-blue-500
        "
      />
      <div class="ml-1">
        <p
          class="
            ml-1
            text-sm
            font-medium
            tracking-wide
            truncate
            text-gray-100
            font-sans
          "
        >
          {{ user.name }}
        </p>
      </div>
    </div>
    <div class="text-gray-300 text-sm mt-6">
      <button class="flex">
        <div class="w-8 flex justify-center">
          <svg width="20" height="20">
            <use xlink:href="/src/assets/icons.svg#notification"></use>
          </svg>
        </div>
        <div class="ml-2">notification</div>
      </button>
      <button class="flex mt-2">
        <div class="w-8 flex justify-center">
          <svg width="20" height="20">
            <use xlink:href="/src/assets/icons.svg#box"></use>
          </svg>
        </div>
        <div class="ml-2">e-mail</div>
      </button>
      <button class="flex mt-2">
        <div class="w-8 flex justify-center">
          <svg width="20" height="20">
            <use xlink:href="/src/assets/icons.svg#loupe"></use>
          </svg>
        </div>
        <div class="ml-2">find</div>
      </button>
    </div>
    <ul class="mt-12">
      <li
        class="
          flex
          w-full
          justify-between
          text-gray-300
          hover:text-gray-500
          cursor-pointer
          items-center
          mb-6
        "
      >
        <div class="flex items-center">
          <span class="text-sm ml-2">Table</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "@/firebase/firebaseConfig";

export default {
  setup() {
    const user = ref({
      name: auth.currentUser.displayName,
      photo: auth.currentUser.photoURL,
    });

    return { user };
  },
};
</script>

<style>
</style>