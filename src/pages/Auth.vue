<template>
  <div class="auth flex items-center justify-center h-max">
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

<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function googleSignUp() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}
</script>

<style lang="scss">
.auth {
  height: 100vh;
}
</style>