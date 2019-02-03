function main() {
    renderNavbar();
    renderTable();
    get('/api/allusers',{}).then(users => {
        usersArray = []
        for(let user of users) {
            usersArray.push(user.name);
        }
        startNewUserButton(usersArray);
    })
    startTooltips();
    
}

const dataArray = ['catches', 'drops', 'clinkerSnag','clinkerDrop','knickerSnag','knickerDrop','missComms','FIFA','tosses','shotsOnGoal','points','scratches','misses','highs','lows','fouls','clinkers','clinkerScores','knickers','knickerScores','sinkers'];

function renderTable() {
    let userTableBody = document.getElementById('user-table-body');
    userTableBody.innerHTML="";
    
    get('/api/allusers',{}).then(users => {
        for(let i = 0; i < users.length; i++) {
            let userTr = document.createElement('tr');
            let userTh = document.createElement('th');
            userTh.setAttribute('scope','row');
            userTh.innerText=(i+1);
            userTr.appendChild(userTh);

            let usernameTd = document.createElement('td');
            usernameTd.innerText = users[i].name;
            userTr.appendChild(usernameTd);

            for(let j = 0; j < dataArray.length; j++) {
                let td = document.createElement('td');
                td.innerText = users[i].stats[dataArray[j]];
                userTr.appendChild(td);
            }
            userTableBody.appendChild(userTr);
        }
    });
    

}

function startNewUserButton(players) {
    let newUserButton = document.getElementById('new-user-btn');
    newUserButton.addEventListener('click',() => {
        get('/api/WyNMMO6aZN',{}).then(res => {
            let e0ogyg6TFS = prompt("")
            if(e0ogyg6TFS===res.WyNMMO6aZN) {
                let newUserInput = document.getElementById('new-user-input');
                if(!players.includes(newUserInput.value)) {
                    post('/api/newuser',{'name':newUserInput.value}).then(res => {
                        renderTable();
                        newUserInput.value="";
                    });
                } 
            }
        });

    });
}

function startTooltips() {
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();   
    });
}




main();