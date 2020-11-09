<template>
	<div class="song-list">
		<!-- 背景 -->
		<div class="top-background">
			<img class="img1" :src="$store.state.comSongs.playlist.coverImgUrl" 	
			v-if="$store.state.comSongs.playlist.coverImgUrl != undefined"
			>
			<img src="https://p2.music.126.net/ShirbyR_91syW94GsuC1Jg==/18999560928539663.jpg" v-else>
			<div class="introduce">
				<div class="fl back" @click="back">
					<img class="auto-img" src="../../public/img/z/ad3.png">
				</div>
				<div class="fl text">歌单</div>
				<div class="fr more">
					<img class="auto-img" src="../../public/img/z/a2b.png">
				</div>
			</div>

			<div class="middle">
				<div class="picture">
					<img class="auto-img" :src="$store.state.comSongs.playlist.coverImgUrl" v-if="$store.state.comSongs.playlist.coverImgUrl != undefined">
					<img src="https://p2.music.126.net/ShirbyR_91syW94GsuC1Jg==/18999560928539663.jpg" v-else>
				</div>
				<div class="text-r">
					<div class="songlist-name">{{$store.state.comSongs.playlist.name}}</div>
					<div class="presentation">
						{{$store.state.comSongs.playlist.description}}
					</div>
				</div>
			</div>

		</div>

		<!-- 歌曲列表 -->
		<div class="sele-song">

			<!-- 播放全部部分 -->
			<div class="sele-top">
				<div class="fl play-img">
					<img class="auto-img" src="../../public/img/z/bhm.png">
				</div>
				<div class="fl ">
					<span>播放全部</span>
					<span class="how-many">(共{{$store.state.comSongs.playlist.tracks.length}}首)</span>
				</div>
				<div class="fr add-collect">+收藏(12142)</div>
			</div>

			<!-- 歌曲列表显示 -->
			<div class="play-song">
				<ul>
					<li v-for="(item, index) in $store.state.comSongs.playlist.tracks" :key="index" @click="play(index)">
						<div class="fl num">{{index + 1}}</div>
						<div class="fl singer-box">
							<div class="song-name">{{item.name}}</div>
							<div class="singer">{{item.al.name}}</div>
						</div>
						<div class="fr">
							<span class="vido"><img class="auto-img" src="../../public/img/z/t_actionbar_video_selected.png"></span>
							<span class="more"><img class="auto-img" src="../../public/img/z/a3a.png"></span>
						</div>
					</li>

				</ul>
			</div>
		</div>
		
		<!-- <playpage 
			v-show="$store.state.songShow"
			:tuijian="'tuijian'"
			:audioDom="audioDom"
			:nameS="nameS"
			@nextid="nextid"
			@prveid="prveid"/> -->
	</div>
</template>

<script>
	// import playpage from "../components/PlayPage.vue"
	export default {
		props:['audioDom'],
	
		methods:{
			back() {
				this.$router.go(-1)
			},
			
			play(j) {
				
				this.$store.commit('SongId',this.$store.state.comSongs.privileges[j].id)
				
				this.$emit("audios", this.$store.state.comSongs.privileges[j].id)
				
				this.$store.commit('SongNum',this.$store.state.comSongs.playlist.tracks)
				
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
		}
		
		// components:{
		// 	playpage
		// }
	}
</script>

<style scoped lang="scss">
	.song-list {
		position: relative;
		height: 100%;
	}

	.top-background {
		position: relative;
		width: 100%;
		height: 300px;
		// background: url('http://p1.music.126.net/NYHDw-AwM4adHz8ZXYKUXg==/109951164869100401.jpg') no-repeat 0px 0px;
		// background-size: 100% 100%;
		padding: 10px;
		
		.img1 {
			position: fixed;
			top: 0;
			width: 100%;
			height: 300px;
			filter: blur(10px);
			z-index: 0;
		}
		
	}


	.introduce {
		position: relative;
		top: 0;
		width: 100%;
		z-index: 11;
		overflow: hidden;

		.back {
			width: 30px;
			margin-top: 5px;
		}

		.text {
			width: calc(100% - 70px);
			text-align: center;
			line-height: 40px;
			color: rgba(255, 255, 255, .9);
		}

		.more {
			width: 40px;
		}
	}

	.middle {
		position: relative;
		top: 25px;
		z-index: 11;

		.picture {
			position: absolute;
			top: 0;
			left: 0;
			width: 150px;
			height: 150px;
			border-radius: 8px;

			img {
				border-radius: 8px;
			}
		}

		.text-r {
			position: absolute;
			right: 0;
			width: calc(100% - 160px);
			height: 150px;

			.songlist-name {
				margin-top: 20px;
				color: rgba(255, 255, 255, .9);
				font-size: 15px;
				letter-spacing: 1px;
			}

			.presentation {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
				color: #ccc;
				font-size: 13px;
				margin-top: 50px;
				letter-spacing: 1px;
			}
		}
	}


	.sele-song {
		position: absolute;
		width: 100%;
		top: 280px;
		background-color: #fff;
		border-radius: 20px 20px 0 0;
		padding: 5px 10px 50px;
		z-index: 20;

		.sele-top {
			overflow: hidden;
			line-height: 40px;
			font-weight: bold;
			font-family: 新宋体;

			.play-img {
				width: 20px;
				margin-top: 11px;
				margin-right: 10px;
			}

			.how-many {
				font-size: 12px;
				color: #ccc;
				margin-left: 5px;
			}

			.add-collect {
				width: 110px;
				height: 40px;
				border-radius: 20px;
				background-color: #e4393c;
				text-align: center;
				color: #fff;
				font-weight: 1;
				font-family: 微软雅黑;
				font-size: 14px;
				letter-spacing: 1px;
			}
		}

		.play-song {

			li {
				width: 100%;
				height: 40px;
				margin-top: 15px;
				overflow: hidden;
			}

			.num {
				width: 40px;
				text-align: center;
				line-height: 40px;
				color: #888888;
				font-size: 14px;
			}

			.singer-box {
				width: calc(100% - 113px);
				
				.song-name {
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}


			.singer {
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 12px;
				color: #888888;
				line-height: 22px;
			}

			.vido {
				display: inline-block;
				width: 50px;
			}

			.more {
				display: inline-block;
				width: 23px;
				margin-bottom: 8px;
			}
		}
	}
</style>
