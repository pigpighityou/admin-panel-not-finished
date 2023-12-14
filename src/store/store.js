import {createStore} from 'vuex'

const store=createStore({
    state(){
        return{
            test:123123,


            /* 
            *
            *     antdesign在items里自带了item对象，可以读取每个item的信息，
            *     一下是从item对象得出来的一些信息
            * 
            *  */
            hasChild:false,   /* 初始值 */
            itemMainTitle:'用户管理', /* 初始值 */
            itemSubTitle:'用户管理', /* 初始值 */
            itemTitle:'用户管理', /* 初始值 */
            item:'', 




            /* 
            *        tag相关数据配置
            * */
            tags:[
                {
                  path: "/",
                  name: "home",
                  label: "首页",
                },
               
              ],
            tagName:'',

        }
    },
    getters:{

    },
    mutations:{

    },
    actions:{

    },
   
})

export default store