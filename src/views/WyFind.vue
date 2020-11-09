<template>
  <div class="home">
    <div class="header">
      <div class="seek">
        <div class="microphone"></div>
        <input class="search" type="text" />
        <div class="line-box">
          <i class="line"></i>
          <i class="line"></i>
          <i class="line"></i>
          <i class="line"></i>
        </div>
      </div>

      <div class="ponent">
        <div class="ab" @click="alter(1)" :class="{active:isshow == 1}">个性推荐</div>
        <div class="ab" @click="alter(2)" :class="{active:isshow == 2}">主播电台</div>
        <div class="unline" ref="move"></div>
      </div>
    </div>
    <recommend v-show="isshow== 1" />
    <station v-show="isshow == 2" />
  </div>
</template>

<script>
import recommend from "../components/Recommend";
import station from "../components/Station";

export default {
  data() {
    return {
      isshow: 1
    };
  },
  methods: {
    alter(i) {
      this.isshow = i;
      if (i == 1) {
        this.$refs.move.style.left = "58px";
      } else if (i == 2) {
        this.$refs.move.style.left = "208px";
      }
    },
		
		getsong() {
			//获取排行榜热歌
			this.axios("https://www.arthurdon.top:10099/top/list?idx=1").then(res => {
		
				let data = res.data.playlist.tracks
				
				this.$store.commit('SongNum',data.slice(0, 20))
			})
		}
  },
	
	mounted() {
		this.getsong()
	},
	
  components: {
    recommend,
    station
  },

  
};
</script>

<style lang="scss">
.home{
	// height: calc(100% - 50px - 100px);
	
	}
.header {
	position: fixed;
	top:0;
  width: 100%;
  height: 100px;
  background-color: #cb4d3f;
  margin: 0 auto;
	z-index: 2;

  .seek {
    width: 100%;
    display: flex;
    padding: 12px 10px;
    text-align: center;

    .microphone {
      width: 30px;
      height: 30px;
      background: url("../../public/img/z/bkm1.png") no-repeat center;
      background-size: cover;
    }

    .search {
      width: calc(100% - 60px - 23px);
      border-radius: 15px;
      border: none;
      margin: 0 15px;
      opacity: 0.2;
      text-indent: 1em;
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

  .ponent {
    width: 300px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;

    .ab {
      width: 150px;
      height: 35px;
      color: #dcfbf9;
      float: left;
      text-align: center;
      line-height: 35px;
      font-family: "宋体";
    }

    .unline {
      position: absolute;
      left: 58px;
      bottom: 0;
      width: 34px;
      height: 2px;
      background-color: #fff;
      transition: left 0.3s linear;
    }
  }
  .active {
    color: #fff;
    font-weight: bold;
  }
}
</style>
