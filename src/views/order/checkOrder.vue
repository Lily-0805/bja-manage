<template>
	<div class="checkOrder">
		<div class="check">
			<input type="text" maxlength="50" placeholder="请输入【客户】的订单号" v-model="orderNo"/>

			<button @click="save()">提交</button>
		</div>
		<p class="head-title">我的最近订单</p>
		<ul class="list">
			<li v-for="item in list">
				<p>订单号：{{item.orderNo}}</p>
				<p>快递单号：{{item.expressNo}}</p>
				<p>寄件人：{{item.fromName}} {{item.fromContact}}</p>
				<p>寄件地址：{{item.fromProvince}}{{item.fromCity}}{{item.fromArea}}{{item.fromDetailAddr}}</p>
				<p>收件人：{{item.toName}} {{item.toContact}}</p>
			</li>
		</ul>
	</div>
</template>
<style>
	.checkOrder{ width: 100%;}
	.checkOrder .check{ padding: 20px; background: #000; box-sizing: border-box;}
	.checkOrder .check input{ padding: 0 10px; width: 100%; height: 40px; background: #fff; border: 1px solid #ddd; border-radius: 4px;}
	.checkOrder .check button{ margin-top: 10px; width: 100%; height: 30px; background: #08d; border: none; color: #fff; border-radius: 4px;}
	.checkOrder .head-title{ margin-top: 10px; padding-left: 10px; height: 40px; background: #ddd; border-top: 2px solid #ccc; line-height: 40px; font-size: 14px; }
	.checkOrder .list li{ padding: 10px; width: 100%; box-sizing: border-box; border-bottom: 1px solid #ddd;}
	.checkOrder .list li p{ font-size: 12px; line-height: 20px;}
</style>
<script>
	import orderService from '@/services/orderService'

	export default {
		data() {
			return {
				list: [],

				orderNo:'',
				param:{
					page:1,
					size:100

				}
			}
		},
		created() {
			this.getList()

		},
		methods: {
			getList(){
				orderService.list(this.param).then(rs => {
					if(rs.retCode=='000100'){
						this.list = rs.list
					}else{
						this.$message(rs.ret_msg)
					}
				})

			},

			save(){
				if(this.orderNo==''){
					alert('订单号不能为空')
					return;
				}
				orderService.collect({orderNo:this.orderNo}).then(rs => {
					if(rs.retCode=='000100'){
						this.list = rs.list

					}else{
						this.$message(rs.ret_msg)
					}
				})
			}
		}
	}
</script>