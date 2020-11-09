<template>
	<div class="bank-box">
		<div class="bank-header">
			<span>帐号</span>
			<div class="stati">
				<i class="line"></i>
				<i class="line"></i>
				<i class="line"></i>
				<i class="line"></i>
			</div>
		</div>
		
		<!-- 登陆前 -->
		<div class="login-box" v-show="!$store.state.logShow">
			<p>登录网易云音乐</p>
			<p class="login-content">手机电脑多端同步，320k高音质无限下载</p>
			<div class="now-login" @click="nowlogin">立即登录</div>
		</div>
		
		<!-- 登陆后 -->
		<div class="login-suc" v-show="$store.state.logShow">
			<div class="log-top">
				<div class="log-l">
					<div class="head-por">
						<img class=auto-img src="https://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg" />
					</div>

					<div class="nickname">
						{{$store.state.nickname}}
					</div>

				</div>
				<div class="log-r">签到</div>
			</div>

			<div class="log-bot">
				<div>
					<p>动态</p>
					<p>0</p>
				</div>
				<div>
					<p>关注</p>
					<p>0</p>
				</div>
				<div>
					<p>粉丝</p>
					<p>0</p>
				</div>
				<div class="ziliao">我的资料</div>
			</div>
		</div>

		<div class="information clearfix">
			<div class="fl ift">
				<img class="auto-img" src="../../public/img/z/xiaoxi.png">
			</div>
			<span>我的信息</span>
			<div class="arr-r fr">
				<img class="auto-img" src="../../public/img/z/a9k.png">
			</div>
		</div>

		<ul class="vip-box">
			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/vip.png">
				</div>
				<span class="vip-con">会员中心</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>

			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/chaoshi.png">
				</div>
				<span class="vip-con">商场</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>

			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/zxtg.png">
				</div>
				<span class="vip-con">在线听歌免流量</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
		</ul>

		<ul class="vip-box">
			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/shezhi.png">
				</div>
				<span class="vip-con">设置</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/sao.png">
				</div>
				<span class="vip-con">扫一扫</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/huanfu.png">
				</div>
				<span class="vip-con">个性换肤</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/deng.png">
				</div>
				<span class="vip-con">夜间模式</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/dingshi.png">
				</div>
				<span class="vip-con">定时关闭</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/naozhong.png">
				</div>
				<span class="vip-con">音乐闹钟</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/che.png">
				</div>
				<span class="vip-con">驾驶模式</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
			<li class="vip-text clearfix">
				<div class="qinzi fl">
					<img class="auto-img" src="../../public/img/z/t_dragonball_icn_childmode.png">
				</div>
				<span class="vip-con">亲子频道</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/youhui.png">
				</div>
				<span class="vip-con">优惠卷</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
		</ul>

		<ul class="vip-box">
			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/fenxiang.png">
				</div>
				<span class="vip-con">分享网易云音乐</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
			<li class="vip-text clearfix">
				<div class="vip-l fl">
					<img class="auto-img" src="../../public/img/z/guanyu.png">
				</div>
				<span class="vip-con">关于</span>
				<div class="arr-r">
					<img class="auto-img" src="../../public/img/z/a9k.png">
				</div>
			</li>
		</ul>

	<div class="quit" v-show="$store.state.logShow" @click="abc">退出登录</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				nickname:''
			}
		},
		
		methods: {
			nowlogin() {
				this.$router.push({name: 'login'})
			},
			
			nick(t) {
				this.nickname = t
			},
			
			abc() {
				this.axios('https://www.arthurdon.top:10099/logout').then(res => {
					console.log(res)
				})
				this.$store.commit('alertLog1')
			}
		}
	}
</script>

<style scoped lang="scss">
	.bank-box {
		background-color: #EEEFF0;
		margin-bottom: 50px;
	}

	.bank-header {
		position: fixed;
		width: 100%;
		height: 50px;
		color: #FEFEFE;
		background-color: #cb4d3f;
		font-size: 20px;
		text-align: center;
		line-height: 50px;
		font-family: "宋体";
		z-index: 2;

		.stati {
			position: absolute;
			top: 0;
			right: 15px;
			bottom: 0;
			margin: auto 0;
			width: 25px;
			height: 25px;
			line-height: 0;

			.line {
				display: inline-block;
				width: 2px;
				background-color: #fff;
				margin-right: 5px;

				&:nth-child(1) {
					height: 10px;
				}

				&:nth-child(2) {
					height: 23px;
				}

				&:nth-child(3) {
					height: 15px;
				}

				&:nth-child(4) {
					height: 20px;
					margin-right: 0;
				}
			}
		}
	}


	.login-box {
		padding: 75px 20px 20px;
		text-align: center;
		background-color: #FBFCFD;

		.login-content {
			margin-top: 10px;
		}

		.now-login {
			width: 100%;
			height: 40px;
			line-height: 40px;
			border: 1px solid #ddd;
			border-radius: 20px;
			margin-top: 15px;
		}
	}

	.login-suc {
		background-color: #FBFCFD;
		padding-top: 50px;

		.log-top {
			position: relative;
			overflow: hidden;
			padding: 20px 20px;
			border-bottom: 1px solid #EEEFF0;
		}

		.log-l {
			float: left;
			overflow: hidden;
		}

		.head-por {
			float: left;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			border: 1px solid #EEEFF0;
			
			img {
				border-radius: 50%;
			}
		}

		.nickname {
			float: left;
			line-height: 50px;
			margin-left: 15px;
			font-size: 18px;
		}

		.log-r {
			position: absolute;
			right: 20px;
			top: 0;
			bottom: 0;
			margin: auto 0;
			width: 50px;
			height: 27px;
			border: 1px solid #e43;
			padding: 5px 10px;
			border-radius: 15px;
			font-size: 14px;
			color: #e43;
			cursor: pointer;
		}

		.log-bot {
			display: flex;
			line-height: 16px;

			div {
				flex: 1;
				text-align: center;
				font-size: 12px;
				margin: 10px 0;
				border-right: 1px solid #EEEFF0;
			}

			.ziliao {
				line-height: 52px;
				border-right: none;
				margin: 0;
			}
		}
	}

	.information {
		position: relative;
		width: 100%;
		height: 45px;
		margin-top: 10px;
		font-size: 17px;
		line-height: 25px;
		padding: 10px;
		background-color: #FBFCFD;

		.ift {
			width: 25px;
			height: 25px;
			margin-top: 1px;
			margin-right: 10px;
		}

	}

	.arr-r {
		position: absolute;
		top: 0;
		right: 10px;
		bottom: 0;
		width: 20px;
		height: 20px;
		margin: auto 0;
	}

	.vip-box {
		margin-top: 10px;
	}

	.vip-text {
		position: relative;
		height: 45px;
		font-size: 17px;
		line-height: 44px;
		padding: 0 10px;
		background-color: #fbfcfd;
	}

	.vip-con {
		display: inline-block;
		width: 90%;
		border-bottom: 1px solid #ddd;
	}

	.vip-l {
		width: 25px;
		height: 25px;
		margin-top: 11px;
		margin-right: 10px;
	}

	.qinzi {
		width: 35px;
		margin: 5px 5px 0 -5px;
	}
	
	.quit {
		height: 45px;
		padding: 0 10px;
		text-align: center;
		line-height: 44px;
		margin-top:10px;
		background-color: #fbfcfd;
		color: #e4393c;
	}
</style>
