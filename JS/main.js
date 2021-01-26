window.onload = () =>{
    const places = document.getElementsByClassName('js--place');
    const camera = document.getElementById('js--camera');
    const cursor = document.getElementById('js--cursor');
    const pickups = document.getElementsByClassName('js--pickup');
    let hold = null;
    const placeholders = document.getElementsByClassName('js--placeholder');
    let scene = document.getElementById('js--scene');
    const sound_short_beep = document.getElementById("js--sound_short_beep");
    let place_counter = 0;


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

      function addListeners(){
        for (let i = 0; i < pickups.length; i++){
          pickups[i].addEventListener('click', function(evt){
            if (hold == null) {
            camera.innerHTML += '<a-box id="js--hold" class="js--pickup js--interact" color="'+ this.getAttribute("color") + '" height='+ this.getAttribute("height") +' rotation="0 0 -90" position="2 -2 -4" depth="0.1">'+ this.innerHTML + '</a-box>'
            hold = "box";
            }
          });
        }
      }
    
      addListeners()
    
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
            addListeners();
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

}