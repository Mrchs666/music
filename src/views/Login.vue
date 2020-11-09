<template>
	<div class="login-box2">
		<div class="acn">
			<span>帐号</span>
			<input type="text" placeholder="请输入手机号码" v-model.trim="acn">
		</div>
		
		<div>
			<span>密码</span>
			<input type="password" placeholder="请输入密码" v-model.trim="paw">
		</div>
		
		<div class="btn" @click="sub">登录</div>
		
		<div class="err" v-show="msg">
			<div class="err-box">
				<p>账号或密码输入错误</p>
				<div class="sure" @click="sure1">确定</div>
			</div>
		</div>
	</div>
	
	
</template>

<script>
	
	export default {
		data() {
			return {
				acn:'', //账号
				paw:'', //密码
				msg:false //账号密码是否错误的显示隐藏判断
			}
		},
		
		methods:{
			
			
			getacn() {
				//获取用户账号密码
				this.axios(`https://www.arthurdon.top:10099/login/cellphone?phone=${this.acn}&password=${this.paw}`).then(res => {
						console.log('res ==> ',res)

						let data = res.data;
						//把用户名存进vuex中
						this.$store.commit('nick',data.profile.nickname)
						//获取用户id
						this.$store.commit('getId',data.account.id)
						
						//把登录状态改为true
						this.$store.commit('alertLog')
						
						//手动拿到cookie数据
						this.$store.commit('tKen',data.token)
						
						//进入路由find
						this.$router.push({name: 'find'})
						
						
					}).catch(res => {
						//账号密码输入错误之后要进行什么
						if(res) {	
							this.msg = true
						}			
						
					})
					
			},
			
			sub() {
				this.getacn()
				this.acn=''
				this.paw=''
			},
			
			sure1() {
				this.msg = false
			}
			
			
		}
		
	}
	
	
</script>

<style scoped lang="scss">
	.login-box2{
		position: relative;
		width: 100%;
		height: 100%;
		padding: 60px;
		z-index: 10;
		background-color: #FBFCFD;
		
		div{
			margin: 30px 0 0;
			
			span {
				margin-right: 30px;
			}
			
			input {
				width: 70%;
				outline: none;
				border:none;
				border-bottom: 1px solid #ccc;
				font-size: 18px;
				padding: 0;
			}
		}
		
		.btn {
			width: 150px;
			height: 40px;
			margin: 30px auto;
			text-align: center;
			line-height: 40px;
			background-color: #e4393c;
			color: #fff;
		}
		
		.err {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.4);
			
			.err-box {
				width: 60%;
				height: 150px;
				margin: 150px auto 0;
				background-color: #fff;
				box-shadow: 0px 0 6px 1px;
				text-align: center;
				line-height: 100px;	
			}
			
			.sure {
				width: 60px;
				height: 40px;
				text-align: center;
				line-height: 40px;
				margin: 0 auto;
				background-color: rgb(174,222,244);
				color: #fff;
				border-radius: 5px;
			}
		}
	}
	
</style>
