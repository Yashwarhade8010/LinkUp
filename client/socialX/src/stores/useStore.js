import { create } from "zustand";
const useLoadStore = create((set)=>({
    loading:false,
    setLoading:(state)=>set({loading:state})
}))

export default useLoadStore