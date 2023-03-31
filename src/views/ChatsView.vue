<template>
    <div id="Messages" class="pt-1 z-0 overflow-auto fixed h-[calc(100vh-100px)] w-[420px]">
        <div v-for="chat in chats" :key="chat">
            <MessageRowComponent :chat="chat" />
        </div>
    </div>
</template>

<script setup>
import MessageRowComponent from '@/components/MessageRowComponent.vue';

const openChat = async (chat) => {
    userDataForChat.value = []
    userDataForChat.value.push({
        id: chat.id,
        sub1: chat.sub1,
        sub2: chat.sub2,
        firstName: chat.user.firstName,
        picture: chat.user.picture,
    })
    try {
        await userStore.getChatById(chat.id)
    } catch (error) {
        console.log(error);
    }
}
</script>