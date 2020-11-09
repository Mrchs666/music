<template>
	<div id="app" class="app">
		<div class="nav">
			<audio ref="auo"></audio>
			<router-link class="item" to="/" exact tag="div">
				<div class="find-img discover"></div>
				<span class="content">发现</span>
			</router-link>
			<router-link class="item" to="/wyvideo" tag="div">
				<div class="find-img apple"></div>
				<span class="content">视频</span>
			</router-link>
			<router-link class="item" to="/me" tag="div">
				<div class="find-img boy"></div>
				<span class="content">我的</span>
			</router-link>
			<router-link class="item" to="/friend" tag="div">
				<div class="find-img cat"></div>
				<span class="content">朋友</span>
			</router-link>
			<router-link class="item" to="/BankAccount" tag="div">
				<div class="find-img dog"></div>
				<span class="content">账号</span>
			</router-link>
		</div>
		<keep-alive>
			<router-view @audios="audio" :audioDom="$refs.auo" />
		</keep-alive>
	</div>
</template>

<script>
	// import MusicHeader from "./components/MusicHeader"
	export default {
		data: () => ({
			publicPath: process.env.BASE_URL,
			seller: {},
			currentid: 0,
		
			
		}),
		
		methods: {
			getSellerData() {
				this.axios("https://www.arthurdon.top:10099/artist/list").then(res => {
					let data = res.data.artists;

					this.seller = data;
				});
			},
			
			audio(j) {

				if (j == this.currentid) {
					return;
				}

				let audio = this.$refs.auo
				audio.src = `https://music.163.com/song/media/outer/url?id=${j}`
				audio.play()
				this.currentid = j
				
				this.$refs.auo.currentTime = this.$store.state.currentTime
			},

			// currentTime3(i) {
			// 	this.$refs.auo.currentTime = i
			// }
		},
		mounted() {
			this.getSellerData();
			
			setInterval(() => {
				this.axios(`https://www.arthurdon.top:10099/login/refresh`,{withCredentials: true}).then(res => {
					console.log('登录状态 ==>',res)
				})
					
			},6000000)
		}
	};
</script>

<style lang="scss">
	.app {
		height: 100%;
		background-color: #FBFCFD;
		// overflow: hidden;
	}

	.nav {
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		height: 50px;
		line-height: 84px;
		background-color: #f6f6f6;
		font-size: 12px;
		color: #b4b4b4;
		z-index: 99;

		.item {
			flex: 1;
			text-align: center;
			position: relative;

			.find-img {
				width: 50px;
				height: 50px;
				position: absolute;
				top: -7px;
				left: 0;
				right: 0;
				margin: 0 auto;
			}

			.discover {
				background: url("../public/img/z/t_actionbar_discover_selected.png") no-repeat center center;
				background-size: cover;
			}

			&.router-link-active {
				.discover {
					background-image: url("../public/img/z/t_actionbar_discover_normal.png");
				}

				.content {
					color: #db463f;
				}
			}

			.apple {
				background: url("../public/img/z/t_actionbar_video_selected.png") no-repeat center center;
				background-size: cover;
			}

			&.router-link-active {
				.apple {
					background-image: url("../public/img/z/t_actionbar_video_normal.png");

				}

				.content {
					color: #db463f;
				}
			}

			.boy {
				background: url("../public/img/z/t_actionbar_music_selected.png") no-repeat center center;
				background-size: cover;
			}

			&.router-link-active {
				.boy {
					background-image: url("../public/img/z/t_actionbar_music_normal.png");

				}

				.content {
					color: #db463f;
				}
			}

			.cat {
				background: url("../public/img/z/t_actionbar_friends_selected.png") no-repeat center center;
				background-size: cover;
			}

			&.router-link-active {
				.cat {
					background-image: url("../public/img/z/t_actionbar_friends_normal.png");

				}

				.content {
					color: #db463f;
				}
			}

			.dog {
				background: url("../public/img/z/me1.png") no-repeat center center;
				background-size: cover;
			}

			&.router-link-active {
				.dog {
					background-image: url("../public/img/z/me2.png");
				}

				.content {
					color: #db463f;
				}
			}
		}
	}
</style>
