import Home from './views/Home.vue';
import Article from './views/Article.vue';
import User from './views/User.vue';
import Classify from './views/Classify.vue';
import Comment from './views/Comment.vue';
import Upload from './views/Upload.vue';
import Ablum from './views/Ablum.vue';
import axios from 'axios';
import store from './store';


export const routes = [
    {path:'/',component:Home,name:'home'},
    {path:'/user',component:User,name:'user'},
    {path:'/article',component:Article,name:'article'},
    {path:'/classify',component:Classify,name:'classify'},
    {path:'/comment',component:Comment,name:'comment'},
    {path:'/upload',component:Upload,name:'upload'},
    {path:'/ablum',component:Ablum,name:'ablum',
        beforeEnter: (to, from, next) => {
            // ...
            console.log('相册加载中...',to)
            axios({
                url:'http://localhost:3000/upload/ablums',
                method:'get'
            }).then(res=>{
                store.state.defaultList = res.data;
                console.log('相册',store.state.defaultList)
                next();
            })
            
        }}
]