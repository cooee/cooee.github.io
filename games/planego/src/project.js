window.__require=function e(t,o,i){function n(s,c){if(!o[s]){if(!t[s]){var r=s.split("/");if(r=r[r.length-1],!t[r]){var l="function"==typeof __require&&__require;if(!c&&l)return l(r,!0);if(a)return a(r,!0);throw new Error("Cannot find module '"+s+"'")}}var u=o[s]={exports:{}};t[s][0].call(u.exports,function(e){return n(t[s][1][e]||e)},u,u.exports,e,t,o,i)}return o[s].exports}for(var a="function"==typeof __require&&__require,s=0;s<i.length;s++)n(i[s]);return n}({AudioMgr:[function(e,t,o){"use strict";cc._RF.push(t,"c086cALTtBBnqOIqjZefy9K","AudioMgr");var i=e("userData");cc.Class({extends:cc.Component,properties:{bgmVolume:1,sfxVolume:1,bgmAudioID:-1,pauseflag:[]},init:function(){var e;null!=(e=i.getLocalStorage("bgmVolume"))&&(this.bgmVolume=parseFloat(e)),null!=(e=i.getLocalStorage("sfxVolume"))&&(this.sfxVolume=parseFloat(e)),cc.game.on(cc.game.EVENT_HIDE,function(){console.log("cc.audioEngine.pauseAll")}),cc.game.on(cc.game.EVENT_SHOW,function(){console.log("cc.audioEngine.resumeAll")})},getUrl:function(e){return"Plane/sounds/"+e},playBGM:function(e){var t=this.getUrl(e);console.log(t),this.bgmAudioID>=0&&(console.log("stop"),cc.audioEngine.stop(this.bgmAudioID));var o=this;cc.loader.loadRes(t,cc.AudioClip,function(e,t){o.bgmAudioID=cc.audioEngine.play(t,!0,o.bgmVolume)})},playSFX:function(e){var t=this.getUrl(e);cc.loader.loadRes(t,cc.AudioClip,function(e,t){e||cc.audioEngine.play(t,!1,.5)})},setSFXVolume:function(e){this.sfxVolume!=e&&(i.setLocalStorage("sfxVolume",e),this.sfxVolume=e)},setBGMVolume:function(e,t){this.bgmAudioID>=0&&(e>0?cc.audioEngine.resume(this.bgmAudioID):cc.audioEngine.pause(this.bgmAudioID),cc.audioEngine.setVolume(this.bgmAudioID,this.bgmVolume)),(this.bgmVolume!=e||t)&&(i.setLocalStorage("bgmVolume",e),this.bgmVolume=e,cc.audioEngine.setVolume(this.bgmAudioID,e))},pauseAll:function(){cc.audioEngine.pauseAll(),this.pauseflag.push(1)},resumeAll:function(){this.pauseflag.shift(),this.pauseflag.length||cc.audioEngine.resumeAll()}}),cc._RF.pop()},{userData:"userData"}],GameData:[function(e,t,o){"use strict";cc._RF.push(t,"ce3363IiatJw61CfHnfpp7r","GameData");var i={gold_:0,get gold(){return this.gold_},set gold(e){this.gold_=e,console.log(this)}};t.exports=i,cc._RF.pop()},{}],Gameover:[function(e,t,o){"use strict";cc._RF.push(t,"2116acT1eBFLZzGh1RSuk4V","Gameover"),cc.Class({extends:cc.Component,properties:{scoreNum:cc.Label,bestScoreNum:cc.Label,backBtn:cc.Button,restartBtn:cc.Button,_scoreNum:0,_restartCb:null},onLoad:function(){cc.gameKit.isGameOver=!0,this.bestScoreNum.string=cc.gameKit.missilecount,this.scoreNum.string=this._scoreNum},setScoreNum:function(e){this._scoreNum=e},setRestartCb:function(e){this._restartCb=e},onBackClick:function(){cc.director.loadScene("Plane_start")},onRestart:function(){this.node.destroy(),this._restartCb&&this._restartCb()}}),cc._RF.pop()},{}],MathLib:[function(e,t,o){"use strict";cc._RF.push(t,"03b2ftmJoNAm4OoIy+JlNiw","MathLib");var i=function(){function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}();function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(){n(this,e)}return i(e,null,[{key:"RndNum",value:function(e,t){return Math.floor(Math.random()*(t-e+1)+e)}},{key:"isArray",value:function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{key:"getDistance",value:function(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}},{key:"getAngleByRadian",value:function(e){return Math.PI/180*e}},{key:"geTwoPointRadian",value:function(e,t){return Math.atan2(e.y-t.y,e.x-t.x)}},{key:"getAngleY",value:function(e,t){return 180*Math.atan((e.x-t.x)/(e.y-t.y))/3.14}},{key:"getAngleX",value:function(e,t){return 180*Math.atan((e.y-t.y)/(e.x-t.x))/3.14}},{key:"pointAtCircle",value:function(e,t,o){return cc.v2(e.x-Math.cos(t)*o,e.y-Math.sin(t)*o)}},{key:"getListRandomValue",value:function(e){return e[Math.floor(Math.random()*e.length)]}},{key:"uuid",value:function(){for(var e=[],t=0;t<36;t++)e[t]="0123456789abcdef".substr(Math.floor(16*Math.random()),1);e[14]="4",e[19]="0123456789abcdef".substr(3&e[19]|8,1),e[8]=e[13]=e[18]=e[23]="-";var o=e.join("");return o}}]),e}();t.exports=a,cc._RF.pop()},{}],MissileControl:[function(e,t,o){"use strict";cc._RF.push(t,"33407LoE85GdLHuYPEXpVTJ","MissileControl"),cc.Class({extends:cc.Component,properties:{_heroNode:null,_hero_speed:3,_time:0,_isdestroy:!1,_isCollision:!1},start:function(){this._isCollision=!1,this._time=20,cc.director.getCollisionManager().enabled=!0},onCollisionEnter:function(e){this._isCollision||(this._isCollision=!0,"Missile"!=e.node.name?cc.director.getScene().getChildByName("Canvas").emit("Collision_push",{other:e,target:this.node}):cc.director.getScene().getChildByName("Canvas").emit("Missile_push",{other:e,target:this.node}),this.onBlast())},onBlast:function(){if(!this._isdestroy){this._isdestroy=!0,this.node.getChildByName("Missile").active=!1;var e=this.node.getChildByName("blast");e.active=!0,e.getComponent(cc.Animation).play("blast"),cc.gameKit.audioMgr.playSFX("blast");var t=this;e.getComponent(cc.Animation).on("finished",function(){t.node.removeFromParent(),t.node.destroy()})}},update:function(e){if(!this._isdestroy){cc.gameKit.isGameOver&&(this._time=0);var t=this._heroNode.getPosition();t=this._heroNode.parent.convertToWorldSpaceAR(t);var o=this.node.getPosition();o=this.node.parent.convertToWorldSpaceAR(o);var i=90-Math.atan2(t.y-o.y,t.x-o.x)*(180/Math.PI),n=Math.sqrt(Math.pow(t.x-o.x,2)+Math.pow(t.y-o.y,2));i-=this.node.rotation,Math.abs(i)>180&&(i=i>0?i-360:i+360);var a=Math.abs(i);if(a<3);else{var s=2,c=i>0?1:-1;a>80&&(s=10),this.node.rotation+=s*c*e*60}var r=this._hero_speed;r=(r+=n>640?50:n>600?3:n>500?2.5:n>300?2:n>200?1.5:n>100?1:.5)*e*100;var l=-Math.PI/180*(this.node.rotation+90),u=o.x-Math.cos(l)*r,h=o.y-Math.sin(l)*r;return o=this.node.parent.convertToNodeSpaceAR(cc.v2(u,h)),this.node.setPosition(o),this._time-=e,this._time<=0?(this.onBlast(),void(this._isdestroy=!0)):void 0}}}),cc._RF.pop()},{}],PlaneGame_Load:[function(e,t,o){"use strict";(cc._RF.push(t,"e1f92vKp3VH/5bNFF6NwA0N","PlaneGame_Load"),cc.sys.platform==cc.sys.WECHAT_GAME)&&(e("./ald/ald-game")(),console.log("ald-game"));var i=e("GameData");cc.Class({extends:cc.Component,properties:{tipLabel:cc.Label,_stateStr:"",_progress:0,_isLoading:!1,prg:cc.ProgressBar},onLoad:function(){this.tipLabel.string=this._stateStr,this.prg.progress=0,this.prg.node.active=!1},start:function(){i.gold=100,this.startPreloading()},startPreloading:function(){this._stateStr="\u6b63\u5728\u52a0\u8f7d\u8d44\u6e90\uff0c\u8bf7\u7a0d\u5019",this._isLoading=!0;var e=this;this.prg.node.active=!0;cc.loader.loadResDir("/",function(t,o,i){e._progress=t/o,e._stateStr="\u8d44\u6e90\u52a0\u8f7d\u4e2d..."+t+"/"+o},function(t,o){e.onLoadComplete()})},onLoadComplete:function(){this._stateStr="\u8d44\u6e90\u52a0\u8f7d\u5b8c\u6210",cc.director.loadScene("Plane_start")},update:function(e){if(0!=this._stateStr.length)if(this.tipLabel.string=this._stateStr+" ",this._isLoading)this.prg.progress=this._progress;else for(var t=Math.floor(Date.now()/1e3)%4,o=0;o<t;++o)this.tipLabel.string+="."}}),cc._RF.pop()},{"./ald/ald-game":"ald-game",GameData:"GameData"}],PlaneGame_Main:[function(e,t,o){"use strict";cc._RF.push(t,"a7855Qml3JGBbYccxlj5kSJ","PlaneGame_Main");var i=e("MathLib"),n=e("userData");cc.Class({extends:cc.Component,properties:{MissilePrefab:cc.Prefab,starPrefab:cc.Prefab,joy:cc.Node,dot:cc.Node,_touchStartPos:null,_hero:null,_hero_plane:"",_stickPos:null,_stickPos_py:null,_hero_Pos:null,_hero_rotate:0,_stick:null,_cloundNode:null,_cloundNode_bg:null,_gamerevive:null,_gold_num_node:null,_missile_num_node:null,_starNode:null,_gold_lbl:null,_gold:0,_actualGold:0,_fuhuoscore:null,_fuhuogold:null,_cloudSpriteFrames:null,_loadcount:0,_hero_speed:1,_missileNodes:null,_hero_isRotate:!1,_createMissileTime:0,_isreset:!1,_isafetime:5,_imissilecount:0,_imissilecountlbl:null,gamerank:cc.Sprite,_nogold:null,_addSpeedTime:0},onLoad:function(){cc.find("Canvas/gamerevive").active=!1},loadRes:function(){var e=this;cc.gameKit.cloudSpriteFrames?(e._cloudSpriteFrames=cc.gameKit.cloudSpriteFrames,e._loadcount++):cc.loader.loadResDir("Plane/Texture/main/cloud",cc.SpriteFrame,function(t,o){t&&(console.log("Loading resource fail."),cc.director.loadScene("Plane_start")),e._cloudSpriteFrames=o,e._loadcount++,e._loadcount>=2&&e.begin(),console.log("xxxxxxxxx")})},initShare:function(){void 0!=window.wx&&(this.tex=new cc.Texture2D,window.sharedCanvas.width=720,window.sharedCanvas.height=1280,wx.showShareMenu({withShareTicket:!0}),wx.updateShareMenu({withShareTicket:!0}))},initPlane:function(){var e=this;cc.gameKit.usePlane?this._hero_plane=cc.gameKit.usePlane:this._hero_plane="planeA1",console.log(this._hero_plane),cc.loader.loadRes("Plane/prefab/"+this._hero_plane,function(t,o){t&&(console.log("Loading resource fail."),cc.director.loadScene("Plane_start"));var i=cc.instantiate(o);i.parent=cc.find("Canvas/plane"),e._hero=i,e._hero.active=!1,e._loadcount++,e._loadcount>=2&&e.begin()})},start:function(){cc.gameKit.isGameOver=!0,this._hero_speed=5,this.loadRes(),this.initPlane(),this._nogold=cc.find("Canvas/s_nogold"),this._gold_num_node=cc.find("Canvas/l_gold"),this._missile_num_node=cc.find("Canvas/l_missile")},begin:function(){cc.find("Canvas/l_loading").active=!1,this._cloundNode=cc.find("Canvas/cloud"),this._cloundNode_bg=cc.find("Canvas/cloud_bg"),this._cloundNode_bg.active=!0,this._starNode=cc.find("Canvas/star"),this._gold_lbl=cc.find("Canvas/l_gold/gold_num").getComponent(cc.Label),this._imissilecountlbl=cc.find("Canvas/l_missile/missile_num").getComponent(cc.Label),this._missileNode=cc.find("Canvas/Missile"),this._fuhuoscore=cc.find("Canvas/gamerevive/scorenum").getComponent(cc.Label),this._fuhuogold=cc.find("Canvas/gamerevive/gem/goldnum").getComponent(cc.Label),this._gamerevive=cc.find("Canvas/gamerevive"),this._gamerevive.active=!1,this._hero.active=!0,this._hero_Pos=this.node.convertToWorldSpaceAR(cc.v2(0,0)),this._stickPos=this.node.convertToWorldSpaceAR(cc.v2(0,35)),this._stickPos_py=cc.v2(0,0),this._stick=cc.find("stick"),this._stick.active=!0,this._stick.setPosition(this._stickPos),this.initHandler(),this.createCloud(),this.node.on("Gold_push",function(e){this._actualGold++,this._gold++,this._gold_lbl.string=this._gold,cc.gameKit.audioMgr.playSFX("gold")},this),this.node.on("Collision_push",function(e){cc.gameKit.isGameOver=!0,this._gamerevive.active=!0,this.updateGameView(!1),this.joy.active=!1,this._fuhuoscore.string=this._imissilecount,cc.gameKit.golds+=parseInt(this._actualGold),n.setLocalStorage("golds",cc.gameKit.golds),n.upLoadStorage(),this._fuhuogold.string="\xd7 "+cc.gameKit.golds}.bind(this)),this.node.on("Missile_push",function(e){this._imissilecount++,this._imissilecountlbl.string=this._imissilecount},this),cc.gameKit.isGameOver=!1},onrestart:function(){this._gamerevive.active=!1,cc.gameKit.isGameOver=!1,this._gameOver=!1,this.updateGameView(!0),this._actualGold=0,this._imissilecount=0,this._gold=0,this._gold_lbl.string=this._gold,this._imissilecountlbl.string=this._imissilecount},onfuhuo:function(){},onGoldReborn:function(){if(cc.gameKit.golds<20){this._nogold.scale=.5,this._nogold.active=!0,cc.gameKit.audioMgr.playSFX("error.mp3");var e=this;this._nogold.runAction(cc.sequence(cc.scaleTo(.05,1),cc.delayTime(.5),cc.callFunc(function(){e._nogold.active=!1})))}else this.reborn(),cc.gameKit.golds=cc.gameKit.golds-20,n.setLocalStorage("golds",cc.gameKit.golds),n.upLoadStorage()},reborn:function(){this._isafetime=3,this._actualGold=0,this._gamerevive.active=!1,cc.gameKit.isGameOver=!1,this.updateGameView(!0)},onGameOver:function(){var e=this,t=this;t._gamerevive.active=!1,cc.gameKit.isGameOver=!0,t._gameOver=!0,t._hero.active=!1,t._stick.active=!1,cc.gameKit.audioMgr.playSFX("Lose"),t._imissilecount>cc.gameKit.missilecount&&(cc.gameKit.missilecount=t._imissilecount,n.setLocalStorage("missilecount",cc.gameKit.missilecount),n.upLoadStorage()),cc.loader.loadRes("Plane/prefab/Gameover",function(o,i){var n=cc.instantiate(i);n.getComponent("Gameover").setScoreNum(t._imissilecount),n.getComponent("Gameover").setRestartCb(t.onrestart.bind(e)),n.parent=t.node})},test:function(e){var t=cc.instantiate(this.MissilePrefab);t.parent=this._missileNode,t.active=!0,e=270-e;var o=Math.PI/180*e,i=this._hero.parent.getPosition(),n=(i=this._hero.parent.parent.convertToWorldSpaceAR(i)).x+88*Math.cos(o),a=i.y+88*Math.sin(o);console.log(i),console.log(cc.v2(n,a)),i=this._missileNode.convertToNodeSpaceAR(cc.v2(n,a)),t.setPosition(i)},onShareClick:function(){void 0!=window.wx&&wx.updateShareMenu({withShareTicket:!0,success:function(){wx.shareAppMessage({title:"\u5927\u5409\u5927\u5229\u4eca\u665a\u6253\u98de\u673a",query:"",imageUrl:canvas.toTempFilePathSync({x:10,y:10,width:cc.game.canvas.width,height:cc.game.canvas.height,destWidth:cc.game.canvas.width,destHeight:cc.game.canvas.height}),success:function(e){console.log("\u8f6c\u53d1\u6210\u529f")},fail:function(e){console.log("\u8f6c\u53d1\u5931\u8d25")}})}})},onChoosePlane:function(){cc.gameKit.chooseplane=!0,this.onBackClick()},createMissile:function(){if(!(this._missileNode.childrenCount>8||this._createMissileTime>0||this._gameOver)){this._createMissileTime=i.RndNum(10,20)/10;var e=cc.instantiate(this.MissilePrefab);e.parent=this._missileNode,e.active=!0,e.rotation=this._hero.rotation;var t=270-i.RndNum(this._hero.rotation-30,this._hero.rotation+30),o=Math.PI/180*t,n=this._hero.parent.getPosition();n=this._hero.parent.parent.convertToWorldSpaceAR(n);var a=i.RndNum(700,900),s=n.x+Math.cos(o)*a,c=n.y+Math.sin(o)*a;n=this._missileNode.convertToNodeSpaceAR(cc.v2(s,c)),e.setPosition(n);var r=e.getComponent("MissileControl");r._heroNode=this._hero.parent,r._hero_speed=this._hero_speed}},createStar:function(){if(!(this._starNode.childrenCount>1||this._gameOver)){var e=cc.instantiate(this.starPrefab);e.parent=this._starNode,e.active=!0;var t=-Math.PI/180*(i.RndNum(0,359)+90),o=this._hero.parent.getPosition(),n=(o=this._hero.parent.parent.convertToWorldSpaceAR(o)).x+Math.cos(t)*i.RndNum(200,500),a=o.y+Math.sin(t)*i.RndNum(200,500);o=this.node.convertToNodeSpaceAR(cc.v2(n,a)),e.setPosition(o);var s=e.getComponent("star");s._heroNode=this._hero.parent,s.game_=this}},createCloud:function(){this._cloundNode.width=10800,this._cloundNode.height=12800,this._cloundNode.setPosition(cc.v2(0,0));for(var e=-this._cloundNode.width/2,t=-this._cloundNode.height/2,o=0;o<20;o++)for(var n=0;n<15;n++){var a=new cc.Node("cloudnode"+o*n),s=a.addComponent(cc.Sprite),c=i.RndNum(0,this._cloudSpriteFrames.length-1);s.spriteFrame=this._cloudSpriteFrames[c],a.parent=this._cloundNode,a.setPosition(i.RndNum(e+540*o,e+540*(o+1)),i.RndNum(t+800*n,t+800*(n+1)))}},initHandler:function(){this.node.on("touchstart",this.onTouchStart,this),this.node.on("touchmove",this.onTouchMove,this),this.node.on("touchend",this.onTouchEnd,this),this.node.on("touchcancel",this.onTouchEnd,this)},onTouchStart:function(e){this._touchStartPos=e.getLocation();var t=this.node.convertToNodeSpaceAR(e.getLocation());this.joy.setPosition(t),this._stickPos_py.x=this._touchStartPos.x-this._stickPos.x,this._stickPos_py.y=this._touchStartPos.y-this._stickPos.y},onTouchMove:function(e){if(this._touchStartPos.x==e.getLocation().x&&this._touchStartPos.y==e.getLocation().y)return!1;var t=this.joy.convertToNodeSpaceAR(e.getLocation()),o=this.getDistance(t,cc.v2(0,0)),i=this.joy.width/2,n=t.x,a=t.y;if(i>o)this.dot.setPosition(cc.v2(n,a));else{var s=Math.cos(this._getRadian(cc.v2(0,0),cc.v2(n,a)))*i,c=Math.sin(this._getRadian(cc.v2(0,0),cc.v2(n,a)))*i;this.dot.setPosition(cc.v2(s,c))}var r=e.getLocation();r.x-=this._stickPos_py.x,r.y-=this._stickPos_py.y;this.getDistance(r,this._hero_Pos)>60&&(r.x=this._hero_Pos.x+60*Math.cos(this._getRadian(this._hero_Pos,r)),r.y=this._hero_Pos.y+60*Math.sin(this._getRadian(this._hero_Pos,r))),this._stickPos=r,this._stick.setPosition(this._stickPos),this._hero_rotate=90-this._getAngle(this._hero_Pos,r),this._stick.rotation=this._hero_rotate},onTouchEnd:function(){this.joy.active=!1,this.dot.setPosition(0,0)},getDistance:function(e,t){return i.getDistance(e,t)},_getRadian:function(e,t){return i.geTwoPointRadian(t,e)},_getAngle:function(e,t){return Math.atan2(t.y-e.y,t.x-e.x)*(180/Math.PI)},moveCloud:function(e){var t=-Math.PI/180*(this._hero.rotation+90),o=this._cloundNode_bg.getPosition(),i=o.x-Math.cos(t)*(this._hero_speed-.5),n=o.y-Math.sin(t)*(this._hero_speed-.5);this._cloundNode_bg.setPosition(cc.v2(i,n))},_updateSubDomainCanvas:function(){},update:function(e){var t=this;if(this._updateSubDomainCanvas(),!cc.gameKit.isGameOver){this._createMissileTime-=e,this._isafetime-=e;var o=this._hero_rotate-this._hero.rotation,i=this._hero_speed;if(Math.abs(o)>3&&360!=Math.abs(o)){Math.abs(o)>180&&(o=-Math.abs(o)/o*(360-Math.abs(o))),Math.abs(o)>310?this._hero.rotation=this._hero_rotate:this._hero.rotation+=Math.abs(o)>15?Math.abs(o)/o*15:o,0==this._hero_isRotate&&(this._hero_isRotate=!0,this._hero.runAction(cc.scaleTo(.1,.8,1))),i+=3}else this._hero_isRotate&&(this._hero_isRotate=!1,this._hero.runAction(cc.scaleTo(.1,1,1)));i=i*e*100,this._addSpeedTime>0&&(i=(i+2)*e*100,this._addSpeedTime-=e);var n=this._hero.parent.getPosition(),a=-Math.PI/180*(this._hero.rotation+90),s=n.x-Math.cos(a)*i,c=n.y-Math.sin(a)*i;n=cc.v2(s,c),this._hero.parent.setPosition(n),this._isreset||this._cloundNode.getBoundingBoxToWorld().contains(this._hero.parent.parent.convertToWorldSpaceAR(n))||(this._isreset=!0,this._cloundNode.runAction(cc.sequence(cc.fadeTo(1.5,0),cc.callFunc(function(){var e=t._hero.parent.getPosition();t._cloundNode.setPosition(e);var o=t._cloundNode_bg.convertToNodeSpaceAR(t._hero.parent.parent.convertToWorldSpaceAR(e));t._cloundNode_bg.setPosition(cc.v2(e.x-o.x%720,e.y-o.y%1280)),t._cloundNode.runAction(cc.fadeTo(2,255)),t._isreset=!1})))),this.moveCloud(),this._isafetime<=0&&(this.createMissile(),this._isafetime=0),this.createStar()}},updateGameView:function(e){this._hero.active=e,this._stick.active=e,this._gold_num_node.active=e,this._missile_num_node.active=e,this._cloundNode.active=e,this._cloundNode_bg.active=e,this._starNode.active=e}}),cc._RF.pop()},{MathLib:"MathLib",userData:"userData"}],PlaneGame_Start:[function(e,t,o){"use strict";cc._RF.push(t,"618960P0O1CM4/MzfX6Ftme","PlaneGame_Start");var i=["A1","A2","A3","A4","A5","B1","B2","B3","B4","B5","C1","C2","C3","C4","C5"],n=[0,50,100,150,200,250,300,350,400,500,600,700,800,900,1e3],a=e("userData");cc.Class({extends:cc.Component,properties:{_chooseUI:null,_rankUI:null,_teachingUI:null,_chooseItems:null,_scrollview:null,_gold_lbl:null,_nogold:null,rank:cc.Sprite},start:function(){if(!cc.gameKit){cc.gameKit={};var t=e("AudioMgr");cc.gameKit.audioMgr=new t,cc.gameKit.audioMgr.init();var o=e("MathLib");console.log(o.uuid())}this.initGame()},preloadRes:function(){cc.gameKit.planesSpriteFrames||cc.loader.loadResDir("Plane/Texture/main/planes",cc.SpriteFrame,function(e,t){e?console.log("Loading resource fail."):cc.gameKit.planesSpriteFrames=t}),cc.gameKit.cloudSpriteFrames||cc.loader.loadResDir("Plane/Texture/main/cloud",cc.SpriteFrame,function(e,t){e?console.log("Loading resource fail."):cc.gameKit.cloudSpriteFrames=t})},initGame:function(){this.preloadRes(),cc.gameKit.golds=a.getLocalStorage("golds"),cc.gameKit.missilecount=a.getLocalStorage("missilecount"),cc.gameKit.missilecount?cc.gameKit.missilecount=parseInt(cc.gameKit.missilecount):cc.gameKit.missilecount=0;var e=a.getLocalStorage("planes");if(null==e)cc.gameKit.myplanes=["A1"];else try{cc.gameKit.myplanes=JSON.parse(e)}catch(e){cc.gameKit.myplanes=["A1"]}var t=a.getLocalStorage("usePlane");if(cc.gameKit.usePlane=null==t?"planeA1":t,isNaN(cc.gameKit.golds)?cc.gameKit.golds=0:cc.gameKit.golds=parseInt(cc.gameKit.golds),cc.sys.isBrowser){var o=this.node.getComponent(cc.Canvas);o.fitHeight=!1,o.fitWidth=!0;var i=cc.winSize;this.node.height=i.height,this.node.width=i.width}this._rankUI=cc.find("Canvas/ranknode"),this._teachingUI=cc.find("Canvas/teachingnode"),this._chooseUI=cc.find("Canvas/choosenode"),this._scrollview=cc.find("Canvas/choosenode/ScrollView").getComponent(cc.ScrollView),this._chooseItems=cc.find("Canvas/choosenode/ScrollView/view/content/l_planes"),this._gold_lbl=cc.find("Canvas/choosenode/gold/l_goldnum").getComponent(cc.Label),this._gold_lbl.string=cc.gameKit.golds,this._nogold=cc.find("Canvas/choosenode/s_nogold"),this._nogold.active=!1,cc.find("Canvas/l_missile").getComponent(cc.Label).string=cc.gameKit.missilecount,cc.find("Canvas/gold/l_gold").getComponent(cc.Label).string=cc.gameKit.golds,cc.gameKit.chooseplane?this.onOpenChooseUI():this.onCloseChooseUI(),cc.gameKit.audioMgr.playBGM("LianGameBg")},onCloseRankUI:function(){cc.gameKit.isRank=!1,this._rankUI.active=!1},onGroupRank:function(){void 0!=window.wx?window.wx.shareAppMessage({title:"\u5927\u5409\u5927\u5229\u4eca\u665a\u6253\u98de\u673a",imageUrl:canvas.toTempFilePathSync({x:10,y:10,width:cc.game.canvas.width,height:cc.game.canvas.height,destWidth:cc.game.canvas.width,destHeight:cc.game.canvas.height}),success:function(e){void 0!=e.shareTickets&&e.shareTickets.length>0&&window.wx.postMessage({messageType:5,MAIN_MENU_NUM:"x1",shareTicket:e.shareTickets[0]})}}):cc.log("\u83b7\u53d6\u7fa4\u6392\u884c\u699c\u6570\u636e\u3002x1")},onOpenRankUI:function(){cc.gameKit.isRank=!0,this._rankUI.active=!0,void 0!=window.wx?window.wx.postMessage({messageType:1,MAIN_MENU_NUM:"x1"}):cc.log("\u83b7\u53d6\u597d\u53cb\u6392\u884c\u699c\u6570\u636e\u3002x1")},onCloseTeachingUI:function(){this._teachingUI.active=!1},onOpenTeachingUI:function(){this._teachingUI.active=!0,this._teachingUI.getChildByName("tips").getComponent(cc.Animation).play("startGame"),cc.find("Canvas/teachingnode/bg").getComponent(cc.Sprite).node.on(cc.Node.EventType.TOUCH_START,function(e){a.setLocalStorage("isNewUser","false"),a.upLoadStorage(),cc.director.loadScene("Plane_Main")})},onShareClick:function(){void 0!=window.wx&&wx.updateShareMenu({withShareTicket:!0,success:function(){wx.shareAppMessage({title:"\u5927\u5409\u5927\u5229\u4eca\u665a\u6253\u98de\u673a",query:"",imageUrl:canvas.toTempFilePathSync({x:10,y:10,width:cc.game.canvas.width,height:cc.game.canvas.height,destWidth:cc.game.canvas.width,destHeight:cc.game.canvas.height}),success:function(e){console.log("\u8f6c\u53d1\u6210\u529f")},fail:function(e){console.log("\u8f6c\u53d1\u5931\u8d25")}})}})},onCloseChooseUI:function(){this._chooseUI.active=!1},onOpenChooseUI:function(){cc.gameKit.chooseplane=!1,this.initPlanItem(cc.gameKit.myplanes),this._chooseUI.active=!0,this._chooseUI.getComponent(cc.Animation).play("openUI");this._chooseUI.getComponent(cc.Animation).on("finished",function(){})},onStart:function(){a.getLocalStorage("isNewUser")&&"false"==a.getLocalStorage("isNewUser")?cc.director.loadScene("Plane_Main"):this.onOpenTeachingUI()},onChoosePlane:function(e){cc.gameKit.myplanes.indexOf(e.target.name)<0?this.onBuyPlane(e):(this.showChooseFlag(cc.gameKit.usePlane,!1),cc.gameKit.usePlane="plane"+e.target.name,a.setLocalStorage("usePlane",cc.gameKit.usePlane),a.upLoadStorage(),this.showChooseFlag(cc.gameKit.usePlane,!0))},onBuyPlane:function(e){var t=n[i.indexOf(e.target.name)];if(cc.gameKit.golds<t){this._nogold.scale=.5,this._nogold.active=!0,cc.gameKit.audioMgr.playSFX("error");var o=this;this._nogold.runAction(cc.sequence(cc.scaleTo(.05,1),cc.delayTime(.5),cc.callFunc(function(){o._nogold.active=!1})))}else{cc.gameKit.golds-=parseInt(t),a.setLocalStorage("golds",cc.gameKit.golds),a.upLoadStorage(),cc.find("Canvas/gold/l_gold").getComponent(cc.Label).string=cc.gameKit.golds,cc.gameKit.myplanes.push(e.target.name),a.setLocalStorage("planes",JSON.stringify(cc.gameKit.myplanes)),a.upLoadStorage(),isNaN(cc.gameKit.golds)&&(cc.gameKit.golds=0),this._gold_lbl.string=cc.gameKit.golds;var s=e.target,c=s.getChildByName("s_bg");c=c.getChildByName("s_icon");var r=this.getItemByName(cc.gameKit.planesSpriteFrames,s.name);(c=c.getComponent(cc.Sprite)).spriteFrame=r}},initPlanItem:function(){for(var e=0;e<15;e++){var t=this._chooseItems.children[e];if(t.getChildByName("gold").getChildByName("l_num").getComponent(cc.Label).string=n[e],t.name=i[e],cc.gameKit.myplanes.indexOf(i[e])>=0){var o=t.getChildByName("s_bg");o=o.getChildByName("s_icon");var a=this.getItemByName(cc.gameKit.planesSpriteFrames,i[e]);(o=o.getComponent(cc.Sprite)).spriteFrame=a}t.off(cc.Node.EventType.TOUCH_END),t.on(cc.Node.EventType.TOUCH_END,this.onChoosePlane,this)}cc.gameKit.usePlane||(cc.gameKit.usePlane="planeA1"),this.showChooseFlag(cc.gameKit.usePlane,!0)},showChooseFlag:function(e,t){e=e.substr(e.length-2,2);var o=i.indexOf(e);if(o>=0){var n=this._chooseItems.children[o];(n=(n=n.getChildByName("s_bg")).getChildByName("open")).active=t}},getItemByName:function(e,t){if(e){for(var o=0;o<e.length;o++)if(e[o].name==t)return e[o];return null}},_updateSubDomainCanvas:function(){},update:function(){this._updateSubDomainCanvas()}}),cc._RF.pop()},{AudioMgr:"AudioMgr",MathLib:"MathLib",userData:"userData"}],"ald-game-conf":[function(e,t,o){"use strict";cc._RF.push(t,"348ecU8Gp9BvLn0qv/PKMaP","ald-game-conf"),o.app_key="3d0b4c144418ab9a0b91e617a8f4fd66",o.getLocation=!1,cc._RF.pop()},{}],"ald-game":[function(e,t,o){"use strict";cc._RF.push(t,"a8acfPyjapMT5HSFo7YwF7Z","ald-game"),Object.defineProperty(o,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};o.default=function(){function t(e){function t(e){return Object.prototype.toString.call(e)}var o={};return"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(e,t){o["[object "+e+"]"]=e.toLowerCase()}),null==e?e:"object"==(void 0===e?"undefined":i(e))||"function"==typeof e?o[t.call(e)]||"object":void 0===e?"undefined":i(e)}function o(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+e()+e()+e()+e()+e()+e()}function n(e,t){f++,e.as=w,e.at=S,e.rq_c=f,e.ifo=h,e.ak=u.app_key,e.uu=d,e.v=r,e.st=Date.now(),e.ev=t,e.wsr=v,""!==a(e.ufo)&&(e.ufo=e.ufo),e.ec=p,wx.Queue.push(function(){return new Promise(function(t,o){wx.request({url:"https://"+l+".aldwx.com/d.html",data:e,header:{se:m||"",op:_||"",img:M||""},method:"GET",fail:function(){t("")},success:function(e){t(200==e.statusCode?"":"status error")}})})})}function a(e){if(void 0===e||""===e)return"";var t={};for(var o in e)"rawData"!=o&&"errMsg"!=o&&(t[o]=e[o]);return t}function s(e){var t={};for(var o in e)t[o]=e[o];return t}function c(e){for(var t="",o=0;o<e.length;o++)e[o].length>t.length&&(t=e[o]);return t}var r="2.0.0",l="glog",u=e("./ald-game-conf");""===u.app_key&&console.error("\u8bf7\u5728\u914d\u7f6e\u6587\u4ef6\u4e2d\u586b\u5199\u60a8\u7684app_key"),u.app_key=u.app_key.replace(/\s/g,""),wx.request({url:"https://"+l+".aldwx.com/config/app.json",method:"GET",success:function(e){200===e.statusCode&&(e.data.version!=r&&console.warn("\u60a8\u7684SDK\u4e0d\u662f\u6700\u65b0\u7248\u672c\uff0c\u8bf7\u5c3d\u5feb\u5347\u7ea7\uff01"),e.data.warn&&console.warn(e.data.warn),e.data.error&&console.error(e.data.error))}});var h="",d=function(){var e="";try{e=wx.getStorageSync("aldstat_uuid"),wx.setStorageSync("ald_ifo",!0)}catch(t){e="uuid_getstoragesync"}if(e)h=!1;else{e=o(),h=!0;try{wx.setStorageSync("aldstat_uuid",e)}catch(e){wx.setStorageSync("aldstat_uuid","uuid_getstoragesync")}}return e}(),g={},m="",_="",p=0,f="",v=wx.getLaunchOptionsSync(),y=Date.now(),S=""+Date.now()+Math.floor(1e7*Math.random()),w=""+Date.now()+Math.floor(1e7*Math.random()),C=0,b="",M="",x=!0,P=!1,N=["aldSendEvent","aldOnShareAppMessage","aldShareAppMessage","aldSendSession","aldSendOpenid","aldLevelEvent"],L=["payStart","paySuccess","payFail","die","revive","tools","award"],R=["complete","fail"];void 0===wx.Queue&&(wx.Queue=new function(){this.concurrency=4,this.queue=[],this.tasks=[],this.activeCount=0;var e=this;this.push=function(t){this.tasks.push(new Promise(function(o,i){var n=function(){e.activeCount++,t().then(function(e){o(e)}).then(function(){e.next()})};e.activeCount<e.concurrency?n():e.queue.push(n)}))},this.all=function(){return Promise.all(this.tasks)},this.next=function(){e.activeCount--,e.queue.length>0&&e.queue.shift()()}},wx.Queue.all()),Promise.all([new Promise(function(e,t){wx.getSetting({success:function(t){t.authSetting["scope.userInfo"]?wx.getUserInfo({success:function(t){M=c(t.userInfo.avatarUrl.split("/")),e(t)},fail:function(){e("")}}):e("")},fail:function(){e("")}})}),new Promise(function(e,t){wx.getNetworkType({success:function(t){e(t)},fail:function(){e("")}})}),new Promise(function(e,t){u.getLocation?wx.getLocation({success:function(t){e(t)},fail:function(){e("")}}):wx.getSetting({success:function(t){t.authSetting["scope.userLocation"]?(wx.getLocation({success:function(t){e(t)},fail:function(){e("")}}),e("")):e("")},fail:function(){e("")}})})]).then(function(e){""!==e[2]?(g.lat=e[2].latitude||"",g.lng=e[2].longitude||"",g.spd=e[2].speed||""):(g.lat="",g.lng="",g.spd=""),""!==e[1]?g.nt=e[1].networkType||"":g.nt="";var t=s(g);""!==e[0]&&(t.ufo=e[0],b=e[0]),n(t,"init")}),wx.onShow(function(e){if(v=e,C=Date.now(),!x&&!P){S=""+Date.now()+Math.floor(1e7*Math.random()),h=!1;try{wx.setStorageSync("ald_ifo",!1)}catch(e){}}x=!1,P=!1;var t=s(g),o=s(g);t.sm=C-y,e.query.ald_share_src&&e.shareTicket&&"1044"===e.scene?(o.tp="ald_share_click",new Promise(function(e,t){"1044"==v.scene?wx.getShareInfo({shareTicket:v.shareTicket,success:function(t){e(t)},fail:function(){e("")}}):e("")}).then(function(e){o.ct=e,n(o,"event")})):e.query.ald_share_src&&(o.tp="ald_share_click",o.ct="1",n(o,"event")),n(t,"show")}),wx.onHide(function(){var e=s(g);e.dr=Date.now()-C,""===b?wx.getSetting({success:function(t){t.authSetting["scope.userInfo"]?wx.getUserInfo({success:function(t){e.ufo=t,b=t,M=c(t.userInfo.avatarUrl.split("/")),n(e,"hide")}}):n(e,"hide")}}):n(e,"hide")}),wx.onError(function(e){var t=s(g);t.tp="ald_error_message",t.ct=e,p++,n(t,"event")});var A={aldSendEvent:function(e,t){var o=s(g);""!==e&&"string"==typeof e&&e.length<=255?(o.tp=e,"string"==typeof t&&t.length<=255?(o.ct=String(t),n(o,"event")):"object"==(void 0===t?"undefined":i(t))?(JSON.stringify(t).length>=255&&console.error("\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u53c2\u6570\u4e0d\u80fd\u8d85\u8fc7255\u4e2a\u5b57\u7b26"),o.ct=JSON.stringify(t),n(o,"event")):void 0===t||""===t?n(o,"event"):console.error("\u4e8b\u4ef6\u53c2\u6570\u5fc5\u987b\u4e3aString,Object\u7c7b\u578b,\u4e14\u53c2\u6570\u957f\u5ea6\u4e0d\u80fd\u8d85\u8fc7255\u4e2a\u5b57\u7b26")):console.error("\u4e8b\u4ef6\u540d\u79f0\u5fc5\u987b\u4e3aString\u7c7b\u578b\u4e14\u4e0d\u80fd\u8d85\u8fc7255\u4e2a\u5b57\u7b26")},aldOnShareAppMessage:function(e){wx.onShareAppMessage(function(){P=!0;var o=e(),i="";i=void 0!==v.query.ald_share_src?void 0!==o.query?(v.query.ald_share_src.indexOf(d),o.query+"&ald_share_src="+v.query.ald_share_src+","+d):(v.query.ald_share_src.indexOf(d),"ald_share_src="+v.query.ald_share_src+","+d):void 0!==o.query?o.query+"&ald_share_src="+d:"ald_share_src="+d,"undefined"!=t(o.ald_desc)&&(i+="&ald_desc="+o.ald_desc),o.query=i;var a=s(g);return a.ct=o,a.ct.sho=1,a.tp="ald_share_chain",n(a,"event"),o})},aldShareAppMessage:function(e){P=!0;var o=e,i="";i=void 0!==v.query.ald_share_src?void 0!==o.query?(v.query.ald_share_src.indexOf(d),o.query+"&ald_share_src="+v.query.ald_share_src+","+d):(v.query.ald_share_src.indexOf(d),"ald_share_src="+v.query.ald_share_src+","+d):void 0!==o.query?o.query+"&ald_share_src="+d:"ald_share_src="+d;var a=s(g);"undefined"!=t(o.ald_desc)&&(i+="&ald_desc="+o.ald_desc),o.query=i,a.ct=o,a.tp="ald_share_chain",n(a,"event"),wx.shareAppMessage(o)},aldSendSession:function(e){if(""!==e&&e){var t=s(g);t.tp="session",t.ct="session",m=e,""===b?wx.getSetting({success:function(e){e.authSetting["scope.userInfo"]?wx.getUserInfo({success:function(e){t.ufo=e,n(t,"event")}}):n(t,"event")}}):(t.ufo=b,""!==b&&(t.gid=""),n(t,"event"))}else console.error("\u8bf7\u4f20\u5165\u4ece\u540e\u53f0\u83b7\u53d6\u7684session_key")},aldSendOpenid:function(e){if(""!==e&&e){_=e;var t=s(g);t.tp="openid",t.ct="openid",n(t,"event")}else console.error("openID\u4e0d\u80fd\u4e3a\u7a7a")}};wx.aldStage=new function(){function e(e){return!/^\d+(.\d+)*$/.test(e.stageId)||e.stageId.length>32?(console.warn("\u5173\u5361stageId\u5fc5\u987b\u7b26\u5408\u4f20\u53c2\u89c4\u5219,\u8bf7\u53c2\u8003\u6587\u6863\u3002"),!1):!("string"!==t(e.stageName)||e.stageName.length>32)||(console.warn("\u5173\u5361\u540d\u79f0\u4e3a\u5fc5\u4f20\u5b57\u6bb5,\u4e14\u957f\u5ea6\u5c0f\u4e8e32\u4e2a\u5b57\u7b26,\u8bf7\u53c2\u8003\u6587\u6863"),!1)}var o="",i="",a=0;this.onStart=function(n){if(e(n)){var s={};a=Date.now(),s.sid=n.stageId,s.snm=n.stageName,s.state="start",i=""+Date.now()+Math.floor(1e7*Math.random()),o=s,("string"===t(n.userId)&&n.userId)<32&&(this.uid=n.uid),this.request()}},this.onRunning=function(i){if(e(i)){var n={params:{}};if(("string"===t(i.userId)&&i.userId)<32&&(this.uid=i.uid),!t(i.event)&&-1!=L.join(",").indexOf(i.event+","))return void L.join(",");if(n.event=i.event,"object"===t(i.params)){if("string"!==t(i.params.itemName)||i.params.itemName.length>32)return void console.warn("\u9053\u5177/\u5546\u54c1\u540d\u79f0\u4e3a\u5fc5\u4f20\u5b57\u6bb5\uff0c\u4e14\u957f\u5ea6\u5c0f\u4e8e32\u4e2a\u5b57\u7b26\uff0c\u8be6\u60c5\u8bf7\u53c2\u8003\u6587\u6863");n.params.itnm=i.params.itemName,"string"===t(i.params.itemId)&&i.params.itemId.length<32&&(n.params.itid=i.params.itemId),"number"===t(i.params.itemCount)&&i.params.itemCount.length<32?n.params.itco=i.params.itemCount:n.params.itco=1,-1!==i.event.indexOf("pay")&&("number"===t(i.params.itemMoney)&&i.params.itemMoney.length<32?n.params.money=i.params.itemMoney:n.params.money=0),"string"===t(i.params.desc)&&i.params.desc.length<64&&(n.params.desc=i.params.desc),n.state="running",n.sid=i.stageId,n.snm=i.stageName,o=n,this.request()}}},this.onEnd=function(i){if(e(i)){var n={state:"end"};if(("string"===t(i.userId)&&i.userId)<32&&(this.uid=i.uid),!t(i.event)&&-1!==R.join(",").indexOf(i.event+","))return void R.join(",");n.sid=i.stageId,n.snm=i.stageName,n.event=i.event,n.sdr=0!==a?Date.now()-a:"",n.params={},"object"===t(i.params)&&"string"===t(i.params.desc)&&i.params.desc.length<64&&(n.params.desc=i.params.desc),o=n,this.request()}},this.request=function(){var e=s(g);o.ss=i,e.ct=o,n(e,"screen")}};for(var I=0;I<N.length;I++)!function(e,t){Object.defineProperty(wx,e,{value:t,writable:!1,enumerable:!0,configurable:!0})}(N[I],A[N[I]]);try{var K=wx.getSystemInfoSync();g.br=K.brand||"",g.md=K.model,g.pr=K.pixelRatio,g.sw=K.screenWidth,g.sh=K.screenHeight,g.ww=K.windowWidth,g.wh=K.windowHeight,g.lang=K.language,g.wv=K.version,g.sv=K.system,g.wvv=K.platform,g.fs=K.fontSizeSetting,g.wsdk=K.SDKVersion,g.bh=K.benchmarkLevel||"",g.bt=K.battery||"",g.wf=K.wifiSignal||"",g.lng="",g.lat="",g.nt="",g.spd="",g.ufo=""}catch(e){}},t.exports=o.default,cc._RF.pop()},{"./ald-game-conf":"ald-game-conf"}],colliderListener:[function(e,t,o){"use strict";cc._RF.push(t,"f1bc0QPGVBGoJ1t1q+V7yQh","colliderListener"),cc.Class({extends:cc.Component,properties:{},start:function(){cc.director.getCollisionManager().enabled=!0},onCollisionEnter:function(e){console.log("\u649e\u4e0a\u4e86.")}}),cc._RF.pop()},{}],conf:[function(e,t,o){"use strict";cc._RF.push(t,"ddb17POfSxGnKgFpceIiBAN","conf"),t.exports={keys:["golds","missilecount"]},cc._RF.pop()},{}],star:[function(e,t,o){"use strict";cc._RF.push(t,"45237v2CKlAe4iUsbiJ3oHg","star"),cc.Class({extends:cc.Component,properties:{_heroNode:null,_isdestroy:!1,_pos:null,_isCollision:!1},start:function(){this._isCollision=!1;var e=this.node.getPosition();this._pos=this.node.parent.convertToWorldSpaceAR(e)},onCollisionEnter:function(e){this._isCollision||(this._isCollision=!0,cc.director.getScene().getChildByName("Canvas").emit("Gold_push",{other:e,target:this.node}),this.onBlast())},onBlast:function(){var e=this;this.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3,5),cc.fadeTo(.3,0)),cc.callFunc(function(){e.node.removeFromParent(),e.node.destroy()}))),this.game_&&(this.game_._addSpeedTime=1.2)},update:function(e){if(!this._isdestroy&&!cc.gameKit.isGameOver){var t=this._heroNode.getPosition();t=this._heroNode.parent.convertToWorldSpaceAR(t);var o=this._pos;Math.sqrt(Math.pow(t.x-o.x,2)+Math.pow(t.y-o.y,2))>1300&&(this.node.removeFromParent(),this.node.destroy())}}}),cc._RF.pop()},{}],userData:[function(e,t,o){"use strict";cc._RF.push(t,"5206eJPAZVL3K9TeNtTdmJo","userData");var i=e("conf");t.exports={upLoadStorage:function(){for(var e=i.keys.length,t={},o={},n=0;n<e;n++){var a=i.keys[n],s=this.getLocalStorage(a);s&&(console.log(a+" = "+s),o[a]=s)}t.game_storage=JSON.stringify(o),console.log(t,"\u4e0a\u4f20\u73a9\u5bb6\u6570\u636e"),cc.sys.platform==cc.sys.WECHAT_GAME&&window.wx.setUserCloudStorage({KVDataList:[{key:"game_storage",value:t.game_storage}],success:function(e){console.log(e,"upload success")},fail:function(e){console.log(e,"upload fail")}})},isValidKey:function(e){return/^[A-Za-z0-9\_\-]+$/gi.test(e)},setLocalStorage:function(e,t){t+="",cc.sys.localStorage.setItem(e,t)},getLocalStorage:function(e){return cc.sys.localStorage.getItem(e)?cc.sys.localStorage.getItem(e):null}},cc._RF.pop()},{conf:"conf"}]},{},["AudioMgr","GameData","MissileControl","PlaneGame_Load","PlaneGame_Main","PlaneGame_Start","ald-game-conf","ald-game","colliderListener","MathLib","star","Gameover","conf","userData"]);