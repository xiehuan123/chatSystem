
import IconVue from "@/components/common/Icon.vue" //一般放置在./src/components下
import TextVue from "./common/Text.vue"
import ListItemVue from "./ListItem.vue"
import TextItemVue from "./TextItem.vue"
export default{
  install (app) {
    // 此处形参为main.js文件中use()方法自动传进来的Vue实例
    app.component("myIcon", IconVue).component("myText",TextVue).component("myListItem",ListItemVue)
    app.component("myTextItem",TextItemVue)
  }
}
