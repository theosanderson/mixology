
Vue.use(window["vue-js-modal"].default);

masses_data = Array();
masses_keys = [];
question_marks = '???'
precision_level = 5;

$.getJSON("masses.json", function (data) {
  console.log(data);
  masses_data = data;
  masses_keys = Object.keys(data).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});



});


function round(precision, number) {
  return parseFloat(number.toPrecision(precision))
}


function formatNumber(precision, number) {
  if (typeof number === 'undefined' || number === null) return ''

  if (number === 0) return '0'

  const roundedValue = round(precision, number)
  const floorValue = Math.floor(roundedValue)

  const isInteger = Math.abs(floorValue - roundedValue) < Number.EPSILON

  const numberOfFloorDigits = String(floorValue).length
  const numberOfDigits = String(roundedValue).length

  if (numberOfFloorDigits > precision) {
    return String(floorValue)
  } else {
    const padding = isInteger ? precision - numberOfFloorDigits : precision - numberOfDigits + 1

    if (padding > 0) {
      if (isInteger) {
        return `${String(floorValue)}.${'0'.repeat(padding)}`
      } else {
        return `${String(roundedValue)}${'0'.repeat(padding)}`
      }
    } else {
      return String(roundedValue)
    }
  }
}


function run_thing(uid) {
  var elemDiv = document.getElementById("hidden_" + uid);
  var elemInput = document.getElementById("input_" + uid);
  elemDiv.innerText = elemInput.value;
  x = elemDiv.clientWidth + 10;
  var target = document.getElementById("mw_" + uid);
  if (target != null) {
    x = Math.min(x, 200)
    document.getElementById("mw_" + uid).style.left = x + 'px';
  }
}


//////////

masses = { "g": 1, "mg": 1e-3, "kg": 1e3, "ug": 1e-6, "ng": 1e-9 }
volumes = { "l": 1, "ml": 1e-3, "ul": 1e-6, "nl": 1e-9, "litres": 1, "litre": 1, "liters": 1, "liter": 1 }

concentrations = {};

for (const [mass_key, mass_value] of Object.entries(masses)) {
  for (const [vol_key, vol_value] of Object.entries(volumes)) {
    const name = mass_key + "/" + vol_key;
    const value = mass_value / vol_value;
    const type_per_litre = "grams"
    concentrations[name] = { "value": value, "type_per_litre": type_per_litre }
  }
}

concentrations["% (w/v)"] = { value: 1e-2, type_per_litre: "grams" }



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


sorted_masses = Object.keys(masses).sort();
sorted_concentrations = Object.keys(concentrations).sort();
sorted_volumes = Object.keys(volumes).sort();



/*# structure

{"name" : {"unit_per_litre":x, "value": y}}

grams, litres, moles, x , activity_units
*/


console.log(concentrations);





Vue.component('needed_amount', {
  props:
    ['final_volume', 'mw', 'desired_concentration']



  ,
  data: function () {
    return {
      mass_unit: "",
      count: 0,
      chosen_input_method: 'weight',
      vol_unit: "",
      stock_concentration: { number: null, type_per_litre: null }
    }
  },
  methods: {
    toggleType() {
      if (this.desired_concentration_is_volumetric) {
        alert("Since your desired concentration is specified in volumetric units, you must measure out a volume.")
      }
      if (this.chosen_input_method == "weight") {
        this.chosen_input_method = "volume"
        this.vol_unit = ""
        this.mass_unit = ""
      }
      else {
        this.chosen_input_method = "weight"
        this.mass_unit = ""
        this.vol_unit = ""
      }
    }
  },

  computed:
  {
    input_method: function () {
      if (this.desired_concentration_is_volumetric) {
        return "volume"
      }
      return this.chosen_input_method;
    },
    desired_concentration_is_volumetric: function () {
      if ([null, "grams", "moles"].includes(this.desired_concentration.type_per_litre)) {
        return false;
      }
      else {
        return true;
      }
    }
    ,
    available_input_methods: function () {
      if (this.desired_concentration.type_per_litre == "grams") {
        return ["weight", "volume"]
      }
      else if (this.desired_concentration.type_per_litre == "litres") {
        return ["volume"]
      }
      else if (this.desired_concentration.type_per_litre == "moles") {
        if (this.mw) {
          return ["weight", "volume"]
        }
        else {
          return ['volume']
        }
      }
      else {
        return [];
      }

    },


    needed_amount_mass() {
      if (!this.final_volume) {
        return [question_marks, "error: please enter a valid total volume above"]
      }

      if (masses[this.mass_unit] == undefined) {
        return [question_marks, "error: please enter a valid mass unit to the right (e.g. mg)"]
      }

      if (!this.desired_concentration.number) {
        return [question_marks, "error: please enter a valid desired concentration"]
      }
      if (this.desired_concentration.type_per_litre == "grams") {

        mass_unit_value = masses[this.mass_unit];

        val = this.final_volume * this.desired_concentration.number / mass_unit_value
        return [formatNumber(precision_level, val), ""]
      }
      else if (this.mw > 0 & this.desired_concentration.type_per_litre == "moles") {

        mass_unit_value = masses[this.mass_unit];
        val = this.final_volume * this.desired_concentration.number * this.mw / mass_unit_value
        return [formatNumber(precision_level, val), ""]
      }
      else {
        if (!this.mw) {
          return [question_marks, "error: you need to add a molecular weight to this reagent to make this conversion, click on the cog icon"]
        }
        return [question_marks, "error: you seem to be trying to convert between incompatible types"]
      }
    },
    needed_amount_volume() {
      if (!this.final_volume) {
        return [question_marks, "error: please enter a valid total volume above"]
      }

      if (volumes[this.vol_unit] == undefined) {
        return [question_marks, "error: please enter a valid volume unit to the right (e.g. ml)"]
      }

      if (!this.desired_concentration.number) {
        return [question_marks, "error: please enter a valid desired concentration"]
      }

      if (!this.stock_concentration.number) {
        return [question_marks, "error: please enter a valid stock concentration to the right"]
      }


      if (this.desired_concentration.type_per_litre == this.stock_concentration.type_per_litre) {

        vol_unit_value = volumes[this.vol_unit];
        val = this.final_volume * this.desired_concentration.number / (this.stock_concentration.number * vol_unit_value);
        return [formatNumber(precision_level, val), ""]

      }
      else if (this.desired_concentration.type_per_litre == "moles" & this.stock_concentration.type_per_litre == "grams") {
        vol_unit_value = volumes[this.vol_unit];
        val = this.final_volume * this.desired_concentration.number / (this.stock_concentration.number * vol_unit_value * this.mw);
        return [formatNumber(precision_level, val), ""]
      }
      else if (this.desired_concentration.type_per_litre == "grams" & this.stock_concentration.type_per_litre == "moles") {
        vol_unit_value = volumes[this.vol_unit];
        val = this.final_volume * this.desired_concentration.number * this.mw / (this.stock_concentration.number * vol_unit_value);
        return [formatNumber(precision_level, val), ""]
      }
      else {
        return [question_marks, "error: you seem to be trying to convert between incompatible types"]

      }




    },
    input_type_button_image() {
      if (this.input_method == "weight") {
        return "fa-balance-scale-right";
      }
      else {
        return "fa-flask";
      }
    }

  },
  template: `<div style="display:inline-block" class="computed">
  <div class="button_holder_flask"><i class="fas change-input-type-button toggler" :class="input_type_button_image" v-on:click="toggleType()" title="Toggle between measuring out mass and volume"></i></div>
  <div  @load="$('.needed_number').tooltip();"  style="display:inline-block" class="weight_input" v-if="input_method=='weight'">
  <div class="needed_number" v-tooltip="needed_amount_mass[1]">{{needed_amount_mass[0]}}</div><unit type="mass"  v-model="mass_unit"/>
  </div>
  <div @load="$('.needed_number').tooltip();" style="display:inline-block" class="weight_input" v-if="input_method=='volume'">
  <div class="needed_number" v-tooltip="needed_amount_volume[1]">{{needed_amount_volume[0]}}</div><unit type="vol"  v-model="vol_unit"/> of <conc_and_unit v-model="stock_concentration" /> stock
  </div>
  </div>`
});


Vue.component('unit', {
  props: {
    value: null,
    type: null
  },
  data: function () {
    return {
      unit: "",

    }
  },
  methods: {

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
      if (this.list_of_units().includes(this.unit)) {
        return false;
      }
      else {
        return true;
      }
    }
  },
  watch: {
    unit: function (value) {

      this.$emit('input', value)


    }
  },
  template: `<div class="unit" style="display:inline-block">
      <vue-simple-suggest :filter="filterFunction"
      v-model="unit" :class="{invalid_unit:invalid_unit}"
      :placeholder="type+' unit'"
      :list="list_of_units()"
      :filter-by-query="true" class="unit_input">
    </vue-simple-suggest>
      </div>`});




Vue.component('reagent', {
  props: {
    uid: '',
    manual_mw: null,

  },

  data: function () {
    return {
      value: {
        name: '',
        mw: null
      },
      name: "",
      masses_data: masses_data,
      reagentsList() { return masses_keys; },
      filterFunction(a, b) {
        return a.toLowerCase().replace(" ", "").startsWith(b.toLowerCase().replace(" ", ""));
      }
    }
  },
  computed: {
    mw: function () {
      if (this.manual_mw != null) {
        return this.manual_mw;
      }
      else if (this.reagentsList().includes(this.name)) {
        return (masses_data[this.name]);
      }
      else {
        return null;
      }
    }

  },
  watch: {
    name: function (newer, older) {
      this.$emit('nameChange')
      this.value.name = newer;
      this.$emit('input', this.value)
    },
    mw: function (newVal) {
      console.log("mw_change");
      this.value.mw = newVal;
      this.$emit('input', this.value)
    }
  },
  methods: {


    Update() {

      //if(self.mw != null){
      setTimeout("run_thing('" + this.uid + "')", 1);
      // }


    }
  }



  ,
  template: `<div class="reagent" style="display:inline-block">
          <vue-simple-suggest v-on:select="Update"
          v-model="name"
          placeholder="reagent"
          :list="reagentsList"
          :filter="filterFunction"
          :filter-by-query="true">
          <div class="mw" v-if="mw != null" :id="'mw_'+uid">(MW: {{mw}})</div>
          <input autocomplete="off" placeholder="reagent" type="search"  v-on:input="Update" :id="'input_'+uid"> 
          <div :id="'hidden_'+uid" style="width: auto;
          display: inline-block;
          visibility: hidden;
          position: fixed;
          overflow:auto;" class="measuring_tape">
          </div>
        </vue-simple-suggest>
          </div>`});




Vue.component('reagent_line', {
  props: ['uid', 'final_volume'],
  data: function () {
    return {
      manual_mw: null,
      count: 0,
      hover: false,
      reagent_info: { name: '', mw: null },
      desired_concentration: { number: null, type_per_litre: null },


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
      if (this.reagent_info.name == '') {
        return 'unnamed chemical';
      }
      else {
        return this.reagent_info.name;
      }
    }
  },

  template: `
<div class="reagent_line" @mouseover="hover = true"
    @mouseleave="hover = false">
    <modal :name="'settings_modal_'+uid">
   <h3> {{displayName}}</h3>
          
          Custom molecular mass: <input type="number"  step="any"  placeholder="0.00" v-model="manual_mw"  class="classic"/>
       <div><button @click="unmodalise_settings()">OK</button></div>
          </modal>
    <modal :name="'trash_modal_'+uid">
          Are you sure you want to delete  {{displayName}}?
          <button  v-on:click="deleteMe()">Yes</button> <button v-on:click="unmodalise()">No</button>
        </modal>
    <div><conc_and_unit v-model="desired_concentration"/><reagent @nameChange="manual_mw = null" :manual_mw="manual_mw" :uid="uid" v-model="reagent_info" /><needed_amount :mw="reagent_info.mw" :final_volume="final_volume" :desired_concentration="desired_concentration"></needed_amount><div style="display:inline-block" class="buttons_container" >&nbsp;<div  v-if="hover"  class="buttons"><i  v-on:click="modalise_settings()" title="Set molecular weight" class="fas fa-cog weight-button"></i> &nbsp;<i title="Delete" class="fas fa-trash trash-button" v-on:click="modalise()"></i></div></div>
    </div>

    
    
    
    </div>
    `
});

Vue.component('conc_and_unit', {
  props: {
  },
  data: function () {
    return {
      raw_unit: null,
      raw_number: null,

      value: { number: null, type_per_litre: null }
    }
  },
  methods: {
    updateValue() {


      if (concentrations[this.raw_unit]) {

        this.value.type_per_litre = concentrations[this.raw_unit].type_per_litre
        this.value.number = this.raw_number * concentrations[this.raw_unit].value
        console.log(JSON.stringify(this.value))
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
    raw_unit() { this.updateValue() },
    raw_number() { this.updateValue() }
  },
  //unit_types = "g_per_litre", "litre_per_litre", "moles_per_litre"

  template: `<div style="display:inline-block"><input type="number"  step="any" placeholder="conc." class="number" v-model="raw_number"></input><unit type="conc" v-model="raw_unit" /></div>`
}
);


Vue.component('vol_and_unit', {
  props: ["num_hint", "unit_hint"],
  data: function () {
    return {
      raw_unit: null,
      raw_number: null,
      value: null // in_litres
    }
  },
  methods: {
    updateValue() {

      unit_details = volumes[this.raw_unit]
      if (unit_details) {
        this.value = this.raw_number * volumes[this.raw_unit]
        this.$emit('input', this.value)
      }
      else {

        console.log("invalid_vol_unit")
        this.value = null;
        this.$emit('input', this.value)
      }

    }
  },
  watch: {
    raw_unit() { this.updateValue() },
    raw_number() { this.updateValue() }
  },
  template: `<div style="display:inline-block"><input type="number" step="any" :title="num_hint" placeholder="vol." class="number" v-model="raw_number"></input><unit :title="unit_hint" type="vol" v-model="raw_unit" /></div>`
}
);



Vue.component('buffer_header', {
  data: function () {
    return {
      count: 0
    }
  },
  template: `<h4 contenteditable=true>Buffer title</h4>
    `
});






var data = {
  counter: 3,
  uids: [],
  model: '',
  about_open: false,
  video_open:false,
  chosen: '',
  final_volume: null,

  message: 'Hello Vue!',

  onDeleteMe(x) {
    console.log(this)
    console.log(x)

    index = data.uids.indexOf(x);
    if (index > -1) {
      data.uids.splice(index, 1);
    }
  }

}


var app = new Vue({
  el: '#app',
  data: data,
  computed: {
    compoundTitle() {
      if (this.final_volume == null) {
        return "First, please enter a final volume above, with a unit"
      }
      else {
        return ""
      }

    }
  },
  methods: {


    simpleSuggestionList() {
      return [
        'Vue.js',
        'React.js',
        'Angular.js'
      ]
    },
    AddCompound() {
      window.onbeforeunload = function () {
        return true;
      };
      data.uids.push(data.counter);
      data.counter++;
    }


  }

});