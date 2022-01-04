<template>
  <div class="w-96 relative">
    <div class="w-40 shrink bg-gray-800 h-full p-3 shadow-lg">
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
        <div class="mt-12 flex">
          <button class="btn-page flex" @click="showAddPage">
            <div class="w-8 flex justify-center">
              <svg width="20" height="20">
                <use xlink:href="@/assets/icons.svg#add"></use>
              </svg>
            </div>
            <div class="ml-2">Add a page</div>
          </button>
          <div class="absolute right-0">
            <div
              class="list-page h-auto w-55 bg-gray-800 rounded py-1"
              v-if="AddPage"
            >
              <addPageItem
                v-for="(page, index) in pages"
                :key="index"
                :page="page"
              ></addPageItem>
            </div>
          </div>
        </div>
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
  </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "@/firebase/firebaseConfig";
import { onMounted } from "@vue/runtime-core";
import addPageItem from "@/components/AddPageItem.vue";

export default {
  components: { addPageItem },

  setup() {
    const user = ref({
      name: auth.currentUser.displayName,
      photo: auth.currentUser.photoURL,
    });

    const pages = [
      {
        name: "Todo",
        desc: "Создание задач",
        icon: "todo",
      },
      {
        name: "List",
        desc: "Создание списка",
        icon: "list",
      },
    ];

    const AddPage = ref(false);

    const showAddPage = () => {
      AddPage.value = !AddPage.value;
    };

    // onMounted(() => {
    //   document.addEventListener("click", (e) =>
    //     console.log(e.target.className)
    //   );
    // });

    return { user, AddPage, showAddPage, pages };
  },
};
</script>

<style>
</style>