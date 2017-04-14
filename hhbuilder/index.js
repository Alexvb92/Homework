document.querySelector('button[type = "submit"]').onclick = submitter;
document.querySelector('button[class = "add"]').onclick = validationchecker;
document.querySelector('button[class = "add"]').setAttribute("type", "button")


var familyarray = [];
var person;
var table;
var tablediv;
var undo;
var disp;


document.body.onload = addElement;

function addElement () {
    var Undo = document.createElement("button");
    Undo.setAttribute("id", "undo");
    var tablediv = document.createElement("div")
    tablediv.setAttribute("id", "table")
    var currentDiv = document.getElementsByTagName ('PRE')[0];
    document.body.insertBefore(tablediv, currentDiv);
    document.body.insertBefore(Undo, currentDiv);
    document.querySelector('button[id = "undo"]').onclick = undoer;
    Undo.innerHTML = ("Undo")
}

function handlechange(){
    disp = familyarray.toString();
    disp1 = disp.replace(/},{/g, "<br />");
    var thething = document.getElementById('table');
    thething.innerHTML = "<h3>Household members: <br /></h3>" +disp1
}

function undoer(){
    familyarray.pop()
    handlechange()
}


function validationchecker(){
    var agetonumber = (Number(document.querySelector('input[name = "age"]').value))
    switch(agetonumber) {
        case 0:
            alert("Please enter an age above zero.")
            break;
        default:
            break;
    }
    var relationshipval = (document.querySelector('select[name = "rel"]').value)

    switch(relationshipval){
        case "":
            alert("Relationship is required.")
            break;
        default:
            break;
    }
    var smokeornot = (document.querySelector('input[name = "smoker"]').checked)

    householdadder()
    function householdadder() {
        function person(age, relationship, smoker){
            this.age = agetonumber;
            this.relationship = relationshipval;
            this.smoker = smokeornot;
        }
        var newperson = new person(agetonumber,relationshipval,smokeornot)
        var personstring = JSON.stringify(newperson)
        familyarray.push(personstring);
        handlechange()
    }
}


function submitter(e){
    e.preventDefault()
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", disp, true);
    xhttp.send();
}
