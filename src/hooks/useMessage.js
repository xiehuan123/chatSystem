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
    await messageStore.setItem("messageList",JSON.stringify(messageList) )
    getMessage()
  }

  

 
  return [messageList,setMessageList]
}

function runFn(fn){
   let cache=[]
    let i=0
    window.axios=()=>{
      console.log("执行",i,cache);
      // 判断是否有缓存 有缓存直接返回 缓存 结果 
      if(cache[i]){
        if(cache[i].status==="fulfilled"){
          return cache[i].data
        }else if (cache[i].status==="rejected"){
          throw cache[i].err
        }
        
      }else{
        // 没有缓存 添加初始对象

        const result={
          status:'pending',
          data:null,
          err:null
        }
        cache[i++]=result
        // 发送第一次请求
        const promise=messageStore.getItem("messageList").then(res=>{
          result.data=res.data
          result.status="fulfilled"
        },err=>{
          result.err=err
          result.status="rejected"
        })
        throw  promise
      }

    }

      try { 
        fn()
    } catch (err) {
     
      if (err instanceof  Promise){
        const reRun=()=>{
          console.log("第二次执行");
          i=0;
          fn()
         
        }
        console.log(err,"err");
        err.then(reRun,reRun)
      }
    }
}