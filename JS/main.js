window.onload = () =>{
    const places = document.getElementsByClassName('js--place');
    const camera = document.getElementById('js--camera');
    const cursor = document.getElementById('js--cursor');
    const pickups = document.getElementsByClassName('js--pickup');
    const placeholders = document.getElementsByClassName('js--placeholder');
    const placeholders_talen = document.getElementsByClassName('js--placeholder_talen');
    const talen = document.getElementsByClassName('js--talen');
    const beginpunten = document.getElementsByClassName("js--beginpunt");
    const eindpunten = document.getElementsByClassName("js--eindpunt");
    const fragmenten = document.getElementsByClassName("js--fragment");
    let place_counter = 0;
    let place_counter_talen = 0;
    let lijnen_counter = 0;
    let hold = null;
    let scene = document.getElementById('js--scene');
    let x = null;
    let y = null;
    let lijne_array = [];

    const ewe_sound_1 = document.getElementById("js--ewe_sound_1");
    const sound_short_beep = document.getElementById("js--sound_short_beep");
    const ewe_sound_2 = document.getElementById("js--ewe_sound_2");
    const ea_sound_1 = document.getElementById("js--ea_sound_1");
    const ea_sound_2 = document.getElementById("js--ea_sound_2");

    //loopfunctie
    for (let i = 0; i < places.length; i++) {
        places[i].addEventListener('click', function(evt){
          let att = document.createAttribute("animation");
          let loopafstand = Math.sqrt((camera.getAttribute('position').x - this.getAttribute('position').x) ** 2 + (camera.getAttribute('position').z - this.getAttribute('position').z )** 2);
          let tijd = (loopafstand / 7) *1000;
          att.value = "property: position; easing: linear; dur: " + tijd + "; to: " + this.getAttribute('position').x + " 6 " + this.getAttribute('position').z;
          camera.setAttribute('animation', att.value);
          sound.components.sound.playSound();
        });
      }

      //oppak systeem puzzel 5
      function addListeners5(){
        for (let i = 0; i < pickups.length; i++){
          pickups[i].addEventListener('click', function(evt){
            if (hold == null) {
            camera.innerHTML += '<a-box id="js--hold" class="js--pickup js--interact" color="'+ this.getAttribute("color") + '" height='+ this.getAttribute("height") +' rotation="0 0 -90" position="2 -2 -4" depth="0.1">'+ this.innerHTML + '</a-box>'
            hold = "box";
            console.log("true");
            }
          });
        }
      }
    
      addListeners5()
    
      //plaatsing systeem puzzel 5
      for (let i = 0; i < placeholders.length; i++){
        placeholders[i].addEventListener('click', function(evt){
          if (hold == "box"){
            let heldbox = document.getElementById('js--hold')
            let box = document.createElement('a-box');
            box.setAttribute("class", "js--pickup js--interact js--geplaatstebox");
            box.setAttribute("color", heldbox.getAttribute("color"));
            box.setAttribute("height", heldbox.getAttribute("height"));
            box.setAttribute("rotation", "0 90 -90");
            box.setAttribute("depth", "0.1")
            box.innerHTML += heldbox.innerHTML;
            box.setAttribute("position", {x: "-6", y:"4.5", z: this.getAttribute('position').z});
            scene.appendChild(box);
            document.getElementById('js--hold').remove();
            addListeners5();
            hold = null;
            place_counter += 1;
            if (place_counter >= 4){
              let geplaatsteboxen = document.getElementsByClassName("js--geplaatstebox");
              let eerste = geplaatsteboxen[0].childNodes[1].getAttribute("value");
              let tweede = geplaatsteboxen[1].childNodes[1].getAttribute("value");
              let derde = geplaatsteboxen[2].childNodes[1].getAttribute("value");
              let vierde = geplaatsteboxen[3].childNodes[1].getAttribute("value");
              if (eerste == "Ni" && tweede == "na" && derde == "ku" && vierde == "penda"){
                for(let i = 0; i < 4; i++){
                  geplaatsteboxen[0].remove();
                }
                sound_short_beep.components.sound.playSound();
                for (let i = 0; i < placeholders.length; i++){
                  placeholders[i].setAttribute("color", "green");
                  setTimeout(function(){
                    placeholders[i].setAttribute("color", "gray");
                  }, 1000)
                }
              }
              else{
                place_counter = 0;
                for(let i = 0; i < 4; i++){
                  geplaatsteboxen[0].remove();
                }
                for (let i = 0; i < placeholders.length; i++){
                  placeholders[i].setAttribute("color", "red");
                  setTimeout(function(){
                    placeholders[i].setAttribute("color", "gray");
                  }, 1000)
                }
              }
            }
          }
        });
      }

      //puzzel 1 pickup systeem
      function addListeners1(){
        for (let i = 0; i < talen.length; i++){
          talen[i].addEventListener('click', function(evt){
            if (hold == null) {
            camera.innerHTML += '<a-box id="js--hold" class="js--talen js--interact" color="'+ this.getAttribute("color") + '" height='+ this.getAttribute("height") +' rotation="0 0 90" position="2 -1 -2" depth="0.1" width="0.8">'+ this.innerHTML + '</a-box>'
            hold = "box";
            console.log("true");
            }
          });
        }
      }
    
      addListeners1()

      //puzzel 1 plaatsing systeem
      for (let i = 0; i < placeholders_talen.length; i++){
        placeholders_talen[i].addEventListener('click', function(evt){
          if (hold == "box"){
            let heldbox = document.getElementById('js--hold')
            let box = document.createElement('a-box');
            box.setAttribute("class", "js--taal js--interact js--geplaatstetaal");
            box.setAttribute("color", heldbox.getAttribute("color"));
            box.setAttribute("height", heldbox.getAttribute("height"));
            box.setAttribute("rotation", "-90 0 0");
            box.setAttribute("depth", "0.1")
            box.setAttribute("width", "0.8")
            box.innerHTML += heldbox.innerHTML;
            box.setAttribute("position", {x: this.getAttribute('position').x, y:"2.8", z: this.getAttribute('position').z});
            scene.appendChild(box);
            document.getElementById('js--hold').remove();
            addListeners1();
            hold = null;
            place_counter_talen += 1;
            if (place_counter_talen >= 5){
              let geplaatstetalen = document.getElementsByClassName("js--geplaatstetaal");
              let eerste = geplaatstetalen[0].childNodes[1].getAttribute("value");
              let tweede = geplaatstetalen[1].childNodes[1].getAttribute("value");
              let derde = geplaatstetalen[2].childNodes[1].getAttribute("value");
              let vierde = geplaatstetalen[3].childNodes[1].getAttribute("value");
              let vijfde = geplaatstetalen[4].childNodes[1].getAttribute("value");
              if (eerste == "Berber" && tweede == "Oud-Egyptisch" && derde == "Arabisch" && vierde == "Ge'ez" && vijfde == "Vai" ){
                sound_short_beep.components.sound.playSound();
                for (let i = 0; i < placeholders_talen.length; i++){
                  placeholders_talen[i].setAttribute("color", "green");
                }
              }
              else{
                place_counter_talen = 0;
                for(let i = 0; i < 5; i++){
                  geplaatstetalen[0].remove();
                }
                for (let i = 0; i < placeholders_talen.length; i++){
                  placeholders_talen[i].setAttribute("color", "red");
                  setTimeout(function(){
                    placeholders_talen[i].setAttribute("color", "gray");
                  }, 1000)
                }
              }
            }
          }
        });
      }

      //Beginpunten voor puzzel 2
      function addListenersBeginpunten(){
        for (let i = 0; i < beginpunten.length; i++){
            beginpunten[i].addEventListener('click', function(evt){
                if(x == null){
                    x = this.getAttribute("position").x;
                    y = this.getAttribute("position").y;
                }
                else{
                    console.log("Er is al een punt gepakt");
                }
            });
        }
    }

    //eindpunten voor puzzel 2
    function addListenersEindpunten(){
        for (let i = 0; i < eindpunten.length; i++){
            eindpunten[i].addEventListener('click', function(evt){
                if(x != null){
                    let lijn = document.createElement('a-entity');
                    lijn.setAttribute("line", 'start: '+ x + ', ' + y + ', -44; end: '+ this.getAttribute("position").x + ', ' + this.getAttribute("position").y + ', -44; color: red');
                    scene.appendChild(lijn);
                    lijn.setAttribute("class", "js--geplaatste_lijn");
                    lijnen_counter += 1;
                    x = null;
                    y = null;
                    lijne_array.push(this.getAttribute("position").y)
                    if(lijnen_counter >= 4){
                      let eerste_lijn_goed = 7.5;
                      let tweede_lijn_goed = 6;
                      let derde_lijn_goed = 9;
                      let vierde_lijn_goed = 4.5;
                      if(eerste_lijn_goed == lijne_array[0] && tweede_lijn_goed == lijne_array[1] && derde_lijn_goed == lijne_array[2] && vierde_lijn_goed == lijne_array[3]){
                        sound_short_beep.components.sound.playSound();
                        console.log("true");
                        for (let i = 0; i <beginpunten.length; i++){
                          beginpunten[i].setAttribute("color", "green");
                          eindpunten[i].setAttribute("color", "green");
                          
                        }
                      }
                      else{
                        console.log("false");
                        lijnen_counter = 0;
                        let geplaatste_lijnen = document.getElementsByClassName("js--geplaatste_lijn");
                        for(let i = 0; i < 4; i++){
                          geplaatste_lijnen[0].remove();
                        }
                        for (let i = 0; i <fragmenten.length; i++){
                          fragmenten[i].setAttribute("color", "red");
                          setTimeout(function(){
                            fragmenten[i].setAttribute("color", "#00af91");
                          }, 1000)
                        }
                      }
                    }
                }
                else{
                    console.log("Er is nog geen beginpunt");
                    x = null;
                    y = null;
                }
            });
        } 
    }

    addListenersEindpunten()
    addListenersBeginpunten()
    
    function addListenersFragmenten(){
      for (let i = 0; i < fragmenten.length; i++){
          fragmenten[i].addEventListener('click', function(evt){
            if(i == 0){
              sound_short_beep.components.sound.playSound();
            }
            if(i == 1){

            }
            if(i == 2){
              ewe_sound_1.components.sound.playSound();
            }
            if(i == 3){
              ea_sound_1.components.sound.playSound();
            }
            if(i == 4){
              ewe_sound_2.components.sound.playSound();
            }
            if(i == 5){

            }
            if(i == 6){

            }
            if(i == 7){
              ea_sound_2.components.sound.playSound();
            }
          });
      }
    } 
  
    addListenersFragmenten() 
}
