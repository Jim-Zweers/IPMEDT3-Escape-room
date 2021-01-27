window.onload = () =>{
    const places = document.getElementsByClassName('js--place');
    const camera = document.getElementById('js--camera');
    const cursor = document.getElementById('js--cursor');
    const pickups = document.getElementsByClassName('js--pickup');
    const placeholders = document.getElementsByClassName('js--placeholder');
    const placeholders_talen = document.getElementsByClassName('js--placeholder_talen');
    const talen = document.getElementsByClassName('js--talen');
    const sound_short_beep = document.getElementById("js--sound_short_beep");
    const beginpunten = document.getElementsByClassName("js--beginpunt");
    const eindpunten = document.getElementsByClassName("js--eindpunt");
    let place_counter = 0;
    let place_counter_talen = 0;
    let hold = null;
    let scene = document.getElementById('js--scene');
    let x = null;
    let y = null;
    
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

    function addListenersEindpunten(){
        for (let i = 0; i < eindpunten.length; i++){
            eindpunten[i].addEventListener('click', function(evt){
                if(x != null){
                    console.log("true");
                    let lijn = document.createElement('a-entity');
                    lijn.setAttribute("line", 'start: '+ x + ', ' + y + ', -44; end: '+ this.getAttribute("position").x + ', ' + this.getAttribute("position").y + ', -44; color: red');
                    scene.appendChild(lijn);
                    console.log("true");
                    x = null;
                    y = null;
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
    
}