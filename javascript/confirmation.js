let merci = document.getElementById("remerciement");
let button = document.getElementById("Acceuil");

let contact = localStorage.key(0);
let total = localStorage.key(1);
let orderId = localStorage.key(2);

//console.log(orderId);
//console.log(contact);
//console.log(total);

let nomPrenom = JSON.parse(localStorage.getItem(contact));
let prix = JSON.parse(localStorage.getItem(total));
let id = localStorage.getItem(orderId);

//console.log(nomPrenom);
//console.log(id);
//console.log(prix);

let html = "<p>Orinoco vous remercie <span>" + nomPrenom.lastName + " " + nomPrenom.firstName + "</span> de votre achat sur leur site </p>";
    html += "<p>Votre commande <span>n° \"" + id + "\"</span> d'un montant totale de <span>" + prix + " €</span> à bien été pris en compte </p>";
    html += "<h5>Nous espérons vous revoir bientôt!</h5>";

merci.innerHTML = html;

localStorage.clear();

