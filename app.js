document.addEventListener('DOMContentLoaded', ()=>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0


    //create playing board 
    function createBoard() {
        for (let i = 0; i < width * width; i++){
            const square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
            
        }
        generateNumber()
        generateNumber()
    }  
    createBoard()

    //generate new numbers
    function generateNumber() {
        const random = Math.floor(Math.random() * squares.length)
        
        if (squares[random].innerHTML == 0) {
            squares[random].innerHTML = 2
            checkForLose()
        }else generateNumber()
        
    }


    //moves 
    //eje x
    function moveRight() {
        for (let i= 0; i < 16; i++){
            if (i % 4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)


                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
                
                
            }
        }
    }

    function moveLeft(){
        for (let i= 0; i < 16; i++){
            if (i % 4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
                
                
            }
        }
    }

    //eje y

    function moveUp(){
        for (let i = 0; i < 4; i ++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + width*2].innerHTML
            let totalFour = squares[i + width*3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            

            let filteredcolumn = column.filter(num => num)
            let missing = 4 - filteredcolumn.length
            let zeros = Array(missing).fill(0)
            let newcolumn = filteredcolumn.concat(zeros)

            squares[i].innerHTML = newcolumn[0]
            squares[i + width].innerHTML = newcolumn[1]
            squares[i + width*2].innerHTML = newcolumn[2]
            squares[i + width*3].innerHTML = newcolumn[3]
            
    }}

    function moveDown(){
        for (let i = 0; i < 4; i ++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + width*2].innerHTML
            let totalFour = squares[i + width*3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            

            let filteredcolumn = column.filter(num => num)
            let missing = 4 - filteredcolumn.length
            let zeros = Array(missing).fill(0)
            let newcolumn = zeros.concat(filteredcolumn)

            squares[i].innerHTML = newcolumn[0]
            squares[i + width].innerHTML = newcolumn[1]
            squares[i + width*2].innerHTML = newcolumn[2]
            squares[i + width*3].innerHTML = newcolumn[3]
            
    }}

    //convines
    function conbineRow(){
        for(let i = 0; i < 15; i++){
            if(squares[i].innerHTML == squares[i + 1].innerHTML && squares[i].innerHTML){
                let conbinedTotal = parseInt(squares[i].innerHTML)*2
                squares[i].innerHTML=conbinedTotal
                squares[i+1].innerHTML=0
                score += conbinedTotal
                scoreDisplay.innerHTML = score                
            }
        }
        checkForWin()
    }

    function conbineColumn(){
        for(let i = 0; i < 12; i++){
            if(squares[i].innerHTML == squares[i + width].innerHTML && squares[i].innerHTML){
                let conbinedTotal = parseInt(squares[i].innerHTML)*2
                squares[i].innerHTML=conbinedTotal
                squares[i+width].innerHTML=0
                score += conbinedTotal
                scoreDisplay.innerHTML = score                
            }
        }
        checkForWin()
    }

    //assing funtion to keys 
    function control(e) {
        if(e.key === "ArrowLeft"){
            keyLeft()
        }else if(e.key === "ArrowRight"){
            keyRight()
        }else if(e.key === "ArrowUp"){
            keyUp()
        }else if(e.key === "ArrowDown"){
            keyDown()
        }
    }

    document.addEventListener("keydown", control);
    function keyRight() {
        moveRight()
        conbineRow()
        moveRight()
        generateNumber()
    }

    function keyLeft() {
        moveLeft()
        conbineRow()
        moveLeft()
        generateNumber()
    }
    function keyUp(){
        moveUp()
        conbineColumn()
        moveUp()
        generateNumber()
    }
    function keyDown(){
        moveDown()
        conbineColumn()
        moveDown()
       generateNumber()
    }

    //check for 2048 to win
    function checkForWin(){
        for (let i = 0; i < squares.length; i++) {
            if(squares[i].innerHTML === 2048){
                resultDisplay.innerHTML = "YOU WIN!!!"
                document.removeEventListener("keydown", control);
                setTimeout(clear, 3000)
            }
        }
    }
    //check for 0 to lose
    function checkForLose(){
        zeros=0
        for (let i = 0; i < squares.length; i++) {
            if(squares[i].innerHTML == 0){
                zeros++
            }
        }
        if(zeros === 0){
            resultDisplay.innerHTML = "YOU LOSE!!!"
            document.removeEventListener("keydown", control);
            setTimeout(clear, 3000)
        }

    }

    function clear(){
        clearInterval(myTimer)
    }

    //add colors 
    function addColors(){
        for (let i = 0; i < squares.length; i++) {
            if(squares[i].innerHTML == 0){ squares[i].style.backgroundColor = "#afa192"}
            else if(squares[i].innerHTML == 2){squares[i].style.backgroundColor = "#eee4da"}
            else if(squares[i].innerHTML == 4){squares[i].style.backgroundColor = "#ede0c8"}
            else if(squares[i].innerHTML == 8){squares[i].style.backgroundColor = "#f2b179"}
            else if(squares[i].innerHTML == 16){squares[i].style.backgroundColor = "#ffcea4"}
            else if(squares[i].innerHTML == 32){squares[i].style.backgroundColor = "#e8c064"}
            else if(squares[i].innerHTML == 64){squares[i].style.backgroundColor = "#ffab6e"}
            else if(squares[i].innerHTML == 128){squares[i].style.backgroundColor = "#fd9982"}
            else if(squares[i].innerHTML == 256){squares[i].style.backgroundColor = "#ead79c"}
            else if(squares[i].innerHTML == 512){squares[i].style.backgroundColor = "#76daff"}
            else if(squares[i].innerHTML == 1024){squares[i].style.backgroundColor = "#beeaa5"}
            else if(squares[i].innerHTML == 2048){squares[i].style.backgroundColor="d7d4f0"}
            console.log('runing');
            
        }}
    addColors()
    let myTimer = setInterval(addColors, 50)
            

})