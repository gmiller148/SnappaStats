function main() {
    renderNavbar();
    renderTable();
}

const dataArray = ['catches', 'drops', 'clinkerSnag','clinkerDrop','knickerSnag','knickerDrop','missComms','FIFA','tosses','shotsOnGoal','points','scratches','misses','highs','lows','fouls','clinkers','clinkerScores','knickers','knickerScores','sinkers'];

function renderTable() {
    let userTableBody = document.getElementById('user-table-body');
    
    get('/api/allusers',{}).then(users => {
        for(let i = 0; i< users.length; i++) {
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


main();