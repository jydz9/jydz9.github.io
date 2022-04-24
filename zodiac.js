
let getYear = 0;
let getRelationYear = 0;
var id = 0;
let testRelation = "";
let getComp = "";
let getNotComp = "";

document.addEventListener('keydown', event => {
    var getInput = document.querySelector("input");
    if(event.code == 'Enter'){
        getYear = getInput.value;
        if(getYear != "" && getYear > 1900){
            id = ((getYear - 4) % 12);
            displayInformation(id);
        }
    }
});


function find(){
    console.log('sdf');
    let getRelationshipYear = document.querySelector("#relation").value;
    if(getRelationshipYear > 1900){
        id = ((getRelationshipYear - 4) % 12);
        console.log(id);
        testRelationship(id);
    }
    else{
        testRelationship(getRelationshipYear);
    }
}


function displayInformation(id){
    document.querySelector("#fullContent").style.display = "block";
    document.querySelector("#relationInfo").style.display = "none";
    let animal = document.querySelector("#getAnimal");
    let personality = document.querySelector("#getPersonality");
    let description = document.querySelector("#getDescription");
    let comp = document.querySelector("#compatibleInfo");
    let notComp = document.querySelector("#notCompatibleInfo");

    // fetch("./zodiac.json")
    fetch("https://jydz9.github.io/zodiac.json")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // console.log(data);
        data.forEach(element =>{
            if(element.id == id){
                animal.innerHTML = element.animal;
                personality.innerHTML = element.personality;
                description.innerHTML = element.description;
                comp.innerHTML = element.mostCompatible;
                notComp.innerHTML = element.leastCompatible;
                getComp = element.mostCompatible;
                getNotComp = element.leastCompatible;
            }
        });
        document.querySelector("input").value = "";
    });
}

function testRelationship(id){
    let comp = document.querySelector("#compatibleInfo");
    let notComp = document.querySelector("#notCompatibleInfo");
    let partnerId = ((getYear - 4) % 12);
    let partnerZodiac = "";
    let showResult = document.querySelector("#displayResult");

    fetch("./zodiac.json")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        data.forEach(element =>{
            if(element.id == id){
                partnerZodiac = element.animal;
                console.log(partnerZodiac);
            }
        });
        document.querySelector("input").value = "";
        document.querySelector("#relationInfo").style.display = "block";
        let result = (getComp.includes(partnerZodiac));
        let nonComp = (getNotComp.includes(partnerZodiac));

        if(id == ''){
            showResult.innerHTML = "Your list of compatibility";
        }
        else{
            if(result == true){
                showResult.innerHTML = "You have found your soulmate";
            }else if(nonComp == true){
                showResult.innerHTML = "You have meet your natural enemy";
            }else{
                showResult.innerHTML = "They neither match your best or least compatible zodiacs";
            }
        }
    });
    
}
