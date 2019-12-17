!function(e){var t={};function s(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(i,a,function(t){return e[t]}.bind(null,a));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1)}([function(e,t){function s(e){for(let t=0;t<e.length;t++)if("length"===e[t].substring(0,6))return parseInt(e[t].substring(6))}function i(e,t,i,a){let n=[];if(noCollision=!0,"hor"===a)for(let s=e;s<=t;s++)n.push(i.toString()+s.toString());if("vert"===a)for(let s=e;s<=t;s++)n.push(s.toString()+i.toString());let r=function(){let e=document.querySelectorAll(".posUnsunkenShip"),t=[];return e.forEach(e=>{let i=[...e.classList],a=i.includes("hor")?"hor":"vert",n=s(i),r=(e.parentElement.id,parseInt(e.parentElement.id[0])),l=parseInt(e.parentElement.id[1]);if("hor"===a)for(let e=l;e<l+n;e++)t.push(r.toString()+e.toString());else for(let e=r;e<r+n;e++)t.push(e.toString()+l.toString())}),t}();return n.forEach(e=>{r.includes(e)&&(noCollision=!1)}),noCollision}function a(e){e.preventDefault()}function n(e){let t=e.dataTransfer.getData("text"),a=document.getElementById(t);a.classList.remove("moreTransparent");let n=e.target;[...n.classList].includes("posUnsunkenShip")&&(n=e.target.parentElement);let l=[...a.classList],o=l.includes("hor")?"hor":"vert",h=s(l),d=parseInt(n.id[0]),p=parseInt(n.id[1]);"vert"===o&&i(d,d+h-1,p,o)&&n.appendChild(a),"hor"===o&&i(p,p+h-1,d,o)&&n.appendChild(a),e.dataTransfer.clearData(),r()}function r(){for(let e=0;e<=9;e++)for(let t=0;t<=9;t++){id=t.toString()+e.toString();let s=document.getElementById(id);s.removeEventListener("dragover",a),s.removeEventListener("drop",n)}}e.exports={rotatePossible:function(e){let t=[...e.classList],a=t.includes("hor")?"hor":"vert",n=s(t),r=parseInt(e.parentElement.id[0]),l=parseInt(e.parentElement.id[1]),o="hor"===a?"vert":"hor";return!!("vert"===o&&r+n<=10&&i(r+1,r+n-1,l,o))||!!("hor"===o&&l+n<=10&&i(l+1,l+n-1,r,o))},setDropZone:function(e){let t=[...e.classList],i=t.includes("hor")?"hor":"vert",r=s(t),l=[];if("hor"===i)for(let e=0;e<=9;e++)for(let t=0;t<=9-r+1;t++)l.push(e.toString()+t.toString());if("vert"===i)for(let e=0;e<=9;e++)for(let t=0;t<=9-r+1;t++)l.push(t.toString()+e.toString());l.forEach(e=>{let t=document.getElementById(e);t.addEventListener("dragover",a),t.addEventListener("drop",n)})},getLength:s,checkCollision:i}},function(e,t,s){const i=s(2),a=s(6);let n=new i,r=new a;document.getElementById("btnStartGame").addEventListener("click",()=>{n.start(n,r)})},function(e,t,s){const i=s(3);e.exports=class{constructor(){this.player1=new i(!0),this.player2=new i(!1),this.end=!1}start(e,t){e.player2.isComputer=document.getElementById("selectComputer").checked,t.showPositioningScreen("Player1",e,e.player1.gameboard)}attackLoop(e,t){let s=parseInt(e.target.id[e.target.id.length-2]),i=parseInt(e.target.id[e.target.id.length-1]),a=!0===this.player1.isTurn?this.player2:this.player1,n=!0===this.player1.isTurn?this.player1:this.player2;if("hit"!==a.gameboard.fields[s][i].state&&"miss"!==a.gameboard.fields[s][i].state)if(a.gameboard.receiveAttack(s,i,n),this.end=this.endGame(n,a),this.end)t.drawGameboards(this);else for(this.changeTurns(),this.player2.isComputer||"hit"===a.gameboard.fields[s][i].state?t.drawGameboards(this):t.showPassDeviceScreen("playScreen",t.drawGameboards(this));!0===this.player2.isComputer&&!0===this.player2.isTurn;){if(this.player2.computerPlay(this.player1.gameboard),this.end=this.endGame(this.player2,this.player1),this.end)return void t.drawGameboards(this);this.changeTurns(),t.drawGameboards(this)}}changeTurns(){let e=!0===this.player1.isTurn?this.player1:this.player2;if(!0!==e.hasHit){this.player1.isTurn=!this.player1.isTurn,this.player2.isTurn=!this.player2.isTurn,[...document.getElementsByClassName("enemy")].forEach(e=>{e.classList.toggle("isTurn")})}e.hasHit=!1}endGame(e,t){if(!0===t.gameboard.allShipsSunk()){let s=0;for(let e=0;e<10;e++)for(let i=0;i<10;i++)""===t.gameboard.fields[e][i].state&&s++;return 1!==s&&(e.isWinner=!0),e.isTurn=!1,t.isTurn=!1,!0}return!1}}},function(e,t,s){const i=s(4);e.exports=class{constructor(e){this.gameboard=new i,this.isTurn=e,this.isComputer=!1,this.hasHit=!1,this.isWinner=!1}attack(e,t,s){""===s.fields[e][t].state&&s.receiveAttack(e,t,this)}computerPlay(e){let t=[];for(let s=0;s<10;s++)for(let i=0;i<10;i++)if(""===e.fields[s][i].state){let a=!1,n=null;s>0&&(a="hit"===(n=e.fields[s-1][i]).state&&!1===e.ships[n.ship].sunk),s<9&&!1===a&&(a="hit"===(n=e.fields[s+1][i]).state&&!1===e.ships[n.ship].sunk),i>0&&!1===a&&(a="hit"===(n=e.fields[s][i-1]).state&&!1===e.ships[n.ship].sunk),i<9&&!1===a&&(a="hit"===(n=e.fields[s][i+1]).state&&!1===e.ships[n.ship].sunk),!0===a&&t.push([s,i])}if(0===t.length)for(let s=0;s<10;s++)for(let i=0;i<10;i++)""===e.fields[s][i].state&&t.push([s,i]);let s=Math.floor(Math.random()*t.length),i=t[s][0],a=t[s][1];return this.attack(i,a,e),t}}},function(e,t,s){const i=s(5),{getLength:a}=s(0);e.exports=class{constructor(){this.fields=[[{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""}],[{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""}],[{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""}],[{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""}],[{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""}],[{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""}],[{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""}],[{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""}],[{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""}],[{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""},{ship:"",state:""}]],this.ships=[]}reset(){for(let e=0;e<10;e++)for(let t=0;t<10;t++)this.fields[e][t]={ship:"",state:""};this.ships=[]}placeShips(){document.querySelectorAll(".posUnsunkenShip").forEach(e=>{let t=[...e.classList],s=!!t.includes("hor"),i=a(t),n=(e.parentElement.id,parseInt(e.parentElement.id[0])),r=parseInt(e.parentElement.id[1]);this.placeShip(n,r,i,s)})}placeShip(e,t,s,a=!0){if(this.ships.push(new i(s)),a)for(let i=t;i<t+s;i++)this.fields[e][i].ship=this.ships.length-1;else for(let i=e;i<e+s;i++)this.fields[i][t].ship=this.ships.length-1}receiveAttack(e,t,s){""!==this.fields[e][t].ship?(this.fields[e][t].state="hit",this.ships[this.fields[e][t].ship].hit(),s.hasHit=!0):this.fields[e][t].state="miss"}allShipsSunk(){return this.fields.every(e=>!0===e.every(e=>""===e.ship||"hit"===e.state||"miss"===e.state))}}},function(e,t){e.exports=class{constructor(e){this.length=e,this.hits=[],this.sunk=!1}hit(){this.hits.push(!0),this.isSunk()}isSunk(){this.sunk=this.hits.length===this.length}}},function(e,t,s){const{positionShips:i}=s(7);e.exports=class{constructor(){}showPositioningScreen(e,t,s){document.getElementById("passDeviceScreen").classList.add("invisible"),this.preparePositioningScreen(e),i();let a=document.createElement("button");a.id="btnConfirm",a.innerHTML="Confirm position","Player1"===e&&!1===t.player2.isComputer?a.addEventListener("click",e=>{s.placeShips(),this.showPassDeviceScreen("positioningScreen",()=>{this.showPositioningScreen("Player2",t,t.player2.gameboard)})}):"Player1"===e&&!0===t.player2.isComputer?a.addEventListener("click",e=>{s.placeShips(),this.preparePositioningScreen(),i(),t.player2.gameboard.placeShips(),this.switchScreensPosPlay(e,this,t)}):a.addEventListener("click",e=>{s.placeShips(),this.showPassDeviceScreen("positioningScreen",()=>{this.switchScreensPosPlay(e,this,t)})}),positioningScreen.appendChild(a)}preparePositioningScreen(e){document.getElementById("selectComputerScreen").classList.add("invisible");let t=document.getElementById("positioningScreen");for(t.classList.remove("invisible");t.firstChild;)t.removeChild(t.firstChild);let s=document.createElement("h2");s.id="posInfo",s.innerHTML=e+": Position the ships (drag & drop and doubleclick for turning)",t.appendChild(s);let i=document.createElement("div");i.id="posGridContainer",t.appendChild(i)}switchScreensPosPlay(e,t,s){document.getElementById("passDeviceScreen").classList.add("invisible"),document.getElementById("playScreen").classList.remove("invisible"),document.getElementById("positioningScreen").classList.add("invisible"),t.drawGameboards(s)}drawGameboards(e){document.getElementById("passDeviceScreen").classList.add("invisible"),this.drawAnnouncement(e);let t=document.getElementById("gameboardContainer");for(;t.firstChild;)t.removeChild(t.firstChild);let s=document.createElement("h1"),i=document.createElement("h1"),a=document.createElement("h1"),n=document.createElement("h1");s.innerHTML="Player 1 - Enemy Gameboard",i.innerHTML="Player 1 - Own Gameboard",a.innerHTML="Player 2 - Enemy Gameboard",n.innerHTML="Player 2 - Own Gameboard",s.id="headerPlayer1EnemyGameboard",i.id="headerPlayer1OwnGameboard",a.id="headerPlayer2EnemyGameboard",n.id="headerPlayer2OwnGameboard";let r=document.createElement("table"),l=document.createElement("table"),o=document.createElement("table"),h=document.createElement("table");r.id="player1EnemyGameboard",l.id="player1OwnGameboard",o.id="player2EnemyGameboard",h.id="player2OwnGameboard",r.classList.add("board"),l.classList.add("board"),o.classList.add("board"),h.classList.add("board"),(e.player1.isTurn||e.end)&&(t.appendChild(s),t.appendChild(i),t.appendChild(r),t.appendChild(l),this.drawGameboard(e.player2.gameboard,"player1EnemyGameboard",!1,e.player1.isTurn),this.drawGameboard(e.player1.gameboard,"player1OwnGameboard",!0)),(e.player2.isTurn||e.end)&&(t.appendChild(a),t.appendChild(n),t.appendChild(o),t.appendChild(h),this.drawGameboard(e.player1.gameboard,"player2EnemyGameboard",!1,e.player2.isTurn),this.drawGameboard(e.player2.gameboard,"player2OwnGameboard",!0));const d=document.getElementsByClassName("isTurn");for(let t=0;t<d.length;t++)d[t].addEventListener("click",t=>{e.attackLoop(t,this)})}drawGameboard(e,t,s,i=!1){let a=s?"own":"enemy";!0===i&&(a+=" isTurn");const n=[];for(let s=0;s<10;s++){let i="<tr>";for(let n=0;n<10;n++)i+="<td class = '"+a+"' id = '"+t+"_field"+s.toString()+n.toString()+"'>"+this.drawField(e.fields[s][n])+"</td>";i+="</tr>",n[s]=i}document.getElementById(t).innerHTML=n.join(""),this.markFields(t,e,s)}drawAnnouncement(e){let t=document.getElementById("announcement");if(!1===e.end){let s=!0===e.player1.isTurn?"1":"2";t.innerHTML="It's Player"+s+"'s turn. Shoot by clicking in the Enemy Gameboard."}else!0===e.player1.isWinner?t.innerHTML="Game over! Player1 is the winner":!0===e.player2.isWinner?t.innerHTML="Game over! Player2 is the winner":t.innerHTML="Game over! Draw! There is no winner."}drawField(e){return"hit"===e.state?"X":"miss"===e.state?"O":""}markFields(e,t,s){for(let i=0;i<10;i++)for(let a=0;a<10;a++)if(""!==t.fields[i][a].ship){let n=e+"_field"+i.toString()+a.toString();t.ships[t.fields[i][a].ship].sunk?document.getElementById(n).classList.add("sunkenShip"):!0===s&&document.getElementById(n).classList.add("unsunkenShip")}}showPassDeviceScreen(e,t){document.getElementById(e).classList.toggle("invisible"),document.getElementById("passDeviceScreen").classList.toggle("invisible"),document.getElementById("btnPassDevice").addEventListener("click",t)}}},function(e,t,s){var{rotatePossible:a,setDropZone:n,checkCollision:r}=s(0);function l(e,t,s,i,a){let n="",r=null;n=t.toString()+s.toString(),r=document.getElementById(n);let l=document.createElement("div");l.classList.add("posUnsunkenShip");let d="";if(1===i)d="length1";else if("hor"===a)switch(i){case 2:d="length2";break;case 3:d="length3";break;case 4:d="length4"}else switch(i){case 2:d="length2";break;case 3:d="length3";break;case 4:d="length4"}l.addEventListener("dblclick",o),l.classList.add(d),l.classList.add(a),l.id=e,l.setAttribute("draggable",!0),l.addEventListener("dragstart",h),r.appendChild(l)}function o(e){let t=e.target;a(t)&&(t.classList.toggle("vert"),t.classList.toggle("hor"))}function h(e){e.dataTransfer.setData("text/plain",e.target.id);let t=e.target;t.classList.add("moreTransparent"),n(t)}e.exports={positionShips:function(){!function(){let e=document.getElementById("posGridContainer");for(i=0;i<10;i++)for(j=0;j<10;j++){let t=document.createElement("div"),s=i.toString()+j.toString();t.id=s,t.classList.add("posField"),e.appendChild(t)}}();let e=[4,3,3,2,2,2,1,1,1,1];for(let t=0;t<10;t++){let s="ship"+(t+1),i=e[t],a=!0,n="",o=null,h=null,d=null;for(;!0===a;)n=Math.random()<.5?"hor":"vert",h=(o=Math.floor(Math.random()*(10-i+1)))+i-1,d=Math.floor(10*Math.random()),a=!r(o,h,d,n);"hor"===n?l(s,d,o,i,"hor"):l(s,o,d,i,"vert")}}}}]);