<template>
	<div id="app">

		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		name: 'App',
		methods: {
			created () {
				console.log("app")
			}
		}
	}
</script>

<style>
	@import './styles/base.css';
</style>

