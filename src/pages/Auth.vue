<template>
  <div class="auth w-full flex items-center justify-center h-max">
    <div class="text-center">
      <div class="text-2xl">Welcome</div>
      <button
        class="
          flex
          items-center
          bg-red-500
          rounded
          text-white
          p-2
          mt-2
          hover:bg-red-700
        "
        @click="googleSignUp"
      >
        <div class="inline-flex items-center">
          <svg width="24" height="24">
            <use xlink:href="/src/assets/icons.svg#google-icon"></use>
          </svg>
        </div>
        <div class="pl-2">Sign In with Google</div>
      </button>
    </div>
  </div>
</template>

<script>
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { auth, provider } from "@/firebase/firebaseConfig";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    function googleSignUp() {
      signInWithPopup(auth, provider)
        .then(() => {
          store.dispatch("authUser");
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return {
      googleSignUp,
    };
  },
};
</script>

<style lang="scss">
.auth {
  height: 100vh;
}
</style>