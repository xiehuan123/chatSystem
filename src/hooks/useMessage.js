import localforage from "localforage"

const messageStore = localforage.createInstance({
  name: "messageStore"
})
messageStore.setDriver(localforage.INDEXEDDB)
export   function useMessage(){
  const messageList=ref([])
  const getMessage= async ()=>{
    const value= await messageStore.getItem("messageList")
    messageList.value= JSON.parse(value) 
  }
  const setMessageList=async (messageList)=>{
    console.log(messageList,"messageList")
    messageStore.setItem("messageList",JSON.stringify(messageList) )
  }

  getMessage()

 
  return [messageList,setMessageList]
}