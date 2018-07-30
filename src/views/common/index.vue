<template>
	<div class="frame">
		<el-container>
			<el-header>
				<el-row :gutter="20">
					<el-col :span="6"><h1>保捷安物流后台管理</h1></el-col>
					<el-col :span="6" :offset="12" style="text-align: right">
						<el-button type="text" class="logout" @click="logout()">退出</el-button>
					</el-col>

				</el-row>
			</el-header>
			<el-container>
				<el-aside v-bind:style="{height:asideHeight}">
					<el-menu :default-active="navselected" router @select="menuselct" mode="vertical" theme="dark" unique-opened>
						<el-submenu index="/admin" v-if="adminType==1">
							<template slot="title">用户管理</template>
							<el-menu-item index="/admin/list" key="/admin/list">用户列表</el-menu-item>
						</el-submenu>
						<el-submenu index="/order">
							<template slot="title">订单管理</template>
							<el-menu-item index="/order/list" key="/order/list">订单列表</el-menu-item>
						</el-submenu>
						<el-submenu index="/system">
							<template slot="title">个人信息</template>
							<el-menu-item index="/system/password" key="/system/password">修改密码</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-aside>

				<el-main v-bind:style="{height:asideHeight}">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>

    import CommonService from '@/services/CommonService'
    import auth from '@/utils/auth'

    export default {
        data () {
            return {
	            adminType:'',
            	asideHeight: '600px',
                navselected:''
            }
        },
        created () {
            this.navselected=this.$route.path
            var windowHeight = window.document.documentElement.clientHeight;
            this.asideHeight = windowHeight-60+'px';
	        this.adminType=auth.getToken('adminType');
        },

        watch:{
            //监听路由变化
            $route( to , from ){
                if(from.path.indexOf("/list")>-1 && to.path.indexOf("/detail")>-1){
                    this.navselected=from.path
                }else{
                    this.navselected=to.path
                }
            }
        },

        methods: {
            //导航选择
            menuselct(key){
                this.navselected=key
            },

            //退出
            logout(){
                CommonService.logout().then(rs =>{
	                auth.removeToken('adminNo')
	                auth.removeToken('adminType')
                	this.$router.push({
		                path: '/'

	                })
                })
            },

        }
    }

</script>

<style>
	.frame {position: relative;	height: 100%;width: 100%;}
	.frame .nav {height: 40px;}
	.frame .left {	transition: width 0.28s ease-out;width: 200px;height: 100%;	position: absolute;	top: 50px; bottom: 0;left: 0;z-index: 1001;overflow-y: auto;
	}
	.frame .left::-webkit-scrollbar {display: none	}
	.main {	min-height: 100%;transition: margin-left 0.28s ease-out;margin-left: 200px;	}
	.el-aside{ width: 200px!important;}
	.el-aside.open{ width: 0px!important;}
	.el-aside.close{ width: 200px!important;}
	.el-header{ background: #303133; color: #fff; }
	.el-header .el-row,.el-header .el-col{ height: 60px;}
	.el-header h1{ height: 60px; line-height: 60px;}
	.el-header .logout{ margin: 10px 10px 0 10px;}
	.el-header .el-dropdown{ margin: 10px 10px 0 0; color: #fff; font-size: 20px;}

</style>
