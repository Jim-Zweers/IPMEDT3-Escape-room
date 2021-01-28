window.onload = () =>{
    const places = document.getElementsByClassName('js--place');
    const camera = document.getElementById('js--camera');
    const cursor = document.getElementById('js--cursor');

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
          }

      });
    }

}
