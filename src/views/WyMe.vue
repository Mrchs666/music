<!-- 主页面(我的) -->
<template>
	<div class="my-box">
		<div class="header-box">
			<div class="cloud fl">
				<img class="auto-img" src="../../public/img/z/bkf1.png">
			</div>
			<div class="me-music fl">我的音乐</div>
			<div class="line-box fr">
				<i class="line"></i>
				<i class="line"></i>
				<i class="line"></i>
				<i class="line"></i>
			</div>
		</div>

		<ul class="local-box">
			<li class="loacl-music">
				<router-link to="/localmui" tag="div">
					<div class="musimg fl">
						<img class="auto-img" src="../../public/img/z/music1.png">
					</div>
					<div class="local-text fl">
						<div class="fl">本地音乐</div>
						<div class="fr quantity">{{$store.state.hotSong.length}}</div>
						<div class="arrow-r">
							<img class="auto-img" src="../../public/img/z/a9k.png">
						</div>
					</div>
				</router-link>
			</li>
			<li class="loacl-music">
				<div class="musimg3 fl">
					<img class="auto-img" src="../../public/img/z/b00.png">
				</div>
				<div class="local-text fl">
					<div class="fl">最近播放</div>
					<div class="fr quantity">0</div>
					<div class="arrow-r">
						<img class="auto-img" src="../../public/img/z/a9k.png">
					</div>
				</div>
			</li>
			<li class="loacl-music">
				<div class="musimg3 fl">
					<img class="auto-img" src="../../public/img/z/diantai.png">
				</div>
				<div class="local-text fl">
					<div class="fl">我的电台</div>
					<div class="fr quantity">0</div>
					<div class="arrow-r">
						<img class="auto-img" src="../../public/img/z/a9k.png">
					</div>
				</div>
			</li>
			<li class="loacl-music">
				<div class="musimg4 fl">
					<img class="auto-img" src="../../public/img/z/shoucang.png">
				</div>
				<div class="local-text fl">
					<div class="fl">我的收藏</div>
					<div class="fr quantity">0</div>
					<div class="arrow-r">
						<img class="auto-img" src="../../public/img/z/a9k.png">
					</div>
				</div>
			</li>
		</ul>
		<div class="logShow" v-show="$store.state.logShow">
			<p>我的音乐</p>
			<ul>
				<li class="likesong" v-for="(item,index) in userS" :key="index">
					<div class="fl imgSize">
						<img class="auto-img" :src="item.coverImgUrl">
					</div>
					<div class="fl numR">
						<div class="gdName">{{item.name}}</div>
						<div class="manySong">{{item.trackCount}}首</div>
					</div>
				</li>
			</ul>
		</div>

		<router-view />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userSong: []
			}
		},
		
		computed: {
			userS() {
				return this.userSong
			}
		},

		methods: {
			//获取到用户歌单s
			getUserSong() {

				if (this.$store.state.logShow === true) {
					
					this.axios(`https://www.arthurdon.top:10099/user/playlist?uid=${this.$store.state.userId}`).then(res => {
						console.log('用户歌单==>', res)
						
						let data = res.data.playlist
						
						this.userSong = data
					})
				}
			},
			
			goSongList() {
				
			}
			
		},
		mounted() {
			this.getUserSong()
		}
	}
</script>

<style lang="scss">
	.my-box {
		position: relative;
		height: 100%;
		padding-bottom: 50px;
		background: url('../../public/img/back.jpeg') no-repeat 0 0;
		background-size: cover;
	}

	.header-box {
		width: 100%;
		height: 50px;
		background-color: #D43E35;
		padding: 10px 15px;

		.cloud {
			width: 30px;
		}

		.me-music {
			width: 80%;
			font-size: 18px;
			text-align: center;
			line-height: 30px;
			color: #fff;
		}

		.line-box {
			position: relative;
			top: 5px;

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

	.loacl-music {
		height: 55px;
		padding: 5px 0;
		overflow: hidden;

	}

	.musimg {
		width: 60px;
		margin-top: 3px;
	}

	.musimg2 {
		width: 35px;
		margin: 3px 10px 0;
	}

	.musimg3 {
		width: 35px;
		margin: 5px 13px 0 12px;
	}

	.musimg4 {
		width: 30px;
		margin: 8px 15px 0 15px;
	}

	.local-text {
		position: relative;
		width: calc(100% - 70px);
		margin-left: 10px;
		line-height: 49px;
		font-size: 17px;
		padding-right: 30px;
		border-bottom: 1px solid #e8e8e9;

		.quantity {
			font-size: 14px;
			color: #969798;
		}

		.arrow-r {
			position: absolute;
			top: 0;
			right: 10px;
			bottom: 0;
			width: 15px;
			height: 15px;
			margin: auto 0;
		}
	}

	.logShow {
		margin-top: 30px;
		padding: 20px 10px;
		border-radius: 20px 20px 0 0;
		background-color: rgba(255, 255, 255, .5);
		
		ul{
			overflow: hidden;
		}
		
		.likesong {
			width: 50%;
			height: 50px;
			float: left;
			overflow: hidden;
			text-align: center;
			margin-top: 15px;
			
			.numR {
				width: 105px;
				padding: 0 10px;
				line-height: 25px;
			}
			
			.gdName{
				
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			
			.imgSize {
				width: 50px;
			}

			.manySong {
				font-size: 13px;
				color: rgba(0,0,0,.5);
			}
		}
	}
</style>
