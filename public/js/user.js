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
    addSorters();
    
}

const dataArray = ['gamesPlayed','catches', 'drops', 'clinkerSnag','clinkerDrop','knickerSnag','knickerDrop','missComms','FIFA','tosses','shotsOnGoal','points','scratches','misses','highs','lows','fouls','clinkers','clinkerScores','knickers','knickerScores','sinkers'];

function renderTable() {
    get('/api/allusers',{}).then(users => {
        let userTableBody = document.getElementById('user-table-body');
        userTableBody.innerHTML="";
        for(let i = 0; i < users.length; i++) {
            let userTr = document.createElement('tr');
            // let userTh = document.createElement('th');
            // userTh.setAttribute('scope','row');
            // userTh.innerText=(i+1);
            // userTr.appendChild(userTh);
    
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
        let analyticsTableBody = document.getElementById('analytics-table-body');
        analyticsTableBody.innerHTML="";
        for(let i = 0; i < users.length; i++) {
            let userTr = document.createElement('tr');
            // let userTh = document.createElement('th');
            // userTh.setAttribute('scope','row');
            // userTh.innerText=(i+1);
            // userTr.appendChild(userTh);
    
            let usernameTd = document.createElement('td');
            usernameTd.innerText = users[i].name;
            userTr.appendChild(usernameTd);

            let gpTd = document.createElement('td');
            gpTd.innerText = users[i].stats.gamesPlayed;
            userTr.appendChild(gpTd);

            let winsTd = document.createElement('td');
            winsTd.innerText = users[i].stats.wins;
            userTr.appendChild(winsTd);

            let lossesTd = document.createElement('td');
            lossesTd.innerText = users[i].stats.losses;
            userTr.appendChild(lossesTd);

            let winningPer = document.createElement('td');
            if(users[i].stats.losses===0 && users[i].stats.wins===0) {
                winningPer.innerText=0;
            } else if(users[i].stats.losses===0) {
                winningPer.innerText=1;
            } else {
                winningPer.innerText=Math.round(users[i].stats.wins/(users[i].stats.gamesPlayed)*1000)/1000;
            }
            userTr.appendChild(winningPer);

            let PPDtd = document.createElement('td');
            if(users[i].stats.drops===0) {
                PPDtd.innerText=users[i].stats.points;
            } else {
                PPDtd.innerText=Math.round(users[i].stats.points/users[i].stats.drops*100)/100;
            }
            userTr.appendChild(PPDtd);

            let CPDtd = document.createElement('td');
            if(users[i].stats.drops===0) {
                CPDtd.innerText=users[i].stats.catches;
            } else {
                CPDtd.innerText=Math.round(users[i].stats.catches/users[i].stats.drops*100)/100;
            }
            userTr.appendChild(CPDtd);

            let TPStd = document.createElement('td');
            if(users[i].stats.points===0) {
                TPStd.innerText=users[i].stats.tosses;
            } else {
                TPStd.innerText=Math.round(users[i].stats.tosses/users[i].stats.points*100)/100;
            }
            userTr.appendChild(TPStd);

            let SOGPFtd = document.createElement('td');
            if(users[i].stats.fouls===0) {
                SOGPFtd.innerText=users[i].stats.shotsOnGoal;
            } else {
                SOGPFtd.innerText=Math.round(users[i].stats.shotsOnGoal/users[i].stats.fouls*100)/100;
            }
            userTr.appendChild(SOGPFtd);

            let SOGPPtd = document.createElement('td');
            if(users[i].stats.points===0) {
                SOGPPtd.innerText=users[i].stats.shotsOnGoal;
            } else {
                SOGPPtd.innerText=Math.round(users[i].stats.shotsOnGoal/users[i].stats.points*100)/100;
            }
            userTr.appendChild(SOGPPtd);

            let TPGtd = document.createElement('td');
            if(users[i].stats.gamesPlayed===0) {
                TPGtd.innerText=(users[i].stats.catches+users[i].stats.drops);
            } else {
                TPGtd.innerText=Math.round((users[i].stats.catches+users[i].stats.drops)/users[i].stats.gamesPlayed*100)/100;
            }
            userTr.appendChild(TPGtd);

            let CPGtd = document.createElement('td');
            if(users[i].stats.gamesPlayed===0) {
                CPGtd.innerText=users[i].stats.catches;
            } else {
                CPGtd.innerText=Math.round(users[i].stats.catches/users[i].stats.gamesPlayed*100)/100;
            }
            userTr.appendChild(CPGtd);

            let TPGPtd = document.createElement('td');
            if(users[i].stats.gamesPlayed===0) {
                TPGPtd.innerText=users[i].stats.tosses;
            } else {
                TPGPtd.innerText=Math.round(users[i].stats.tosses/users[i].stats.gamesPlayed*100)/100;
            }
            userTr.appendChild(TPGPtd);

            let PPGtd = document.createElement('td');
            if(users[i].stats.gamesPlayed===0) {
                PPGtd.innerText=users[i].stats.points;
            } else {
                PPGtd.innerText=Math.round(users[i].stats.points/users[i].stats.gamesPlayed*100)/100;
            }
            userTr.appendChild(PPGtd);

            let SOGPer = document.createElement('td');
            if(users[i].stats.tosses===0) {
                SOGPer.innerText=0;
            } else {
                SOGPer.innerText=Math.round(users[i].stats.shotsOnGoal/users[i].stats.tosses*1000)/10;
            }
            userTr.appendChild(SOGPer);

            let FPertd = document.createElement('td');
            if(users[i].stats.tosses===0) {
                FPertd.innerText=0;
            } else {
                FPertd.innerText=Math.round(users[i].stats.fouls/users[i].stats.tosses*1000)/10;
            }
            userTr.appendChild(FPertd);
            
            let SCRPertd = document.createElement('td');
            if(users[i].stats.tosses===0) {
                SCRPertd.innerText=0;
            } else {
                SCRPertd.innerText=Math.round(users[i].stats.scratches/users[i].stats.tosses*1000)/10;
            }
            userTr.appendChild(SCRPertd);

            let SPertd = document.createElement('td');
            if(users[i].stats.tosses===0) {
                SPertd.innerText=0;
            } else {
                SPertd.innerText=Math.round(users[i].stats.points/users[i].stats.tosses*1000)/10;
            }
            userTr.appendChild(SPertd);

            let CPertd = document.createElement('td');
            if((users[i].stats.catches+users[i].stats.drops)===0) {
                CPertd.innerText=0;
            } else {
                CPertd.innerText=Math.round(users[i].stats.catches/(users[i].stats.catches+users[i].stats.drops)*1000)/10;
            }
            userTr.appendChild(CPertd);

            let effTd = document.createElement('td');
            let pointsPerToss;
            let dropsPerTarget;
            if(users[i].stats.tosses===0) {
                pointsPerToss=0;
            } else {
                pointsPerToss=users[i].stats.points/users[i].stats.tosses*100;
            }
            if((users[i].stats.catches+users[i].stats.drops)===0) {
                dropsPerTarget=0
            } else {
                dropsPerTarget=users[i].stats.drops/(users[i].stats.catches+users[i].stats.drops);
            }
            if(dropsPerTarget===0) {
                effTd.innerText=0;
            } else {
                effTd.innerText = Math.round(pointsPerToss/dropsPerTarget/10*100)/100;
            }
            userTr.appendChild(effTd);

            analyticsTableBody.appendChild(userTr);

            
        }
        
    });
    

}

// Efficiency	Points/Drop	Catch/Drop	Toss/Score	SOG/Foul	SOG/Point	Targets/Game	
// Catches/Game	Tosses/Game	PPG		SOG %	Foul %	Scratch %	Scoring %	Catch %

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

function sortTable(number) {
    number=parseInt(this.id.substring(3));
    var table, rows, switching, i, x, y, shouldSwitch;
    if(this.id.substring(0,1)==='a') {
        table = document.getElementById("analytics-stats");
    } else {
        table = document.getElementById("raw-stats");
    }
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[number];
        y = rows[i + 1].getElementsByTagName("TD")[number];
        console.log(x.innerHTML);
        //check if the two rows should switch place:
        if(number===0) {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
        } else {
            if (parseFloat(x.innerText) < parseFloat(y.innerText)) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

function addSorters() {
    for(let i = 0; i<23;i++) {
        let currentTH = document.getElementById('no-'+i);
        currentTH.addEventListener('click',sortTable);
    }
    for(let i=0;i<20;i++) {
        let currentTH = document.getElementById('ao-'+i);
        currentTH.addEventListener('click',sortTable);
    }
}


main();