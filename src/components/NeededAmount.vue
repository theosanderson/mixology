
<script>
import {masses,volumes} from '../masses_volumes.js'
let question_marks = '???'
let precision_level = 4;

let mw_message = "Unable to calculate the required value: you need to add a molecular weight to this reagent to make this conversion. Either choose a reagent from the suggestion list or click on the cog icon.";

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
  export default{
        props:
    ['final_volume', 'mw', 'desired_concentration', 'value', 'vol_toggle_hint'],

  data: function () {
    return {
      content: this.value,
      vol_toggle_hint_internal: true
    }
  },
  methods: {
    toggleType() {
      this.vol_toggle_hint_internal = false;
      if (this.desired_concentration_is_volumetric) {
        alert("Since your desired concentration is specified in volumetric units, you must measure out a volume.")
      }
      if (this.content.chosen_input_method == "weight") {
        this.content.chosen_input_method = "volume"
        // this.content.vol_unit = ""
        //his.content.mass_unit = ""
      }
      else {
        this.content.chosen_input_method = "weight"
        //this.content.mass_unit = ""
        //this.content.vol_unit = ""
      }
    }
  },

  computed:
  {
    vol_toggle_large_tooltip() {
      if (this.vol_toggle_hint_internal & this.vol_toggle_hint) {
        return 'Press to toggle between measuring volume and mass';
      }
      else {
        return ''
      }
    },

    input_method: function () {
      if (this.desired_concentration_is_volumetric) {
        return "volume"
      }
      return this.content.chosen_input_method;
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


    needed_amount_mass() {
      if (!this.final_volume) {
        return [question_marks, "Unable to calculate the required value: please enter a valid total volume above"]
      }

      if (masses[this.content.mass_unit] == undefined) {
        return [question_marks, "Unable to calculate the required value: please enter a valid mass unit to the right (e.g. mg)"]
      }

      if (!this.desired_concentration.number) {
        return [question_marks, "Unable to calculate the required value: please enter a valid desired concentration"]
      }
      if (this.desired_concentration.type_per_litre == "grams") {

        let mass_unit_content = masses[this.content.mass_unit];

        let val = this.final_volume * this.desired_concentration.number / mass_unit_content
        return [formatNumber(precision_level, val), ""]
      }
      else if (this.mw > 0 & this.desired_concentration.type_per_litre == "moles") {

        let mass_unit_content = masses[this.content.mass_unit];
        let val = this.final_volume * this.desired_concentration.number * this.mw / mass_unit_content
        return [formatNumber(precision_level, val), ""]
      }
      else {
        if (!this.mw) {
          return [question_marks, mw_message]
        }
        return [question_marks, "Unable to calculate the required value: you seem to be trying to convert between incompatible types"]
      }
    },
    needed_amount_volume() {
      if (!this.final_volume) {
        return [question_marks, "Unable to calculate the required value: please enter a valid total volume above"]
      }

      if (volumes[this.content.vol_unit] == undefined) {
        return [question_marks, "Unable to calculate the required value: please enter a valid volume unit to the right (e.g. ml)"]
      }

      if (!this.desired_concentration.number) {
        return [question_marks, "Unable to calculate the required value: please enter a valid desired concentration"]
      }

      if (!this.content.stock_concentration.number) {
        return [question_marks, "Unable to calculate the required value: please enter a valid stock concentration to the right"]
      }


      if (this.desired_concentration.type_per_litre == this.content.stock_concentration.type_per_litre) {

        let vol_unit_content = volumes[this.content.vol_unit];
        let val = this.final_volume * this.desired_concentration.number / (this.content.stock_concentration.number * vol_unit_content);
        return [formatNumber(precision_level, val), ""]

      }
      else if (this.desired_concentration.type_per_litre == "moles" & this.content.stock_concentration.type_per_litre == "grams") {
        if (!this.mw) {
          return [question_marks, mw_message]
        }
        let vol_unit_content = volumes[this.content.vol_unit];
        let val = this.final_volume * this.desired_concentration.number / (this.content.stock_concentration.number * vol_unit_content / this.mw);
        return [formatNumber(precision_level, val), ""]
      }
      else if (this.desired_concentration.type_per_litre == "grams" & this.content.stock_concentration.type_per_litre == "moles") {
        if (!this.mw) {
          return [question_marks, mw_message]
        }
        let vol_unit_content = volumes[this.content.vol_unit];
        let val = this.final_volume * this.desired_concentration.number / (this.content.stock_concentration.number * vol_unit_content * this.mw);
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
  watch: {
    content: {
      handler() {
        this.$emit('input', this.content)
      },
      deep: true
    }
  }
  }
  </script>
  <template><div style="display:inline-block" class="computed">
  <div class="button_holder_flask"><i class="fas change-input-type-button toggler" :class="[input_type_button_image,vol_toggle_hint_internal & vol_toggle_hint ? 'highlight': '']" v-tooltip="vol_toggle_large_tooltip" v-on:click="toggleType()" title="Toggle between measuring out mass and volume"></i></div>
  <div   style="display:inline-block" v-if="input_method=='weight'">
  <div class="needed_number" v-tooltip="needed_amount_mass[1]">{{needed_amount_mass[0]}}</div><unit key="mass" type="mass"  v-model="content.mass_unit"/>
  </div>
  <div style="display:inline-block"  v-if="input_method=='volume'">
  <div class="needed_number" v-tooltip="needed_amount_volume[1]">{{needed_amount_volume[0]}}</div><unit key="vol" type="vol"  v-model="content.vol_unit" class="vol_unit2"/> of <conc_and_unit v-model="content.stock_concentration" /> stock
  </div>
  </div>
  </template>
