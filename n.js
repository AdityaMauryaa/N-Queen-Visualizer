let div;
let btn;
let number; 
let numberOfPossibleBoards;
let ud,ld,r,s,arr;
function vis() {
   number = parseInt(document.getElementById("input").value);
   if (number > 0 && number<9) {
   s='.'.repeat(number);
    arr=new Array(number).fill(s);
    ld=new Array(2*number-1).fill(1);
    ud=new Array(2*number-1).fill(1);
    r=new Array(number).fill(1);
       numberOfPossibleBoards= solve(arr,0,number);
       let numHeading=document.createElement("div");
       numHeading.innerText=numberOfPossibleBoards;
       numHeading.style.color="black";
       document.body.append(numHeading);
       setBoard(number,numberOfPossibleBoards)
    }
    if(number>9){alert("!!! Try with a smaller value")}
    else(alert("Minuimum number of queen shoudl not be 0!!!"))
}

function solve(arr,j,n){
    if(j==n)return 1;
    let k=0;
    for(let it=0;it<n;it++){
        if(ld[it+j] && ud[n-1+j-it] && r[it]){
            ld[it+j]=0, ud[n-1+j-it]=0, r[it]=0;
            k+=solve(arr,j+1,n);
            ld[it+j]=1, ud[n-1+j-it]=1, r[it]=1;
            
        }
    }
    return k;
}

    function setBoard(n,i) {
        let divMain = document.createElement("div");  
        divMain.style.display="flex";
        divMain.style.flexWrap="wrap";

        document.body.appendChild(divMain);  
        let sq=Math.ceil(Math.sqrt(i));
        let h=50*n*sq;        
        let w=50*n*sq;
        divMain.style.height=h+"px";
        divMain.style.width=w+"px";
        divMain.style.gap = "10px";
        for(let t=0;t<i;t++){
        div = document.createElement("div");  
        div.style.marginBottom="10px"
        divMain.appendChild(div);  
        let height=50*n;   
        let width=50*n;   
        div.style.height=height+"px";
        div.style.width=width+"px";
        div.style.display="flex";
        div.style.flexWrap="wrap";
        let k = false; 
        div.id=`div-${t+1}`;
        div.style.border="solid";
        div.style.borderColor="red";
        div.style.borderRadius="7px";
        for (let i = 0; i < n*n; i++) {
            btn = document.createElement("div");  
            btn.id=`btn-${i+1}`;
            if (k) {
                btn.style.backgroundColor = "black";
            } else {
                btn.style.backgroundColor = "white";
            }

            btn.style.height = "50px";  
            btn.style.width = "50px"; 
            
            div.appendChild(btn);  

            if((i+1)%n || n%2==1){k = !k; }
        }

        }

}
