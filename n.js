let div;
let btn;
let number; 
let numberOfPossibleBoards;
let ud,ld,r,s,arr;
let boardsArray=[];
function vis() {
   number = parseInt(document.getElementById("input").value);
   if (number > 0 && number<9) {
   s='.'.repeat(number);
    arr=new Array(number).fill(s);
    ld=new Array(2*number-1).fill(1);
    ud=new Array(2*number-1).fill(1);
    r=new Array(number).fill(1);
       numberOfPossibleBoards= solve(arr,0,number);
       let numHeading=document.getElementById("msg");
       if(numberOfPossibleBoards==0){
        numHeading.innerText="!! No possible Boards Configuration !!";
       }
       else {numHeading.innerText=`!! ${numberOfPossibleBoards} possible Configuration !!`;}
       numHeading.style.display="block";
       disableBtn(true);
       console.log(boardsArray);
       setBoard(number,numberOfPossibleBoards);
    }
    else if(number>9){alert("!!! Try with a smaller value")}
    else(alert("Minuimum number of queen shoudl not be 0!!!"))
}

function disableBtn(bool){

   let input=document.getElementById("input");
        input.disabled=bool;
    let clickBtn=document.getElementById("clickBtn");
        clickBtn.disabled=bool;    
}

function solve(arr, j, n) {
    if (j === n) {
        // Push a deep copy of the board to avoid modifying the original array
        let nB=arr.map((s)=>({...s}));
        boardsArray.push(nB)
        return 1;
    }
    let k = 0;
    for (let it = 0; it < n; it++) {
        if (ld[it + j] && ud[n - 1 + j - it] && r[it]) {
            ld[it + j] = 0;
            ud[n - 1 + j - it] = 0;
            r[it] = 0;

            // Place the queen
            arr[it] = arr[it].substring(0, j) + 'Q' + arr[it].substring(j + 1);

            k += solve(arr, j + 1, n);

            // Remove the queen
            arr[it] = arr[it].substring(0, j) + '.' + arr[it].substring(j + 1);

            ld[it + j] = 1;
            ud[n - 1 + j - it] = 1;
            r[it] = 1;
        }
    }
    return k;
}


function setBoard(n, i) {
    let divMain = document.createElement("div");
    divMain.id = "boardContainer";
    divMain.style.marginTop = "20px";
    divMain.style.display = "grid";
    
    // Adjust columns based on the number of boards
    let columns = Math.ceil(Math.sqrt(i));
    divMain.style.gridTemplateColumns = `repeat(${3}, auto)`;
    divMain.style.gap = "20px";
    
    document.body.appendChild(divMain);

    // Loop through each board
    for (let t = 0; t < boardsArray.length; t++) {
        let divWrapper = document.createElement("div");
        divWrapper.style.display = "flex";
        divWrapper.style.backgroundImage = "url(./golden-matte-iconic-chess-queen-a-stunning-symbol-on-gold-plate-3d-rendered-for-social-media_9839471.jpg!sw800";
        divWrapper.style.color="white";
        divWrapper.style.padding="2px";
        divWrapper.style.border="1px solid";
        divWrapper.style.borderRadius="5px"
        divWrapper.style.flexDirection = "column";
        divWrapper.style.alignItems = "center";  // Center-align the board and its heading

        // Create the heading for the board number
        let divHead = document.createElement("div");
        divHead.innerText = `Board-${t + 1}`;
        divHead.style.textAlign = "center";
        divHead.style.marginBottom = "5px"; // Small space between the heading and the board
        divWrapper.appendChild(divHead);
        
        // Create the board grid
        let board = boardsArray[t];
        let div = document.createElement("div");
        div.className = "board";
        div.style.height = `${50 * n}px`;
        div.style.width = `${50 * n}px`;
        div.style.display = "flex";
        div.style.flexWrap = "wrap";
        div.style.border = "2px solid #333";
        
        divWrapper.appendChild(div);

        // Create cells for each board
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                let cell = document.createElement("div");
                cell.className = "cell";
                cell.style.height = "50px";
                cell.style.width = "50px";
                // Apply background based on queen placement
                if (board[i][j] === 'Q') {
                    cell.style.backgroundImage = "url('./golden-matte-iconic-chess-queen-a-stunning-symbol-on-gold-plate-3d-rendered-for-social-media_9839471.jpg!sw800')";
                    cell.style.backgroundSize = "cover";
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat";
                } else {
                    cell.style.backgroundColor = (i + j) % 2 === 0 ? "white" : "black";
                }
                div.appendChild(cell);
            }
        }

        // Append the board wrapper to the main container
        divMain.appendChild(divWrapper);
    }
}


function resetBoard() {
    disableBtn(false);
    boardsArray = [];
    let msg=document.getElementById("msg");
    msg.style.display="none";
    let input = document.getElementById("input");
    input.value = "";


    let divMain = document.getElementById("boardContainer");
    if (divMain) {
        divMain.remove();
    }
    let divs = document.getElementsByClassName("board");
    while (divs.length > 0) {
        divs[0].remove();
    }

    let numHeading = document.getElementById("msg");
    if (numHeading) {
        numHeading.innerText = "";
    }
}

