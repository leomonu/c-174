AFRAME.registerComponent("atoms", {
  init:async function(){
    var compounds = await this.getCompounds()
    // console.log(compounds)

    var barcodes = Object.keys(compounds)
    // console.log(barcodes)
    barcodes.map(barcode=>{
        var elements = compounds[barcode]
        // console.log(elements)


        this.createAtoms(elements)
    })
  },
  getCompounds:function(){
    return fetch("./js/compoundList.json")
    .then(response=>response.json())
    .then(data=>data)

  },
  getElementColor:function(){
    return fetch("./js/elementColors.json")
    .then(response=>response.json())
    .then(data=>data)

  },
  
  createAtoms:async function(element){
    //   get element data
    var Element_name = element.element_name
    var barcodeValue = element.barcode_value
    var numberOfElectron=element.number_of_electrons
    // get the element color
    var elementColors = await this.getElementColor()
    // console.log(ElementData)
    // get the scene
    var scene = document.querySelector("a-scene")
    // console.log(scene)

    // add the marker entity for barcode marker
    var marker = document.createElement("a-marker")
    marker.setAttribute("id",`marker-${barcodeValue}`)
    marker.setAttribute("type","barcode")
    marker.setAttribute("value", barcodeValue)
    marker.setAttribute("element_name",Element_name)
    // console.log(marker)
    scene.appendChild(marker)
    // console.log(scene)

    // create atom
    var atom = document.createElement("a-entity")
    atom.setAttribute("id",`${Element_name}-${barcodeValue}`)
    marker.appendChild(atom)
    // console.log(marker)

    // create atom card
    var card = document.createElement("a-entity")
    card.setAttribute("id",`card-${Element_name}`)
    card.setAttribute("geometry",{
    primitive:"plane",
    width:1,
    height:1,
    }
    )
    card.setAttribute("material",{
        src:`./assets/atom_cards/card_${Element_name}.png`
    })
    card.setAttribute("position",{x:0,y:0,z:0})
    card.setAttribute("rotation",{x:-90,y:0,z:0})
    atom.appendChild(card)
    console.log(card)


    var nucleus  = document.createElement("a-entity")
    nucleus.setAttribute("id",`nucleus-${Element_name}`)
    nucleus.setAttribute("geometry",{
        primitive:"sphere",
        radius:0.2
    })
    nucleus.setAttribute("position",{x:0,y:1,z:0})
    nucleus.setAttribute("material","color",elementColors[Element_name])
    nucleus.setAttribute("rotation",{x:0,y:0,z:0})
    atom.appendChild(nucleus)
  }
  
  
});
