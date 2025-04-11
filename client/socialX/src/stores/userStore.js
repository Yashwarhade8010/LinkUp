import { create } from "zustand";
import {persist} from "zustand/middleware"
const useUserStore = create(persist((set)=>({
    user:null,
    token:null,
    isAuthenticated:false,
    setUser:(userData)=>set({user:userData.userToSend,isAuthenticated:true,token:userData.token}),
    logOut:()=>set({user:null,isAuthenticated:false,token:null}),
}),
{
    name:'user-storage'
}
))



export default useUserStore
