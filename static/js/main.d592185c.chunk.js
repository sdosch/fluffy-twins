(window["webpackJsonpfluffy-twins"]=window["webpackJsonpfluffy-twins"]||[]).push([[0],{11:function(e,t,a){e.exports=a.p+"static/media/pawprint.5695bb1a.svg"},13:function(e,t,a){e.exports=a.p+"static/media/banner.8c35c0f1.svg"},15:function(e,t,a){e.exports=a(39)},20:function(e,t,a){},21:function(e,t,a){},24:function(e,t,a){},25:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(10),r=a.n(o),l=(a(20),a(2)),i=a(3),c=a(5),p=a(4),u=a(6),d=(a(21),a(1)),h=a(14),m=(a(24),a(11)),f=a.n(m),b=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).getClassname=function(){var e=["flip-card"];return a.props.flipped&&e.push("flipped"),a.props.zoomed&&e.push("zoomed"),[].concat(e,Object(h.a)(a.props.borderTranslate)).join(" ")},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{onClick:this.props.locked?null:function(){return e.props.onClick()},className:this.getClassname(),style:{width:"calc(98vw / ".concat(this.props.size,")"),height:"calc(98vw / ".concat(this.props.size,")")}},s.a.createElement("div",{className:"flip-card-inner"},s.a.createElement("div",{className:"flip-card-front"},s.a.createElement("img",{alt:"cat",src:"https://robohash.org/".concat(this.props.image,"?set=set4&bgset=bg1&size=180x180")})),s.a.createElement("div",{className:"flip-card-back"},s.a.createElement("img",{alt:"paw print",src:f.a}))))}}]),t}(n.Component),g=(a(25),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).getBorderTranslate=function(e,t){var a=[];return e<t&&a.push("border-top"),e%t===0&&a.push("border-left"),e%t===t-1&&a.push("border-right"),e>=t*(t-1)&&a.push("border-bottom"),a},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"board level-".concat(this.props.level),style:{gridTemplateColumns:"repeat(".concat(this.props.size,", 1fr)")}},this.props.cards.map((function(t){return s.a.createElement(b,{key:t.id,image:t.hash,flipped:t.flipped,zoomed:t.zoomed,locked:t.locked,size:e.props.size,borderTranslate:e.getBorderTranslate(t.id,e.props.size),onClick:function(){return e.props.onClick(t)}})})))}}]),t}(n.Component)),k=a(12),v=a.n(k),C=(a(37),function(e){return s.a.createElement("div",{className:"text-box"},s.a.createElement("img",{alt:"cat",src:"https://robohash.org/".concat(e.image,"?set=set4&size=180x180")}),s.a.createElement("div",null,v()(e.text)))}),y=(a(38),a(13)),x=a.n(y),E=function(e){return s.a.createElement("div",{onClick:function(){return e.onClick()},className:e.show?"modal show":"modal hide"},s.a.createElement("div",{className:"modal-inner"},s.a.createElement(d.b,{target:s.a.createElement(d.a,null,s.a.createElement("h1",null,"Congratulations")),repeat:-1,yoyo:!0},s.a.createElement(d.c,{staggerTo:{y:"-=0px"},stagger:.001,duration:.1,ease:"Quad.easeInOut",cycle:{y:["-=2px","+=2px"]}})),s.a.createElement("h2",null,"You were awarded the rank"),s.a.createElement("div",{className:"badge-container"},s.a.createElement("div",{className:"icon"},e.rank.emoji),s.a.createElement("div",{className:"badge",style:{backgroundImage:"url(".concat(x.a,")")}},e.rank.title),s.a.createElement("div",{className:"rank-indicator"},s.a.createElement("small",null,"#"),e.rankIndicator)),s.a.createElement("p",null,'"',e.rank.subtitle,'"'),s.a.createElement("ul",null,s.a.createElement("li",null,s.a.createElement("span",{role:"img","aria-label":"birdie"},"\ud83d\udc25"),s.a.createElement("h2",null,"Birdies: ",e.luckyMatchCount),s.a.createElement("small",null,"Getting a match without seeing the corresponding card before.")),s.a.createElement("li",null,s.a.createElement("span",{role:"img","aria-label":"flop"},"\ud83d\ude48"),s.a.createElement("h2",null,"Flops: ",e.flopCount+e.stupidCount),s.a.createElement("small",null,"Missing a match, although you have seen the corresponding card before at least once.")),s.a.createElement("li",null,s.a.createElement("span",{role:"img","aria-label":"disaster"},"\ud83c\udf0b"),s.a.createElement("h2",null,"Tragedies: ",e.stupidCount),s.a.createElement("small",null,"Missing a match, although you have seen the card as well as the corresponding card more than 3 times."))),s.a.createElement("small",null,"Tap to play again!")))},w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(p.a)(t).call(this,e))).showModal=function(){a.setState({showModal:!0})},a.hideModal=function(){a.initGame(a.state.currentLevel)},a.shuffle=function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),n=[e[a],e[t]];e[t]=n[0],e[a]=n[1]}return e},a.initGame=function(e){for(var t=[],n=a.state.boards[e],s=0;s<Math.floor(n.cols*n.rows/2);s++)t.push({hash:Math.random().toString(36).substr(2,5)});var o=a.shuffle([].concat(t,t)).map((function(e,t){return{id:t,hash:e.hash,flipped:!1,zoomed:!1,locked:!1,flipCount:0}}));a.setState({currentLevel:e,cards:o,textBoxImage:o[0].hash,textBoxText:a.state.responseStart[e],matchCount:0,lockedBoard:!1,selectedCards:[],showModal:!1})},a.handleClick=function(e){if(!a.state.lockedBoard){var t=a.state.cards.slice();t[e.id].flipped=!0,t[e.id].zoomed=!0,t[e.id].locked=!0,t[e.id].flipCount++,a.setState({cards:t,currentRank:a.getRank()});var n=t.filter((function(t){return e.hash===t.hash}));switch(0!==e.id&&t[0].hash!==n[1].hash||a.setState({textBoxText:e.flipCount<a.state.responseFoundMe.length?a.state.responseFoundMe[e.flipCount-1]:a.state.responseFoundMe[a.state.responseFoundMe.length-1]}),e.flipCount){case 3:a.setState({textBoxText:a.state.responseSeenBefore[0]});break;case 5:a.setState({textBoxText:a.state.responseSeenBefore[1]});break;case 10:a.setState({textBoxText:a.state.responseSeenBefore[2]})}var s=a.state.selectedCards.slice();s.push(e),a.setState({selectedCards:s}),2===s.length&&(t[s[0].id].zoomed=!1,a.setState({lockedBoard:!0,cards:t}),a.checkWin(t))}},a.checkWin=function(e){a.state.matchCount+2===e.length?(a.setState({textBoxText:a.state.responseWin[a.state.currentLevel]}),setTimeout((function(){var e=a.state.currentLevel+1;e<a.state.boards.length-1?a.showModal():a.initGame(e)}),3e3)):setTimeout((function(){a.checkMatch(a.state.selectedCards)}),1e3)},a.textResponse=function(e){return a.shuffle(e)[0]},a.checkMatch=function(e){var t=a.state.cards.slice(),n=a.state.matchCount,s="";if(e[0].hash===e[1].hash)if(n+=2,1===e[1].flipCount){s=a.textResponse(a.state.responseLuckyMatch);var o=a.state.luckyMatchCount+1;a.setState({luckyMatchCount:o})}else s=a.textResponse(a.state.responseMatch);else{t[e[0].id].flipped=!1,t[e[1].id].flipped=!1,t[e[0].id].locked=!1,t[e[1].id].locked=!1,t[e[1].id].zoomed=!1;var r=t.filter((function(t){return t.hash===e[0].hash}));if(r.splice(e.findIndex((function(t){return t.id===e[0].id})),1),e[0].flipCount>3&&e[1].flipCount>3){s=a.textResponse(a.state.responseStupidMatch);var l=a.state.stupidCount+1;a.setState({stupidCount:l})}else if(r[0].flipCount>0){s=a.textResponse(a.state.responseFlopMatch);var i=a.state.flopCount+1;a.setState({flopCount:i})}else s=a.textResponse(a.state.responseNoMatch)}t[e[1].id].zoomed=!1,e=[],a.setState({textBoxText:s,selectedCards:e,matchCount:n,lockedBoard:!1})},a.getRank=function(){var e=a.state.flopCount+2*a.state.stupidCount-2*a.state.luckyMatchCount,t=Math.floor(e/100*a.state.ranks.length);return t=(t=t<0?0:t)>a.state.ranks.length?a.state.ranks.length-1:t,a.state.ranks[t]},a.state={colors:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"],boards:[{name:"small",cols:2,rows:2},{name:"medium",cols:4,rows:4},{name:"large",cols:6,rows:6}],lockedBoard:!1,textBoxText:"",textBoxImage:"",cards:[],selectedCards:[],matchCount:0,luckyMatchCount:0,flopCount:0,stupidCount:0,currentLevel:0,showModal:!1,responseStart:["<span>\ud83d\ude3a</span> can you find a match?","<span>\ud83d\ude38</span> but can you also solve this?","<span>\ud83d\ude3c</span> here's the final challenge!"],responseWin:["<span>\ud83d\ude3b</span> well done!","<span>\ud83d\ude3b</span> very good! one more, ok?","<span>\ud83d\ude3b</span> you did them all!!!"],responseFoundMe:["<span>\ud83d\udc47\ud83c\udffb</span>hey, that's me <span>\u2764\ufe0f</span>","hee <span>\u2764\ufe0f</span>","hello again <span>\u2764\ufe0f</span>","i love you too! <span>\u2764\ufe0f</span>","<span>\u2764\ufe0f</span>"],responseSeenBefore:["<span>\ud83d\ude3a</span> 3rd try on this card","<span>\ud83d\ude3e</span> 5th try on this card!","<span>\ud83d\ude40</span> no match after 9 tries!!!"],responseMatch:["yup <span>\ud83d\udc4d\ud83c\udffb</span>","<span>\ud83d\udc85\ud83c\udffb</span> and that's a match!","<span>\ud83d\ude0e\ud83d\ude0e\ud83d\ude0e</span>","<span>\ud83e\udd18\ud83c\udffb\ud83e\udd18\ud83c\udffb</span>rock'n'roll <span>\ud83e\udd18\ud83c\udffb\ud83e\udd18\ud83c\udffb</span>","<span>\ud83d\ude32</span> you are so gooood!","<span>\ud83e\udd73</span> got it just right! <span>\ud83e\udd73</span>","you knew it <span>\ud83d\ude1c</span>","jawoll! <span>\u270a\ud83c\udffb</span>","<span>\ud83c\udf7b</span> cheerio!","<span>\ud83e\udd84</span> You are so lucky.<span>\ud83c\udf08</span>","<span>\ud83d\udd14</span> BINGO <span>\ud83d\udd14</span>","<span>\ud83d\udc81\ud83c\udffc</span> exactly.","<span>\ud83d\udc81\ud83c\udffc</span> tadaa!"],responseLuckyMatch:["\ufe0f\ufe0f<span>\ud83d\udc25</span> BIRDIE!!! <span>\ud83d\udc25</span>"],responseNoMatch:["<span>\u261d\ud83c\udffc</span> fun fact: that was a cat.","<span>\ud83e\udd37\ud83c\udffc\u200d</span> no we don't look alike.","<span>\ud83d\udc6c</span> no were not twins.","<span>\ud83d\udc2f</span> a cat, but wrong one.","<span>\ud83c\udf27</span> sorry, no match.","<span>\ud83d\ude47\ud83c\udffb\u200d</span> no match this time."],responseFlopMatch:["<span>\ud83e\udd7a</span> sorry. wrong.","<span>\ud83e\uddd0</span> seen that one before.","<span>\ud83d\ude44</span> well keep on guessing...","<span>\ud83d\ude13</span> no. no. no!!!","<span>\ud83e\udd1e\ud83c\udffc</span> better luck next time."],responseStupidMatch:["<span>\ud83d\ude02</span> hahaha... no.","<span>\ud83e\udd22</span>","<span>\ud83e\udd2f</span>","<span>\ud83e\udd26\ud83c\udffb\u200d</span>OMG","\ud83e\udddf\u200d<span>\ud83e\udddf\u200d</span> NOOooo! <span>\ud83e\udddf\u200d</span>\ud83e\udddf\u200d","<span>\ud83d\ude48</span>emm... no."],ranks:[{emoji:"\ud83e\udde0",title:"Braniac",subtitle:"I'm a bot - or a kid, or just super super smart"},{emoji:"\ud83d\udc51",title:"King of the castle",subtitle:"Bitch, i'm a king!"},{emoji:"\ud83e\udd96",title:"Godzilla",subtitle:"A God, an alpha predator, Godzilla!"},{emoji:"\ud83d\udc18",title:"Dependable elephant",subtitle:"Because elephants never forget"},{emoji:"\ud83d\udc68\ud83c\udffb\u200d\u2708\ufe0f",title:"Compelled pilot",subtitle:"Trust me, im a pilot"},{emoji:"\ud83d\udc01",title:"Reliable lab rat",subtitle:"I'm doing it only for the science"},{emoji:"\ud83e\udd8a",title:"Serious fox",subtitle:"I'm fucking serious"},{emoji:"\ud83c\udfa9",title:"Like a Sir",subtitle:"It's my pleasure"},{emoji:"\ud83d\udc1d",title:"Busy bee",subtitle:"Fly like a butterfly, sting like a bee"},{emoji:"\ud83d\udc19",title:"Pitiful octopus",subtitle:"I hug ships too hard"},{emoji:"\ud83d\udc14",title:"Blind hen",subtitle:"Yes i may occasionally pick up a grain"},{emoji:"\ud83e\uddfb",title:"Clueless poop ticket",subtitle:"Just rollin with the homies"},{emoji:"\ud83d\udca8",title:"Cabbage fart",subtitle:"Silent but deadly"},{emoji:"\ud83e\udddf\u200d",title:"Rotten zombie",subtitle:"neeed braaain... neeeed braaaain!1!1!"}],currentRank:{}},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.initGame(this.state.currentLevel)}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"App"},s.a.createElement(d.b,{target:s.a.createElement(d.a,null,s.a.createElement("h1",null,"Fluffy Twins"))},s.a.createElement(d.c,{staggerFrom:{y:"-=200px",scale:1,color:"#0ccac4"},staggerTo:{y:"0px",scale:1,color:"#0ccac4"},stagger:.1,duration:2,ease:"Bounce.easeOut"}),s.a.createElement(d.c,{staggerFrom:{scale:1.5,color:"white"},staggerTo:{scale:1},stagger:.1,duration:.2,cycle:{color:this.state.colors}})),s.a.createElement(C,{text:this.state.textBoxText,image:this.state.textBoxImage}),s.a.createElement(g,{size:this.state.boards[this.state.currentLevel].cols,cards:this.state.cards,level:this.state.currentLevel,onClick:function(t){return e.handleClick(t)}}),s.a.createElement(E,{show:this.state.showModal,luckyMatchCount:this.state.luckyMatchCount,flopCount:this.state.flopCount,stupidCount:this.state.stupidCount,rank:this.state.currentRank,rankIndicator:this.state.ranks.findIndex((function(t){return t.title===e.state.currentRank.title}))+1,onClick:function(){return e.hideModal()}}))}}]),t}(n.Component);r.a.render(s.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.d592185c.chunk.js.map