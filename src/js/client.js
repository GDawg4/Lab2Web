//Rodrigo Garoz 18102

const renderSquare = (color, id, size = 100, isOld = false) => {
    const luz = document.createElement("div");
    luz.id = CURRENT_ID;
    CURRENT_ID++;
    luz.style.width = `${size}px`;
    luz.style.height = `${size}px`;
    luz.style.backgroundColor = (color % 2 == 0) ? "black": "white";

    /*luz.onmouseover = () => {
        if (isValid(luz.id)){
            luz.appendChild(showChip(CURRENT_TURN));
        }
    }
    luz.onmouseout = () => {
        if (isValid(luz.id)){
            luz.removeChild(luz.firstChild);
        }
    }*/
    luz.onclick = () => {
        if (isValid(luz.id)){
            //luz.removeChild(luz.firstChild);
            convert(parseInt(luz.id));
            ARE_OCCUPIED[Math.floor(luz.id/8)][luz.id%8] = true;
            WHO_IS_THERE[Math.floor(luz.id/8)][luz.id%8] = CURRENT_TURN;
            luz.appendChild(renderChip(CURRENT_TURN))
            console.log(WHO_IS_THERE)
            console.log(CURRENT_TURN)
        };
    };
    return luz;
}

const convert = (id) =>{
    console.log("llego 1")
    if (startToCheckRight(parseInt(id))){
        console.log("llego 2")
        convertToTheLeft(id);
    } else if (startToCheckLeft(id)){
        console.log("llego 3")
        convertToTheRight(parseInt(id));
    }
}

const renderColumn = (columnIndex) => {
    const base = [0,1,2,3,4,5,6,7];
    const three = 3;
    const column = document.createElement("div");
    const offsetBase = base.map((offsetValue) => offsetValue + columnIndex);
    column.id = `column${columnIndex}`
    offsetBase.map(
        (color) => renderSquare(color)).forEach(
            newSquare => column.appendChild(newSquare));
    return column;
}

const renderChip = () => {
    const chip = document.createElement("div");
    chip.style.width = "100px";
    chip.style.height = "100px";
    chip.style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1];
    chip.style.borderRadius = "50px";
    CURRENT_TURN = !CURRENT_TURN;
    return chip;
}

const showChip = (player1) => {
    const chip = document.createElement("div");
    chip.style.width = "100px";
    chip.style.height = "100px";
    chip.style.opacity = 0.5;
    chip.style.backgroundColor = player1 ? playingColors[0]: playingColors[1];
    chip.style.borderRadius = "50px";
    return chip;
}

const checkToTheLeft = (id) => {
    return whoIsThere(id-8);
}

const checkToTheRight = (id) => {
    return whoIsThere(id + 8);
}

const checkDown = (id) => {
    return whoIsThere(id + 1);
}

const checkUp = (id) => {
    return whoIsThere(id - 1);
}

const deepCheckRight = (id) =>{
    if (id < 8){
        // console.log(false, "se quedó sin espacio");
        return false;
    }
    if (isEmpty(id-8)){
        return false;
    }
    if (checkToTheLeft(id) != CURRENT_TURN){
        // console.log("We must go deeper, now checking", id);
        return deepCheckRight(id - 8);
    }
    if (checkToTheLeft(id) == CURRENT_TURN){
        // console.log(true, "CAN PLAY!!!!")
        return true;
    }
}

const startToCheckRight = (id) =>{
    /*console.log(id, "currently checking");
    console.log(isEmpty(id), "is empty");
    console.log(whoIsThere(id), "who is there");
    console.log(CURRENT_TURN, "played");*/
    if ((parseInt(id) < 8) || isEmpty(parseInt(id)-8) || checkToTheLeft(parseInt(id)) == CURRENT_TURN){
        // console.log(false, "cannot play");
        return false;
    }
    // console.log("Getting more info")
    return deepCheckRight(parseInt(id));
}

const convertToTheLeft = (id) =>{
    /*if ((CURRENT_TURN && document.getElementById("mainBoard").childNodes[Math.floor((id-8)/8)].childNodes[(id-8)%8].childNodes[0].style.backgroundColor == playingColors[1])
    ||(!CURRENT_TURN && document.getElementById("mainBoard").childNodes[Math.floor((id-8)/8)].childNodes[(id-8)%8].childNodes[0].style.backgroundColor == playingColors[0])){
        document.getElementById("mainBoard").childNodes[Math.floor((id-8)/8)].childNodes[(id-8)%8].childNodes[0].style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1]
        WHO_IS_THERE[Math.floor(id/8)][id%8] = CURRENT_TURN;
        convertToTheLeft(id-8);
    }*/
    if (whoIsThere(id-8) != CURRENT_TURN){
        console.log(id-8)
        document.getElementById("mainBoard").childNodes[Math.floor((id-8)/8)].childNodes[(id-8)%8].childNodes[0].style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1]
        WHO_IS_THERE[Math.floor((id-8)/8)][(id-8)%8] = CURRENT_TURN;
        convertToTheLeft(id-8);
    }
}

const deepCheckLeft = (id) =>{
    if (id > 55){
        console.log(false, "se quedó sin espacio");
        return false;
    }
    if (isEmpty(id+8)){
        return false;
    }
    if (checkToTheRight(id) != CURRENT_TURN){
        console.log("We must go deeper, now checking", id);
        return deepCheckLeft(parseInt(id) + 8);
    }
    if (checkToTheRight(id) == CURRENT_TURN){
        console.log(true, "CAN PLAY!!!!")
        return true;
    }
}

const startToCheckLeft = (id) =>{
    console.log(id, "currently checking");
    console.log(parseInt(id) + 8, "check if empty");
    console.log(isEmpty(id), "is empty");
    console.log(whoIsThere(id), "who is there");
    console.log(CURRENT_TURN, "played");
    if ((parseInt(id) > 55) || isEmpty(parseInt(id)+8) || checkToTheRight(parseInt(id)) == CURRENT_TURN){
        console.log(false, "cannot play");
        return false;
    }
    console.log("Getting more info")
    return deepCheckLeft(parseInt(id));
}

const convertToTheRight = (id) =>{
    /*if ((CURRENT_TURN && document.getElementById("mainBoard").childNodes[Math.floor((id-8)/8)].childNodes[(id-8)%8].childNodes[0].style.backgroundColor == playingColors[1])
    ||(!CURRENT_TURN && document.getElementById("mainBoard").childNodes[Math.floor((id-8)/8)].childNodes[(id-8)%8].childNodes[0].style.backgroundColor == playingColors[0])){
        document.getElementById("mainBoard").childNodes[Math.floor((id-8)/8)].childNodes[(id-8)%8].childNodes[0].style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1]
        WHO_IS_THERE[Math.floor(id/8)][id%8] = CURRENT_TURN;
        convertToTheLeft(id-8);
    }*/
    if (whoIsThere(id+8) != CURRENT_TURN){
        document.getElementById("mainBoard").childNodes[Math.floor((id+8)/8)].childNodes[(id+8)%8].childNodes[0].style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1]
        WHO_IS_THERE[Math.floor((id+8)/8)][(id+8)%8] = CURRENT_TURN;
        convertToTheRight(id+8);
    }
}

const isValid = (id) => {
    return isEmpty(id) && (startToCheckRight(id) || startToCheckLeft(id));
}

const isEmpty = (id) => {
    return !ARE_OCCUPIED[Math.floor(id/8)][id%8];
}

const whoIsThere = (id) => {
    return WHO_IS_THERE[Math.floor(id/8)][id%8];
}

const render = (mount, state) => {

    const {turnedOnIndex} = state;
    const board = document.createElement("div");
    board.id = "mainBoard"
    board.style.backgroundColor = "papayawhip";
    board.style.width = "800px";
    board.style.padding = "25px";
    board.style.display = "flex";
    board.style.flexDirection = "row";

    [0, 1, 2, 3, 4, 5, 6, 7].map(
        (columnIndex) => renderColumn(columnIndex)).forEach(
        newColumn => board.appendChild(newColumn));

    board.childNodes[3].childNodes[3].appendChild(renderChip());
    board.childNodes[4].childNodes[3].appendChild(renderChip());
    board.childNodes[4].childNodes[4].appendChild(renderChip());
    board.childNodes[3].childNodes[4].appendChild(renderChip());

    mount.appendChild(board);
};

const APP_STATE = {
    turnedOnIndex: 1,

};

const playingColors = ["teal", "maroon"];

const currentState = {};

let CURRENT_TURN = true;

let CURRENT_ID = 0;

const root = document.getElementById("root");

let WHO_IS_THERE =
    [[false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, true, false, false, false, false],
    [false, false, false, false, true, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]]

let ARE_OCCUPIED =
    [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, true, true, false, false, false],
    [false, false, false, true, true, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
    ];

render(root, APP_STATE);
