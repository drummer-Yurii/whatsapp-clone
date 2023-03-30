<template>
    <div class="w-full">
        <div class="bg-teal-600 z-[-1] w-full h-[255px] fixed top-0"></div>
        <div class="bg-[#191919] z-[-1] w-full h-[calc(100vh-255px)] fixed bottom-0"></div>

        <div class="max-w-xl mx-auto">
            <div class="mt-10 flex items-center w-full">
                <img width="40" src="whatsapp-logo.png" alt="">
                <div class="font-semibold text-gray-100 ml-6">WHATSAPP WEB</div>
            </div>

            <div class="bg-white z-10 p-24 m-6 mt-10">
                <div class="text-center text-4xl text-gray-700 font-light pb-10">
                    WhatsApp Clone
                </div>
                <div class="w-full flex justify-center bg-[#191919] p-3 rounded-md">
                    <GoogleLogin :callback="callback" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';

const callback = async (response) => {
    console.log(response);

    try {
        let res = await axios.post('http://localhost:4001/api/google-login', {
            token: response.credential
        })
        console.log(res.data);
    } catch (error) {
        console.log(error);   
    }
}
</script>