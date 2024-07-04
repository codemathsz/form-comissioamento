import { defineStore } from "pinia";

export const useFileNameStore = defineStore("filename-store", () =>{
  let names: { [key: string]: any } = {}

  const setName = (name:any) => {
    names = {
      ...name
    }
    
    localStorage.setItem("uploadNames", JSON.stringify(names))
  }

  return{
    names,
    setName
  }
})
