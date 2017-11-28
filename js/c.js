//主页
var Home=Vue.component("Home",{
   template:`
      <div class="Home">
         <Nav></Nav>
         <img src="http://www.sxuek.com/statics/images/uek/new_logo.png" alt="">
      </div>
   `
});
//导航
var Nav=Vue.component("Nav",{
   template:`
      <div class="Nav" style="position: absolute;left: 0;top:0;">
         <router-link :to="item.url" v-for="(item,key) in navData" :key="key" exact>
            {{item.title}}
         </router-link>
         <router-link to="/login" v-if="!islogin">login</router-link>
       
       <span v-if="islogin" class="info" @click="show">
       {{name}}
            <span  class="logout" v-show="isshow" @click="logout">退出</span>
       </span>
      </div>
   `,
   data(){
       return{
           navData:[
               {title:"首页",url:"/"},
               {title:"公司简介",url:"/info"},
               {title:"文档说明",url:"/doc"},
           ],
           islogin:false,
           name:"",
           isshow:false
       }
   },
    created(){
        this.name=this.get("login","name");
        this.islogin=this.get("login","name");
    },
    methods:{
        show(){
            this.isshow=!this.isshow
        },
        logout(){
            this.del("login");
            router.push("/")
        }
    }
});
//公司简介首页
var Info=Vue.component("Info",{
    template:`
        <div calss="Info">
            <Nav></Nav>
            <transition name="show" mode="out-in">
               <router-view></router-view>
            </transition>
        </div>
    `
});
//简介图文列表
var list=Vue.component("list",{
    template:`
        <div calss="list" style="padding-top: 40px">
           <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/info/list/1">
                            <img class="mui-media-object mui-pull-left" src="../images/shuijiao.jpg">
                            <div class="mui-media-body">
                                幸福
                                <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                            </div>
                    </router-link>       
                </li>
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/info/list/2">
                        <img class="mui-media-object mui-pull-left" src="../images/muwu.jpg">
                        <div class="mui-media-body">
                            木屋
                            <p class='mui-ellipsis'>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
                        </div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/info/list/3">
                        <img class="mui-media-object mui-pull-left" src="../images/cbd.jpg">
                        <div class="mui-media-body">
                            CBD
                            <p class='mui-ellipsis'>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
                        </div>
                   </router-link>
                </li>
           </ul>
     </div>
    `
});
//简介列表详情
var Con=Vue.component("Con",{
    template:`
        <div class="Con">
            <h1>{{conData[this.$route.params.id-1].title}}</h1>
            <h2>{{conData[this.$route.params.id-1].con}}</h2>
        </div> 
    `,
    data(){
        return{
            conData:[
                {title:"幸福",con:"能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？"},
                {title:"木屋",con:"想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖."},
                {title:"CBD",con:"烤炉模式的城，到黄昏，如同打翻的调色盘一般."}
            ]
        }
    }
});
//文档说明
var Doc=Vue.component("Doc",{
    template:`
      <div style="position: absolute;left: 0;top:0;">
       <Nav></Nav>
       <router-view name="left"></router-view>
       <router-view name="right"></router-view>
      </div>   
    `,
    beforeRouteEnter(to,from,next){
        next(function(vm){
            if(!vm.get("login","name")){
                router.push("/login");
            }
        })
    }
});
//左侧菜单容器
var left=Vue.component("left",{
    template:`
       <div class="left">
          <leftCon></leftCon>
       </div>  
    `,
    watch: {
        $route() {
            var hash=this.$route.hash.slice(1);

            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({start:document.querySelector(".right").scrollTop}) //获取右侧滚动条的初始位置
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({start:(document.querySelector("#"+hash).offsetTop)-40 }, 500) //需要改变的高度
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.start.toFixed(0)  //toFixed(0)  小数点后位数
                })
                .start()
            animate()
        }
    }
});
var leftCon=Vue.component("leftCon",{
    template:`
       <div>
            <ul>
               <li>router构造配置</li>
               <ul class="son">
                  <li>
                     <router-link to="#one">router</router-link>
                  </li>  
                  <li>
                     <router-link to="#two">mode</router-link>
                  </li> 
                  <li>
                     <router-link to="#three">base</router-link>
                  </li>      
               </ul> 
               <li>对组件的注入</li>
               <ul class="son">
                  <li>
                     <router-link to="#fous">router-view</router-link>
                  </li>  
                  <li>
                     <router-link to="#five">router-link</router-link>
                  </li> 
               </ul>     
            </ul>
       </div>  
    `
});
//右侧文档内容
var right=Vue.component("right",{
    template:`
       <div class="right">
          <rightCon></rightCon>
       </div>  
    `
});
var rightCon=Vue.component("rightCon",{
    template:`
       <div>
           <div class="footer" id="one">router</div>
           <div class="footer" id="two">mode</div>
           <div class="footer" id="three">base</div>
           <div class="footer" id="fous">router-view</div>
           <div class="footer" id="five">router-link</div>
       </div>  
    `
});

var Login=Vue.component("Login",{
    template:`
       <div class="Login">
         <header class="mui-bar mui-bar-nav">
		    <a class="mui-icon mui-icon-undo" @click="back"></a>
		    <h1 class="mui-title">登录</h1>
		</header>
		<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit">登录</button>
				</div>
			</div>
			<div class="mui-content-padded oauth-area">

			</div>
		</div>
       </div>  
    `,
    methods:{
        back(){
            router.go(-1);
        }
    ,
    submit(){
        var obj={"name":document.querySelector("#name").value}
        this.save("login",obj);
        router.push("/doc")
    }
    }
});