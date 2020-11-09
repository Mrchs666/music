//歌词页面

<template>
	<div class="all-play-box">
		<div class="back-box" v-if="getSong.al">
			<img class="auto-img1" :src="getSong.al.picUrl">
		</div>
		<div class="back-box" v-else>
			<img class="auto-img1" :src="getSong.album.picUrl">
		</div>
		<div class="play-head">
			<div class="play-back" @click="retreat">
				<img class="auto-img" src="../../public/img/z/ad3.png">
			</div>
			<p class="song-n">
				{{getSong.name}}
			</p>
			<p class="song-g">{{singer()}}</p>
			<div class="whale">
				<img class="auto-img" src="../../public/img/z/bcu.png">
			</div>
			<div class="share">
				<img class="auto-img" src="../../public/img/z/fenxiang2.png">
			</div>
		</div>

		<div class="play-circle">
			<div v-show="lyric == false" @click="lyricImg">
				<div class="album-circle">
					<img class="auto-img" src="../../public/img/z/aiz.png">
				</div>
				<div class="circle-interior" v-if="getSong.al">
					<img class="auto-img" :src="getSong.al.picUrl">
				</div>
				<div class="circle-interior" v-else>
					<img class="auto-img" :src="getSong.album.picUrl">
				</div>

				<div class="tail-option">
					<div class="collect">
						<img class="auto-img" src="../../public/img/z/au6.png">
					</div>

					<div class="collect">
						<img class="auto-img" src="../../public/img/z/aol.png">
					</div>

					<div class="collect">
						<img class="auto-img" src="../../public/img/z/bcx.png">
					</div>

					<div class="collect">
						<img class="auto-img" src="../../public/img/z/a2b.png">
					</div>
				</div>
			</div>

			<div class="lyric-box" @click="lyrictext" v-show="lyric == true" ref="scoll">
				<ul>
					<li v-for="(v,i) in lyricList" :class="{'singer-active':indexActive == i}" :key="i">
						{{v.text}}
					</li>
				</ul>
			</div>
		</div>



		<div class="tail">

			<div class="tail-duration clearfix">
				<p class="fl underway">{{current}}</p>
				<div class="fl progress-box">
					<div class="progress" ref="proW">
						<div class="progress-active" ref="actW"></div>
						<div class="mask" ref="maskW"></div>
						<div class="layer" ref="layer"></div>
					</div>
				</div>
				<p class="fr total-time">{{dution}}</p>
			</div>

			<div class="tail-but">
				<div class="circulation">
					<img class="auto-img" src="../../public/img/z/am2.png">
				</div>
				<div class="prev" @click="prve">
					<img class="auto-img" src="../../public/img/z/acc.png">
				</div>
				<div class="play" @click="stop">
					<img class="auto-img" ref="sandp" :src="isPlay">
				</div>
				<div class="next" @click="next">
					<img class="auto-img" src="../../public/img/z/acb.png">
				</div>
				<div class="more-mus">
					<img class="auto-img" src="../../public/img/z/ac9.png">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["audioDom"],
		data() {
			return {
				dution: '',
				current: '',
				playStop: 1,
				lyric: false,
				isTouch: false,
				play: require('../../public/img/z/ac7.png'),
				stop1: require('../../public/img/z/ac3.png'),
				lyricList: [],
				indexActive: 0
			}
		},
		computed: {
			getSong() {
				for (let i = 0; i < this.$store.state.hotSong.length; i++) {
					if (this.$store.state.hotSong[i].id == this.$store.state.hotSongId) {

						return this.$store.state.hotSong[i]
					}
				}

				return '';
			},

			isPlay() {
				if (this.playStop == 1) {
					return this.stop1
				}
				return this.play
			}
		},
		methods: {
			retreat() {
				this.$router.go(-1)
			},

			singer() {
				let sing = []
				if (this.getSong) {
					if (this.getSong.ar != undefined) {

						for (let j = 0; j < this.getSong.ar.length; j++) {
							sing.push(this.getSong.ar[j].name)
						}

					} else if (this.getSong.artists != undefined) {
						for (let j = 0; j < this.getSong.artists.length; j++) {
							sing.push(this.getSong.artists[j].name)
						}
					}

					return sing.join('/')
				}
			},

			lyricImg() {
				this.lyric = true;
				this.getlyric()
			},

			lyrictext() {
				this.lyric = false;

			},

			//获取歌词
			getlyric() {
				if (this.getSong.al != undefined || this.getSong.album != undefined) {

					if (this.lyricList.length == 0) {

						this.axios(`https://www.arthurdon.top:10099/lyric?id=${this.$store.state.hotSongId}`).then(res => {

							let lyric = res.data.lrc.lyric
							// console.log('lyric ==>', lyric)

							let smt = lyric.split(/[\n\r]+/)

							for (let i = 0; i < smt.length; i++) {
								let lrc = smt[i].split(']')


								let text = lrc[1];


								if (text) {
									let time = lrc[0].slice(1).split(':');

									var second = parseInt(time[0]) * 60 + parseFloat(time[1]);
									// console.log('second ==>', second)

									this.lyricList.push({
										second,
										text
									})
								}
							}
						})
					}
				}
				// console.log('获取歌词 ==>', this.lyricList)
			},


			audioDom1() {
				let self = this;
				let duration;
				let currentTime
				let maskW = window.getComputedStyle(this.$refs.maskW).width;
				let layer = this.$refs.layer
				let actW = this.$refs.actW
				let pro = this.$refs.proW
				let proW = window.getComputedStyle(this.$refs.proW).width;
				let x0

				this.audioDom.oncanplay = function() {

					//计算播放总时长
					duration = this.duration;
					let min = Math.floor(duration / 60);
					min = min >= 10 ? min : '0' + min;
					let sercond = Math.floor(duration % 60);
					sercond = sercond >= 10 ? sercond : '0' + sercond;

					self.dution = `${min}:${sercond}`

					self.playStop = 1


				}

				this.audioDom.ontimeupdate = function() {

					// 计算当前播放时间
					if (!self.isTouch) {
						currentTime = this.currentTime
						let min = Math.floor(currentTime / 60);
						min = min >= 10 ? min : '0' + min;
						let sercond = Math.floor(currentTime % 60);
						sercond = sercond >= 10 ? sercond : '0' + sercond;

						self.current = `${min}:${sercond}`

						//滑块移动范围
						let minLeft = 0;
						let maxLeft = parseInt(proW) - parseInt(maskW);
						let x = currentTime / duration * maxLeft;

						let left = x <= minLeft ? minLeft : x >= maxLeft ? maxLeft : x;


						self.$refs.maskW.style.left = left + 'px'
						actW.style.width = (x + parseInt(maskW) / 2) + 'px'

						// console.log('1 ==>',self.lyricList.length)
						for (let i = 0; i < self.lyricList.length; i++) {

							if (currentTime >= self.lyricList[self.lyricList.length - 1].second) {
								self.$nextTick(() => {
									document.querySelector(".lyric-box").scrollTop = (i - 3) * 31;
								});

								return
							}

							if (self.lyricList[i].second <= currentTime && self.lyricList[i + 1].second > currentTime) {
								self.indexActive = i
								if (i > 3) {
									self.$nextTick(() => {
										document.querySelector(".lyric-box").scrollTop = (i - 3) * 31;
									});
								}

								return
							}
						}
					}


				}

				this.audioDom.onended = function() {
					console.log('播放完成')
				}

				//点击进度条
				layer.ontouchstart = function(e) {

					x0 = e.touches[0].pageX - parseInt(maskW) * 3.5

					//滑块移动范围
					let minLeft = 0;
					let maxLeft = parseInt(proW) - parseInt(maskW);

					let left = x0 <= minLeft ? minLeft : x0 >= maxLeft ? maxLeft : x0;

					self.$refs.maskW.style.left = left - parseInt(maskW) / 2 + 'px'

					actW.style.width = x0 + 'px'

					// self.$emit("currentTime", x0 / maxLeft * duration)
					this.$store.commit('songCurrentTime', x0 / maxLeft * duration)

					layer.ontouchmove = function(e) {
							self.isTouch = true;
							x0 = e.touches[0].pageX - parseInt(pro.offsetLeft);

							//滑块移动范围
							let minLeft = 0;
							let maxLeft = parseInt(proW) - parseInt(maskW) / 2;

							let left = x0 <= minLeft ? minLeft : x0 >= maxLeft ? maxLeft : x0;

							self.$refs.maskW.style.left = left - parseInt(maskW) / 2 + 'px'
							actW.style.width = (x0 >= maxLeft ? maxLeft : x0) + 'px'

						},

						layer.ontouchend = function() {

							let minLeft = 0;
							let maxLeft = parseInt(proW) - parseInt(maskW);

							let left = x0 <= minLeft ? minLeft : x0 >= maxLeft ? maxLeft : x0;

							self.$refs.maskW.style.left = left + 'px'

							actW.style.width = (x0 >= maxLeft ? maxLeft : x0) + 'px'

							// self.$emit("currentTime", x0 / maxLeft * duration)
							this.$store.commit('songCurrentTime', x0 / maxLeft * duration)
							self.isTouch = false
						}

				}


			},

			stop() {
				if (this.playStop == 1) {
					this.audioDom.pause()
					this.playStop = 2
					// console.log(this.$refs.sandp.src)
				} else if (this.playStop == 2) {
					this.audioDom.play()
					this.playStop = 1
				}
			},

			next() {
				for (let k = 0; k < this.$store.state.hotSong.length; k++) {

					if (this.$store.state.hotSong[k].id == this.$store.state.hotSongId) {
						if (k == this.$store.state.hotSong.length - 1) {
							this.$emit("nextid", this.$store.state.hotSong[0].id)

							return;
						}
						this.$emit("nextid", this.$store.state.hotSong[k + 1].id)

						return;
					}
				}
			},

			prve() {
				for (let k = 0; k < this.$store.state.hotSong.length; k++) {

					if (this.$store.state.hotSong[k].id == this.$store.state.hotSongId) {
						if (k == 0) {
							this.$emit("prveid", this.$store.state.hotSong[this.$store.state.hotSong.length - 1].id)

							return;
						}
						this.$emit("prveid", this.$store.state.hotSong[k - 1].id)

						return;
					}
				}
			}

		},
		mounted() {
			this.getlyric();
			console.log('mask-->', this.$refs.maskW)
			this.audioDom1();


		}
	}
</script>

<style lang="scss">
	.all-play-box {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #ddd;
		z-index: 100;

		.back-box {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(10px);
			z-index: -1;
		}

		.play-head {
			position: relative;
			width: 100%;
			height: 54px;
			color: #fff;
			padding: 11px 0;
			text-align: center;
			font-family: "宋体";
			border-bottom: 1px solid #F5F6F7;

			.play-back {
				position: absolute;
				top: 0;
				left: 5px;
				bottom: 0;
				width: 30px;
				height: 30px;
				margin: auto 0;
			}

			.whale {
				position: absolute;
				top: 0;
				right: 55px;
				bottom: 0;
				width: 50px;
				height: 50px;
				margin: auto 0;
			}

			.share {
				position: absolute;
				top: 0;
				right: 5px;
				bottom: 0;
				width: 50px;
				height: 50px;
				margin: auto 0;
			}

			.song-n {
				font-size: 15px;
				margin-bottom: 6px;
			}

			.song-g {
				font-size: 12px;
			}
		}

		.play-circle {
			position: relative;
			width: 300px;
			margin: 80px auto 0;

			.album-circle {
				border-radius: 50%;
				margin-bottom: 60px;
			}

			.circle-interior {
				position: absolute;
				top: 0;
				left: 0;
				bottom: 115px;
				right: 0;
				margin: auto;
				width: 186px;
				height: 186px;
				border-radius: 50%;
				overflow: hidden;
				box-shadow: 0 0 2px 6px #333;
			}
		}

		.lyric-box {
			width: 100%;
			height: 410px;
			text-align: center;
			color: #fff;
			overflow: auto;
			transition: all .3s linear;

			& li {
				margin-top: 15px;
			}

			.singer-active {
				color: #e4393c;
			}
		}

		.tail-option {
			display: flex;

			.collect {
				width: 50px;
				margin: 0 auto;
			}
		}

		.tail-duration {
			padding: 0 10px;
			margin-top: 10px;

			&>p {
				width: 31px;
				font-size: 12px;
				line-height: 24px;
			}

			.underway {
				color: rgba(255, 255, 255, .6);
			}

			.total-time {
				color: rgba(255, 255, 255, .4);
			}

			.progress-box {
				width: calc(100% - 73px);
				padding: 8px 0;
				margin: 0 5px;

				.progress {
					position: relative;
					width: 282px;
					height: 8px;
					background-color: #000;
					border-radius: 5px;
				}

				.progress-active {
					position: absolute;
					top: 0;
					left: 0;
					width: 0;
					height: 8px;
					background-color: #CF3A31;
					border-radius: 5px;
				}

				.mask {
					position: absolute;
					top: -4px;
					left: 0;
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background-color: #fafafa;
				}

				.layer {
					position: absolute;
					top: -4px;
					left: 0;
					width: 100%;
					height: 16px;
				}
			}
		}

		.tail-but {
			display: flex;
			padding: 0 10px;
			margin-top: 10px;

			.circulation {
				width: 40px;
				margin-top: 15px;
			}

			.prev {
				width: 50px;
				margin: 10px 0 0 25px;
			}

			.play {
				width: 70px;
				margin-left: 25px;
			}

			.next {
				width: 50px;
				margin: 10px 0 0 25px;
			}

			.more-mus {
				width: 40px;
				margin: 15px 0 0 25px;
			}
		}
	}
</style>
