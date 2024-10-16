import {defineStore} from 'pinia'
import axios from 'axios'
import apiClient from '@/services/AxiosClient'
import type { Organizer } from '@/types'


export const  useAuthStore = defineStore('auth',{
    state:()=>({
        token: null as string | null,
        user: null as Organizer | null,
        
    }),
    getters:{
        currentUserName(): string {
            return this.user?.name || ''
        },
        isAdmin(): boolean {
            return this.user?.roles.includes('ROLE_ADMIN') || false
        },
        authorizationHeader(): string {
            return `Bearer ${this.token}`
        }
    },
    actions:{
        login(email: string, passsword: string)
        {
            console.log("enter into authStore Login:", email ,", ", passsword);
              return apiClient
                .post('/api/v1/auth/authenticate', {
                  email: email,
                  password: passsword
                })
                .then((response) => {
                  console.log('response from login:', response)
                  this.token = response.data.access_token
                  this.user = response.data.user
                  console.log('token from Login:', this.token)
                  console.log('user from user:', this.user)

                  localStorage.setItem('access_token', this.token as string)
                  localStorage.setItem('user', JSON.stringify(this.user))
                  axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                  return response
                })

        },
          register(email: string, passsword: string,firstname: string, lastname: string, username:string){
            console.log("enter into authStore Register:", email ," ,", passsword,", ", firstname," ,", lastname,", ", username);
            
            return apiClient.post('/api/v1/auth/register', {
                email: email,
                password: passsword,
                firstname: firstname,
                lastname: lastname,
                username: username
            })
            .then
            (response => {
                console.log("response from register:", response.data);
                this.token = response.data.access_token
                this.user = response.data.user
                console.log("token from Login:", this.token);
                console.log("user from user:", this.user);
                
                localStorage.setItem('access_token', this.token as string)
                localStorage.setItem('user', JSON.stringify(this.user))
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                return response
            })
           
        },
        logout(){
            console.log('logout')
            this.token = null
            this.user = null
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
        },
        reload(token: string, user: Organizer){
            this.token = token
            this.user = user

        }
    }
})