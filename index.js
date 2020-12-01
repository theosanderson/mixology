

countries = ["Tris","Hydrochloric acid", "HEPES", "Calcium chloride"]
molarities = ["nM","uM","mM","M"]
masses = ["ng","ug","mg","g","kg"]
mol = "mol"
volumes = ["ul","ml","l"]
wbv = "% (w/v)";

masses_and_moles = masses
masses_and_moles.push(mol)

concentrations = molarities;
concentrations.push(wbv)

volumes.forEach(vol => masses_and_moles.forEach( mass => concentrations.push(mass+"/"+ vol)
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
    template: '<span>12</span>'
  });




  // Define a new component called button-counter
  Vue.component('concentration', {
    data: function () {
      return {
        concentration : "",
        unit : "unit",
        name: '',
        molar_mass:0,
        search(input) {
            name = input;
            if (input.length < 1) { return [] }
            return concentrations.filter(country => {
              return country.toLowerCase()
                .startsWith(input.toLowerCase())
            })
          },
        submit(bla){
            if(bla!=null){
                name = bla;
            }
        }
      }
    },
    template: '<autocomplete :search="search" v-on:submit="submit" v-on:update="submit" placeholder="unit"></autocomplete>'
// <conc_and_conc_unit /> <reagent_type_inc_molar_mass_if_needed /> <source_and_type />  
});

 // Define a new component called button-counter
 Vue.component('volume_unit', {
    data: function () {
      return {
        volume : "",
        unit : "unit",
        name: '',
        molar_mass:0,
        search(input) {
            name = input;
            if (input.length < 1) { return [] }
            return volumes.filter(country => {
              return country.toLowerCase()
                .startsWith(input.toLowerCase())
            })
          },
        submit(bla){
            if(bla!=null){
                name = bla;
            }
        }
      }
    },
    template: '<autocomplete :search="search" v-on:submit="submit" v-on:update="submit" placeholder="unit"></autocomplete>'
// <conc_and_conc_unit /> <reagent_type_inc_molar_mass_if_needed /> <source_and_type />  
});


 // Define a new component called button-counter
 Vue.component('mass_unit', {
    data: function () {
      return {
        volume : "",
        unit : "unit",
        name: '',
        molar_mass:0,
        search(input) {
            name = input;
            if (input.length < 1) { return [] }
            return masses.filter(country => {
              return country.toLowerCase()
                .startsWith(input.toLowerCase())
            })
          },
        submit(bla){
            if(bla!=null){
                name = bla;
            }
        }
      }
    },
    template: '<autocomplete :search="search" v-on:submit="submit" v-on:update="submit" placeholder="unit"></autocomplete>'
// <conc_and_conc_unit /> <reagent_type_inc_molar_mass_if_needed /> <source_and_type />  
});




  Vue.component('reagent', {
    data: function () {
      return {
        concentration : "",
        unit : "unit",
        name: '',
        molar_mass:0,
        search(input) {
            name = input;
            if (input.length < 1) { return [] }
            return countries.filter(country => {
              return country.toLowerCase()
                .startsWith(input.toLowerCase())
            })
          },
        submit(bla){
            if(bla!=null){
                name = bla;
            }
        }
      }
    },
    template: '<autocomplete :search="search" v-on:submit="submit" v-on:update="submit" placeholder="chemical"></autocomplete>'
// <conc_and_conc_unit /> <reagent_type_inc_molar_mass_if_needed /> <source_and_type />  
})




Vue.component('reagent_line', {
    data: function () {
      return {
        count: 0
      }
    },
    template: `<tr>
    <td class="number_td"><number></number></td>
    <td class="conc_td"><concentration /></td>
    <td><reagent /></td>
    <td class="needed_td"><needed_amount></needed_amount></td>
    <td class="conc_td"><mass_unit /></td>

    
    </tr>
    `
  });

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
  


var app = new Vue({ 
    el: '#app',
    data: {
       
        message: 'Hello Vue!'
    }
});
