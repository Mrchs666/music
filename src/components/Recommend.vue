<template>
	<div class="content">
		<div class="banner-box">
			<div class="banner">
				<ul class="banner-list" :style="[{width:(bannerImg.length + 1) * 400 + 'px'},{transform: offsetX}]" ref="imgWidth">
					<li v-for="(item,index) in bannerImg" :key="index">
						<img class="auto-img" :src="item.imageUrl" />
					</li>
					<li>
						<img class="auto-img" :src="bannerImg[0].imageUrl" v-if="bannerImg[0] != undefined" />
					</li>
				</ul>
				<ul class="circle">
					<li v-for="(v,i) in bannerImg.length" :key="i" :class="{active:currentIndex == i}"></li>
				</ul>
			</div>
		</div>
		<div class="below">
			<div class="select">
				<div class="abc">
					<div class="item">
						<img class="auto-img" src="../../public/img/z/t_dragonball_icn_fm.png" />
					</div>
					<div class="sele-text">私人FM</div>
				</div>
				<div @click="whetherLog" class="abc">
					<div class="item">
						<img class="auto-img" src="../../public/img/z/ril.png" />
						<div class="getdate">{{date}}</div>
					</div>
					<div class="sele-text">每日推荐</div>
				</div>
				<div class="abc">
					<div class="item">
						<img class="auto-img" src="../../public/img/z/ab.png" />
					</div>
					<div class="sele-text">歌单</div>
				</div>
				<div class="abc">
					<div class="item">
						<img class="auto-img" src="../../public/img/z/tongji2.png" />
					</div>
					<div class="sele-text">排行榜</div>
				</div>
			</div>


			<div class="recom">
				<div>
					<span class="recom-text">推荐歌单</span>
					<span class="tine"> ></span>
				</div>
				<ul class="module">
					<li class="module-content" v-for="(v,i) in recomsong" :key="i" @click="goSongList(i)">
						<img class="auto-img m" :src="v.picUrl">
						<div class="module-text">{{v.name}}</div>
					</li>
				</ul>
			</div>

			<div class="recom">
				<div>
					<span class="recom-text">最新音乐</span>
					<span class="tine"> ></span>
				</div>
				<ul class="module">
					
					<li class="module-content" v-for="(k,j) in newsong" :key="j">
						<img class="auto-img m" :src="k.song.album.blurPicUrl" />
						<div class="module-t">{{k.song.album.name}}</div>
						<div class="module-t tc">{{k.song.artists[0].name}}</div>
					</li>
				
				</ul>
			</div>
		</div>

		<div class="err" v-show="msg">
			<div class="err-box">
				<p>请先登录</p>
				<div class="sure" @click="skipLog">确定</div>
			</div>
		</div>
		
			<router-view />
	</div>
</template>


<script>
	// import Techweb from './Techweb'
	export default {
		data() {
			return {
				bannerImg: [],  //轮播图片
				recomsong: [],	//推荐歌曲
				newsong: [],		//最新歌曲
				date: '',
				currentIndex: 0,
				msg: false //未登录
			};
		},
		computed: {
			offsetX() {
				let x = -370 * this.currentIndex;
				return `translate(${x}px)`;
			}
		},
		methods: {
			getBanner() {
				//轮播图图片ss
				this.axios("https://www.arthurdon.top:10099/banner").then(res => {
						// console.log('res ==> ',res.data.banners)
						let data = res.data.banners;

						this.bannerImg = data;
					}),
						
					//获取推荐歌单
					this.axios(
						`https://www.arthurdon.top:10099/recommend/resource`, {withCredentials: true}).then(res => {

						console.log('推荐歌单==>', res)

						let data = res.data.recommend.slice(0, 6);

						this.recomsong = data;
					}),

					//获取最新音乐
					this.axios("https://www.arthurdon.top:10099/personalized/newsong").then(res => {

						let data = res.data.result.slice(0, 6);

						this.newsong = data;

					})
			},
			adate() {
				let time = new Date().getDate()
				this.date = time
			},
			//是否已经登录
			whetherLog() {
				if (this.$store.state.logShow === true) {
					this.$router.push({
						name: 'everyday'
					})

				} else {
					this.msg = true
				}

			},
			//跳转到登录页面
			skipLog() {
				this.msg = false
				this.$router.push({
					name: 'login'
				})
			},
			
			//进入某某某的歌单列表
			goSongList(j) {
				//进入路由find
				this.$router.push({name: 'songlist'})
				
				// 获取歌单详情
				this.axios(`https://www.arthurdon.top:10099/playlist/detail?id=${this.recomsong[j].id}`).then(res => {
					
					console.log('这是啥-->', res)
					
					let data = res.data
					this.$store.commit('comSong',data)
					console.log('推荐歌单详情页->',this.$store.state.comSongs)
				})
			}

		},

		mounted() {
			this.getBanner();
			this.adate();
			setInterval(() => {
				this.currentIndex++;
			}, 5000);

			this.$refs.imgWidth.addEventListener("transitionend", () => {
				if (this.currentIndex == this.bannerImg.length) {
					this.$refs.imgWidth.style.transition = "none";
				}

				if (this.currentIndex >= this.bannerImg.length) {
					this.currentIndex = 0;
				}
			});
		},
		watch: {
			currentIndex(val) {
				if (val === 1) {
					this.$refs.imgWidth.style.transition = "all 0.5s linear";
				}
			}
		}
		// components:{
		// 	Techweb
		// }
	};
</script>

<style lang="scss" scoped>
	.content {
		margin-bottom: 50px;
	}

	.banner-box {
		width: 100%;
		height: 105px;
		background-color: #cb4d3f;
		margin-top: 100px;
	}

	.banner {
		width: 360px;
		position: relative;
		left: 0;
		right: 0;
		margin: 0 auto;
		border-radius: 8px;
		overflow: hidden;


		.banner-list {
			transition: left 0.5s linear;
			overflow: hidden;

			li {
				width: 360px;
				float: left;
				margin-right: 10px;
				border-radius: 7px;

				&:last-child {
					margin-right: 0;
				}
			}
		}

		.circle {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 8px;
			width: 125px;
			margin: 0 auto;
			overflow: hidden;

			li {
				float: left;
				width: 8px;
				height: 8px;
				background-color: rgba(255, 255, 255, 0.5);
				border-radius: 50%;
				margin-right: 5px;
				transition: all 0.5s linear;

				&:last-child {
					margin-right: 0;
				}
			}

			.active {
				background-color: #f0f0f0;
			}
		}
	}

	.below {
		width: 100%;
		background-color: #fbfcfe;

		.select {
			height: 119px;
			background-color: #fbfcfe;
			border-bottom: 1px solid #ebecee;
			padding: 30px 25px 10px;
			margin-top: 15px;
			display: flex;
			justify-content: space-between;

			.item {
				position: relative;
				flex: 1;
				width: 50px;
				height: 50px;
				background-color: #d15345;
				border-radius: 50%;
				margin-bottom: 10px;
			}

			.getdate {
				width: 18px;
				position: absolute;
				top: 21px;
				left: 3px;
				right: 0;
				bottom: 0;
				margin: auto;
				color: #FCF2F1;
				font-size: 14px;
			}

			.sele-text {
				font-size: 12px;
				font-family: '微软雅黑';
				text-align: center;
			}
		}
	}

	.recom {
		padding: 15px 15px 0;

		.recom-text {
			font-size: 18px;
			font-family: '微软雅黑';
			font-weight: 600;
		}

		.tine {
			font-size: 20px;
			font-family: '宋体';
		}

		.module {
			display: flex;
			flex-flow: row wrap;
			margin: 15px 0 0;

			.module-content {
				flex: 1;
				width: 100px;
				margin-right: 5px;
				margin-bottom: 10px;

				&:nth-child(3n) {
					margin-right: 0;
				}
			}
		}

		.m {
			width: 110px;
		}

		.module-text {
			-webkit-line-clamp: 2;
			display: -webkit-box;
			overflow: hidden;
			-webkit-box-orient: vertical;
			font-size: 13px;
			margin-top: 5px;
			font-family: '宋体';
			line-height: 1.3;
		}

		.module-t {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 14px;
			margin-top: 5px;
			font-family: '宋体';
			line-height: 1.3;
		}

		.tc {
			font-size: 12px;
			color: #A4A5A6;
		}

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
		background-color: rgba(0, 0, 0, .4);

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
			background-color: rgb(174, 222, 244);
			color: #fff;
			border-radius: 5px;
		}
	}
</style>
