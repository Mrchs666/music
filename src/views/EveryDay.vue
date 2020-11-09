<!-- 每日推荐页面 -->
<template>
	<div class="everyday-box">
		<!-- 上面导航栏 -->
		<div class="head">
			<div class="header-box">
				<div class="arrow-l" @click="back">
					<img class="auto-img" src="../../public/img/z/ad3.png">
				</div>
				<span>每日推荐</span>
				<div class="mark">
					<img class="auto-img" src="../../public/img/z/a8q.png" />
				</div>
				<div class="stati">
					<i class="line"></i>
					<i class="line"></i>
					<i class="line"></i>
					<i class="line"></i>
				</div>
			</div>
		</div>
		<!-- 中间视图 -->
		<div class="back-img">
			<div class="back-content">
				<img class="auto-img" :src="backimg">
			</div>
			<div class="calendar">
				<img class="auto-img" src="../../public/img/z/ril.png">
			</div>
			<div class="daynum">{{date}}</div>
			<div class="taste">根据你的音乐口味生成，每天6:00更新</div>
		</div>

		<!-- 播放全部 -->
		<div class="List-box">
			<div class="all">
				<div class="fl">
					<div class="all-i fl">
						<img class="auto-img" src="../../public/img/z/bhm.png">
					</div>
					<span class="fl play-all">播放全部</span>
				</div>
				<div class="fr">
					<div class="all-i fl">
						<img class="auto-img" src="../../public/img/z/gengduo.png">
					</div>
					<span class="more fl">多选</span>
				</div>
			</div>

			<!-- 歌曲列表 -->
			<ul class="songli">
				<li class="clearfix songli-box" v-for="(i,j) in $store.state.hotSong" :key="j" @click="play(j)">
					<div class="fl song-album">
						<img class="auto-img" :src="i.album.picUrl">
					</div>
					<div class="song-name fl">
						<div class="song-title">{{i.name}}</div>
						<div class="song-author">{{i.artists[0].name}} - {{i.album.name}}</div>
					</div>
					<div class="fl song-mv">
						<img class="auto-img" src="../../public/img/z/t_actionbar_video_selected.png">
					</div>
					<div class="fl more-songs">
						<img class="auto-img" src="../../public/img/z/a2a.png">
					</div>
				</li>
			</ul>
		</div>
		
		<!-- <playpage
			v-show="$store.state.songShow"
			:audioDom="audioDom"
			:tuijian="'tuijian'"
			:nameS="nameS"
			@nextid="nextid"
			@prveid="prveid"/> -->
	</div>


</template>
<script>
	// import playpage from "../components/PlayPage.vue"
	export default {
		props: ["audioDom"],
		data() {
			return {
				backimg: [], //轮播图图片
				date: '', //当前时间的时间戳
			}
		},
		methods: {
			getBack() {
				//获取轮播图图片等
				this.axios("https://www.arthurdon.top:10099/banner").then(res => {
						let data = res.data.banners[0].imageUrl;

						this.backimg = data;
					}),
					//获取每日推荐歌曲
					this.axios(
						`https://www.arthurdon.top:10099/recommend/songs?MUSIC_U=${this.$store.state.cookieM}&__csrf=04c731c3269a2a48b4e273be6b77375d`, {withCredentials: true}).then(res => {
						console.log('每日歌曲==>',res)
						let data = res.data.recommend
						// this.$store.commit('eSong',data)
						this.$store.commit('SongNum',data)
						// console.log('ever->',this.$store.state.everySong)
						console.log('ever->',this.$store.state.hotSong)
						
					})
					
			},
			
			adate2() {
				//获取时间
				let time = new Date().getDate();
				this.date = time;
			},
			//退后键
			back() {
				this.$router.go(-1)
			},
			
			//点击播放
			play(j) {
				this.$store.commit('SongId',this.$store.state.hotSong[j].id)
				
				this.$emit("audios", this.$store.state.hotSong[j].id)
				
				this.$router.push({name:'playpage'})
			},
			
			nextid (id) {
				// this.getid = id;
				this.$store.commit('SongId',id)
				this.$emit("audios", id)
			},
			
			prveid (id) {
				// this.getid = id;
				this.$store.commit('SongId',id)
				this.$emit("audios", id)
			}
			
		},
		mounted() {
			this.getBack();
			this.adate2();
		}
		// components:{
		// 	playpage
		// }
	}
</script>

<style lang="scss" scoped>
	.head {
		position: relative;
		height: 50px;

		text-align: center;
		line-height: 50px;
		overflow: hidden;
		color: #fff;
		font-size: 20px;

		.header-box {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 3;
			background-color: #D83F36;
		}

		.arrow-l {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			margin: auto 0;
			width: 30px;
			height: 30px;
			line-height: 0;
		}

		.mark {
			position: absolute;
			top: 0;
			right: 60px;
			bottom: 0;
			margin: auto 0;
			width: 25px;
			height: 25px;
			line-height: 0;
		}

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

	.back-img {
		position: relative;
		overflow: hidden;

		.back-content {
			height: 120px;
			transform: scale(2.5) translateX(112px);
			margin-top: 50px;
		}

		.calendar {
			position: absolute;
			left: -10px;
			bottom: 50px;
			width: 120px;
		}

		.daynum {
			position: absolute;
			left: 37px;
			bottom: 64px;
			font-size: 26px;
			color: #f0f0f0;
		}

		.taste {
			position: absolute;
			left: 15px;
			bottom: 15px;
			font-size: 12px;
			color: #B0E2FF;
		}
	}

	.all {
		width: 100%;
		height: 50px;
		padding: 15px 10px;
		border-bottom: 1px solid #F5F6F7;

		.all-i {
			width: 20px;
		}

		.play-all {
			font-size: 17px;
			margin-left: 10px;
			padding-top: 1px;
		}

		.more {
			font-size: 14px;
			margin-left: 5px;
			line-height: 20px;
		}
	}
	
	.List-box{
		padding-bottom: 50px;
	}
	
	.songli {
		.songli-box {
			width: 100%;
			height: 55px;
			padding: 7px 5px;
			border-bottom: 1px solid #F5F6F7;
		}

		.song-name {
			width: 65%;
			padding: 0 10px;

			.song-title {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				line-height: 24px;
			}

			.song-author {
				font-size: 13px;
				color: #A6A6A7;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}

		.song-album {
			width: 40px;
		}

		.song-mv {
			width: 40px;
			margin-top: 3px;
		}

		.more-songs {
			width: 25px;
			margin: 6px 0 0 10px;
		}

	}
</style>
