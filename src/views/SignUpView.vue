<script setup lang="ts">
import InputText from '@/components/InputText.vue';
import { ref } from 'vue';
import * as yup from "yup";
import {useField,useForm} from 'vee-validate'
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import { useAuthStore } from '@/stores/auth';

const messageStore = useMessageStore();

const authStore = useAuthStore();
const validationSchema = yup.object({
    email: yup.string().required('The email is required'),
    password: yup.string().required('The password is required')
})
const {errors, handleSubmit}= useForm({
    validationSchema,
    initialValues:{
        email:'',
        password:'',
        firstname:'',
        lastname:'',
        username:''
    }
})
const {value:firstname} = useField<string>('firstname')
const {value:lastname} = useField<string>('lastname')
const {value:username} = useField<string>('username')
const {value:email} = useField<string>('email')
const {value:password} = useField<string>('password')

const router = useRouter();
const onRegister = handleSubmit((values)=>{
    console.log("Form submitted: ",values.email,values.password,values.firstname,values.lastname,values.username);
    
    authStore.register(values.email, values.password,values.firstname,values.lastname,values.username)
    .then(()=>{
        console.log('Register successful');
        router.push({name:'event-list-view'})
    })
    .catch((error)=>{
        messageStore.updateMessage('Register failed');
        setTimeout(()=>{
            messageStore.resetMessage();
        },3000)
       // console.log('Login failed',error);
    })
})
</script>
<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
            <h2 class ="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register  account</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="onRegister">
             <div>
                    <label for="firstname" class ="block text-sm font-medium leading-6 text-gray-900 ">Firstname</label>
                    <InputText v-model="firstname" type="text" placeholder="Enter your email address" :error="errors['firstname']" />
                </div>
                 <div>
                    <label for="lastname" class ="block text-sm font-medium leading-6 text-gray-900 ">Lastname</label>
                    <InputText v-model="lastname" type="text" placeholder="Enter your email address" :error="errors['lastname']" />
                </div>
                 <div>
                    <label for="username" class ="block text-sm font-medium leading-6 text-gray-900 ">Username</label>
                    <InputText v-model="username" type="text" placeholder="Enter your email address" :error="errors['username']" />
                </div>
                <div>
                    <label for="email" class ="block text-sm font-medium leading-6 text-gray-900 ">Email address</label>
                    <InputText v-model="email" type="text" placeholder="Enter your email address" :error="errors['email']" />
                </div>
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <InputText v-model="password" type="text" placeholder="Enter your password" :error="errors['password']"/>

                </div>
               
                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
                     
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-indigo-600 ">Sign in</button>
                </div>
            </form>
          
        </div>

    </div>
</template>