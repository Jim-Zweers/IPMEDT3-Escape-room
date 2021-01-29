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
      let win = 0;
      let mute = 0;

      for(let i=0; i < notes.length; i++){
        notes[i].addEventListener('click', function(evt){
          //soundcontrols

          if(notes[i].getAttribute("id") == "js--sound" && mute == 0){
            console.log("sound gaat nu uit");
            mute = 1;
            panna.pause();
            ojuelegba.pause();
            davido.pause();
            notes[i].setAttribute("color", "red");
          }else if(notes[i].getAttribute("id") == "js--sound" && mute == 1){
            console.log("sound gaat nu aan");
            mute = 0;
            notes[i].setAttribute("color", "lightgreen");
            song1();
          }else{ //word de soundbutten niet gebruikt dan ga je naar de controlls van opdracht 3
            let curentNoteText = notes[i].children;

            if(curentNoteText[0].getAttribute("value") == "reset" && win == 0){
              j = 0;
              note1.setAttribute("position", movedNote[0]);
              parts[0] = "";
              note2.setAttribute("position", movedNote[1]);
              parts[1] = "";
              note3.setAttribute("position", movedNote[2]);
              parts[2] = "";
            }else{
              console.log(curentNoteText[0].getAttribute("value"));

    //zijn er minder dan 4 notes verplaatst dan word de value van de child opgeslagen
              if(j < 3){
                parts[j] = curentNoteText[0].getAttribute("value");
              }


    //zet de attribute om naar een string
              let notePositionTemp = notes[i].getAttribute("position");
              let posX = notePositionTemp.x;
              let posY = notePositionTemp.y;
              let posZ = notePositionTemp.z;

              let notePositionTempString = `${posX}, ${posY}, ${posZ}`;


    //verplaats de note en geeft de oude positie (opgeslagen in notePositonTempString) mee als variabele in een array,
    //ga dan door naar de volgende note
              switch (j) {
                case 0:
                  movedNote[0] = notePositionTempString;
                  notes[i].setAttribute("position", "1.01 1.2 0.3");
                  note1 = notes[i]
                  j++;
                  break;
                case 1:
                  movedNote[1] = notePositionTempString;
                  notes[i].setAttribute("position", "1.01 1.2 -0.2");
                  note2 = notes[i]
                  j++;
                  break;
                case 2:
                  movedNote[2] = notePositionTempString;
                  notes[i].setAttribute("position", "1.01 1.2 -0.7");
                  note3 = notes[i]
                  console.log(movedNote);
                  j++;
                  break;
              }

              console.log(parts);



    //winconditie
              if(parts[0] == "eta" && parts[1] == "dil" && parts[2] == "ogung"){
                console.log("correct");
                note1.setAttribute("color", "lightgreen");
                note2.setAttribute("color", "lightgreen");
                note3.setAttribute("color", "lightgreen");
                win = 1;
              }
            }
          }





      });
    }



//lyrics api
  let lyricsOut
  let panna = new Audio("MUSIC/panna.mp3");
  let ojuelegba = new Audio("MUSIC/OJUELEGBA.mp3");
  let davido = new Audio("MUSIC/Davido.mp3");
  let k = 0;

  const tvScreen = document.getElementById('js--screen');

  panna.volume = 0.05;
  ojuelegba.volume = 0.05;
  davido.volume = 0.05;

  song1 = () =>{
    if(mute == 1){
      console.log("de muziek staat uit");
    }else{
      panna.play();

      fetch("https://mourits-lyrics.p.rapidapi.com/?artist=Tekno&song=Pana", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "d8a7ef3e70msh5779fbd5d45e001p1f628bjsn81208be9a73e",
          "x-rapidapi-host": "mourits-lyrics.p.rapidapi.com"
        }
      })
      .then(res => res.json())
      .then(data => tvScreen.setAttribute("value", data.result.lyrics))
      .catch(err => {
        console.error(err);
      });

      setTimeout(song2, 255000)
    }

  }

  song2 = () =>{
    if(mute == 1){
      console.log("de muziek staat uit");
    }else{
      ojuelegba.play();

      fetch("https://mourits-lyrics.p.rapidapi.com/?artist=WIZKID&song=OJUELEGBA", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "d8a7ef3e70msh5779fbd5d45e001p1f628bjsn81208be9a73e",
          "x-rapidapi-host": "mourits-lyrics.p.rapidapi.com"
        }
      })
      .then(res => res.json())
      .then(data => tvScreen.setAttribute("value", data.result.lyrics))
      .catch(err => {
        console.error(err);
      });
      setTimeout(song3, 225000)
    }
    }


  song3 = () =>{
    if(mute == 1){
      console.log("de muziek staat uit");
    }else{
      davido.play();

      fetch("https://mourits-lyrics.p.rapidapi.com/?artist=Aye&song=Davido", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "d8a7ef3e70msh5779fbd5d45e001p1f628bjsn81208be9a73e",
          "x-rapidapi-host": "mourits-lyrics.p.rapidapi.com"
        }
      })
      .then(res => res.json())
      .then(data => tvScreen.setAttribute("value", data.result.lyrics))
      .catch(err => {
        console.error(err);
      });

      setTimeout(song1, 253000)
    }

  }

  song1();

}
