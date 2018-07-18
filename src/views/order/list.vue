<template>
	<div class="orderList">
		<div style="margin: 15px 0;">

			<span class="search-text-color">订单号：</span>
			<el-input v-model="param.orderNo" class="input-with-select">
			</el-input>
			<span class="search-text-color">快递单号：</span>
			<el-input v-model="param.expressNo" class="input-with-select">
			</el-input>
			<template v-if="adminType==1">
				<span class="search-text-color">快递员帐号：</span>
				<el-input v-model="param.expressAdminNo" class="input-with-select">
				</el-input>
			</template>
			<el-button icon="el-icon-search" @click="search()"></el-button>
		</div>

		<el-table :data="list" stripe style="width: 100%">
			<el-table-column type="index" label="序号" width="50"></el-table-column>
			<el-table-column prop="orderNo" label="订单号" width="130"></el-table-column>
			<el-table-column prop="expressNo" label="快递单号" width="180"></el-table-column>
			<el-table-column prop="expressAdminName" label="快递员" width="100" v-if="adminType==1"></el-table-column>
			<el-table-column prop="" label="寄件人">
				<template slot-scope="scope">
					<p>{{scope.row.fromName}} {{scope.row.fromContact}}</p>
					<p>{{scope.row.fromProvince}}{{scope.row.fromCity}}{{scope.row.fromArea}}</p>
					<p>{{scope.row.fromDetailAddr}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="" label="收件人">
				<template slot-scope="scope">
					<p>{{scope.row.toName}} {{scope.row.toContact}}</p>
					<p>{{scope.row.toProvince}}{{scope.row.toCity}}{{scope.row.toArea}}</p>
					<p>{{scope.row.toDetailAddr}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="" label="上门时间" width="160">
				<template slot-scope="scope">
					<p style="text-align:center">{{scope.row.collectStartTime}}<br />至<br />{{scope.row.collectEndTime}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="goods" label="物品" width="80"></el-table-column>
			<el-table-column prop="weight" label="重量(kg)" width="80"></el-table-column>
			<el-table-column prop="orderStatusValue" label="状态" width="80"></el-table-column>

			<el-table-column label="操作"width="100" v-if="adminType==1">
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
	</div>
</template>
<style>
.orderList .input-with-select{width: 200px;}
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
					expressAdminNo:''
				}

			}
		},
		created () {
			this.getList()
			this.adminType=auth.getToken('adminType');
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
						this.$message(rs.ret_msg)
					}
				})

			},

			search(){
				this.param.page=1
				this.getList();
			},

			detail(orderNo){
				this.$router.push({
					path: '/order/detail?orderNo='+orderNo
				})
			}
		}
	}
</script>