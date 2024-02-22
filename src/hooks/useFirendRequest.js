import { ref,onMounted } from "vue"

import { getFriendsList } from "@/api/frindeShip"

import { getResultSort } from "@/utils/index"
export    function  useFriendRequest(){
  const peoples = ref({})
  const pinyinList = ref([])
  onMounted(async ()=>{
    const {err,res}=await getFriendsList()
    if(err){
      throw err
    }
    const data=res["data"].map(item=>
    {return {...item.user,"selected":false}})
    const {result,pinyinFirst}=getResultSort([...data])
    peoples.value=result
    pinyinList.value=[...pinyinFirst]
  
  })
 

  
  return {
    peoples,
    pinyinList,
    scroll
  }
  
}