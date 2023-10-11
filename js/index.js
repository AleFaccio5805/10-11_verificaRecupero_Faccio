var classi = ["tpsit", "info", "reti", "inglese", "lettere", "religione", "mate", "gestione", "storia", "gin"];
var eventi = [];


window.onload = async function() {
    sessionStorage.clear();
    let bustaEventi = await fetch("server/getEventi.php", {method : 'GET'});
    eventi = await bustaEventi.json();
    console.log(eventi);
    giorni = [];
    
    for(let i = 0; i < 31; i++){
        giorni.push(document.getElementById("att" + (i+1)));
    }
    console.log(giorni);

    eventi["eventi"].forEach(evento => {

        let div = document.createElement("div");
        div.classList.add(classi[evento["codDesc"]-1]);
        div.id = (evento["data"].substring(8,10));
        div.setAttribute("onClick", "goToGiornata(this)");
        giorni[(evento["data"].substring(8,10))-1].append(div);
    });

    let giornate = document.getElementsByClassName("nGiorno");
    
    giornate.forEach(element => {
        element.setAttribute("onClick", "goToInserisci()");
    });


}

function goToGiornata(element){
    sessionStorage.clear(); 
    sessionStorage.setItem("giorno", element.getAttribute("id"));
    window.location.assign("http://localhost/10-11_verificaRecupero_Faccio/oggi.html");
    
}

function goToInserisci(){
    window.location.assign("http://localhost/10-11_verificaRecupero_Faccio/inserisci.html");
}


/**
    PER TUTTE LE PAGINE:
    1) Mettere il proprio cognome e nome nel footer

    PER QUESTA PAGINA:
    2.1) Scaricare tutti gli eventi di ottobre FATTO
    2.2) Inserire dinamicamente gli eventi nel calendario in modo corretto FATTO
    
    3.1) Aprire al click su un qualunque evento la pagina
        relativa all'ingrandimento del giorno (pagina oggi.html) FATTO
    3.2) Completare la pagina in modo dinamico con i dati del giorno scelto 
    
    4) Aprire al click sul numero del giorno la pagina di inserimento
        completando in modo dinamico la data con quella selezionata
        e la fascia oraria eventualmente non compilata di quel giorno
 */