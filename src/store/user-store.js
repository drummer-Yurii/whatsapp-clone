import { defineStore } from 'pinia';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { db } from '@/firebase-init';
import { getDoc, setDoc, doc, getDocs, collection, updateDoc, arrayUnion, onSnapshot, query } from 'firebase/firestore';

axios.defaults.baseURL = 'http://localhost:4001/'

export const useUserStore = defineStore('user', {
    state: () => ({
        sub: '',
        email: '',
        picture: '',
        firstName: '',
        lastName: '',
        chats: [],
        allUsers: [],
        userDataForChat: [],
        showFindFriends: false,
        currentChat: null
    }),
    actions: {
        async getUserDetailsFromGoogle(data) {
            try {
                let res = await axios.post('api/google-login', {
                    token: data.credential
                });

                let userExists = await this.checkIfUserExists(res.data.sub);
                if (!userExists) await this.saveUserDetails(res);

                this.sub = res.data.sub
                this.email = res.data.email
                this.picture = res.data.picture
                this.firstName = res.data.given_name
                this.lastName = res.data.family_name
            } catch (error) {
                console.log(error);
            }
        },

        async getAllUsers() {
            const querySnapshot = await getDocs(collection(db, "users"))
            let results = []
            querySnapshot.forEach(doc => { results.push(doc.data()) })

            if (results.length) {
                this.allUsers = []
                results.forEach(res => { this.allUsers.push(res) })
            }
        },

        async checkIfUserExists(id) {
            const docRef = doc(db, "users", id)
            const docSnap = await getDoc(docRef)
            return docSnap.exists()
        },

        async saveUserDetails(res) {
            try {
                await setDoc(doc(db, "users", res.data.sub), {
                    sub: res.data.sub,
                    email: res.data.email,
                    picture: res.data.picture,
                    firstName: res.data.given_name,
                    lastName: res.data.family_name,
                })
            } catch (error) {
                console.log(error);
            }
        },

        async getChatById(id) {
            onSnapshot(doc(db, "chat", id), (doc) => {
                let res = []
                res.push(doc.data())
                this.currentChat = res
            })
        },

        async sendMessage(data) {
            try {
                if (data.chatId) {
                    await updateDoc(doc(db, `chat/${data.chatId}`), {
                        sub1HasViewed: false,
                        sub2HasViewed: false,
                        messages: arrayUnion({
                            sub: this.sub,
                            message: data.message,
                            createdAt: Date.now()
                        })
                    })
                } else {
                    let id = uuid()
                    await setDoc(doc(db, `chat/${id}`), {
                        sub1: this.sub,
                        sub2: data.sub2,
                        sub1HasViewed: false,
                        sub2HasViewed: false,
                        messages: [{
                            sub: this.sub,
                            message: data.message,
                            createdAt: Date.now()
                        }]
                    })
                    this.userDataForChat[0].id = id
                    this.showFindFriends = false
                }
            } catch (error) {
                console.log(error);
            }
        },
        
        logout() {
            this.sub = ''
            this.email = ''
            this.picture = ''
            this.firstName = ''
            this.lastName = ''
            this.allUsers = []
            this.userDataForChat = []
            this.showFindFriends = false
        }
    },
    persist: true
})