<template>
	<div class="orderDetail">
		<template v-if="adminType==1">
			<el-button @click="cancel()" class="cancel">返回</el-button>
			<el-card class="box-card" shadow="never">
				<div slot="header">
					<el-button @click="editOrder()" style="float: right;" size="small" type="primary">修改订单</el-button>
					订单详情
				</div>
				<div class="el-form-item">
					<div class="infoItem">
						<span class="infoName">订单号：</span>
						<span class="infoValue">{{order.orderNo}}</span>
					</div>
					<div class="infoItem">
						<span class="infoName">物流单号：</span>
						<span class="infoValue">{{order.expressNo}}</span>
					</div>
				</div>
				<div class="el-form-item">
					<div class="infoItem">
						<span class="infoName">寄件人：</span>
						<span class="infoValue">{{order.fromName}} {{order.fromContact}}</span>
					</div>
					<div class="infoItem">
						<span class="infoName">寄件地址：</span>
						<span class="infoValue">{{order.fromProvince}}{{order.fromCity}}{{order.fromArea}}{{order.fromDetailAddr}}</span>
					</div>
				</div>
				<div class="el-form-item">
					<div class="infoItem">
						<span class="infoName">收件人：</span>
						<span class="infoValue">{{order.toName}} {{order.toContact}}</span>
					</div>
					<div class="infoItem">
						<span class="infoName">收件地址：</span>
						<span class="infoValue">{{order.toProvince}}{{order.toCity}}{{order.toArea}}{{order.toDetailAddr}}</span>
					</div>
				</div>
				<div class="el-form-item">
					<div class="infoItem">
						<span class="infoName">物品：</span>
						<span class="infoValue">{{order.goods}}</span>
					</div>
					<div class="infoItem">
						<span class="infoName">重量：</span>
						<span class="infoValue">{{order.weight}} kg</span>
					</div>
				</div>
				<div class="el-form-item">
					<div class="infoItem">
						<span class="infoName">上门时间：</span>
						<span class="infoValue">{{order.collectStartTime}}-{{order.collectEndTime}}</span>
					</div>
					<div class="infoItem">
						<span class="infoName">捎话：</span>
						<span class="infoValue"><template v-if="order.message">【{{order.message}}】</template>{{order.extraInfo}}</span>
					</div>
				</div>
				<div class="el-form-item">
					<div class="infoItem">
						<span class="infoName">状态：</span>
						<span class="infoValue">{{order.orderStatusValue}}</span>
					</div>
					<div class="infoItem">
						<span class="infoName">是否送货上门：</span>
						<span class="infoValue"><template v-if="order.dtdFlag==0">否</template><template v-else>是</template></span>
					</div>

				</div>
			</el-card>
			<br/>
			<div><el-button size="small" type="primary" @click="add()" style="float: right; margin-bottom: 10px;">+ 新增描述</el-button>订单描述</div>

			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column type="index" label="序号" width="80"></el-table-column>
				<el-table-column prop="createTime" label="时间" width="250"></el-table-column>
				<el-table-column prop="description" label="描述"></el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-dialog :visible.sync="dialogFormVisible" width="400px" @close="closeDialog">
				<el-form :model="dialogForm" :rules="rules" label-width="100px" ref="dialogForm">
					<el-form-item label="描述" prop="description">
						<el-input v-model="dialogForm.description" auto-complete="off" placeholder="请输入描述详情"></el-input>
					</el-form-item>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveDialog('dialogForm')">确 定</el-button>
				</div>
			</el-dialog>
			<el-dialog :visible.sync="orderDialogFormVisible" width="400px" @close="closeOrderDialog">
				<el-form :model="orderDialogForm" :rules="orderRules" label-width="100px" ref="orderDialogForm">
					<el-form-item label="快递单号" prop="expressNo">
						<el-input v-model="orderDialogForm.expressNo" auto-complete="off" placeholder="请输入物流单号"></el-input>
					</el-form-item>
					<el-form-item label="重量" prop="weight">
						<el-input v-model="orderDialogForm.weight" auto-complete="off" placeholder="请输入重量"></el-input>
					</el-form-item>
					<el-form-item label="物品" prop="goods">
						<el-select class="search-select" v-model="orderDialogForm.goods" placeholder="请选择">
							<el-option
								v-for="item in goodsList"
								:key="item.name"
								:label="item.name"
								:value="item.name">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单状态" prop="orderStatus">
						<el-select class="search-select" v-model="orderDialogForm.orderStatus" placeholder="请选择">
							<el-option
								v-for="item in statusList"
								:key="item.id"
								:label="item.value"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否送货上门">
						<el-switch v-model="dtdFlag"></el-switch>
					</el-form-item>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="orderDialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveOrderDialog('orderDialogForm')">确 定</el-button>
				</div>
			</el-dialog>
		</template>
		<template v-else>没有权限</template>

	</div>
</template>
<style>
	.orderDetail .cancel{ margin: 15px 0;}
	.orderDetail .infoRight { position: relative; left: 600px; }
	.orderDetail .box-card { margin-top: -1px; border-radius: 0; font-size: 14px; }
	.orderDetail .box-card .infoItem { float: left; width: 500px; height: 20px; line-height: 20px; }
	.orderDetail .box-card .infoName { float: left; width: 130px; text-align: right; font-size: 14px; color: #999; }
	.orderDetail .box-card .infoValue { float: left; font-size: 14px; }
</style>
<script>
	import orderService from '@/services/orderService'
	import auth from '@/utils/auth'
	export default {
		data() {
			return {
				adminType:'',
				order: {},
				tableData:[],
				dialogForm:{
					orderNo: '',
					descriptionId:'',
					description: ''
				},
				rules: {
					description: [
						{required: true, message: '请输入描述详情', trigger: 'blur'}
					]
				},
				dialogFormVisible:false,

				dtdFlag:false,
				goodsList:[],
				statusList:[
					{"id":0,"value":"未揽件"},
					{"id":1,"value":"已揽件"},
					{"id":2,"value":"运输中"},
					{"id":10,"value":"运达"},
					{"id":-1,"value":"已取消"},
				],

				orderDialogForm:{
					orderNo:'',
					expressNo:'',
					weight:'',
					goods:'',
					orderStatus:'',
					dtdFlag:'',
				},
				orderRules: {
					weight: [
						{required: true, message: '请输入重量', trigger: 'blur'}
					],
					goods: [
						{required: true, message: '请选择物品类型', trigger: 'blur'}
					]
				},
				orderDialogFormVisible:false


			}
		},
		created () {
			this.get(this.$route.query.orderNo);
			this.adminType=auth.getToken('adminType');
			this.getGoodsList();
		},
		methods:{
			//获取详情
			get(orderNo) {
				orderService.detail({orderNo:orderNo}).then(rs => {
					if(rs.retCode=='000100'){
						this.order = rs.order;
						this.tableData = rs.orderDescriptions;
						this.dialogForm.orderNo=rs.order.orderNo;

						this.orderDialogForm={
							orderNo:rs.order.orderNo,
								expressNo:rs.order.expressNo,
								weight:rs.order.weight,
								goods:rs.order.goods,
								orderStatus:rs.order.orderStatus,
								dtdFlag:rs.order.dtdFlag,
						}
					}else{
						this.$message(rs.retMsg);
					}
				})
			},
			getGoodsList(){
				orderService.goodsList().then(rs => {
					if(rs.retCode=='000100'){
						this.goodsList=rs.list
					}else{
						this.$message(rs.retMsg);
					}
				})
			},


			editOrder(){
				this.orderDialogFormVisible=true;
			},
			saveOrderDialog(orderDialogForm){
				let _that = this;

				_that.$refs[orderDialogForm].validate((valid) => {
					if(valid){
						if(_that.dtdFlag){
							_that.orderDialogForm.dtdFlag=1
						}else{
							_that.orderDialogForm.dtdFlag=0
						}

						 orderService.edit(_that.orderDialogForm).then(rs => {
						 	_that.orderDialogFormVisible = false;
						 	if(rs.retCode=='000100'){
						 		_that.$message({
						 			message: '操作成功',
						 			type: 'success'
						 		});
						 		setTimeout(function () {
						 			_that.get(_that.$route.query.orderNo);
						 		},500)
						 	}else{
						 		_that.$message(rs.retMsg);
						 	}
						 })


					}else{
						return false;
					}
				})
			},
			//关闭弹窗清空内容
			closeOrderDialog(){
				this.$refs['orderDialogForm'].clearValidate();

				this.orderDialogFormVisible=false
			},


			//新增
			add(){
				this.dialogFormVisible=true;
			},



			//关闭弹窗清空内容
			closeDialog(){
				this.dialogForm.descriptionId=''
				this.dialogForm.description=''
				this.$refs['dialogForm'].clearValidate();
				this.editFlag=false
				this.dialogFormVisible=false
			},
			//修改

			edit(row){
				this.editFlag=true
				this.dialogForm.descriptionId=row.descriptionId
				this.dialogForm.description=row.description
				this.dialogFormVisible=true;
			},

			//保存
			saveDialog(dialogForm){
				let _that = this;
				this.$refs[dialogForm].validate((valid) => {
					if(valid){
						if(_that.editFlag){
							orderService.editDes(_that.dialogForm).then(rs => {
								_that.dialogFormVisible = false;
								if(rs.retCode=='000100'){
									_that.$message({
										message: rs.retMsg,
										type: 'success'
									});
									setTimeout(function () {
										_that.get(_that.$route.query.orderNo);
									},500)
								}else{
									_that.$message(rs.retMsg);
								}
							})
						}else{
							orderService.addDes(_that.dialogForm).then(rs => {
								_that.dialogFormVisible = false;
								if(rs.retCode=='000100'){
									_that.$message({
										message: rs.retMsg,
										type: 'success'
									});
									setTimeout(function () {
										_that.get(_that.$route.query.orderNo);
									},500)
								}else{
									_that.$message(rs.retMsg);
								}
							})
						}

					}else{
						return false;
					}
				})
			},



			//返回
			cancel(){
				this.$router.go(-1)
			}
		}
	}
</script>