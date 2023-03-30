<template>
  <div id="FindFriends" class="pt-[100px] overflow-auto fixed h-[100vh] w-full">
    <div v-for="user in userStore.allUsers" :key="user">
      <div v-if="hideMe(user)" class="flex w-full p-4 items-center cursor-pointer">
        <img class="rounded-full mr-4 w-12" :src="user.picture || ''" alt="">

        <div class="w-full">
          <div class="flex justify-between items-center">
            <div class="text-[15px] text-gray-600">{{ user.firstName }} {{ user.lastName }}</div>
          </div>
          <div class="flex items-center">
            <div class="text-[15px] text-gray-500">Hi, I'm using WhatsApp!</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../store/user-store';
const userStore = useUserStore();

const hideMe = (user) => {
  if (user.sub === userStore.sub) {
    return false
  }
  return true
}
</script>