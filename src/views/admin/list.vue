<template>
	<div>
		<template v-if="adminType==1">
			<div style="margin: 15px 0;">
				<el-input placeholder="搜索帐号" v-model="adminNo" class="input-with-select">
					<el-button slot="append" icon="el-icon-search" @click="getList(1,adminNo)"></el-button>
				</el-input>
				<el-button type="primary" @click="add()">+ 添加用户</el-button>


			</div>


			<el-table :data="list" stripe style="width: 100%">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="adminName" label="用户名称" width="180"></el-table-column>
				<el-table-column prop="adminNo" label="帐号" width="180"></el-table-column>
				<el-table-column prop="phone" label="手机号" width="180"></el-table-column>
				<el-table-column prop="email" label="邮箱" width="180"></el-table-column>
				<el-table-column prop="adminType" :formatter="formatterType" label="角色" width="180"></el-table-column>
				<el-table-column prop="disableFlag" :formatter="formatterDisable" label="使用状态" width="180"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>

				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="block pagination">
				<el-pagination
					:current-page.sync="page"
					background
					@current-change="changepage"
					layout="prev, pager, next, jumper"
					:total="totalPage">
				</el-pagination>
			</div>

			<el-dialog :visible.sync="dialogFormVisible" width="400px" @close="closeDialog">
				<el-form :model="dialogForm" :rules="rules" label-width="100px" ref="dialogForm">
					<el-form-item label="用户名称" prop="adminName" >
						<el-input v-model="dialogForm.adminName" auto-complete="off" placeholder="请输入用户名称"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="dialogForm.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="dialogForm.password" auto-complete="off" placeholder="请输入密码" :placeholder="passwordPlaceholder"></el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input type="text" v-model="dialogForm.email" auto-complete="off" ></el-input>
					</el-form-item>
					<el-form-item label="角色" prop="adminType">
						<el-select v-model="dialogForm.adminType" placeholder="请选择角色">
							<el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="禁用" v-if="editFlag">
						<el-switch v-model="bandFlag"></el-switch>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveDialog('dialogForm')">确 定</el-button>
				</div>
			</el-dialog>

		</template>
		<template v-else>没有权限</template>
	</div>
</template>
<style>

</style>
<script>
	import adminService from '@/services/adminService'
	import auth from '@/utils/auth'
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				adminType:'',

				list: [],
				page:1,
				totalPage:1,
				adminNo:'',

				roleList:[
					{name:'管理员',id:1},
					{name:'分区管理员',id:2},
					{name:'员工',id:5}
				],
				passwordPlaceholder:'请输入密码',
				editFlag:false,
				bandFlag:false,

				dialogFormVisible: false,
				dialogForm:{
					adminNo:'',
					adminType:5,
					phone:'',
					password:'',
					adminName:'',
					email:'',
					disableFlag:''
				},
				rules: {
					adminName: [
						{required: true, message: '请输入用户名称', trigger: 'blur'}
					],
					phone: [
						{required: true, message: '请输入手机号', trigger: 'blur'}
					],

					adminType: [
						{required: true, message: '请选择角色', trigger: 'blur'}
					],
				},
			}
		},
		created () {

			this.getList('',1)
			this.adminType=auth.getToken('adminType');
		},
		methods:{
			formatterType(row,cellValue){
				if(row.adminType==1){
					return '管理员'
				}else{
					return '员工'
				}
			},
			formatterDisable(row,cellValue){
				if(row.disableFlag==1){
					return '已禁用'
				}else{
					return '正常'
				}
			},
			//分页
			changepage(val){
				this.getList(this.adminNo,val++);
			},
			getList(adminNo,page){
				adminService.list({
					adminNo:adminNo,
					page:page
				}).then(rs => {
					if(rs.retCode=='000100'){
						this.list = rs.list
						this.page = rs.page
						this.totalPage = rs.totalPage
					}else{
						this.$message(rs.retMsg);
					}
				})

			},


			//新增
			add(){
				this.dialogFormVisible = true;
				this.rules.password=[
					{required: true, message: '请输入密码', trigger: 'blur'}
				]
			},
			//编辑
			edit(row){
				console.log(row);
					this.dialogFormVisible = true;
					this.dialogForm={
						adminNo:row.adminNo,
						adminType:row.adminType,
						phone:row.phone,
						password:'',
						adminName:row.adminName,
						email:row.email,
						disableFlag:row.disableFlag
					};
					if(this.dialogForm.disableFlag==1){
						this.bandFlag=true;
					}else{
						this.bandFlag=false;
					}
					this.passwordPlaceholder='密码不修改请留空'
					this.rules.password=[];
					this.editFlag=true;

			},
			//关闭弹窗清空内容
			closeDialog(){
				this.dialogForm={
					adminNo:'',
					adminType:5,
					phone:'',
					password:'',
					adminName:'',
					email:'',
					disableFlag:''
				};
				this.$refs['dialogForm'].clearValidate();
				this.passwordPlaceholder='请输入密码';
				this.editFlag=false;
				this.bandFlag=false;

			},


			//保存
			saveDialog(dialogForm){
				let _that = this;
				this.$refs[dialogForm].validate((valid) => {
					if(valid){
						if(this.dialogForm.password){
							this.dialogForm.password=md5('@baojiean'+this.dialogForm.password);
						}


						if(this.bandFlag){
							this.dialogForm.disableFlag=1
						}else{
							this.dialogForm.disableFlag=0
						}

						if(this.editFlag){
							adminService.edit(this.dialogForm).then(rs => {
								this.dialogFormVisible = false;
								if(rs.retCode=='000100'){
									this.$message({
										message: rs.retMsg,
										type: 'success'
									});
									setTimeout(function () {
										_that.getList('',1);
									},500)
								}else{
									this.$message(rs.retMsg);
								}
							})
						}else{
							adminService.add(this.dialogForm).then(rs => {
								this.dialogFormVisible = false;
								if(rs.retCode=='000100'){
									this.$message({
										message: rs.retMsg,
										type: 'success'
									});
									setTimeout(function () {
										_that.getList('',1);
									},500)
								}else{
									this.$message(rs.retMsg);
								}
							})
						}

					}else{
						return false;
					}
				})
			}


		}
	}
</script>