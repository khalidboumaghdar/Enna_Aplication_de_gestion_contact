let contacts = JSON.parse(localStorage.getItem("contacts"));

function afficherContacts() {
    const contactsTableBody = document.querySelector("#contactsTable tbody");

    contacts.forEach((contact, index) => {
        const row = `
            <tr>
            <td><i class="bi bi-person-circle"></i></td>
                <td>${contact.nom}</td>
                <td>${contact.prenom}</td>
                <td>${contact.email}</td>
                <td>${contact.genre}</td>
                <td>${contact.ville}</td>
                <td>${contact.telephone}</td>
                <td>
                <div class="dropdown">
  <button class="btn btn-secondary " type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
    ...
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <li><button class="dropdown-item"  onclick="navigateToModifier(${index})">Modifier</button>
</li>
    <li>                    <button class="dropdown-item"  onclick="supprimerContact(${index})">Supprimer</button>
</li>
  </ul>
</div>
                </td>
            </tr>
        `;contactsTableBody.innerHTML += row; 
    });
}

  
  
function validateOnBlur() {
    let isValid = true;

    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const email = document.getElementById("email");
    const genre = document.querySelector('input[name="genre"]:checked');
    const ville = document.getElementById("ville");
    const telephone = document.getElementById("telephone");

    const errorElementNom = document.getElementById("nomerorr");
    const errorElementPrenom = document.getElementById("prenomerorr");
    const errorElementEmail = document.getElementById("emailerorr");
    const errorElementGenre = document.getElementById("genreerorr");
    const errorElementVille = document.getElementById("villeerorr");
    const errorElementTelephone = document.getElementById("telephoneerorr");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const phoneRegex = /^\d{10}$/; 

    if (nom.value=== "") {
        isValid = false;
        nom.style.border = "2px solid red";
        errorElementNom.textContent = "Veuillez saisir un nom.";
        errorElementNom.style.color = "red";
    } else {
        nom.style.border = "2px solid green";
        errorElementNom.textContent = "";
    }

    if (prenom.value=== "") {
        isValid = false;
        prenom.style.border = "2px solid red";
        errorElementPrenom.textContent = "Veuillez saisir un prénom.";
        errorElementPrenom.style.color = "red";
    } else {
        prenom.style.border = "2px solid green";
        errorElementPrenom.textContent = "";
    }

    if (email.value=== "") {
        isValid = false;
        email.style.border = "2px solid red";
        errorElementEmail.textContent = "Veuillez saisir un email.";
        errorElementEmail.style.color = "red";
    } else if (!emailRegex.test(email.value)) {
        isValid = false;
        email.style.border = "2px solid red";
        errorElementEmail.textContent = "Veuillez saisir un email valide.";
        errorElementEmail.style.color = "red";
    } else {
        email.style.border = "2px solid green";
        errorElementEmail.textContent = "";
    }

    if (!genre) {
        isValid = false;
        errorElementGenre.textContent = "Veuillez choisir un genre.";
        errorElementGenre.style.color = "red";
    } else {
        errorElementGenre.textContent = "";
    }

    if (ville.value=== "" || ville.value === "Choisissez une ville") {
        isValid = false;
        ville.style.border = "2px solid red";
        errorElementVille.textContent = "Veuillez choisir une ville.";
        errorElementVille.style.color = "red";
    } else {
        ville.style.border = "2px solid green";
        errorElementVille.textContent = "";
    }

    if (telephone.value=== "") {
        isValid = false;
        telephone.style.border = "2px solid red";
        errorElementTelephone.textContent = "Veuillez saisir un numéro de téléphone.";
        errorElementTelephone.style.color = "red";
    } else if (!phoneRegex.test(telephone.value)) {
        isValid = false;
        telephone.style.border = "2px solid red";
        errorElementTelephone.textContent = "Veuillez saisir un numéro de téléphone valide (10 chiffres).";
        errorElementTelephone.style.color = "red";
    } else {
        telephone.style.border = "2px solid green";
        errorElementTelephone.textContent = "";
    }

    return isValid; 
}



function ajouterContact() {
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const genre = document.querySelector('input[name="genre"]:checked').value;
    const ville = document.getElementById("ville").value;
    const telephone = document.getElementById("telephone").value;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const phoneRegex = /^\d{10}$/; 
if(!nom || !prenom || !email || !genre || !ville || !telephone || !emailRegex.test(email) || !phoneRegex.test(telephone) ){
    alert("Veuillez remplir tous les champs.");
    return;
    }else{
        contacts.push({ nom, prenom, email, genre, ville, telephone });
        localStorage.setItem("contacts", JSON.stringify(contacts));
        afficherContacts();
        document.getElementById("dataForm").reset();
    }

       
  
}
function navigateToModifier(index) {
    window.location.href = `modifier.html?id=${index}`;
}
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
        const contacts = JSON.parse(localStorage.getItem('contacts'));
        const contact = contacts[id];

        if (contact) {
            document.getElementById('nom').value = contact.nom;
            document.getElementById('prenom').value = contact.prenom;
            document.getElementById('email').value = contact.email;
            document.querySelector(`input[name="genre"][value="${contact.genre}"]`).checked = true;
            document.getElementById('ville').value = contact.ville;
            document.getElementById('telephone').value = contact.telephone;
        }
    }
});




function enregister(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    const contact = contacts[id];

    contact.nom = document.getElementById('nom').value;
    contact.prenom = document.getElementById('prenom').value;
    contact.email = document.getElementById('email').value;
    contact.genre = document.querySelector('input[name="genre"]:checked').value;
    contact.ville = document.getElementById('ville').value;
    contact.telephone = document.getElementById('telephone').value;

    localStorage.setItem('contacts', JSON.stringify(contacts));

    window.location.href = 'afficher.html';
}




function modifierContact(index) {
    const contact = contacts[index];
    document.getElementById("nom").value = contact.nom;
    document.getElementById("prenom").value = contact.prenom;
    document.getElementById("email").value = contact.email;
    document.querySelector(`input[name="genre"][value="${contact.genre}"]`).checked = true;
    document.getElementById("ville").value = contact.ville;
    document.getElementById("telephone").value = contact.telephone;

    supprimerContact(index); 
}   




function supprimerContact(index) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) {
        contacts.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        window.location.href = 'afficher.html';
    }
}





window.onload = afficherContacts;
