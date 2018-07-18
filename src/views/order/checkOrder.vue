<template>
	<div class="checkOrder">
		<div class="check">
			订单号：
			快递单号：
			<button class="">提交</button>
		</div>
		<p class="head-title">最近订单</p>
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
	.checkOrder .check{ background: #f8f8f8}
	.checkOrder .head-title{ padding-left: 10px; height: 40px; background: #08d; border-top: 2px solid #0567a4; line-height: 40px; font-size: 14px; color: #fff;}
	.checkOrder .list li{ padding: 10px; width: 100%; border-bottom: 1px solid #ddd;}
	.checkOrder .list li p{ font-size: 12px; line-height: 20px;}
</style>
<script>
	import orderService from '@/services/orderService'

	export default {
		data() {
			return {
				list: [],


				param:{
					page:1,

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
		}
	}
</script>