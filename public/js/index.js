function main() {
    renderNavbar();
    renderDropdowns();
}

let currentPlayers = []
const possiblePlays = ['Catches','Drops','Clinker Snags','Clinker Drops','Knicker Snags','Knicker Drops','Miss Comms','FIFA','Tosses','SOG','Points','Scratches','Misses','Highs','Lows','Fouls','Clinkers','Clinker Scores','Knickers','Knicker Scores','Sinkers'];
const possiblePlaysAbbr = ['Catches','Drops','CKS','CKD','KKS','KKD','MCs','FIFA','Tosses','SOG','Pts','SCRs','Xs','H','L','F','CK','CKPts','KK','KKPts','SK']

function renderDropdowns() {
    let homeRightContainer = document.getElementById('homeR');
    let homeLeftContainer = document.getElementById('homeL');
    let awayRightContainer = document.getElementById('awayR');
    let awayLeftContainer = document.getElementById('awayL');

    get('/api/allusers', {}).then(users => {
        let containerArray = [homeLeftContainer,homeRightContainer,awayLeftContainer,awayRightContainer];
        for(let i = 0; i < 4; i++) {
            let dropdownDiv = document.createElement('div');
            dropdownDiv.setAttribute('class','input-group mb');
    
            let inputGroup = document.createElement('div');
            inputGroup.setAttribute('class','input-group-prepend');
    
            let updateButton = document.createElement('button');
            updateButton.setAttribute('class','btn btn-primary');
            updateButton.setAttribute('type','button');
            updateButton.setAttribute('id',containerArray[i].id+'-button');
            updateButton.innerText="Update";
            updateButton.addEventListener('click',updateForm);
            inputGroup.appendChild(updateButton);
    
            dropdownDiv.appendChild(inputGroup);
    
            let select = document.createElement('select');
            select.setAttribute('id',containerArray[i].id+'-select')
            select.setAttribute('class','custom-select');
    
            let optionSelected = document.createElement('option');
            optionSelected.setAttribute('value',"0");
            optionSelected.innerText = "Choose a player";
            select.appendChild(optionSelected);
    
            for(let user of users) {
                let option = document.createElement('option');
                option.setAttribute('value',user._id);
                option.innerText = user.name;
                select.appendChild(option);
            }
    
            dropdownDiv.appendChild(select);
    
            containerArray[i].appendChild(dropdownDiv);
        }
    });
    
}

function updateForm() {
    let divID = this.id.substring(0,5);
    let userID = document.getElementById(divID+'-select').value;
    if(userID !== '0') {
        get('/api/user', {'_id':userID}).then(user => {
            renderUserContainer(user,divID);
        });
    }
    
}

function renderUserContainer(user, divID) {
    currentPlayers.push(user._id);
    
    let div = document.getElementById(divID);
    div.innerHTML = "";
    
    let nameContainer = document.createElement('div');
    nameContainer.innerText = user.name;
    div.appendChild(nameContainer);
    
    let containerDiv = document.createElement('div');
    containerDiv.setAttribute('class','container');
    

    for(let i = 0; i < possiblePlays.length; i++) {
        let rowDiv = document.createElement('div');
        rowDiv.setAttribute('class','row');
        
        let phraseCol = document.createElement('div');
        phraseCol.setAttribute('class','col');
        phraseCol.innerText = possiblePlays[i];
        rowDiv.appendChild(phraseCol);
        
        let numCol = document.createElement('div');
        numCol.setAttribute('class','col');
       
        let inputDiv = document.createElement('div');
        inputDiv.setAttribute('class','input-group mb-3');
        
        let minusInput = document.createElement('div');
        minusInput.setAttribute('class','input-group-prepend');
        
        let minusButton = document.createElement('button');
        minusButton.setAttribute('class','btn btn-secondary');
        minusButton.setAttribute('type','button');
        minusButton.setAttribute('id',user._id + '-' +possiblePlaysAbbr[i] + '+minus');
        minusButton.innerText = '-';
        minusButton.addEventListener('click',subtractOne);
        minusInput.appendChild(minusButton);

        let numberDiv = document.createElement('div');
        numberDiv.setAttribute('class','number');
        numberDiv.setAttribute('id',user._id + '-' + possiblePlaysAbbr[i]);
        numberDiv.innerText='0';

        let plusInput = document.createElement('div');
        plusInput.setAttribute('class','input-group-prepend');

        let plusButton = document.createElement('button');
        plusButton.setAttribute('class','btn btn-secondary');
        plusButton.setAttribute('type','button');
        plusButton.setAttribute('id',user._id+'-'+possiblePlaysAbbr[i]+'+plus');
        plusButton.innerText = '+';
        plusButton.addEventListener('click',addOne);
        plusInput.appendChild(plusButton);

        inputDiv.appendChild(minusInput);
        inputDiv.appendChild(numberDiv);
        inputDiv.appendChild(plusInput);

        numCol.appendChild(inputDiv);
        rowDiv.appendChild(numCol);

        containerDiv.appendChild(rowDiv);
    }


    div.appendChild(containerDiv);
}


function addOne() {
    let divID = this.id;
    let minusLoc = divID.indexOf('-');
    let plusLoc = divID.indexOf('+');
    let el = document.getElementById(divID.substring(0,plusLoc));
    let score = parseInt(el.innerText);
    el.innerText = score+1;
    if(divID.substring(minusLoc+1,plusLoc)=="Pts") {
        let team = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.substring(0,4);
        let teamDiv = document.getElementById(team+'-score');
        teamDiv.innerText = parseInt(teamDiv.innerText)+1;
    }
}

function subtractOne() {
    let divID = this.id;
    let minusLoc = divID.indexOf('-');
    let plusLoc = divID.indexOf('+');
    let el = document.getElementById(divID.substring(0,plusLoc));
    let score = parseInt(el.innerText);
    el.innerText = score-1;
    if(divID.substring(minusLoc+1,plusLoc)=="Pts") {
        let team = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.substring(0,4);
        let teamDiv = document.getElementById(team+'-score');
        teamDiv.innerText = parseInt(teamDiv.innerText)-1;
    }
}


main();