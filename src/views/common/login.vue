<template>
	<div class="login-wrapper">
		<div class="login-bg">
			<h1>保捷安快递</h1>
		</div>

		<div class="login">
			<el-form label-width="80px" :model="formLogin">
				<el-form-item label="用户名：">
					<el-input v-model="formLogin.accountNo"></el-input>
				</el-form-item>
				<el-form-item label="密码：">
					<el-input type="password" v-model="formLogin.password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm()">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>

</template>

<style>
	.login-bg{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #303133; text-align: center;}
	.login {position: absolute; top: 50%; left: 50%; padding: 30px 20px 20px; width: 300px; transform: translate(-50%, -50%); background: #fcfcfc; border: 1px solid #ccc; border-radius: 5px;}
	.login-wrapper h1{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -300%);  height: 60px; line-height: 60px; color: #fff;}
</style>

<script>
    import commonService from '@/services/CommonService'
    import md5 from 'js-md5';
    import auth from '@/utils/auth'


    export default {
        data () {
            return {
                formLogin: {
	                //accountNo: '1000001',
	                accountNo: '5000002',
                    password: '111111'
                }
            }
        },

        created () {

        },

        methods: {
            submitForm () {

            	commonService.login({
		            accountNo:this.formLogin.accountNo,
		            password:md5('@baojiean'+this.formLogin.password)
            	}).then(rs => {
                    if(rs.retCode=='000100'){
	                    auth.setToken('adminNo',rs.loginInfo.adminNo+'_'+rs.loginInfo.token)
	                    auth.setToken('adminType',rs.loginInfo.adminType);

	                    if(rs.loginInfo.adminType==5&&rs.terminal=='mobile'){
		                    this.$router.push({
			                    path: '/order/checkOrder'
		                    })
	                    }else {
		                    this.$router.push({
			                    path: '/index'
		                    })
	                    }


                    }else{
	                    this.$message(rs.retMsg)
                    }


                })
            }
        }
    }

</script>
