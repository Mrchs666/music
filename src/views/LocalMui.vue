//我的音乐

<template>
	<div class="native-box">
		<div class="top-box">
			<div class="top">
				<div class="arr-left" @click="back">
					<img class="auto-img" src="../../public/img/z/ad3.png">
				</div>

				<div>本地歌曲</div>

				<div class="stati" @click="showP">
					<i class="line"></i>
					<i class="line"></i>
					<i class="line"></i>
					<i class="line"></i>
				</div>
			</div>

			<div class="option-box">
				<div class="k" :class="{kactive:islight == 0}" @click="light(0)">歌曲</div>
				<div class="k" :class="{kactive:islight == 1}" @click="light(1)">视频</div>
				<div class="k" :class="{kactive:islight == 2}" @click="light(2)">其他</div>
			</div>
		</div>

		<div class="mid-box">
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

			<div class="songs-lista">
				<ul>
					<li class="songs-box" v-for="(i,j) in $store.state.hotSong" :key="j" @click="play(j)">
						<div>{{i.name}}</div>
						<div class="songster">{{singerName(i.ar)}} - {{i.al.name}}</div>
						<div class="even-more">
							<img class="auto-img" src="../../public/img/z/a2a.png">
						</div>
					</li>
				</ul>
			</div>
		</div>

		<!-- <playpage 
		v-show="$store.state.songShow"  
		:audioDom="audioDom" 
		@nextid="nextid"
		@prveid="prveid"
		/> -->
	</div>
</template>

<script>
	// import playpage from "../components/PlayPage.vue"
	export default {
		// props: ["audioDom"],
		data() {
			return {
				islight: 0,
				isshow: false,
			}
		},
		methods: {
			light(i) {
				this.islight = i;
			},

			singerName(k) {
				let sing = []
				for (let i = 0; i < k.length; i++) {
					sing.push(k[i].name)
				}
				return sing.join('/')
			},

			play(j) {
				// this.$store.commit('sShow', true)
				this.$router.push({name:'playpage'})
				
				this.$store.commit('SongId',this.$store.state.hotSong[j].id)
				
				this.$emit("audios", this.$store.state.hotSong[j].id)
			},

			back() {
				this.$router.go(-1)
			},
			
			showP() {
				this.$store.commit('sShow', true)
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
		
		// components: {
		// 	playpage
		// }
	}
</script>

<style lang="scss">
	.native-box {
		position: relative;
		height: 100%;
		overflow: hidden;
	}

	.top-box {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
		line-height: 50px;
		color: #fff;
		background-color: #D83F36;
		z-index: 2;

		.top {
			position: relative;
			font-size: 18px;
		}

		.arr-left {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			margin: auto 0;
			width: 30px;
			height: 30px;
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

		.option-box {
			display: flex;

			.k {
				flex: 1;
			}

			.kactive {
				font-weight: bold;
			}
		}
	}

	.mid-box {
		height: calc(100% - 100px);
		margin: 100px 0 0;
		overflow: hidden;


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

		.songs-lista {
			height: calc(100% - 110px);
			overflow-x: hidden;

			ul {
				height: 100%;
				// margin-bottom: 100px;
			}
		}

		.songs-box {
			position: relative;
			width: 100%;
			height: 55px;
			line-height: 20px;
			padding: 8px;
			border-bottom: 1px solid #F5F6F7;

			.songster {
				width: 90%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 13px;
				color: #999A9B;
			}

			.even-more {
				position: absolute;
				top: 0;
				right: 8px;
				bottom: 0;
				width: 30px;
				height: 30px;
				margin: auto 0;
			}
		}
	}
</style>
