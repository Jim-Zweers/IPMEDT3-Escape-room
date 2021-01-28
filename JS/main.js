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
    const letter_placeholders = document.getElementsByClassName("js--letter_placeholder");
    let letters = document.getElementsByClassName("js--letter");
    let place_counter = 0;
    let place_counter_talen = 0;
    let lijnen_counter = 0;
    let letter_counter = 0;
    let hold = null;
    let scene = document.getElementById('js--scene');
    let x = null;
    let y = null;
    let lijne_array = [];
    let tekst = null;
    let breedte = null;

    const ewe_sound_1 = document.getElementById("js--ewe_sound_1");
    const sound_short_beep = document.getElementById("js--sound_short_beep");
    const ewe_sound_2 = document.getElementById("js--ewe_sound_2");
    const ea_sound_1 = document.getElementById("js--ea_sound_1");
    const ea_sound_2 = document.getElementById("js--ea_sound_2");
    const chan_sound_1 = document.getElementById("js--chan_sound_1");
    const chan_sound_2 = document.getElementById("js--chan_sound_2");
    const berber_sound_1 = document.getElementById("js--berber_sound_11");
    const berber_sound_2 = document.getElementById("js--berber_sound_12");
    const berber_sound_3 = document.getElementById("js--berber_sound_21");
    const berber_sound_4 = document.getElementById("js--berber_sound_22");


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
                let letter_h = document.createElement('a-box');
                letter_h.setAttribute("class", "js--letter js--interact");
                letter_h.setAttribute("color", "#ec4646");
                letter_h.setAttribute("height", "0.3");
                letter_h.setAttribute("width", "0.3");
                letter_h.setAttribute("depth", "0.2");
                letter_h.setAttribute("position", "11.75 3.5 -18.6");
                letter_h.innerHTML += '<a-text value="H" color="black" align="center" position="0 0 -0.11" rotation="0 -180 0" width="8"></a-text>';
                scene.appendChild(letter_h);
                letters = document.getElementsByClassName("js--letter");
                addListenersLetters();
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
                let letter_a = document.createElement('a-box');
                letter_a.setAttribute("class", "js--letter js--interact");
                letter_a.setAttribute("color", "#00fff0");
                letter_a.setAttribute("height", "0.3");
                letter_a.setAttribute("width", "0.3");
                letter_a.setAttribute("depth", "0.2");
                letter_a.setAttribute("position", "14 3.5 -18.6");
                letter_a.innerHTML += '<a-text value="A" color="black" align="center" position="0 0 -0.11" rotation="0 -180 0" width="8"></a-text>';
                scene.appendChild(letter_a);
                letters = document.getElementsByClassName("js--letter");
                addListenersLetters();
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
                        let letter_c = document.createElement('a-box');
                        letter_c.setAttribute("class", "js--letter js--interact");
                        letter_c.setAttribute("color", "#75cfb8");
                        letter_c.setAttribute("height", "0.3");
                        letter_c.setAttribute("width", "0.3");
                        letter_c.setAttribute("depth", "0.2");
                        letter_c.setAttribute("position", "11 3.5 -18.6");
                        letter_c.innerHTML += '<a-text value="C" color="black" align="center" position="0 0 -0.11" rotation="0 -180 0" width="8"></a-text>';
                        scene.appendChild(letter_c);
                        letters = document.getElementsByClassName("js--letter");
                        addListenersLetters();
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
                        lijne_array = [];
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
    
    //afspelen van de fragmenten
    function addListenersFragmenten(){
      for (let i = 0; i < fragmenten.length; i++){
          fragmenten[i].addEventListener('click', function(evt){
            if(i == 0){
              chan_sound_1.components.sound.playSound();
            }
            if(i == 1){
              berber_sound_1.components.sound.playSound();
              setTimeout(function(){
                berber_sound_2.components.sound.playSound();
              }, 200)
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
              chan_sound_2.components.sound.playSound();
            }
            if(i == 6){
              berber_sound_3.components.sound.playSound();
              setTimeout(function(){
                berber_sound_4.components.sound.playSound();
              }, 300)
            }
            if(i == 7){
              ea_sound_2.components.sound.playSound();
            }
          });
      }
    } 
  
    addListenersFragmenten() 


    //hintsysteem component
    AFRAME.registerComponent("hints", {
      init: function(){
        camera.innerHTML += '<a-plane id="js--tekst_paneel" position="0.48 0.33 -0.5" width="0.4" height="0.13"><a-text value="Hallo, ik ben je collega en wij zijn hier gestrand, omdat jij bent gestruikeld. Los de puzzels op zodat je een SOS kan sturen via de computer. Als je me nodig hebt sta ik hier rechts naast je" color="black" align="center" width="0.39" height="2"></a-text>';
        setTimeout(function(){
          document.getElementById("js--tekst_paneel").remove();
        }, 15000)

        this.newHint = function(){
          let z = camera.getAttribute("position").z;
          //weetje
          if(z == 0){
            tekst = "Ongeveer 30% van alle 6000 talen op de wereld wordt gesproken in Afrika. Ter vergelijking: als het gaat om de wereldbevolking bevindt slechts 13% zich in Afrika."
            breedte = 0.4
            eerste_weetje_1 = true;
          }
          if(z == -12){
            tekst = "Ik weet niet veel van geschriften, maar Berber is altijd en plus en de Egyptenaren konden goed tekenen."
            breedte = 0.4
          }
          if(z == -22.8){
            tekst = "Gebruik elke kleur 1x. En kijk goed naar de woorden onder de kleuren."
            breedte = 0.4
          }
          if(z == -40.8){
            tekst = "In het Frans tel je op, maar hier trek je af. PS kijk even goed naar 20 en 16."
            breedte = 0.4
          }
          if(z == -28){
            tekst = "Luister goed naar de klanken die worden gesproken. Deze talen hebben veel unieke klanken."
            breedte = 0.4
          }
          //weetje
          if(z == -35){
            tekst = "Je kent misschien meer Zulu (gesproken in Zuid-Afrika) dan je denkt. Dit is namelijk de taal van de beroemde openingszinnen uit The Lion King ‘Nants ingonyama bagithi Baba.’ Het betekent ‘Hier komt een leeuw, Vader.’"
            breedte = 0.4
          }
          //weetje
          if(z == -6){
            tekst = "Toen het Nkore-Kiga (gesproken in Oeganda) het Engelse woord kitchen begon te gebruiken, wisselden de -k- en de -ch- van plaats. Daardoor gebruiken ze daar nu één woord, ongeveer uit te spreken als ‘tsjikèni’ voor zowel ‘keuken’ als ‘kip.’"
            breedte = 0.4
          }
          camera.innerHTML += '<a-plane id="js--tekst_paneel" position="0.48 0.33 -0.5" height="0.13" width="'+ breedte +'"><a-text value="'+ tekst +'" color="black" align="center" width="0.39" height="2"></a-text>';
          setTimeout(function(){
            document.getElementById("js--tekst_paneel").remove();
          }, 8000)
        }
        this.el.addEventListener("click", this.newHint)
      },
      update: function() {
        console.log("update");
      },
      tick: function() {},
      remove: function() {},
      pause: function() {},
      play: function() {}
    })

    
    //inlogsysteem oppakken
    function addListenersLetters(){
      for (let i = 0; i < letters.length; i++){
        letters[i].addEventListener('click', function(evt){
          letters = document.getElementsByClassName("js--letter");
          if (hold == null) {
          camera.innerHTML += '<a-box id="js--hold" class="js--letter js--interact" color="'+ this.getAttribute("color") + '" height="1" width="1" rotation="0 180 0" position="2 -2 -4" depth="0.1">'+ this.innerHTML + '</a-box>'
          hold = "box";
          }
        });
      }
    }

    addListenersLetters()

    //inlogsysteem plaatsen
    for (let i = 0; i < letter_placeholders.length; i++){
      letter_placeholders[i].addEventListener('click', function(evt){
        if (hold == "box"){
          let heldbox = document.getElementById('js--hold');
          let box = document.createElement('a-box');
          box.setAttribute("class", "js--letter js--interact js--geplaatsteletter");
          box.setAttribute("height", "0.3");
          box.setAttribute("width", "0.3");
          box.setAttribute("depth", "0.2");
          box.setAttribute("rotation", "0 0 0");
          box.setAttribute("color", heldbox.getAttribute("color"));
          box.innerHTML += heldbox.innerHTML;
          box.setAttribute("position", {x: this.getAttribute('position').x, y: this.getAttribute('position').y, z: this.getAttribute('position').z});
          scene.appendChild(box);
          document.getElementById('js--hold').remove();
          addListenersLetters();
          hold = null;
          letter_counter += 1;
          if (letter_counter >= 5){
            let geplaatsteletters = document.getElementsByClassName("js--geplaatsteletter");
            console.log(geplaatsteletters);
            let eerste = geplaatsteletters[0].childNodes[1].getAttribute("value");
            let tweede = geplaatsteletters[1].childNodes[0].getAttribute("value");
            let derde = geplaatsteletters[2].childNodes[0].getAttribute("value");
            let vierde = geplaatsteletters[3].childNodes[0].getAttribute("value");
            let vijfde = geplaatsteletters[4].childNodes[0].getAttribute("value");
            if (eerste == "N" && tweede == "A" && derde == "C" && vierde == "H" && vijfde == "T" ){
              let sos_scherm = document.createElement('a-box');
              sos_scherm.setAttribute("height", "2.15");
              sos_scherm.setAttribute("width", "3.4");
              sos_scherm.setAttribute("depth", "0.1");
              sos_scherm.setAttribute("position", "12.5 4.5 -19.5");
              sos_scherm.innerHTML += '<a-text value="SOS" color="black" align="center" rotation="0 180 0" position="0 0.7 -0.11" width="10"></a-text><a-text value="HELP! HELP!" color="black" align="center" rotation="0 180 0" position="0 0.1 -0.11" width="10"></a-text><a-box id="js--knop_opnieuw" class="js--interact" color="#00fff0" height="0.5" width="1.5" depth="0.2" position="0.8 -0.7 0"><a-text value="Opnieuw proberen" color="black" align="center" rotation="0 180 0" position="0 0 -0.11" width="4"></a-text></a-box><a-box id="js--knop_stoppen" class="js--interact" color="#ec4646" height="0.5" width="1.5" depth="0.2" position="-0.8 -0.7 0" ><a-text value="Stoppen" color="black" align="center" rotation="0 180 0" position="0 0 -0.11" width="5"></a-text></a-box>';
              scene.appendChild(sos_scherm);
              //SOS tekst knoppen
              let stop_knop = document.getElementById("js--knop_stoppen");
              let opnieuw_knop = document.getElementById("js--knop_opnieuw");
              //Stop knop (Deze sluit het venster)
              stop_knop.addEventListener('click', function(evt){
                window.close();
              });
              //Opnieuw proberen knop
              opnieuw_knop.addEventListener('click', function(evt){
                location.reload();
              });
              camera.innerHTML += '<a-plane id="js--tekst_paneel" position="0.48 0.33 -0.5" width="0.4" height="0.13"><a-text value="Yes je hebt het gedaan nu kunnnen we eindelijk weg hier!" color="black" align="center" width="0.39" height="2"></a-text>';
            }
            else{
              letter_counter = 0;
              for(let i = 0; i < 5; i++){
                geplaatsteletters[0].remove();
              }
              for (let i = 0; i < letter_placeholders.length; i++){
                letter_placeholders[i].setAttribute("color", "red");
                setTimeout(function(){
                  letter_placeholders[i].setAttribute("color", "gray");
                }, 1000)
              }
            }
          }
        }
      });
    }    


    //Puzzel 3
    const notes = document.getElementsByClassName("js--note");
    let j = 0;
    let parts = new Array(3);
    let movedNote = new Array(3);
    let note1;
    let note2;
    let note3;
    let reset = 0;
    let awns = ["eta", "dilo", "ogung"];

    for(let i=0; i < notes.length; i++){
      notes[i].addEventListener('click', function(evt){

        let curentNoteText = notes[i].children;
        console.log(curentNoteText[0].getAttribute("value"));

        //zijn er minder dan 4 notes verplaatst dan word de value van de child opgeslagen
        if(j < 3){
          parts[j] = curentNoteText[0].getAttribute("value");
        }


        switch (j) {
          case 0:
            movedNote[0] = notes[i].getAttribute("position");
            console.log(movedNote[0]);
            notes[i].setAttribute("position", "1.01 1.2 0.25");
            console.log(movedNote[0]);
            note1 = notes[i]
            j++;
            break;
          case 1:
            movedNote[1] = notes[i].getAttribute("position");
            notes[i].setAttribute("position", "1.01 1.2 -0.2");
            note2 = notes[i]
            j++;
            break;
          case 2:
            movedNote[2] = notes[i].getAttribute("position");
            notes[i].setAttribute("position", "1.01 1.2 -0.65");
            note3 = notes[i]
            j++;
            break;
        }

        console.log(movedNote);
        if(reset == 1){

        }

        console.log(parts);



        //winconditie
        if(parts[0] == "eta" && parts[1] == "dilo" && parts[2] == "ogung"){
          console.log("correct");
          note1.setAttribute("color", "lightgreen");
          note2.setAttribute("color", "lightgreen");
          note3.setAttribute("color", "lightgreen");
          sound_short_beep.components.sound.playSound();
          let letter_t = document.createElement('a-box');
          letter_t.setAttribute("class", "js--letter js--interact");
          letter_t.setAttribute("color", "");
          letter_t.setAttribute("height", "0.3");
          letter_t.setAttribute("width", "0.3");
          letter_t.setAttribute("depth", "0.2");
          letter_t.setAttribute("position", "13.25 3.5 -18.6");
          letter_t.innerHTML += '<a-text value="T" color="black" align="center" position="0 0 -0.11" rotation="0 -180 0" width="8"></a-text>';
          scene.appendChild(letter_t);
          letters = document.getElementsByClassName("js--letter");
          addListenersLetters();
        }

      });
    }


}








