import { pinyin  } from "pinyin-pro"
export const getInitials=(str)=> {
  const pinyins = pinyin(str, { pattern: "first" })
  const initials = pinyins.charAt(0).toUpperCase()
  return initials
  
}
export const getResultSort=(data)=>{

  const result=[]
  for (const key in data) {
    const first=getInitials(data[key]["nickname"])
    console.log(first)
    const index=result.findIndex(item=>item.title==first)
    if(index!=-1){
      result[index]["list"].push(data[key])
    }else{
      result.push({
        title:first,
        list:[data[key]]
      })
    }
  }
  result.sort((a, b) => a.title.localeCompare(b.title))
  return result
}


