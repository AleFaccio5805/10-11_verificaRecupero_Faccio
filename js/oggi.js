var classi = ["tpsit", "info", "reti", "inglese", "lettere", "religione", "mate", "gestione", "storia", "gin"];

window.onload = async function (){
    let head = document.getElementsByTagName("header")[0];
    if(sessionStorage.getItem("giorno") == null){
        let date = new Date();
        
        head.innerHTML = (date.getDay() + 8) + " OTTOBRE";
    }
    else{
        head.innerHTML = sessionStorage.getItem("giorno") + " OTTOBRE";
    }

    let giornata = head.textContent.substring(0,2);
    let fullData = "2023/10/" + giornata;
    console.log(fullData);

    let bustaGiorn = await fetch("server/getGiornata.php", {
        method: "POST",
        body: JSON.stringify({date : fullData})
    });
    let eventi = await bustaGiorn.json();
    console.log(eventi);

    let section = document.getElementsByTagName("section")[0];
    eventi.forEach(evento => {
        let div = document.createElement("div");
        div.classList.add(classi[evento["codDesc"]-1]);
        section.append(div);
    });



}


/**
    PER TUTTE LE PAGINE:
    1) Mettere il proprio cognome e nome nel footer FATTO

    PER QUESTA PAGINA:
    6.1) Mostro il giorno di oggi o quello selezionato FATTO
    6.2) Mostro gli eventi del giorno di oggi o quello eventualmente selezionato 
    
    NOTA. E' possibile: 
        1) ritornare gli eventi da database, 
        2) salvare gli eventi nella memoria locale prima del cambio di pagina 
        3) o passare gli eventi come parametro
        
        RICORDO DI NON DIMENTICARE IL GIORNO DEL MESE!
 */