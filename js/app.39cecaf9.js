(function(e){function t(t){for(var i,a,s=t[0],l=t[1],u=t[2],d=0,m=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&m.push(o[a][0]),o[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);c&&c(t);while(m.length)m.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,s=1;s<n.length;s++){var l=n[s];0!==o[l]&&(i=!1)}i&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},o={app:0},r=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var c=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);var i=n("1da1"),o=n("3835"),r=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("96cf"),n("b64b"),n("35b3"),n("a9e3"),n("99af"),n("38cf"),n("4fad"),n("caad"),n("2ca0"),n("5319"),n("ac1f"),n("2532"),n("b0c0"),n("d3b7"),n("25f0"),n("a434"),n("2b3d"),n("3ca3"),n("ddb0"),n("841c"),n("a026")),a=n("1157"),s=n.n(a),l=n("260b"),u=(n("ea7b"),n("ee68"),n("5111")),c=n("e37d"),d=n("1881"),m=n.n(d);r["a"].use(c["a"],{defaultHtml:!1}),r["a"].component("vue-simple-suggest",u["a"]);var _={apiKey:"AIzaSyAbcpPTlSV3YaY3WHVSIV_-G2IV-6kGzyE",authDomain:"mixology-1b19e.firebaseapp.com",projectId:"mixology-1b19e",storageBucket:"mixology-1b19e.appspot.com",messagingSenderId:"372110169446",appId:"1:372110169446:web:c58d451c520df31b1aa4a7"};l["a"].initializeApp(_),r["a"].use(m.a);var p=Array(),h=[],v="???",f=4,g="Unable to calculate the required value: you need to add a molecular weight to this reagent to make this conversion. Either choose a reagent from the suggestion list or click on the cog icon.";function b(e,t){return parseFloat(t.toPrecision(e))}function y(e,t){if("undefined"===typeof t||null===t)return"";if(0===t)return"0";var n=b(e,t),i=Math.floor(n),o=Math.abs(i-n)<Number.EPSILON,r=String(i).length,a=String(n).length;if(r>e)return String(i);var s=o?e-r:e-a+1;return s>0?o?"".concat(String(i),".").concat("0".repeat(s)):"".concat(String(n)).concat("0".repeat(s)):String(n)}function w(e){var t=document.getElementById("hidden_"+e),n=document.getElementById("input_"+e);t.innerText=n.value;var i=t.clientWidth+10,o=document.getElementById("mw_"+e);null!=o&&(i=Math.min(i,200),document.getElementById("mw_"+e).style.left=i+"px")}s.a.getJSON("masses.json",(function(e){console.log(e),p=e,h=Object.keys(e).sort((function(e,t){return e.toLowerCase().localeCompare(t.toLowerCase())})),ae()})),window.run_thing=w;for(var k={g:1,mg:.001,kg:1e3,ug:1e-6,ng:1e-9},$={l:1,ml:.001,ul:1e-6,nl:1e-9,litres:1,litre:1,liters:1,liter:1},O={},S=0,j=Object.entries(k);S<j.length;S++)for(var x=Object(o["a"])(j[S],2),M=x[0],C=x[1],U=0,P=Object.entries($);U<P.length;U++){var E=Object(o["a"])(P[U],2),I=E[0],N=E[1],q=M+"/"+I,L=C/N,A="grams";O[q]={value:L,type_per_litre:A}}O["% (w/v)"]={value:10,type_per_litre:"grams"};for(var T=0,V=Object.entries($);T<V.length;T++){var D=Object(o["a"])(V[T],2),K=D[0],W=D[1],B="mol/"+K,R=1/W,F="moles";O[B]={value:R,type_per_litre:F}}O["M"]={value:1,type_per_litre:"moles"},O["mM"]={value:.001,type_per_litre:"moles"},O["uM"]={value:1e-6,type_per_litre:"moles"},O["nM"]={value:1e-9,type_per_litre:"moles"};for(var z=0,J=Object.entries($);z<J.length;z++){var Y=Object(o["a"])(J[z],2),G=Y[0],H=Y[1],Z="units/"+G,X=1/H,Q="units";O[Z]={value:X,type_per_litre:Q}}O["% (v/v)"]={value:.01,type_per_litre:"litres"},O["X"]={value:1,type_per_litre:"x"};var ee=Object.keys(k).sort(),te=Object.keys(O).sort(),ne=Object.keys($).sort();console.log(O),r["a"].component("needed_amount",{props:["final_volume","mw","desired_concentration","value","vol_toggle_hint"],data:function(){return{content:this.value,vol_toggle_hint_internal:!0}},methods:{toggleType:function(){this.vol_toggle_hint_internal=!1,this.desired_concentration_is_volumetric&&alert("Since your desired concentration is specified in volumetric units, you must measure out a volume."),"weight"==this.content.chosen_input_method?this.content.chosen_input_method="volume":this.content.chosen_input_method="weight"}},computed:{vol_toggle_large_tooltip:function(){return this.vol_toggle_hint_internal&this.vol_toggle_hint?"Press to toggle between measuring volume and mass":""},input_method:function(){return this.desired_concentration_is_volumetric?"volume":this.content.chosen_input_method},desired_concentration_is_volumetric:function(){return![null,"grams","moles"].includes(this.desired_concentration.type_per_litre)},needed_amount_mass:function(){if(!this.final_volume)return[v,"Unable to calculate the required value: please enter a valid total volume above"];if(void 0==k[this.content.mass_unit])return[v,"Unable to calculate the required value: please enter a valid mass unit to the right (e.g. mg)"];if(!this.desired_concentration.number)return[v,"Unable to calculate the required value: please enter a valid desired concentration"];if("grams"==this.desired_concentration.type_per_litre){var e=k[this.content.mass_unit],t=this.final_volume*this.desired_concentration.number/e;return[y(f,t),""]}if(this.mw>0&"moles"==this.desired_concentration.type_per_litre){var n=k[this.content.mass_unit],i=this.final_volume*this.desired_concentration.number*this.mw/n;return[y(f,i),""]}return this.mw?[v,"Unable to calculate the required value: you seem to be trying to convert between incompatible types"]:[v,g]},needed_amount_volume:function(){if(!this.final_volume)return[v,"Unable to calculate the required value: please enter a valid total volume above"];if(void 0==$[this.content.vol_unit])return[v,"Unable to calculate the required value: please enter a valid volume unit to the right (e.g. ml)"];if(!this.desired_concentration.number)return[v,"Unable to calculate the required value: please enter a valid desired concentration"];if(!this.content.stock_concentration.number)return[v,"Unable to calculate the required value: please enter a valid stock concentration to the right"];if(this.desired_concentration.type_per_litre==this.content.stock_concentration.type_per_litre){var e=$[this.content.vol_unit],t=this.final_volume*this.desired_concentration.number/(this.content.stock_concentration.number*e);return[y(f,t),""]}if("moles"==this.desired_concentration.type_per_litre&"grams"==this.content.stock_concentration.type_per_litre){if(!this.mw)return[v,g];var n=$[this.content.vol_unit],i=this.final_volume*this.desired_concentration.number/(this.content.stock_concentration.number*n/this.mw);return[y(f,i),""]}if("grams"==this.desired_concentration.type_per_litre&"moles"==this.content.stock_concentration.type_per_litre){if(!this.mw)return[v,g];var o=$[this.content.vol_unit],r=this.final_volume*this.desired_concentration.number/(this.content.stock_concentration.number*o*this.mw);return[y(f,r),""]}return[v,"error: you seem to be trying to convert between incompatible types"]},input_type_button_image:function(){return"weight"==this.input_method?"fa-balance-scale-right":"fa-flask"}},watch:{content:{handler:function(e){this.$emit("input",this.content)},deep:!0}},template:'<div style="display:inline-block" class="computed">\n  <div class="button_holder_flask"><i class="fas change-input-type-button toggler" :class="[input_type_button_image,vol_toggle_hint_internal & vol_toggle_hint ? \'highlight\': \'\']" v-tooltip="vol_toggle_large_tooltip" v-on:click="toggleType()" title="Toggle between measuring out mass and volume"></i></div>\n  <div   style="display:inline-block" v-if="input_method==\'weight\'">\n  <div class="needed_number" v-tooltip="needed_amount_mass[1]">{{needed_amount_mass[0]}}</div><unit key="mass" type="mass"  v-model="content.mass_unit"/>\n  </div>\n  <div style="display:inline-block"  v-if="input_method==\'volume\'">\n  <div class="needed_number" v-tooltip="needed_amount_volume[1]">{{needed_amount_volume[0]}}</div><unit key="vol" type="vol"  v-model="content.vol_unit" class="vol_unit2"/> of <conc_and_unit v-model="content.stock_concentration" /> stock\n  </div>\n  </div>'}),r["a"].component("unit",{props:["value","type"],data:function(){return{content:this.value}},methods:{unitKeyDown:function(e){"Backspace"==e.code&&0==this.$refs.unit_input.inputElement.selectionEnd&&(this.$emit("backspace_too_far","true"),e.preventDefault(),e.stopPropagation())},filterFunction:function(e,t){return e.toLowerCase().replace(" ","").startsWith(t.toLowerCase().replace(" ",""))},list_of_units:function(){return"conc"==this.type?te:"mass"==this.type?ee:"vol"==this.type?ne:void 0}},computed:{invalid_unit:function(){return!this.list_of_units().includes(this.content)}},watch:{content:function(e){this.$emit("input",e)}},template:'<div class="unit" style="display:inline-block">\n      <vue-simple-suggest :filter="filterFunction"\n      v-model="content" :class="{invalid_unit:invalid_unit}"\n      :placeholder="type+\' unit\'"\n      :list="list_of_units()"\n      :filter-by-query="true"  class="unit_input" ref="unit_input">\n      <input :placeholder="type+\' unit\'" type="text" autocomplete="off" v-model="content" v-on:keydown="unitKeyDown">\n    </vue-simple-suggest>\n      </div>'}),r["a"].component("reagent",{props:["uid","manual_mw","value"],data:function(){return{content:this.value,masses_data:p,reagentsList:function(){return h},filterFunction:function(e,t){return e.toLowerCase().replace(" ","").startsWith(t.toLowerCase().replace(" ",""))}}},watch:{"content.name":{immediate:!1,handler:function(){this.$emit("nameChange"),this.$emit("input",this.content),console.log("name change"),this.UpdateMW()}},manual_mw:{immediate:!0,handler:function(){this.UpdateMW()}},"content.mw":{immediate:!0,handler:function(){console.log("mw_change",this.content.mw),this.$emit("input",this.content)}}},methods:{UpdateMW:function(){null!=this.manual_mw?this.content.mw=this.manual_mw:this.reagentsList().includes(this.content.name)?this.content.mw=p[this.content.name]:(console.log("setting to null"),this.content.mw=null),setTimeout("run_thing('"+this.uid+"')",1)},Update:function(){setTimeout("run_thing('"+this.uid+"')",1)}},template:'<div class="reagent" style="display:inline-block">\n          <vue-simple-suggest v-on:select="Update"\n          placeholder="reagent"\n          v-model="content.name"\n          :list="reagentsList"\n          :filter="filterFunction"\n          :filter-by-query="true">\n          <div class="mw" v-if="content.mw != null" :id="\'mw_\'+uid">(MW: {{content.mw}})</div>\n          <input  spellcheck="false" v-model="content.name" autocomplete="off" placeholder="reagent" type="search"  v-on:input="Update" :id="\'input_\'+uid"> \n          <div :id="\'hidden_\'+uid" style="width: auto;\n          display: inline-block;\n          visibility: hidden;\n          position: fixed;\n          overflow:auto;" class="measuring_tape">\n          </div>\n        </vue-simple-suggest>\n          </div>'}),r["a"].component("reagent_line",{props:["uid","final_volume","value","vol_toggle_hint"],data:function(){return{content:this.value,count:0,hover:!1,modalise:function(){console.log(this),this.$modal.show("trash_modal_"+this.uid)},unmodalise:function(){console.log(this),this.$modal.hide("trash_modal_"+this.uid)},modalise_settings:function(){console.log(this),this.$modal.show("settings_modal_"+this.uid)},unmodalise_settings:function(){console.log(this),this.$modal.hide("settings_modal_"+this.uid)},deleteMe:function(){console.log("delete me",this.uid),this.$emit("deleteme",this.uid)}}},computed:{displayName:function(){return""==this.content.reagent_info.name?"unnamed chemical":this.content.reagent_info.name}},watch:{content:{handler:function(e){this.$emit("input",this.content)},deep:!0}},template:'\n<div class="reagent_line" @mouseover="hover = true"\n    @mouseleave="hover = false">\n    <modal :name="\'settings_modal_\'+uid">\n   <h3> {{displayName}}</h3>\n          \n          Custom molecular mass: <input type="number"  step="any"  placeholder="0.00" v-model="content.manual_mw"  class="classic"/>\n       <div><button @click="unmodalise_settings()">OK</button></div>\n          </modal>\n    <modal :name="\'trash_modal_\'+uid">\n          Are you sure you want to delete  {{displayName}}?\n          <button  v-on:click="deleteMe()">Yes</button> <button v-on:click="unmodalise()">No</button>\n        </modal>\n    <div><conc_and_unit v-model="content.desired_concentration"/><reagent @nameChange="content.manual_mw = null" :manual_mw="content.manual_mw" :uid="uid" v-model="content.reagent_info" /><needed_amount :vol_toggle_hint="vol_toggle_hint" :mw="content.reagent_info.mw" :final_volume="final_volume" :desired_concentration="content.desired_concentration" v-model="content.needed_amount"></needed_amount><div style="display:inline-block" class="buttons_container" >&nbsp;<div  v-if="hover"  class="buttons"><i  v-on:click="modalise_settings()" title="Set molecular weight" class="fas fa-cog weight-button"></i> &nbsp;<i title="Delete" class="fas fa-trash trash-button" v-on:click="modalise()"></i></div></div>\n    </div>\n\n    \n    \n    \n    </div>\n    '}),r["a"].component("conc_and_unit",{props:["value"],data:function(){return{content:this.value}},methods:{onbackspacetoofar:function(){console.log("too far");this.content.raw_number;this.$refs.number.focus(),this.$refs.number.type="text",this.$refs.number.selectionStart=this.$refs.number.selectionEnd=this.$refs.number.value.toString().length,this.$refs.number.type="number"},numberKeypress:function(e){var t=String.fromCharCode(e.keyCode),n=/[a-zA-Z%]/.test(t);n&&(e.preventDefault(),console.log(this.$refs.unit.$refs.unit_input),this.$refs.unit.content=t,this.$refs.unit.$refs.unit_input.value=t,this.$refs.unit.$refs.unit_input.$refs.inputSlot.firstChild.focus())},updateValue:function(){O[this.value.raw_unit]?(this.value.type_per_litre=O[this.value.raw_unit].type_per_litre,this.value.number=this.value.raw_number*O[this.value.raw_unit].value,this.$emit("input",this.value)):(console.log("invalid_unit"),this.value.number=null,this.value.type_per_litre=null,this.$emit("input",this.value))}},watch:{"value.raw_unit":function(){this.updateValue()},"value.raw_number":function(){this.updateValue()}},template:'<div style="display:inline-block"><input ref="number" type="number" v-on:keypress="numberKeypress" step="any" placeholder="conc." class="number" v-model="value.raw_number"></input><unit @backspace_too_far="onbackspacetoofar" ref="unit" type="conc" v-model="value.raw_unit" /></div>'}),r["a"].component("vol_and_unit",{props:["num_hint","unit_hint","value"],data:function(){return{content:this.value}},methods:{onbackspacetoofar:function(){console.log("too far");this.content.raw_number;this.$refs.number.focus(),this.$refs.number.type="text",this.$refs.number.selectionStart=this.$refs.number.selectionEnd=this.$refs.number.value.toString().length,this.$refs.number.type="number"},numberKeypress:function(e){var t=String.fromCharCode(e.keyCode),n=/[a-zA-Z%]/.test(t);n&&(e.preventDefault(),console.log(this.$refs.unit.$refs.unit_input),this.$refs.unit.content=t,this.$refs.unit.$refs.unit_input.value=t,this.$refs.unit.$refs.unit_input.$refs.inputSlot.firstChild.focus())},updateValue:function(){var e=$[this.content.raw_unit];e?(this.content.computed_value_in_litres=this.content.raw_number*$[this.content.raw_unit],this.$emit("input",this.content)):(this.content.computed_value_in_litres=null,this.$emit("input",this.content))}},watch:{"content.raw_unit":{immediate:!0,handler:function(){this.updateValue()}},"content.raw_number":{immediate:!0,handler:function(){this.updateValue()}}},template:'<div style="display:inline-block"><input type="number" v-on:keypress="numberKeypress" step="any" :title="num_hint" placeholder="vol." class="number" v-model="content.raw_number"></input><unit @backspacetoofar="onbackspacetoofar" ref="unit" :title="unit_hint" type="vol" v-model="content.raw_unit" class="vol_unit"/></div>'});var ie={buffer_name:null,counter:4,reagents_store:[],notes_store:[],model:"",about_open:!1,video_open:!1,final_volume:{raw_number:null,raw_unit:null,computed_value_in_litres:null},onDeleteMe:function(e){console.log(this),console.log(e);var t=-1;for(var n in ie.reagents_store)ie.reagents_store[n].uid==e&&(t=n);console.log(t),t>-1&&ie.reagents_store.splice(t,1)},deleteNote:function(e){console.log(this),console.log(e);var t=-1;for(var n in ie.notes_store)ie.notes_store[n].uid==e&&(t=n);console.log(t),t>-1&&ie.notes_store.splice(t,1)}};function oe(){return re.apply(this,arguments)}function re(){return re=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n,i,o,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=new URLSearchParams(window.location.search),n=t.get("recipe"),console.log(n),n){e.next=5;break}return e.abrupt("return");case 5:return i=ue.collection("recipes").doc(n),e.next=8,i.get();case 8:if(o=e.sent,o.exists){e.next=14;break}return console.log("No such document!"),e.abrupt("return");case 14:console.log("good");case 15:r=JSON.parse(o.data().json),console.log(r),r&&(ie["final_volume"]=r["final_volume"],ie["reagents_store"]=r["reagents_store"],ie["notes_store"]=r["notes_store"],ie["buffer_name"]=r["buffer_name"]);case 18:case"end":return e.stop()}}),e)}))),re.apply(this,arguments)}function ae(){return se.apply(this,arguments)}function se(){return se=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,oe();case 2:document.getElementById("spinner").style.display="none",new r["a"]({el:"#app",data:ie,computed:{compoundTitle:function(){return null==this.final_volume.computed_value_in_litres?"First, please enter a final volume above, with a unit":""}},methods:{AddCompound:function(){window.onbeforeunload=function(){return!0};var e=0;for(var t in ie.reagents_store)e=Math.max(ie.reagents_store[t].uid,e);ie.reagents_store.push({uid:e+1,info:{desired_concentration:{number:null,type_per_litre:null,raw_unit:null,raw_number:null},manual_mw:null,reagent_info:{name:null,mw:null},needed_amount:{mass_unit:null,chosen_input_method:"weight",vol_unit:"",stock_concentration:{raw_unit:null,raw_number:null,number:null,type_per_litre:null}}}}),ie.counter++},AddNote:function(){var e=0;for(var t in ie.notes_store)e=Math.max(ie.notes_store[t].uid,e);ie.notes_store.push({uid:e+1,text:"",hover:!1}),ie.counter++}}}),s()(".overlay").hide();case 5:case"end":return e.stop()}}),e)}))),se.apply(this,arguments)}function le(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*i));return t}var ue=l["a"].firestore();function ce(){return de.apply(this,arguments)}function de(){return de=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n,i,o,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("test"),t=Date.now(),n={notes_store:ie.notes_store,final_volume:ie.final_volume,buffer_name:ie.buffer_name,reagents_store:ie.reagents_store},i=JSON.stringify(n),o={json:i,time:t,version:1},r=le(10),e.next=8,ue.collection("recipes").doc(r).set(o);case 8:e.sent,window.onbeforeunload=null,console.log("/?recipe="+r),window.location.href="/?recipe="+r;case 12:case"end":return e.stop()}}),e)}))),de.apply(this,arguments)}window.permalink=ce}});
//# sourceMappingURL=app.39cecaf9.js.map