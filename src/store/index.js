import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

 const store = new VueX.Store({
	state:{
		logShow:false,  //登录状态
		nickname:'', //用户名
		userId:'', //用户id
		hotSong:'', //本地歌曲的存储列表
		hotSongId:'', //热歌id
		currentTime:'', //当前时间
		cookieM:'',  //对应cookie里面的MUSIC
		comSongs:'', //推荐歌单中的歌曲
	},
	
	mutations: {
		alertLog(state) {
			state.logShow = true
		},
		
		alertLog1(state) {
			state.logShow = false
		},
		
		nick(state,n) {
			state.nickname = n
			
		},
		
		getId(state,n) {
			state.userId = n
		},
		
		//修改本地歌曲的存储列表
		SongNum(state,n) {
			state.hotSong = n
		},
		
		//歌的id
		SongId(state,id) {
			state.hotSongId = id
		},
		
		// 点击时进度条位置
		songCurrentTime(state,n) {
			state.currentTime = n
		},
		
		//修改cookieM里面的东西
		tKen(state,n) {
			state.cookieM = n
		},
		
		//修改comSongs里面的东西
		comSong(state,n) {
			state.comSongs = n
		}
		
	}
})

export default store