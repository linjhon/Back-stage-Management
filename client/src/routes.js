import Home from './views/Home.vue'
import Article from './views/Article.vue'
import User from './views/User.vue'
import Classify from './views/Classify.vue'
import Comment from './views/Comment.vue'
import Upload from './views/Upload.vue'
import Ablum from './views/Ablum.vue'


export const routes = [
    {path:'/',component:Home,name:'home'},
    {path:'/user',component:User,name:'user'},
    {path:'/article',component:Article,name:'article'},
    {path:'/classify',component:Classify,name:'classify'},
    {path:'/comment',component:Comment,name:'comment'},
    {path:'/upload',component:Upload,name:'upload'},
    {path:'/ablum',component:Ablum,name:'ablum'}
]