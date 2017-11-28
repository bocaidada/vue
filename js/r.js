var router=new VueRouter({
   routes:[
       {path:"/",component:Home},
       // {path:"*",redirect:"/"},
       {
           path:"/info",component:Info,
           children:[
               {path:"",component:list},
               {path:"list/:id",component:Con}
           ]
       },
       {
           path:"/doc",component:Doc,
           children:[
                 {path:"",components:{left,right}}
           ]
       },
       {path:"/login",component:Login}
   ]
});