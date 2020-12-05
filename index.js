
Vue.use(window["vue-js-modal"].default);

masses_data = Array();
masses_keys = [];



$.getJSON("masses.json", function (data) {
  console.log(data);
  masses_data = data;
  masses_keys = Object.keys(data);



});

function run_thing(uid) {
  var elemDiv = document.getElementById("hidden_" + uid);
  var elemInput = document.getElementById("input_" + uid);
  elemDiv.innerText = elemInput.value;
  x = elemDiv.clientWidth;
  var target = document.getElementById("mw_" + uid);
  if (target != null){
  document.getElementById("mw_" + uid).style.left = x + 'px';
  }
}


masses = ["ng", "ug", "mg", "g", "kg"]
mol = "mol"
volumes = ["ul", "ml", "l"]
wbv = "% (w/v)";
times = "X"


masses_and_moles = masses
masses_and_moles.push(mol)

concentrations = molarities;
concentrations.push(wbv)
concentrations.push(times)


//////////

masses = {"g":1, "mg":1e-3, "kg":1e3, "ug":1e-6, "ng":1e-9}
volumes = {"l":1, "ml":1e-3, "ul":1e-6, "nl":1e-9}

concentrations = {};

for (const [mass_key, mass_value] of Object.entries(masses)) {
  for (const [vol_key, vol_value] of Object.entries(volumes)) {
    const name = mass_key+"/"+vol_key;
    const value = mass_value / vol_value;
    const type_per_litre = "grams"
    concentrations[name] = {"value": value,"type_per_litre":type_per_litre}
  }
}

concentrations["% (w/v)"] = {value:1e-2,type_per_litre:"grams"}



  for (const [vol_key, vol_value] of Object.entries(volumes)) {
    
    const name = "mol"+"/"+vol_key;
    const value = 1 / vol_value;
    const type_per_litre = "moles"
    concentrations[name] = {"value": value,"type_per_litre":type_per_litre}
  }

  concentrations["M"] = {value:1,type_per_litre:"moles"}
  concentrations["mM"] = {value:1e-3,type_per_litre:"moles"}
  concentrations["uM"] = {value:1e-6,type_per_litre:"moles"}
  concentrations["nM"] = {value:1e-9,type_per_litre:"moles"}

  for (const [vol_key, vol_value] of Object.entries(volumes)) {
    
    const name = "units"+"/"+vol_key;
    const value = 1 / vol_value;
    const type_per_litre = "units"
    concentrations[name] = {"value": value,"type_per_litre":type_per_litre}
  }


concentrations["% (v/v)"] = {value:1e-2,type_per_litre:"litres"}

concentrations["X"] = {value:1,type_per_litre:"x"}





/*# structure

{"name" : {"unit_per_litre":x, "value": y}}

grams, litres, moles, x , activity_units
*/

volumes.forEach(vol => masses_and_moles.forEach(mass => concentrations.push(mass + "/" + vol)
)





);

console.log(concentrations);

// Define a new component called button-counter
Vue.component('number', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<input type="number"  placeholder="conc." class="number"></input>'
});

// Define a new component called button-counter
Vue.component('number_vol', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<input type="number"  placeholder="vol." class="number"></input>'
});



Vue.component('needed_amount', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<div style="display:inline-block" class="computed">12</div>'
});

Vue.component('concentration_unit', {
  props:{value:null},
  data: function () {
    return {
      unit: "",
      concUnits() { return concentrations; }
    }},
    watch:{
        unit:function(value){
          
              this.$emit('input', value)
            
        }
    }

  

  ,
  template: `<div class="unit" style="display:inline-block">
    <vue-simple-suggest
    v-model="unit"
    placeholder="unit"
    :list="concUnits"
    :filter-by-query="true">
  </vue-simple-suggest>
    </div>`});



Vue.component('volume_unit', {
  data: function () {
    return {

      unit: "",
      concUnits() { return volumes; }
    }

  }

  ,
  template: `<div class="unit" style="display:inline-block">
      <vue-simple-suggest
      v-model="unit"
      placeholder="unit"
      :list="concUnits"
      :filter-by-query="true">
    </vue-simple-suggest>
      </div>`});


Vue.component('mass_unit', {
  data: function () {
    return {
      unit: "",
      concUnits() { return masses; }
    }

  }

  ,
  template: `<div class="unit" style="display:inline-block">
        <vue-simple-suggest
        v-model="unit"
        placeholder="unit"
        :list="concUnits"
        :filter-by-query="true">
      </vue-simple-suggest>
        </div>`});




Vue.component('reagent', {
  props: {
    uid: '',
    manual_mw: null,

  },

  data: function () {
    return {
      value:{
        name:'',
        mw:null
      },
      name: "",
      masses_data : masses_data,
      reagentsList() { return masses_keys; },
      filterFunction(a, b) {
        return a.toLowerCase().startsWith(b.toLowerCase());
      }
    }
  },
  computed: {
    mw: function(){
      if(this.manual_mw != null){
        return this.manual_mw;
      }
      else if(this.reagentsList().includes(this.name)){
        return(masses_data[this.name]);
      }
      else{
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
    mw: function(newVal){
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
          <input placeholder="reagent" type="search"  v-on:input="Update" :id="'input_'+uid"> 
          <div :id="'hidden_'+uid" style="width: auto;
          display: inline-block;
          visibility: hidden;
          position: fixed;
          overflow:auto;" class="measuring_tape">
          </div>
        </vue-simple-suggest>
          </div>`});




Vue.component('reagent_line', {
  props: ['uid'],
  data: function () {
    return {
      manual_mw: null,
      count: 0,
      hover: false,
      reagent_info: {name:'',mw:null},
      

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
  computed:{
    displayName(){
      if(this.reagent_info.name =='')
      {
        return 'unnamed chemical';
      }
      else{
        return this.reagent_info.name;
      }
    }
  },
  template: `
<div class="reagent_line" @mouseover="hover = true"
    @mouseleave="hover = false">
    <modal :name="'settings_modal_'+uid">
   <h3> {{displayName}}</h3>
          Stock of this chemical:
          <select>
          <option>Pure (to be weighed)</option>
          <option>In solution</option>
          </select>

          <br />
          Custom molecular mass: <input type="number"  v-model="manual_mw"  class="classic"/>
        </modal>
    <modal :name="'trash_modal_'+uid">
          Are you sure you want to delete  {{displayName}}?
          <button  v-on:click="deleteMe()">Yes</button> <button v-on:click="unmodalise()">No</button>
        </modal>
    <div><conc_and_unit /><reagent @nameChange="manual_mw = null" :manual_mw="manual_mw" :uid="uid" v-model="reagent_info" /><needed_amount></needed_amount><mass_unit></mass_unit><div style="display:inline-block" class="buttons_container" >&nbsp;<div  v-if="hover"  class="buttons"><i  v-on:click="modalise_settings()" class="fas fa-cog weight-button"></i> &nbsp;<i class="fas fa-trash trash-button" v-on:click="modalise()"></i></div></div>
    </div>

    
    
    
    </div>
    `
});

Vue.component('conc_and_unit', {
  props:{
  },
  data: function(){ return {
    raw_unit : null,
    raw_number : null,

    value:{number:null,unit_type:null}}
},
methods:{
  updateValue(){
    
  }},
  watch:{
    raw_unit(){ this.updateValue()},
    raw_number(){ this.updateValue()}
  }
  //unit_types = "g_per_litre", "litre_per_litre", "moles_per_litre"

  template:`<div style="display:inline-block"><input type="number"  placeholder="conc." class="number" v-model="raw_number"></input><concentration_unit v-model="raw_unit" />{{raw_unit}}</div>`
}
);

Vue.component('reagent_header', {
  data: function () {
    return {
      count: 0
    }
  },
  template: `<tr>
    <td class="number_td"></td>
    <td class="conc_td"></td>
    <td></td>
    <td>Final volume: <number_vol></number_vol>
    </td>
    <td class="conc_td"><volume_unit></volume_unit></td>
    
    </tr>
    `
});


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
  uids: ['a', 'b', 'c'],
  model: '',
  chosen: '',

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
  methods: {


    simpleSuggestionList() {
      return [
        'Vue.js',
        'React.js',
        'Angular.js'
      ]
    },
    AddCompound() {
      data.uids.push(data.counter);
      data.counter++;
    }


  }

});
