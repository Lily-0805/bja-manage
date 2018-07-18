<template>
	<div class="password">
		<h3>修改密码</h3>
		<el-form label-width="120px" ref="form":rules="rules" :model="form">
			<el-form-item label="旧密码：" prop="oldPassword">
				<el-input type="password" v-model="form.oldPassword"></el-input>
			</el-form-item>
			<el-form-item label="新密码：" prop="pass">
				<el-input type="password" v-model="form.pass"></el-input>
			</el-form-item>
			<el-form-item label="确认密码：" prop="checkPass">
				<el-input type="password" v-model="form.checkPass"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="savePassword('form')">保存</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>
<style>
.password .el-input__inner{ width: 200px;}
</style>
<script>
	import commonService from '@/services/CommonService'
	import md5 from 'js-md5';

    export default{
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
	                oldPassword:'',
                	pass: '',
                    checkPass:''
                },


                rules: {
	                oldPassword:[
		                {required: true, message: '请输入旧密码', trigger: 'blur'}
	                ],
                	pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },

        methods: {

            //修改密码
            savePassword(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
	                    commonService.password({oldPassword:md5(this.form.oldPassword),newPassword:md5(this.form.pass)}).then(rs => {
                            if(rs.retCode=='000100'){
                                this.$message({
                                    message: rs.ret_msg,
                                    type: 'success'
                                });
                            }else{
                                this.$message(rs.ret_msg);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }
    }
</script>