
// 消息常量
export const  messageType={

  TEXT:1, 
  IMAGE:2,
  AUDIO:3,
  VIDEO:"video",
  FILE:5,
  LOCATION:4, 
  SYSTEM:"system",
  // 以下是区分群聊还是私聊
  PRIVATE:1,
  GROUP:2,
}
// 朋友圈常量
export const  momentType={
  DETAIl:"detail",
  PUBLIC:"public",
}
// 好友关系常量
export const  friendShipType={
  IS_FRIEND :1,
  NOT_FRIEND:0,
  SELF:2,


  
}
// 好友历史记录常量
export const  friendHistoryType={
  AGREE:0,
  // 已添加
  ADD:1,
}
// 群聊常量
export const  groupType={
  "VALID_INVITE_LINK": 1,
  "INVALID_INVITE_LINK": 0,
  "ALREADY_JOINED_GROUP": 1,
  "NOT_JOINED_GROUP": 0,
  
}
