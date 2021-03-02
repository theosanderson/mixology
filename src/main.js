/*eslint no-unused-vars: "warn"*/
import Vue from 'vue'
import $ from 'jquery'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import VueSimpleSuggest from 'vue-simple-suggest'
import VTooltip from 'v-tooltip'

import {masses,volumes} from './masses_volumes.js'
Vue.use(VTooltip, {
  defaultHtml: false,
})


Vue.component('vue-simple-suggest', VueSimpleSuggest)

import NeededAmount from './components/NeededAmount.vue'
Vue.component('needed_amount', NeededAmount)



  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAbcpPTlSV3YaY3WHVSIV_-G2IV-6kGzyE",
    authDomain: "mixology-1b19e.firebaseapp.com",
    projectId: "mixology-1b19e",
    storageBucket: "mixology-1b19e.appspot.com",
    messagingSenderId: "372110169446",
    appId: "1:372110169446:web:c58d451c520df31b1aa4a7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

import vmodal from 'vue-js-modal'
Vue.use(vmodal)

let masses_data = Array();
let masses_keys = [];

$.getJSON("masses.json", function (data) {
  console.log(data);
  masses_data = data;
  masses_keys = Object.keys(data).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });


  startup();


});







function run_thing(uid) {
  var elemDiv = document.getElementById("hidden_" + uid);
  var elemInput = document.getElementById("input_" + uid);
  elemDiv.innerText = elemInput.value;
  let x = elemDiv.clientWidth + 10;
  var target = document.getElementById("mw_" + uid);
  if (target != null) {
    x = Math.min(x, 200)
    document.getElementById("mw_" + uid).style.left = x + 'px';
  }
}

window.run_thing = run_thing

//////////


let concentrations = {};

for (const [mass_key, mass_value] of Object.entries(masses)) {
  for (const [vol_key, vol_value] of Object.entries(volumes)) {
    const name = mass_key + "/" + vol_key;
    const value = mass_value / vol_value;
    const type_per_litre = "grams"
    concentrations[name] = { "value": value, "type_per_litre": type_per_litre }
  }
}

concentrations["% (w/v)"] = { value: 10, type_per_litre: "grams" }



for (const [vol_key, vol_value] of Object.entries(volumes)) {

  const name = "mol" + "/" + vol_key;
  const value = 1 / vol_value;
  const type_per_litre = "moles"
  concentrations[name] = { "value": value, "type_per_litre": type_per_litre }
}

concentrations["M"] = { value: 1, type_per_litre: "moles" }
concentrations["mM"] = { value: 1e-3, type_per_litre: "moles" }
concentrations["uM"] = { value: 1e-6, type_per_litre: "moles" }
concentrations["nM"] = { value: 1e-9, type_per_litre: "moles" }

for (const [vol_key, vol_value] of Object.entries(volumes)) {

  const name = "units" + "/" + vol_key;
  const value = 1 / vol_value;
  const type_per_litre = "units"
  concentrations[name] = { "value": value, "type_per_litre": type_per_litre }
}


concentrations["% (v/v)"] = { value: 1e-2, type_per_litre: "litres" }

concentrations["X"] = { value: 1, type_per_litre: "x" }


let sorted_masses = Object.keys(masses).sort();
let sorted_concentrations = Object.keys(concentrations).sort();
let sorted_volumes = Object.keys(volumes).sort();



/*# structure

{"name" : {"unit_per_litre":x, "value": y}}

grams, litres, moles, x , activity_units
*/


console.log(concentrations);








Vue.component('unit', {
  props: ['value', 'type'],
  data: function () {
    return {
      content: this.value


    }
  },
  methods: {

    unitKeyDown: function (e) {
      // console.log(e)
      if (e.code == "Backspace") {
        if (this.$refs.unit_input.inputElement.selectionEnd == 0) {
          this.$emit('backspace_too_far', 'true')
          e.preventDefault();
          e.stopPropagation();
        }

      }



    },


    filterFunction(a, b) {
      return a.toLowerCase().replace(" ", "").startsWith(b.toLowerCase().replace(" ", ""));
    },
    list_of_units() {
      if (this.type == "conc") {
        return (sorted_concentrations);
      }
      else if (this.type == "mass") {
        return (sorted_masses);
      }
      else if (this.type == "vol") {
        return (sorted_volumes);
      }

    }


  },
  computed: {
    invalid_unit() {
      if (this.list_of_units().includes(this.content)) {
        return false;
      }
      else {
        return true;
      }
    }
  },
  watch: {
    content: function (value) {

      this.$emit('input', value)


    }

  },
  template: `<div class="unit" style="display:inline-block">
      <vue-simple-suggest :filter="filterFunction"
      v-model="content" :class="{invalid_unit:invalid_unit}"
      :placeholder="type+' unit'"
      :list="list_of_units()"
      :filter-by-query="true"  class="unit_input" ref="unit_input">
      <input :placeholder="type+' unit'" type="text" autocomplete="off" v-model="content" v-on:keydown="unitKeyDown">
    </vue-simple-suggest>
      </div>`});




Vue.component('reagent', {
  props: ['uid', 'manual_mw', 'value'],

  data: function () {
    return {

      content: this.value,

      masses_data: masses_data,
      reagentsList() { return masses_keys; },
      filterFunction(a, b) {
        return a.toLowerCase().replace(" ", "").startsWith(b.toLowerCase().replace(" ", ""));
      }
    }
  },

  watch: {
    'content.name': {
      immediate: false, handler() {
        this.$emit('nameChange')
        this.$emit('input', this.content)
        console.log("name change")
        this.UpdateMW()
      }
    },

    'manual_mw': {
      immediate: true, handler() {

        this.UpdateMW()
      }
    },
    'content.mw': {
      immediate: true, handler() {
        console.log("mw_change", this.content.mw);
        this.$emit('input', this.content)

      }
    },

  },
  methods: {
    UpdateMW() {
      if (this.manual_mw != null) {
        this.content.mw = this.manual_mw;
      }
      else if (this.reagentsList().includes(this.content.name)) {
        this.content.mw = (masses_data[this.content.name]);
      }
      else {
        console.log('setting to null')
        this.content.mw = null;
      }
      setTimeout("run_thing('" + this.uid + "')", 1)

    },


    Update() {

      //if(self.mw != null){
      setTimeout("run_thing('" + this.uid + "')", 1);
      // }


    }
  }



  ,
  template: `<div class="reagent" style="display:inline-block">
          <vue-simple-suggest v-on:select="Update"
          placeholder="reagent"
          v-model="content.name"
          :list="reagentsList"
          :filter="filterFunction"
          :filter-by-query="true">
          <div class="mw" v-if="content.mw != null" :id="'mw_'+uid">(MW: {{content.mw}})</div>
          <input  spellcheck="false" v-model="content.name" autocomplete="off" placeholder="reagent" type="search"  v-on:input="Update" :id="'input_'+uid"> 
          <div :id="'hidden_'+uid" style="width: auto;
          display: inline-block;
          visibility: hidden;
          position: fixed;
          overflow:auto;" class="measuring_tape">
          </div>
        </vue-simple-suggest>
          </div>`});




Vue.component('reagent_line', {
  props: ['uid', 'final_volume', 'value', 'vol_toggle_hint'],
  data: function () {
    return {
      content: this.value

      ,

      count: 0,
      hover: false,




      modalise() {
        console.log(this);
        this.$modal.show('trash_modal_' + this.uid);
      },
      unmodalise() {
        console.log(this);
        this.$modal.hide('trash_modal_' + this.uid);
      },
      modalise_settings() {
        console.log(this);
        this.$modal.show('settings_modal_' + this.uid);
      },
      unmodalise_settings() {
        console.log(this);
        this.$modal.hide('settings_modal_' + this.uid);
      },
      deleteMe() {
        console.log("delete me", this.uid);
        this.$emit('deleteme', this.uid)

      }
    }
  },
  computed: {
    displayName() {
      if (this.content.reagent_info.name == '') {
        return 'unnamed chemical';
      }
      else {
        return this.content.reagent_info.name;
      }
    }
  },
  watch: {
    content: {
      handler(val) {
        this.$emit('input', this.content)
      },
      deep: true
    }
  },


  template: `
<div class="reagent_line" @mouseover="hover = true"
    @mouseleave="hover = false">
    <modal :name="'settings_modal_'+uid">
   <h3> {{displayName}}</h3>
          
          Custom molecular mass: <input type="number"  step="any"  placeholder="0.00" v-model="content.manual_mw"  class="classic"/>
       <div><button @click="unmodalise_settings()">OK</button></div>
          </modal>
    <modal :name="'trash_modal_'+uid">
          Are you sure you want to delete  {{displayName}}?
          <button  v-on:click="deleteMe()">Yes</button> <button v-on:click="unmodalise()">No</button>
        </modal>
    <div><conc_and_unit v-model="content.desired_concentration"/><reagent @nameChange="content.manual_mw = null" :manual_mw="content.manual_mw" :uid="uid" v-model="content.reagent_info" /><needed_amount :vol_toggle_hint="vol_toggle_hint" :mw="content.reagent_info.mw" :final_volume="final_volume" :desired_concentration="content.desired_concentration" v-model="content.needed_amount"></needed_amount><div style="display:inline-block" class="buttons_container" >&nbsp;<div  v-if="hover"  class="buttons"><i  v-on:click="modalise_settings()" title="Set molecular weight" class="fas fa-cog weight-button"></i> &nbsp;<i title="Delete" class="fas fa-trash trash-button" v-on:click="modalise()"></i></div></div>
    </div>

    
    
    
    </div>
    `
});

Vue.component('conc_and_unit', {
  props: ['value'],
  data: function () {
    return {
      //{ number: null, type_per_litre: null, raw_unit:null, raw_number:null }

      content: this.value
    }
  },
  methods: {
    onbackspacetoofar() {
      console.log('too far')

      const starting = ("" + this.content.raw_number);
      //this.content.raw_number = starting.slice(0, -1); //delete last char but this seems confusing
      this.$refs.number.focus()
      this.$refs.number.type = 'text'
      this.$refs.number.selectionStart = this.$refs.number.selectionEnd = this.$refs.number.value.toString().length
      this.$refs.number.type = 'number'

    },

    numberKeypress: function (e) {
      // console.log(e)
      var inp = String.fromCharCode(e.keyCode);


      const isLetter = /[a-zA-Z%]/.test(inp)
      if (isLetter) {
        e.preventDefault();


        console.log(this.$refs.unit.$refs.unit_input);
        this.$refs.unit.content = inp;
        this.$refs.unit.$refs.unit_input.value = inp;
        this.$refs.unit.$refs.unit_input.$refs.inputSlot.firstChild.focus();
      }
    }
    ,
    updateValue() {



      if (concentrations[this.value.raw_unit]) {

        this.value.type_per_litre = concentrations[this.value.raw_unit].type_per_litre
        this.value.number = this.value.raw_number * concentrations[this.value.raw_unit].value

        this.$emit('input', this.value)

      }
      else {

        console.log("invalid_unit")
        this.value.number = null;
        this.value.type_per_litre = null;
        this.$emit('input', this.value);
      }

    }
  },
  watch: {
    'value.raw_unit': function () { this.updateValue() },
    'value.raw_number': function () { this.updateValue() }
  },

  template: `<div style="display:inline-block"><input ref="number" type="number" v-on:keypress="numberKeypress" step="any" placeholder="conc." class="number" v-model="value.raw_number"></input><unit @backspace_too_far="onbackspacetoofar" ref="unit" type="conc" v-model="value.raw_unit" /></div>`
}
);


Vue.component('vol_and_unit', {
  props: ["num_hint", "unit_hint", 'value'],
  data: function () {
    return {
      content: this.value

    }
  },

  methods: {
    onbackspacetoofar() {
      console.log('too far')

      const starting = ("" + this.content.raw_number);
      //this.content.raw_number = starting.slice(0, -1); //delete last char but this seems confusing
      this.$refs.number.focus()
      this.$refs.number.type = 'text'
      this.$refs.number.selectionStart = this.$refs.number.selectionEnd = this.$refs.number.value.toString().length
      this.$refs.number.type = 'number'

    },
    numberKeypress: function (e) {
      // console.log(e)
      var inp = String.fromCharCode(e.keyCode);


      const isLetter = /[a-zA-Z%]/.test(inp)
      if (isLetter) {
        e.preventDefault();


        console.log(this.$refs.unit.$refs.unit_input);
        this.$refs.unit.content = inp;
        this.$refs.unit.$refs.unit_input.value = inp;
        this.$refs.unit.$refs.unit_input.$refs.inputSlot.firstChild.focus();
      }
    },
    updateValue() {


      let unit_details = volumes[this.content.raw_unit]
      if (unit_details) {
        this.content.computed_value_in_litres = this.content.raw_number * volumes[this.content.raw_unit]
        this.$emit('input', this.content)
      }
      else {


        this.content.computed_value_in_litres = null;
        this.$emit('input', this.content)
      }

    }
  },
  watch: {
    'content.raw_unit': { immediate: true, handler() { this.updateValue() } },
    'content.raw_number': { immediate: true, handler() { this.updateValue() } }
  },
  template: `<div style="display:inline-block"><input type="number" v-on:keypress="numberKeypress" step="any" :title="num_hint" placeholder="vol." class="number" v-model="content.raw_number"></input><unit @backspacetoofar="onbackspacetoofar" ref="unit" :title="unit_hint" type="vol" v-model="content.raw_unit" class="vol_unit"/></div>`
}
);



var data = {
  buffer_name: null,
  counter: 4,
  reagents_store: [],
  notes_store: [],
  model: '',
  about_open: false,
  video_open: false,
  final_volume: { raw_number: null, raw_unit: null, computed_value_in_litres: null },

  onDeleteMe(x) {
    console.log(this)
    console.log(x)
    let to_delete = -1;
    for (let i in data.reagents_store) {
      if (data.reagents_store[i].uid == x) {
        to_delete = i
      }
    }
    console.log(to_delete)
    if (to_delete > -1) {
      data.reagents_store.splice(to_delete, 1);

    }
  },
  deleteNote(x) {
    console.log(this)
    console.log(x)
    let to_delete = -1;
    for (let i in data.notes_store) {
      if (data.notes_store[i].uid == x) {
        to_delete = i
      }
    }
    console.log(to_delete)
    if (to_delete > -1) {
      data.notes_store.splice(to_delete, 1);

    }
  }


}

async function loadNewData() {
  var urlParams = new URLSearchParams(window.location.search);
  let recipe = urlParams.get('recipe')
  console.log(recipe)
  if (!recipe) {
    return
  }


  const cityRef = db.collection('recipes').doc(recipe);
  const doc = await cityRef.get();
  if (!doc.exists) {
    console.log('No such document!');
    return
  } else {
    console.log("good")

  }


  let new_data = JSON.parse(doc.data().json)
  console.log(new_data)



  if (new_data) {

    data['final_volume'] = new_data['final_volume']
    data['reagents_store'] = new_data['reagents_store']
    data['notes_store'] = new_data['notes_store']
    data['buffer_name'] = new_data['buffer_name']
  }

}

var app;

var test;

async function startup() {


  await loadNewData();

  document.getElementById('spinner').style.display = "none"

  app = new Vue({
    el: '#app',
    data: data,
    computed: {
      compoundTitle() {
        if (this.final_volume.computed_value_in_litres == null) {
          return "First, please enter a final volume above, with a unit"
        }
        else {
          return ""
        }

      }
    },
    methods: {




      AddCompound() {
        window.onbeforeunload = function () {
          return true;
        };

        var max_uid = 0

        for (let i in data.reagents_store) {
          max_uid = Math.max(
            data.reagents_store[i].uid, max_uid)
        }

        data.reagents_store.push(
          { "uid": (max_uid + 1), "info": { "desired_concentration": { "number": null, "type_per_litre": null, "raw_unit": null, "raw_number": null }, "manual_mw": null, "reagent_info": { "name": null, "mw": null }, "needed_amount": { "mass_unit": null, "chosen_input_method": "weight", "vol_unit": "", "stock_concentration": { "raw_unit": null, "raw_number": null, "number": null, "type_per_litre": null } } } }

        );
        data.counter++;
      },
      AddNote() {


        var max_uid = 0

        for (let i in data.notes_store) {
          max_uid = Math.max(
            data.notes_store[i].uid, max_uid)
        }

        data.notes_store.push(
          { "uid": (max_uid + 1), text: '', hover: false }

        );
        data.counter++;
      }


    }

  });

  $('.overlay').hide();
}






function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



var db = firebase.firestore();
async function permalink() {

  console.log('test')
  let time = Date.now()
  let to_store = { "notes_store": data.notes_store, "final_volume": data.final_volume, "buffer_name": data.buffer_name, "reagents_store": data.reagents_store };
  let json = JSON.stringify(to_store)
  const data_for_db = {
    json: json,
    time: time,
    version: 1

  };

  let id = makeid(10);
  // Add a new document in collection "cities" with ID 'LA'
  const res = await db.collection('recipes').doc(id).set(data_for_db);
  window.onbeforeunload = null;

  console.log("/?recipe=" + id);
  window.location.href = "/?recipe=" + id;

}

window.permalink = permalink