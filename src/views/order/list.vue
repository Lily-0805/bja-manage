<template>
	<div class="orderList">
		<div style="margin: 15px 0;">

			<span class="search-text-color">订单号：</span>
			<el-input v-model="param.orderNo" class="input-with-select">
			</el-input>
			<span class="search-text-color">物流单号：</span>
			<el-input v-model="param.expressNo" class="input-with-select">
			</el-input>
			<template v-if="adminType==1">
				<span class="search-text-color">员工账号：</span>
				<el-input v-model="param.expressAdminNo" class="input-with-select">
				</el-input>
			</template>
			<span class="search-text-color">订单状态：</span>
			<el-select class="search-select input-with-select" v-model="param.orderStatus" placeholder="请选择">
				<el-option
					v-for="(item,index) in statusList"
					v-if="index+1<statusList.length"
					:key="item.id"
					:label="item.value"
					:value="item.id">
				</el-option>
			</el-select>
			<span class="search-text-color">制单时间：</span>
			<el-date-picker
				type="daterange"
				v-model="rangeDate"
				@change="changeDate"
				value-format="yyyy-MM-dd"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期">
			</el-date-picker>

			<el-button icon="el-icon-search" @click="search()" style="margin-left: 50px;"></el-button>
		</div>
		<el-button type="primary" @click="showDialog()" :disabled="buttonDisabled">修改订单状态</el-button>
		<el-table :data="list" stripe style="width: 100%" @selection-change="selectionChange">
			<el-table-column
				type="selection"
				width="30">
			</el-table-column>
			<el-table-column type="index" label="序号" width="50"></el-table-column>
			<el-table-column prop="orderNo" label="订单号" width="130"></el-table-column>
			<el-table-column prop="expressNo" label="物流单号" width="180"></el-table-column>
			<el-table-column prop="expressAdminName" label="员工账号" width="100" v-if="adminType==1"></el-table-column>
			<el-table-column prop="" label="寄件人">
				<template slot-scope="scope">
					<p>{{scope.row.fromName}} {{scope.row.fromContact}}</p>
					<p>{{scope.row.fromProvince}}{{scope.row.fromCity}}{{scope.row.fromArea}}{{scope.row.fromDetailAddr}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="" label="收件人">
				<template slot-scope="scope">
					<p>{{scope.row.toName}} {{scope.row.toContact}}</p>
					<p>{{scope.row.toProvince}}{{scope.row.toCity}}{{scope.row.toArea}}{{scope.row.toDetailAddr}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="collectTime" label="上门时间" width="160">

			</el-table-column>
			<el-table-column prop="goods" label="物品" width="100"></el-table-column>
			<el-table-column prop="weight" label="重量(kg)" width="80"></el-table-column>
			<el-table-column prop="cube" label="立方(m³)" width="80"></el-table-column>
			<el-table-column prop="orderStatusValue" label="状态" width="80">
				<template slot-scope="scope">
					<span v-if="scope.row.orderStatus==1" style="color: mediumspringgreen">{{scope.row.orderStatusValue}}</span>
					<span v-else-if="scope.row.orderStatus==0" style="color: red">{{scope.row.orderStatusValue}}</span>
					<span v-else>{{scope.row.orderStatusValue}}</span>
				</template>
			</el-table-column>

			<el-table-column label="操作" width="100" v-if="adminType==1 || adminType==2">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="detail(scope.row.orderNo)">查看</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="block pagination">
			<el-pagination
				:current-page.sync="param.page"
				background
				@current-change="changepage"
				layout="prev, pager, next, jumper"
				:total="totalPage">
			</el-pagination>
		</div>



		<el-dialog :visible.sync="dialogFormVisible" width="400px" @close="closeDialog">
			<el-form :model="dialogForm" :rules="rules" label-width="100px" ref="dialogForm">
				<el-form-item label="订单状态" prop="orderStatus">
					<el-select class="search-select" v-model="dialogForm.orderStatus" placeholder="请选择">
						<el-option
							v-for="item in statusList"
							:key="item.id"
							:label="item.value"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="batchUpdate('dialogForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<style>
.orderList .input-with-select{ margin-right: 50px; width: 150px;}

</style>
<script>
	import orderService from '@/services/orderService'
	import auth from '@/utils/auth'
	export default {
		data() {
			return {
				list: [],
				adminType:'',

				totalPage:1,

				param:{
					page:1,
					orderNo:'',
					expressNo:'',
					expressAdminNo:'',
					showCanceldOrder:0,
					searchStartTime:'',
					searchEndTime:'',
					orderStatus:''
				},


				rangeDate:'',
				buttonDisabled:true,
				orderNos:[],

				statusList:[
					{"id":0,"value":"未揽件"},
					{"id":1,"value":"已揽件"},
					{"id":2,"value":"运输中"},
					{"id":10,"value":"运达"},
					{"id":-1,"value":"已取消"},
				],

				dialogFormVisible:false,
				dialogForm:{
					orderStatus:''
				},
				rules: {
					orderStatus: [
						{required: true, message: '请选择订单状态', trigger: 'blur'}
					]
				},
			}



		},
		created () {

			this.adminType=auth.getToken('adminType');
			var today =new Date();
			today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			this.param.searchStartTime=today;
			this.param.searchEndTime=today;
			this.rangeDate=[today,today];

			this.getList()
		},
		methods:{
			//分页
			changepage(val){
				this.param.page=val++
				this.getList();
			},
			getList(){
				orderService.list(this.param).then(rs => {
					if(rs.retCode=='000100'){
						this.list = rs.list
						this.param.page = rs.page=0 ? rs.page : 1
						this.totalPage = rs.totalPage
					}else{
						this.$message(rs.retMsg)
					}
				})

			},

			//选择框
			selectionChange(val){

				if(val.length>0){
					this.buttonDisabled=false;
					for(let i=0; i<val.length; i++){
						this.orderNos.push(val[i].orderNo)
					}
				}else{
					this.buttonDisabled=true;
					this.orderNos=[];
				}
			},

			showDialog(){
				this.dialogFormVisible=true
			},

			//关闭弹窗清空内容
			closeDialog(){
				this.dialogForm.orderStatus=''
				this.$refs['dialogForm'].clearValidate();
				this.dialogFormVisible=false
			},

			//修改订单状态
			batchUpdate(dialogForm) {
				let _that = this;

				_that.$refs[dialogForm].validate((valid) => {
					if(valid){
						orderService.batchUpdate({orderNos:this.orderNos,orderStatus:this.dialogForm.orderStatus}).then(rs => {
							if(rs.retCode=='000100'){
								this.$message({
									message: rs.retMsg,
									type: 'success'
								});
								setTimeout(function () {
									_that.param.page=1;
									_that.dialogFormVisible=false
									_that.getList();
								},500)
							}else{
								this.$message(rs.retMsg);
							}
						})
					}
					else{
						return false;
					}
				})
			},

			search(){
				this.param.page=1
				this.getList();
			},

			changeDate(value){
				console.log(value)
				if(value==null){
					this.param.searchStartTime='';
					this.param.searchEndTime='';
				}else{
					this.param.searchStartTime=value[0];
					this.param.searchEndTime=value[1];
				}

			},

			detail(orderNo){
				this.$router.push({
					path: '/order/detail?orderNo='+orderNo
				})
			}
		}
	}
</script>