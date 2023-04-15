import{o as l,c as o,a as n,w as f,v as y,i as w,b as R,p as $,d as p,e as m,n as a,f as u,t as d,F as h,g as r,h as c,r as M,j as v}from"./index.js";var b=(e,t)=>{const i=e.__vccOpts||e;for(const[s,k]of t)i[s]=k;return i};const g=e=>($("data-v-17693e34"),e=e(),p(),e),B={action:"",bp:"container"},O=g(()=>n("h2",{class:"logo-before"},"MQTT broker\xA0configuration",-1)),j={bp:"grid"},E={bp:"12 9@lg"},P=g(()=>n("label",{for:"host"},"Host: IP address or hostname of your broker's websocket",-1)),W={bp:"12 3@lg"},N=g(()=>n("label",{for:"port"},"Port:",-1)),F={bp:"grid"},_={bp:"12 6@lg"},A=g(()=>n("label",{for:"username"},"Username:",-1)),Q={bp:"12 6@lg"},X=g(()=>n("label",{for:"password"},"Password:",-1)),G=g(()=>n("label",{for:"device"},"Client ID:",-1)),J={bp:"grid"},K={bp:"12 6@lg"},Y=g(()=>n("label",{for:"prefix"},"Topic prefix:",-1)),Z={bp:"12 6@lg"},x=g(()=>n("label",{for:"suffix"},"Topic suffix:",-1)),ee={for:"ssl",class:"form-checkbox"},te=m("Enable SSL "),ie=g(()=>n("span",{class:"form-checkmark"},null,-1)),se={methods:{submit(){return this.$root.host=host.value,this.$root.port=port.value,this.$root.device=device.value,this.$root.username=username.value,this.$root.password=password.value,this.$root.prefix=prefix.value,this.$root.suffix=suffix.value,this.$root.ssl=!!ssl.checked,this.$root.connectMqtt(),!1},updateForm(){host.value=this.$root.host,port.value=this.$root.port,username.value=this.$root.username,password.value=this.$root.password,device.value=this.$root.device,prefix.value=this.$root.prefix,suffix.value=this.$root.suffix,ssl.checked=this.$root.ssl}},mounted(){this.updateForm(),document.querySelector("body").setAttribute("style","background-color: rgb(0, 0, 0)")}},ne=Object.assign(se,{props:{host:{type:String,required:!0},port:{type:Number,required:!0},username:{type:String,required:!1},password:{type:String,required:!1},device:{type:String,required:!0},prefix:{type:String},suffix:{type:String},ssl:{type:Boolean}},setup(e){return(t,i)=>(l(),o("form",B,[O,n("div",j,[n("div",E,[P,f(n("input",{type:"text",name:"host","onUpdate:modelValue":i[0]||(i[0]=s=>w(host)?host.value=s:null),id:"host",placeholder:"192.168.1.123, localhost, xyz.com"},null,512),[[y,e.host]])]),n("div",W,[N,f(n("input",{type:"text",name:"port","onUpdate:modelValue":i[1]||(i[1]=s=>w(port)?port.value=s:null),id:"port",placeholder:"9001"},null,512),[[y,e.port]])])]),n("div",F,[n("div",_,[A,f(n("input",{type:"text",name:"user","onUpdate:modelValue":i[2]||(i[2]=s=>w(username)?username.value=s:null),id:"username"},null,512),[[y,e.username]])]),n("div",Q,[X,f(n("input",{type:"password",name:"password","onUpdate:modelValue":i[3]||(i[3]=s=>w(password)?password.value=s:null),id:"password"},null,512),[[y,e.password]])])]),G,f(n("input",{type:"text",name:"device","onUpdate:modelValue":i[4]||(i[4]=s=>w(device)?device.value=s:null),id:"device",placeholder:"TouchPanelWeb"},null,512),[[y,e.device]]),n("div",J,[n("div",K,[Y,f(n("input",{type:"text",name:"prefix","onUpdate:modelValue":i[5]||(i[5]=s=>w(prefix)?prefix.value=s:null),id:"prefix"},null,512),[[y,e.prefix]])]),n("div",Z,[x,f(n("input",{type:"text",name:"suffix","onUpdate:modelValue":i[6]||(i[6]=s=>w(suffix)?suffix.value=s:null),id:"suffix"},null,512),[[y,e.suffix]])])]),n("div",null,[n("label",ee,[te,f(n("input",{type:"checkbox",name:"ssl","onUpdate:modelValue":i[7]||(i[7]=s=>w(ssl)?ssl.value=s:null),id:"ssl",value:"1"},null,512),[[R,e.ssl]]),ie])]),n("button",{onClick:i[8]||(i[8]=(...s)=>t.submit&&t.submit(...s)),type:"button"},"Connect")]))}});var le=b(ne,[["__scopeId","data-v-17693e34"]]);const T=e=>($("data-v-01be894e"),e=e(),p(),e),oe=["id"],re=T(()=>n("div",{class:"image"},null,-1)),ue={bp:"12",class:"label"},de=T(()=>n("br",null,null,-1)),ae={class:"buttons"},he=["disabled"],ve={data(){return{timer:null,interval:500,tile_height:null,icon_height:null,animation:null}},created(){window.addEventListener("resize",this.resizeHandler)},destroyed(){window.removeEventListener("resize",this.resizeHandler)},computed:{cssVars(){return{"--icon-color":`rgb(${this.tile.iconColorRgb.r},${this.tile.iconColorRgb.g},${this.tile.iconColorRgb.b})`,"--tile-height":`${this.tile_height}px`,"--icon-height":`${this.icon_height}px`}}},methods:{mouseDown(){!this.tile.enabled||(this.animation="press-animation",this.timer=setInterval(this.mouseHold,this.interval))},mouseUp(){!this.timer||(clearInterval(this.timer),this.timer=null,this.interval==500?this.press():this.interval=500,this.animation="bounce-animation")},mouseHold(){this.hold(),clearInterval(this.timer),this.timer=null,this.interval=500,this.animation="bounce-animation"},press(){let e={};e.screen=this.tile.screen,e.tile=this.tile.id,e.style=this.tile.style,e.type="button",e.state=this.tile.state,e.event="single",this.$root.mqttSend(e)},hold(){let e={};e.screen=this.tile.screen,e.tile=this.tile.id,e.style=this.tile.style,e.type="button",e.state=this.tile.state,e.event="hold",this.$root.mqttSend(e)},resizeHandler(){this.tile_height=this.$refs.tileheight.clientWidth,this.icon_height=this.$refs.iconheight.clientWidth}},mounted(){this.resizeHandler()}},be=Object.assign(ve,{props:{tile:{type:Object,required:!0}},setup(e){return(t,i)=>(l(),o("div",{bp:"grid vertical-start",class:a(`tile state-${e.tile.state} button-${e.tile.type} enabled-${e.tile.enabled} ${t.animation}`),id:e.tile.id,style:c(t.cssVars),ref:"tileheight"},[re,e.tile.icon?(l(),o("div",{key:0,bp:"4",class:a(`icon icon--mask icon-${e.tile.icon}`),ref:"iconheight"},null,2)):u("",!0),n("div",ue,[m(d(e.tile.label)+" ",1),e.tile.subLabel?(l(),o(h,{key:0},[de,n("span",null,d(e.tile.subLabel),1)],64)):u("",!0)]),n("div",ae,[n("button",{onMousedown:i[0]||(i[0]=(...s)=>t.mouseDown&&t.mouseDown(...s)),onMouseup:i[1]||(i[1]=(...s)=>t.mouseUp&&t.mouseUp(...s)),onMouseout:i[2]||(i[2]=(...s)=>t.mouseUp&&t.mouseUp(...s)),onTouchstart:i[3]||(i[3]=r((...s)=>t.mouseDown&&t.mouseDown(...s),["prevent"])),onTouchend:i[4]||(i[4]=r((...s)=>t.mouseUp&&t.mouseUp(...s),["prevent"])),disabled:!e.tile.enabled},null,40,he)])],14,oe))}});var S=b(be,[["__scopeId","data-v-01be894e"]]);const D=e=>($("data-v-8dd12c94"),e=e(),p(),e),me=["id"],$e=D(()=>n("div",{class:"image"},null,-1)),pe={bp:"12",class:"label"},ce=D(()=>n("br",null,null,-1)),ge={class:"buttons"},fe=["disabled"],we=["disabled"],ye=["disabled"],ke={data(){return{timer:null,interval:500,tile_height:null,icon_height:null,animation:null}},created(){window.addEventListener("resize",this.resizeHandler)},destroyed(){window.removeEventListener("resize",this.resizeHandler)},computed:{cssVars(){return{"--icon-color":`rgb(${this.tile.iconColorRgb.r},${this.tile.iconColorRgb.g},${this.tile.iconColorRgb.b})`,"--tile-height":`${this.tile_height}px`,"--icon-height":`${this.icon_height}px`}}},methods:{mouseDown(e){!this.tile.enabled||(this.animation="press-animation",this.timer=setInterval(this.mouseHold,this.interval,e))},mouseUp(e){!this.timer||(clearInterval(this.timer),this.timer=null,this.interval==500?this.press(e):this.interval=500,this.animation="bounce-animation")},mouseHold(e){this.interval=200,this.hold(e),e=="button"&&(clearInterval(this.timer),this.timer=null,this.interval=500,this.animation="bounce-animation")},press(e){let t={};switch(t.screen=this.tile.screen,t.tile=this.tile.id,t.style=this.tile.style,t.type=e,t.event="single",e){case"button":t.state=this.tile.state;break}this.$root.mqttSend(t)},hold(e){let t={};switch(t.screen=this.tile.screen,t.tile=this.tile.id,t.style=this.tile.style,t.type=e,t.event="hold",e){case"button":t.state=this.tile.state;break}this.$root.mqttSend(t)},resizeHandler(){this.tile_height=this.$refs.tileheight.clientWidth,this.icon_height=this.$refs.iconheight.clientWidth}},mounted(){this.resizeHandler()}},Ue=Object.assign(ke,{props:{tile:{type:Object,required:!0}},setup(e){return(t,i)=>(l(),o("div",{bp:"grid vertical-start",class:a(`tile state-${e.tile.state} button-${e.tile.type} enabled-${e.tile.enabled} ${t.animation}`),id:e.tile.id,style:c(t.cssVars),ref:"tileheight"},[$e,e.tile.icon?(l(),o("div",{key:0,bp:"4",class:a(`icon icon--mask icon-${e.tile.icon}`),ref:"iconheight"},null,2)):u("",!0),n("div",pe,[m(d(e.tile.label)+" ",1),e.tile.subLabel?(l(),o(h,{key:0},[ce,n("span",null,d(e.tile.subLabel),1)],64)):u("",!0)]),n("div",ge,[n("button",{onMousedown:i[0]||(i[0]=s=>t.mouseDown("button")),onMouseup:i[1]||(i[1]=s=>t.mouseUp("button")),onMouseout:i[2]||(i[2]=s=>t.mouseUp("button")),onTouchstart:i[3]||(i[3]=r(s=>t.mouseDown("button"),["prevent"])),onTouchend:i[4]||(i[4]=r(s=>t.mouseUp("button"),["prevent"])),disabled:!e.tile.enabled},null,40,fe),n("button",{onMousedown:i[5]||(i[5]=s=>t.mouseDown("up")),onMouseup:i[6]||(i[6]=s=>t.mouseUp("up")),onMouseout:i[7]||(i[7]=s=>t.mouseUp("up")),onTouchstart:i[8]||(i[8]=r(s=>t.mouseDown("up"),["prevent"])),onTouchend:i[9]||(i[9]=r(s=>t.mouseUp("up"),["prevent"])),class:"icon--mask icon-_up",disabled:!e.tile.enabled},null,40,we),n("button",{onMousedown:i[10]||(i[10]=s=>t.mouseDown("down")),onMouseup:i[11]||(i[11]=s=>t.mouseUp("down")),onMouseout:i[12]||(i[12]=s=>t.mouseUp("down")),onTouchstart:i[13]||(i[13]=r(s=>t.mouseDown("down"),["prevent"])),onTouchend:i[14]||(i[14]=r(s=>t.mouseUp("down"),["prevent"])),class:"icon--mask icon-_down",disabled:!e.tile.enabled},null,40,ye)])],14,me))}});var Se=b(Ue,[["__scopeId","data-v-8dd12c94"]]);const z=e=>($("data-v-29d1bd92"),e=e(),p(),e),Me=["id"],Te=z(()=>n("div",{class:"image"},null,-1)),De=z(()=>n("br",null,null,-1)),ze={class:"buttons"},He=["disabled"],Ie=["disabled"],Le=["disabled"],Ve={data(){return{timer:null,interval:500,tile_height:null,icon_height:null,animation:null}},created(){window.addEventListener("resize",this.resizeHandler)},destroyed(){window.removeEventListener("resize",this.resizeHandler)},computed:{cssVars(){return{"--icon-color":`rgb(${this.tile.iconColorRgb.r},${this.tile.iconColorRgb.g},${this.tile.iconColorRgb.b})`,"--tile-height":`${this.tile_height}px`,"--icon-height":`${this.icon_height}px`}}},methods:{mouseDown(e){!this.tile.enabled||(this.animation="press-animation",this.timer=setInterval(this.mouseHold,this.interval,e))},mouseUp(e){!this.timer||(clearInterval(this.timer),this.timer=null,this.interval==500?this.press(e):this.interval=500,this.animation="bounce-animation")},mouseHold(e){this.interval=200,this.hold(e),e=="button"&&(clearInterval(this.timer),this.timer=null,this.interval=500,this.animation="bounce-animation")},press(e){let t={};switch(t.screen=this.tile.screen,t.tile=this.tile.id,t.style=this.tile.style,t.type=e=="button"?"button":"level",t.event=e=="button"?"single":e,e){case"up":this.tile.level=Math.max(this.tile.level-1,this.tile.levelStart),t.state=this.tile.level,this.tile.update({});break;case"down":this.tile.level=Math.min(this.tile.level+1,this.tile.levelStop),t.state=this.tile.level,this.tile.update({});break;default:t.state=this.tile.state;break}this.$root.mqttSend(t)},hold(e){let t={};switch(t.screen=this.tile.screen,t.tile=this.tile.id,t.style=this.tile.style,t.type=e=="button"?"button":"level",t.event=e=="button"?"hold":e,e){case"up":this.tile.level=Math.max(this.tile.level-this.tile.levelPercentStep,this.tile.levelStart),t.state=this.tile.level,this.tile.update({});break;case"down":this.tile.level=Math.min(this.tile.level+this.tile.levelPercentStep,this.tile.levelStop),t.state=this.tile.level,this.tile.update({});break;default:t.state=this.tile.state;break}this.$root.mqttSend(t)},resizeHandler(){this.tile_height=this.$refs.tileheight.clientWidth,this.icon_height=this.$refs.iconheight.clientWidth}},mounted(){this.resizeHandler()}},Ce=Object.assign(Ve,{props:{tile:{type:Object,required:!0}},setup(e){return(t,i)=>(l(),o("div",{bp:"grid vertical-start",class:a(`tile state-${e.tile.state} button-${e.tile.type} enabled-${e.tile.enabled} ${t.animation}`),id:e.tile.id,style:c(t.cssVars),ref:"tileheight"},[Te,n("div",{class:"level",style:c({height:e.tile.levelPercent+"%"})},null,4),e.tile.icon?(l(),o("div",{key:0,bp:"4",class:a(`icon icon--mask icon-${e.tile.icon}`),ref:"iconheight"},null,2)):u("",!0),n("div",{bp:"12",class:a(e.tile.levelPercent<=85?"label invert":"label")},[m(d(e.tile.label)+" ",1),e.tile.subLabel?(l(),o(h,{key:0},[De,n("span",null,d(e.tile.subLabel),1)],64)):u("",!0)],2),n("div",ze,[n("button",{onMousedown:i[0]||(i[0]=s=>t.mouseDown("button")),onMouseup:i[1]||(i[1]=s=>t.mouseUp("button")),onMouseout:i[2]||(i[2]=s=>t.mouseUp("button")),onTouchstart:i[3]||(i[3]=r(s=>t.mouseDown("button"),["prevent"])),onTouchend:i[4]||(i[4]=r(s=>t.mouseUp("button"),["prevent"])),disabled:!e.tile.enabled},null,40,He),n("button",{onMousedown:i[5]||(i[5]=s=>t.mouseDown("up")),onMouseup:i[6]||(i[6]=s=>t.mouseUp("up")),onMouseout:i[7]||(i[7]=s=>t.mouseUp("up")),onTouchstart:i[8]||(i[8]=r(s=>t.mouseDown("up"),["prevent"])),onTouchend:i[9]||(i[9]=r(s=>t.mouseUp("up"),["prevent"])),class:"icon--mask icon-_up",disabled:!e.tile.enabled},null,40,Ie),n("button",{onMousedown:i[10]||(i[10]=s=>t.mouseDown("down")),onMouseup:i[11]||(i[11]=s=>t.mouseUp("down")),onMouseout:i[12]||(i[12]=s=>t.mouseUp("down")),onTouchstart:i[13]||(i[13]=r(s=>t.mouseDown("down"),["prevent"])),onTouchend:i[14]||(i[14]=r(s=>t.mouseUp("down"),["prevent"])),class:"icon--mask icon-_down",disabled:!e.tile.enabled},null,40,Le)])],14,Me))}});var qe=b(Ce,[["__scopeId","data-v-29d1bd92"]]);const H=e=>($("data-v-0aa50c96"),e=e(),p(),e),Re=["id"],Be=H(()=>n("div",{class:"image"},null,-1)),Oe=H(()=>n("br",null,null,-1)),je={class:"buttons"},Ee=["disabled"],Pe=["disabled"],We=["disabled"],Ne={data(){return{timer:null,interval:500,tile_height:null,icon_height:null,animation:null}},created(){window.addEventListener("resize",this.resizeHandler)},destroyed(){window.removeEventListener("resize",this.resizeHandler)},computed:{cssVars(){return{"--icon-color":`rgb(${this.tile.iconColorRgb.r},${this.tile.iconColorRgb.g},${this.tile.iconColorRgb.b})`,"--tile-height":`${this.tile_height}px`,"--icon-height":`${this.icon_height}px`}}},methods:{mouseDown(e){!this.tile.enabled||(this.animation="press-animation",this.timer=setInterval(this.mouseHold,this.interval,e))},mouseUp(e){!this.timer||(clearInterval(this.timer),this.timer=null,this.interval==500?this.press(e):this.interval=500,this.animation="bounce-animation")},mouseHold(e){this.interval=200,this.hold(e),e=="button"&&(clearInterval(this.timer),this.timer=null,this.interval=500,this.animation="bounce-animation")},press(e){let t={};switch(t.screen=this.tile.screen,t.tile=this.tile.id,t.style=this.tile.style,t.type=e=="button"?"button":"level",t.event=e=="button"?"single":e,e){case"up":this.tile.level=Math.min(this.tile.level+1,this.tile.levelStop),t.state=this.tile.level,this.tile.update({});break;case"down":this.tile.level=Math.max(this.tile.level-1,this.tile.levelStart),t.state=this.tile.level,this.tile.update({});break;default:t.state=this.tile.state;break}this.$root.mqttSend(t)},hold(e){let t={};switch(t.screen=this.tile.screen,t.tile=this.tile.id,t.style=this.tile.style,t.type=e=="button"?"button":"level",t.event=e=="button"?"hold":e,e){case"up":this.tile.level=Math.min(this.tile.level+this.tile.levelPercentStep,this.tile.levelStop),t.state=this.tile.level,this.tile.update({});break;case"down":this.tile.level=Math.max(this.tile.level-this.tile.levelPercentStep,this.tile.levelStart),t.state=this.tile.level,this.tile.update({});break;default:t.state=this.tile.state;break}this.$root.mqttSend(t)},resizeHandler(){this.tile_height=this.$refs.tileheight.clientWidth,this.icon_height=this.$refs.iconheight.clientWidth}},mounted(){this.resizeHandler()}},Fe=Object.assign(Ne,{props:{tile:{type:Object,required:!0}},setup(e){return(t,i)=>(l(),o("div",{bp:"grid vertical-start",class:a(`tile state-${e.tile.state} button-${e.tile.type} enabled-${e.tile.enabled} ${t.animation}`),id:e.tile.id,style:c(t.cssVars),ref:"tileheight"},[Be,n("div",{class:"level",style:c({height:e.tile.levelPercent+"%"})},null,4),e.tile.icon?(l(),o("div",{key:0,bp:"4",class:a(`icon icon--mask icon-${e.tile.icon}`),ref:"iconheight"},null,2)):u("",!0),n("div",{bp:"12",class:a(e.tile.levelPercent<=10?"label invert":"label")},[m(d(e.tile.label)+" ",1),e.tile.subLabel?(l(),o(h,{key:0},[Oe,n("span",null,d(e.tile.subLabel),1)],64)):u("",!0)],2),n("div",je,[n("button",{onMousedown:i[0]||(i[0]=s=>t.mouseDown("button")),onMouseup:i[1]||(i[1]=s=>t.mouseUp("button")),onMouseout:i[2]||(i[2]=s=>t.mouseUp("button")),onTouchstart:i[3]||(i[3]=r(s=>t.mouseDown("button"),["prevent"])),onTouchend:i[4]||(i[4]=r(s=>t.mouseUp("button"),["prevent"])),disabled:!e.tile.enabled},null,40,Ee),n("button",{onMousedown:i[5]||(i[5]=s=>t.mouseDown("up")),onMouseup:i[6]||(i[6]=s=>t.mouseUp("up")),onMouseout:i[7]||(i[7]=s=>t.mouseUp("up")),onTouchstart:i[8]||(i[8]=r(s=>t.mouseDown("up"),["prevent"])),onTouchend:i[9]||(i[9]=r(s=>t.mouseUp("up"),["prevent"])),class:"icon--mask icon-_up",disabled:!e.tile.enabled},null,40,Pe),n("button",{onMousedown:i[10]||(i[10]=s=>t.mouseDown("down")),onMouseup:i[11]||(i[11]=s=>t.mouseUp("down")),onMouseout:i[12]||(i[12]=s=>t.mouseUp("down")),onTouchstart:i[13]||(i[13]=r(s=>t.mouseDown("down"),["prevent"])),onTouchend:i[14]||(i[14]=r(s=>t.mouseUp("down"),["prevent"])),class:"icon--mask icon-_down",disabled:!e.tile.enabled},null,40,We)])],14,Re))}});var _e=b(Fe,[["__scopeId","data-v-0aa50c96"]]);const I=e=>($("data-v-bbc4b364"),e=e(),p(),e),Ae=["id"],Qe=I(()=>n("div",{class:"image"},null,-1)),Xe={bp:"12",class:"label"},Ge=I(()=>n("br",null,null,-1)),Je={class:"buttons"},Ke=["disabled"],Ye=["disabled"],Ze=["disabled"],xe={data(){return{timer:null,interval:500,tile_height:null,icon_height:null,animation:null}},created(){window.addEventListener("resize",this.resizeHandler)},destroyed(){window.removeEventListener("resize",this.resizeHandler)},computed:{cssVars(){return{"--icon-color":`rgb(${this.tile.iconColorRgb.r},${this.tile.iconColorRgb.g},${this.tile.iconColorRgb.b})`,"--tile-height":`${this.tile_height}px`,"--icon-height":`${this.icon_height}px`}}},methods:{mouseDown(e){!this.tile.enabled||(this.animation="press-animation",this.timer=setInterval(this.mouseHold,this.interval,e))},mouseUp(e){!this.timer||(clearInterval(this.timer),this.timer=null,this.interval==500?this.press(e):this.interval=500,this.animation="bounce-animation")},mouseHold(e){this.interval=200,this.hold(e),e=="button"&&(clearInterval(this.timer),this.timer=null,this.interval=500,this.animation="bounce-animation")},press(e){let t={};switch(t.screen=this.tile.screen,t.tile=this.tile.id,t.style=this.tile.style,t.type=e,t.event="single",e){case"button":t.state=this.tile.state;break}this.$root.mqttSend(t)},hold(e){let t={};switch(t.screen=this.tile.screen,t.tile=this.tile.id,t.style=this.tile.style,t.type=e,t.event="hold",e){case"button":t.state=this.tile.state;break}this.$root.mqttSend(t)},resizeHandler(){this.tile_height=this.$refs.tileheight.clientWidth,this.icon_height=this.$refs.iconheight.clientWidth}},mounted(){this.resizeHandler()}},et=Object.assign(xe,{props:{tile:{type:Object,required:!0}},setup(e){return(t,i)=>(l(),o("div",{bp:"grid vertical-start",class:a(`tile state-${e.tile.state} button-${e.tile.type} enabled-${e.tile.enabled} ${t.animation}`),id:e.tile.id,style:c(t.cssVars),ref:"tileheight"},[Qe,e.tile.icon?(l(),o("div",{key:0,bp:"4",class:a(`icon icon--mask icon-${e.tile.icon}`),ref:"iconheight"},null,2)):u("",!0),n("div",Xe,[m(d(e.tile.label)+" ",1),e.tile.subLabel?(l(),o(h,{key:0},[Ge,n("span",null,d(e.tile.subLabel),1)],64)):u("",!0)]),n("div",Je,[n("button",{onMousedown:i[0]||(i[0]=s=>t.mouseDown("button")),onMouseup:i[1]||(i[1]=s=>t.mouseUp("button")),onMouseout:i[2]||(i[2]=s=>t.mouseUp("button")),onTouchstart:i[3]||(i[3]=r(s=>t.mouseDown("button"),["prevent"])),onTouchend:i[4]||(i[4]=r(s=>t.mouseUp("button"),["prevent"])),disabled:!e.tile.enabled},null,40,Ke),n("button",{onMousedown:i[5]||(i[5]=s=>t.mouseDown("left")),onMouseup:i[6]||(i[6]=s=>t.mouseUp("left")),onMouseout:i[7]||(i[7]=s=>t.mouseUp("left")),onTouchstart:i[8]||(i[8]=r(s=>t.mouseDown("left"),["prevent"])),onTouchend:i[9]||(i[9]=r(s=>t.mouseUp("left"),["prevent"])),class:"icon--mask icon-_left",disabled:!e.tile.enabled},null,40,Ye),n("button",{onMousedown:i[10]||(i[10]=s=>t.mouseDown("right")),onMouseup:i[11]||(i[11]=s=>t.mouseUp("right")),onMouseout:i[12]||(i[12]=s=>t.mouseUp("right")),onTouchstart:i[13]||(i[13]=r(s=>t.mouseDown("right"),["prevent"])),onTouchend:i[14]||(i[14]=r(s=>t.mouseUp("right"),["prevent"])),class:"icon--mask icon-_right",disabled:!e.tile.enabled},null,40,Ze)])],14,Ae))}});var tt=b(et,[["__scopeId","data-v-bbc4b364"]]);const L=e=>($("data-v-67927e7c"),e=e(),p(),e),it=["id"],st=L(()=>n("div",{class:"image"},null,-1)),nt={bp:"12",class:"label"},lt=L(()=>n("br",null,null,-1)),ot={class:"buttons"},rt=["disabled"],ut=["disabled"],dt=["disabled"],at={data(){return{timer:null,interval:500,tile_height:null,icon_height:null,animation:null}},created(){window.addEventListener("resize",this.resizeHandler)},destroyed(){window.removeEventListener("resize",this.resizeHandler)},computed:{cssVars(){return{"--icon-color":`rgb(${this.tile.iconColorRgb.r},${this.tile.iconColorRgb.g},${this.tile.iconColorRgb.b})`,"--tile-height":`${this.tile_height}px`,"--icon-height":`${this.icon_height}px`}}},methods:{mouseDown(e){!this.tile.enabled||(this.animation="press-animation",this.timer=setInterval(this.mouseHold,this.interval,e))},mouseUp(e){!this.timer||(clearInterval(this.timer),this.timer=null,this.interval==500?this.press(e):this.interval=500,this.animation="bounce-animation")},mouseHold(e){this.interval=200,this.hold(e),e=="button"&&(clearInterval(this.timer),this.timer=null,this.interval=500,this.animation="bounce-animation")},press(e){let t={};switch(t.screen=this.tile.screen,t.tile=this.tile.id,t.style=this.tile.style,t.type=e,t.event="single",e){case"button":t.state=this.tile.state;break}this.$root.mqttSend(t)},hold(e){let t={};switch(t.screen=this.tile.screen,t.tile=this.tile.id,t.style=this.tile.style,t.type=e,t.event="hold",e){case"button":t.state=this.tile.state;break}this.$root.mqttSend(t)},resizeHandler(){this.tile_height=this.$refs.tileheight.clientWidth,this.icon_height=this.$refs.iconheight.clientWidth}},mounted(){this.resizeHandler()}},ht=Object.assign(at,{props:{tile:{type:Object,required:!0}},setup(e){return(t,i)=>(l(),o("div",{bp:"grid vertical-start",class:a(`tile state-${e.tile.state} button-${e.tile.type} enabled-${e.tile.enabled} ${t.animation}`),id:e.tile.id,style:c(t.cssVars),ref:"tileheight"},[st,e.tile.icon?(l(),o("div",{key:0,bp:"4",class:a(`icon icon--mask icon-${e.tile.icon}`),ref:"iconheight"},null,2)):u("",!0),n("div",nt,[m(d(e.tile.label)+" ",1),e.tile.subLabel?(l(),o(h,{key:0},[lt,n("span",null,d(e.tile.subLabel),1)],64)):u("",!0)]),n("div",ot,[n("button",{onMousedown:i[0]||(i[0]=s=>t.mouseDown("button")),onMouseup:i[1]||(i[1]=s=>t.mouseUp("button")),onMouseout:i[2]||(i[2]=s=>t.mouseUp("button")),onTouchstart:i[3]||(i[3]=r(s=>t.mouseDown("button"),["prevent"])),onTouchend:i[4]||(i[4]=r(s=>t.mouseUp("button"),["prevent"])),disabled:!e.tile.enabled},null,40,rt),n("button",{onMousedown:i[5]||(i[5]=s=>t.mouseDown("prev")),onMouseup:i[6]||(i[6]=s=>t.mouseUp("prev")),onMouseout:i[7]||(i[7]=s=>t.mouseUp("prev")),onTouchstart:i[8]||(i[8]=r(s=>t.mouseDown("up"),["prevent"])),onTouchend:i[9]||(i[9]=r(s=>t.mouseUp("up"),["prevent"])),class:"icon--mask icon-_prev",disabled:!e.tile.enabled},null,40,ut),n("button",{onMousedown:i[10]||(i[10]=s=>t.mouseDown("next")),onMouseup:i[11]||(i[11]=s=>t.mouseUp("next")),onMouseout:i[12]||(i[12]=s=>t.mouseUp("next")),onTouchstart:i[13]||(i[13]=r(s=>t.mouseDown("down"),["prevent"])),onTouchend:i[14]||(i[14]=r(s=>t.mouseUp("down"),["prevent"])),class:"icon--mask icon-_next",disabled:!e.tile.enabled},null,40,dt)])],14,it))}});var vt=b(ht,[["__scopeId","data-v-67927e7c"]]);const V=e=>($("data-v-59828cb4"),e=e(),p(),e),bt=["id"],mt=V(()=>n("div",{class:"image"},null,-1)),$t={bp:"12",class:"label"},pt=V(()=>n("br",null,null,-1)),ct={class:"buttons"},gt=["disabled"],ft={data(){return{tile_height:null,icon_height:null}},created(){window.addEventListener("resize",this.resizeHandler)},destroyed(){window.removeEventListener("resize",this.resizeHandler)},computed:{cssVars(){return{"--icon-color":`rgb(${this.tile.iconColorRgb.r},${this.tile.iconColorRgb.g},${this.tile.iconColorRgb.b})`,"--tile-height":`${this.tile_height}px`,"--icon-height":`${this.icon_height}px`}}},methods:{press(){!this.tile.enabled||this.$root.navigateToScreen(this.tile.link)},resizeHandler(){this.tile_height=this.$refs.tileheight.clientWidth,this.icon_height=this.$refs.iconheight.clientWidth}},mounted(){this.resizeHandler()}},wt=Object.assign(ft,{props:{tile:{type:Object,required:!0}},setup(e){return(t,i)=>(l(),o("div",{bp:"grid vertical-start",class:a(`tile state-${e.tile.state} button-${e.tile.type} enabled-${e.tile.enabled}`),id:e.tile.id,style:c(t.cssVars),ref:"tileheight"},[mt,e.tile.icon?(l(),o("div",{key:0,bp:"4",class:a(`icon icon--mask icon-${e.tile.icon}`),ref:"iconheight"},null,2)):u("",!0),n("div",$t,[m(d(e.tile.label)+" ",1),e.tile.subLabel?(l(),o(h,{key:0},[pt,n("span",null,d(e.tile.subLabel),1)],64)):u("",!0)]),n("div",ct,[n("button",{onClick:i[0]||(i[0]=(...s)=>t.press&&t.press(...s)),class:"icon--mask icon-_right",disabled:!e.tile.enabled},null,8,gt)])],14,bt))}});var yt=b(wt,[["__scopeId","data-v-59828cb4"]]);const C=e=>($("data-v-250e5905"),e=e(),p(),e),kt=["id"],Ut=C(()=>n("div",{class:"image"},null,-1)),St={bp:"12",class:"indicator"},Mt={bp:"12",class:"label"},Tt=C(()=>n("br",null,null,-1)),Dt={data(){return{tile_height:null}},created(){window.addEventListener("resize",this.resizeHandler)},destroyed(){window.removeEventListener("resize",this.resizeHandler)},computed:{cssVars(){return{"--icon-color":`rgb(${this.tile.iconColorRgb.r},${this.tile.iconColorRgb.g},${this.tile.iconColorRgb.b})`,"--tile-height":`${this.tile_height}px`}}},methods:{resizeHandler(){this.tile_height=this.$refs.tileheight.clientWidth}},mounted(){this.resizeHandler()}},zt=Object.assign(Dt,{props:{tile:{type:Object,required:!0}},setup(e){return(t,i)=>(l(),o("div",{bp:"grid vertical-start",class:a(`tile state-${e.tile.state} button-${e.tile.type} enabled-${e.tile.enabled} ${t.animation}`),id:e.tile.id,ref:"tileheight"},[Ut,n("div",St,[n("h1",null,[m(d(e.tile.value),1),n("sup",null,d(e.tile.units),1)]),n("h2",null,[m(d(e.tile.subValue),1),n("sup",null,d(e.tile.subUnits),1)])]),n("div",Mt,[m(d(e.tile.label)+" ",1),e.tile.subLabel?(l(),o(h,{key:0},[Tt,n("span",null,d(e.tile.subLabel),1)],64)):u("",!0)])],10,kt))}});var Ht=b(zt,[["__scopeId","data-v-250e5905"]]);const It=e=>($("data-v-796669ba"),e=e(),p(),e),Lt=It(()=>n("div",{class:"footer-pad"},"\xA0",-1)),Vt={bp:"grid 4"},Ct={key:0},qt={key:4},Rt={created(){this.$watch(()=>this.$route.params,()=>{this.fetchTiles(),this.updateScreen()},{immediate:!0}),this.$watch(()=>this.$root.screens[this.$route.params.id],()=>{this.fetchTiles()},{immediate:!0})},data(){return{tiles:[],screen:{footer:{left:"",center:"",right:""}}}},methods:{fetchTiles(){let e=this.$root.getScreen(this.$route.params.id);e&&(this.tiles=e.tiles)},updateScreen(){let e=this.$root.getScreen(this.$route.params.id);!e||(this.screen=e,this.screen.applyBgColor())},press(e){switch(e){case"left":this.$root.navigateToUrl("/screen/1");break;case"center":this.$root.navigateToUrl("/");break;case"right":this.$root.navigateToUrl("/config");break}}},mounted(){this.fetchTiles(),this.updateScreen()}},Bt=Object.assign(Rt,{setup(e){return(t,i)=>(l(),o(h,null,[n("main",{bp:"grid 6 4@sm 3@md 2@xl",style:c(t.cssVars)},[(l(!0),o(h,null,M(t.tiles,(s,k)=>(l(),o(h,{key:k},[s?(l(),o(h,{key:0},[s.style=="button"?(l(),v(S,{key:0,tile:s},null,8,["tile"])):u("",!0),s.style=="buttonUpDown"?(l(),v(Se,{key:1,tile:s},null,8,["tile"])):u("",!0),s.style=="buttonLevelUp"?(l(),v(_e,{key:2,tile:s},null,8,["tile"])):u("",!0),s.style=="buttonLevelDown"?(l(),v(qe,{key:3,tile:s},null,8,["tile"])):u("",!0),s.style=="buttonLeftRight"?(l(),v(tt,{key:4,tile:s},null,8,["tile"])):u("",!0),s.style=="buttonPrevNext"?(l(),v(vt,{key:5,tile:s},null,8,["tile"])):u("",!0),s.style=="indicator"?(l(),v(Ht,{key:6,tile:s},null,8,["tile"])):u("",!0),s.style=="dropDown"?(l(),v(S,{key:7,tile:s},null,8,["tile"])):u("",!0),s.style=="link"?(l(),v(yt,{key:8,tile:s},null,8,["tile"])):u("",!0)],64)):u("",!0)],64))),128))],4),Lt,n("footer",Vt,[t.screen.footer.left?(l(),o("h2",Ct,d(t.screen.footer.left),1)):(l(),o("button",{key:1,class:"icon icon--before icon-_home",onClick:i[0]||(i[0]=s=>t.press("left"))})),t.screen.footer.center?(l(),o("button",{key:2,onClick:i[1]||(i[1]=s=>t.press("center"))},d(t.screen.footer.center),1)):(l(),o("button",{key:3,onClick:i[2]||(i[2]=s=>t.press("center"))},d(t.screen.label),1)),t.screen.footer.right?(l(),o("h2",qt,d(t.screen.footer.right),1)):(l(),o("button",{key:5,class:"icon icon--before icon-_settings",onClick:i[3]||(i[3]=s=>t.press("right"))}))])],64))}});var Ot=b(Bt,[["__scopeId","data-v-796669ba"]]);const jt={},Et={class:"colour-wheel"},Pt=n("div",{class:"rainbow"},null,-1),Wt=n("div",{class:"white"},null,-1),Nt=[Pt,Wt];function Ft(e,t){return l(),o("div",Et,Nt)}var _t=b(jt,[["render",Ft]]);const At={data(){return{screens:[],screen:{footer:{left:"",center:"",right:""}}}},mounted(){this.screens=this.$root.screens,document.querySelector("body").setAttribute("style","background-color: rgb(0, 0, 0)")}},Qt=e=>($("data-v-e3d08d0e"),e=e(),p(),e),Xt={bp:"container"},Gt=Qt(()=>n("div",{bp:"text-center"},[n("h2",{class:"logo-before"},"OXRS Touch\xA0Panel")],-1)),Jt={key:0},Kt=["onClick"];function Yt(e,t,i,s,k,xt){return l(),o("div",Xt,[Gt,n("ul",null,[(l(!0),o(h,null,M(k.screens,(U,q)=>(l(),o(h,{key:q},[U.hidden?u("",!0):(l(),o("li",Jt,[n("button",{onClick:ei=>this.$root.navigateToScreen(U.id)},d(U.label),9,Kt)]))],64))),128)),n("li",null,[n("button",{onClick:t[0]||(t[0]=U=>this.$root.navigateToUrl("/config"))},"Settings")])])])}var Zt=b(At,[["render",Yt],["__scopeId","data-v-e3d08d0e"]]);const ii={props:{bodyView:{type:String,required:!0}},setup(e){return(t,i)=>(l(),o(h,null,[e.bodyView=="home"?(l(),v(Zt,{key:0})):u("",!0),e.bodyView=="config"?(l(),v(le,{key:1})):u("",!0),e.bodyView=="screen"?(l(),v(Ot,{key:2})):u("",!0),e.bodyView=="settings"?(l(),v(_t,{key:3})):u("",!0)],64))}};export{ii as default};
