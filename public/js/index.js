function main() {
    renderNavbar();
    renderDropdowns();
    startSaveButton();
}

let currentPlayersIDs = []
let currentPlayers = []
const possiblePlays = ['Catches','Drops','Clinker Snags','Clinker Drops','Knicker Snags','Knicker Drops','Miss Comms','FIFA','Tosses','SOG','Points','Scratches','Misses','Highs','Lows','Fouls','Clinkers','Clinker Scores','Knickers','Knicker Scores','Sinkers'];
const possiblePlaysAbbr = ['Cs','Drops','CKS','CKD','KKS','KKD','MCs','FIFA','Ts','SOG','Pts','SCRs','Xs','H','L','F','CK','CKPts','KK','KKPts','SK']
let moveHistory = []

function renderDropdowns() {
    let homeRightContainer = document.getElementById('homeR');
    let homeLeftContainer = document.getElementById('homeL');
    let awayRightContainer = document.getElementById('awayR');
    let awayLeftContainer = document.getElementById('awayL');

    get('/api/allusers', {}).then(users => {
        let containerArray = [homeLeftContainer,homeRightContainer,awayLeftContainer,awayRightContainer];
        for(let i = 0; i < 4; i++) {
            let dropdownDiv = document.createElement('div');
            dropdownDiv.setAttribute('class','input-group');
    
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
    if(userID !== '0' && !currentPlayersIDs.includes(userID)) {
        get('/api/user', {'_id':userID}).then(user => {
            renderUserContainer(user,divID);
        });
    }
    
}

function renderUserContainer(user, divID) {
    currentPlayersIDs.push(user._id);
    currentPlayers.push(user.name);

    let div = document.getElementById(divID);
    div.innerHTML = "";
    
    let nameContainer = document.createElement('div');
    nameContainer.setAttribute('class','h1')
    nameContainer.innerText = user.name;
    div.appendChild(nameContainer);
    
    let containerDiv = document.createElement('div');
    containerDiv.setAttribute('class','container');
    

    for(let i = 0; i < possiblePlays.length; i++) {
        let rowDiv = document.createElement('div');
        rowDiv.setAttribute('class','row');
        
        let phraseCol = document.createElement('div');
        phraseCol.setAttribute('class','col font-weight-bold');
        phraseCol.innerText = possiblePlaysAbbr[i];
        rowDiv.appendChild(phraseCol);
        
        let numCol = document.createElement('div');
        numCol.setAttribute('class','col');
       
        let inputDiv = document.createElement('div');
        inputDiv.setAttribute('class','input-group mb-3');
        
        let minusInput = document.createElement('div');
        minusInput.setAttribute('class','input-group-prepend');
        
        let minusButton = document.createElement('button');
        minusButton.setAttribute('class','btn btn-danger');
        minusButton.setAttribute('type','button');
        minusButton.setAttribute('id',user._id + '-' +possiblePlaysAbbr[i] + '+minus~'+user.name);
        minusButton.innerText = '-';
        minusButton.addEventListener('click',subtractOne);
        minusInput.appendChild(minusButton);

        let numberDiv = document.createElement('div');
        numberDiv.setAttribute('class','number text-light bg-dark');
        numberDiv.setAttribute('id',user._id + '-' + possiblePlaysAbbr[i]+'~'+user.name);
        numberDiv.innerText='0';

        let plusInput = document.createElement('div');
        plusInput.setAttribute('class','input-group-prepend');

        let plusButton = document.createElement('button');
        plusButton.setAttribute('class','btn btn-success');
        plusButton.setAttribute('type','button');
        plusButton.setAttribute('id',user._id+'-'+possiblePlaysAbbr[i]+'+plus~'+user.name);
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
    let tildeLoc = divID.indexOf('~');
    let el = document.getElementById(divID.substring(0,plusLoc)+divID.substring(tildeLoc));
    let score = parseInt(el.innerText);
    el.innerText = score+1;
    if(divID.substring(minusLoc+1,plusLoc)=="Pts") {
        let team = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.substring(0,4);
        let teamDiv = document.getElementById(team+'-score');
        teamDiv.innerText = parseInt(teamDiv.innerText)+1;
    } else if(divID.substring(minusLoc+1,plusLoc)=="FIFA") {
        let team = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.substring(0,4);
        if(team==="home"){
            let teamDiv = document.getElementById('away-score');
            teamDiv.innerText = parseInt(teamDiv.innerText)-1;
        } else {
            let teamDiv = document.getElementById('home-score');
            teamDiv.innerText = parseInt(teamDiv.innerText)-1;
        }
    }
    moveHistory.push(divID.substring(tildeLoc+1) + ":" + divID.substring(minusLoc+1,plusLoc));
}

function subtractOne() {
    let divID = this.id;
    let minusLoc = divID.indexOf('-');
    let plusLoc = divID.indexOf('+');
    let tildeLoc = divID.indexOf('~');
    let el = document.getElementById(divID.substring(0,plusLoc)+divID.substring(tildeLoc));
    let score = parseInt(el.innerText);
    el.innerText = score-1;
    if(divID.substring(minusLoc+1,plusLoc)=="Pts") {
        let team = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.substring(0,4);
        let teamDiv = document.getElementById(team+'-score');
        teamDiv.innerText = parseInt(teamDiv.innerText)-1;
    } else if(divID.substring(minusLoc+1,plusLoc)=="FIFA") {
        let team = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.substring(0,4);
        if(team==="home"){
            let teamDiv = document.getElementById('away-score');
            teamDiv.innerText = parseInt(teamDiv.innerText)+1;
        } else {
            let teamDiv = document.getElementById('home-score');
            teamDiv.innerText = parseInt(teamDiv.innerText)+1;
        }
    }
    moveHistory.push(divID.substring(tildeLoc+1) + ":" + divID.substring(minusLoc+1,plusLoc)+"(rm)");
}

function startSaveButton() {
    let saveButton = document.getElementById('save-game-btn');
    saveButton.addEventListener('click',collectAndSubmit);
}

function collectAndSubmit() {
    get('/api/WyNMMO6aZN',{}).then(res => {
        let e0ogyg6TFS = prompt("")
        if(e0ogyg6TFS===res.WyNMMO6aZN) {
            const time = new Date().toLocaleString();
            const scoreHome = parseInt(document.getElementById('home-score').innerText);
            const scoreAway = parseInt(document.getElementById('away-score').innerText);
            let playerLocs = [{},{},{},{}];
            for(let i = 0; i < currentPlayers.length; i++) {
                let currentPlayer = currentPlayers[i];
                let currentPlayerID = currentPlayersIDs[i];
                let currentPlayerObj = {
                    'name':currentPlayer,
                    'stats': {
                        'catches':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[0]+"~"+currentPlayer).innerText),
                        'drops': parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[1]+"~"+currentPlayer).innerText),
                        'clinkerSnag':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[2]+"~"+currentPlayer).innerText),
                        'clinkerDrop':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[3]+"~"+currentPlayer).innerText),
                        'knickerSnag':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[4]+"~"+currentPlayer).innerText),
                        'knickerDrop':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[5]+"~"+currentPlayer).innerText),
                        'missComms':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[6]+"~"+currentPlayer).innerText),
                        'FIFA':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[7]+"~"+currentPlayer).innerText),
                        'tosses':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[8]+"~"+currentPlayer).innerText),
                        'shotsOnGoal':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[9]+"~"+currentPlayer).innerText),
                        'points':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[10]+"~"+currentPlayer).innerText),
                        'scratches':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[11]+"~"+currentPlayer).innerText),
                        'misses':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[12]+"~"+currentPlayer).innerText),
                        'highs':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[13]+"~"+currentPlayer).innerText),
                        'lows':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[14]+"~"+currentPlayer).innerText),
                        'fouls':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[15]+"~"+currentPlayer).innerText),
                        'clinkers':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[16]+"~"+currentPlayer).innerText),
                        'clinkerScores':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[17]+"~"+currentPlayer).innerText),
                        'knickers':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[18]+"~"+currentPlayer).innerText),
                        'knickerScores':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[19]+"~"+currentPlayer).innerText),
                        'sinkers':parseInt(document.getElementById(currentPlayerID+'-'+possiblePlaysAbbr[20]+"~"+currentPlayer).innerText),
                    }
                }
                if(document.getElementById('homeL').childNodes[0].innerText === currentPlayer) {
                    playerLocs[0] = currentPlayerObj;
                } else if(document.getElementById('homeR').childNodes[0].innerText === currentPlayer) {
                    playerLocs[1] = currentPlayerObj;
                } else if(document.getElementById('awayL').childNodes[0].innerText === currentPlayer) {
                    playerLocs[2] = currentPlayerObj;
                } else if(document.getElementById('awayR').childNodes[0].innerText === currentPlayer) {
                    playerLocs[3] = currentPlayerObj;
                }
            }

            post('/api/newgame',{
                'time':time,
                'playersIDs':currentPlayersIDs,
                'players':currentPlayers,
                'scoreHome':scoreHome,
                'scoreAway':scoreAway,
                'homeTeamLeft':playerLocs[0],
                'homeTeamRight':playerLocs[1],
                'awayTeamLeft':playerLocs[2],
                'awayTeamRight':playerLocs[3],
                'PBP':moveHistory
            });
        }
    });

}

main();