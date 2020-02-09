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
    else if (startToCheckUp(id)){
        console.log("llego 3")
        convertDown(parseInt(id));
    }
    else if (startToCheckDown(id)){
        console.log("llego 4")
        convertUp(parseInt(id));
    }
    else if (startToCheckUpRight(id)){
        console.log("llego 5")
        convertDownLeft(parseInt(id));
    }
    else if (startToCheckDownRight(id)){
        console.log("llego 6")
        convertUpLeft(parseInt(id));
    }
    else if (startToCheckUpLeft(id)){
        console.log("llego 7")
        convertDownRight(parseInt(id));
    }
    else if (startToCheckDownLeft(id)){
        console.log("llego 8")
        convertUpRight(parseInt(id));
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

const checkUpRight = (id) =>{
    return whoIsThere(id + 7);
}

const checkDownRight = (id) =>{
    return whoIsThere(id + 9);
}

const checkUpLeft = (id) =>{
    return whoIsThere(id-9)
}

const checkDownLeft = (id) =>{
    return whoIsThere(id-7)
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
    if ((parseInt(id) < 8) || isEmpty(parseInt(id)-8) || checkToTheLeft(parseInt(id)) == CURRENT_TURN){
        // console.log(false, "cannot play");
        return false;
    }
    // console.log("Getting more info")
    return deepCheckRight(parseInt(id));
}

const convertToTheLeft = (id) =>{
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
    if ((parseInt(id) > 55) || isEmpty(parseInt(id)+8) || checkToTheRight(parseInt(id)) == CURRENT_TURN){
        console.log(false, "cannot play");
        return false;
    }
    console.log("Getting more info")
    return deepCheckLeft(parseInt(id));
}

const convertToTheRight = (id) =>{
    if (whoIsThere(id+8) != CURRENT_TURN){
        document.getElementById("mainBoard").childNodes[Math.floor((id+8)/8)].childNodes[(id+8)%8].childNodes[0].style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1]
        WHO_IS_THERE[Math.floor((id+8)/8)][(id+8)%8] = CURRENT_TURN;
        convertToTheRight(id+8);
    }
}

const deepCheckUp = (id) =>{
    if (id%8 == 7){
        console.log(false, "se quedó sin espacio");
        return false;
    }
    if (isEmpty(id+1)){
        return false;
    }
    if (checkDown(id) != CURRENT_TURN){
        console.log("We must go deeper, now checking", id);
        return deepCheckUp(parseInt(id) +1 );
    }
    if (checkDown(id) == CURRENT_TURN){
        console.log(true, "CAN PLAY!!!!")
        return true;
    }
}

const startToCheckUp = (id) =>{
    if ((parseInt(id)%8 == 7) || isEmpty(parseInt(id)+1) || checkDown(parseInt(id)) == CURRENT_TURN){
        console.log(false, "cannot play");
        return false;
    }
    console.log("Getting more info")
    return deepCheckUp(parseInt(id));
}

const convertDown = (id) =>{
    //TODO check this
    if (whoIsThere(id+1) != CURRENT_TURN){
        document.getElementById("mainBoard").childNodes[Math.floor(id/8)].childNodes[(id+1)%8].childNodes[0].style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1]
        WHO_IS_THERE[Math.floor((id+1)/8)][(id+1)%8] = CURRENT_TURN;2
        convertDown(id+1);
    }
}

const deepCheckDown = (id) =>{
    if (id%8 == 0){
        console.log(false, "se quedó sin espacio");
        return false;
    }
    if (isEmpty(id-1)){
        return false;
    }
    if (checkUp(id) != CURRENT_TURN){
        console.log("We must go deeper, now checking", id);
        return deepCheckDown(parseInt(id) - 1 );
    }
    if (checkUp(id) == CURRENT_TURN){
        console.log(true, "CAN PLAY!!!!")
        return true;
    }
}

const startToCheckDown = (id) =>{
    if ((parseInt(id)%8 == 0) || isEmpty(parseInt(id)-1) || checkUp(parseInt(id)) == CURRENT_TURN){
        console.log(false, "cannot play");
        return false;
    }
    console.log("Getting more info")
    return deepCheckDown(parseInt(id));
}

const convertUp = (id) =>{
    if (whoIsThere(id-1) != CURRENT_TURN){
        document.getElementById("mainBoard").childNodes[Math.floor(id/8)].childNodes[(id-1)%8].childNodes[0].style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1]
        WHO_IS_THERE[Math.floor((id-1)/8)][(id-1)%8] = CURRENT_TURN;2
        convertUp(id-1);
    }
}

const deepCheckUpRight = (id) =>{
    if (id%8 == 0 || id > 55){
        if (id != 56){
            console.log(false, "se quedó sin espacio");
            return false;
        }
    }
    if (isEmpty(id-7)){
        return false;
    }
    if (checkDownLeft(id) != CURRENT_TURN){
        console.log("We must go deeper, now checking", id-7);
        return deepCheckDown(parseInt(id) - 7 );
    }
    if (checkDownLeft(id) == CURRENT_TURN){
        console.log(true, "CAN PLAY!!!!")
        return true;
    }
}

const startToCheckUpRight = (id) =>{
    if ((parseInt(id)%8 == 7) || parseInt(id) < 8 || isEmpty(parseInt(id)-7) || checkDownLeft(parseInt(id)) == CURRENT_TURN){
        console.log(false, "cannot play");
        return false;
    }
    console.log("Getting more info")
    return deepCheckUpRight(parseInt(id)-7);
}

const convertDownLeft = (id) =>{
    if (whoIsThere(id-7) != CURRENT_TURN){
        document.getElementById("mainBoard").childNodes[Math.floor(id/8)-1].childNodes[id%8+1].childNodes[0].style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1]
        WHO_IS_THERE[Math.floor(id/8)-1][id%8+1] = CURRENT_TURN;
        convertDownLeft(id-7);
    }
}

const deepCheckDownRight = (id) =>{
    if (id%8 == 7 || id > 55){
        if (id != 63){
            console.log(false, "se quedó sin espacio");
            return false;
        }
    }
    if (isEmpty(id-9)){
        return false;
    }
    if (checkUpLeft(id) != CURRENT_TURN){
        console.log("We must go deeper, now checking", id) -9;
        return deepChekDownRight(parseInt(id) - 9 );
    }
    if (checkUpLeft(id) == CURRENT_TURN){
        console.log(true, "CAN PLAY!!!!")
        return true;
    }
}

const startToCheckDownRight = (id) =>{
    console.log(id, "currently checking");
    console.log(parseInt(id) - 9, "check if empty");
    console.log(isEmpty(id), "is empty");
    console.log(whoIsThere(id), "who is there");
    console.log(CURRENT_TURN, "played");
    if ((parseInt(id)%8 == 0) || parseInt(id) > 55 || isEmpty(parseInt(id)-9) || checkDownLeft(parseInt(id)) == CURRENT_TURN){
        console.log(false, "cannot play");
        return false;
    }
    console.log("Getting more info")
    return deepCheckDownRight(parseInt(id)-9);
}

const convertUpLeft = (id) =>{
    console.log(id)
    if (whoIsThere(id-9) != CURRENT_TURN){
        document.getElementById("mainBoard").childNodes[Math.floor(id/8)-1].childNodes[id%8-1].childNodes[0].style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1]
        WHO_IS_THERE[Math.floor(id/8)-1][id%8-1] = CURRENT_TURN;
        convertUpLeft(id-9);
    }
}

const deepCheckUpLeft = (id) =>{
    if (id%8 == 0 || id < 8){
        if (id != 0){
            console.log(false, "se quedó sin espacio");
            return false;
        }
    }
    if (isEmpty(id+9)){
        return false;
    }
    if (checkDownRight(id) != CURRENT_TURN){
        console.log("We must go deeper, now checking", id) +9;
        return deepCheckUpLeft(parseInt(id) + 9 );
    }
    if (checkDownRight(id) == CURRENT_TURN){
        console.log(true, "CAN PLAY!!!!")
        return true;
    }
}

const startToCheckUpLeft = (id) =>{
    console.log(id, "currently checking");
    console.log(parseInt(id) + 9, "check if empty");
    console.log(isEmpty(id), "is empty");
    console.log(whoIsThere(id), "who is there");
    console.log(CURRENT_TURN, "played");
    if ((parseInt(id)%8 == 0) || parseInt(id) <8 || isEmpty(parseInt(id)+9) || checkDownRight(parseInt(id)) == CURRENT_TURN){
        console.log(false, "cannot play");
        return false;
    }
    console.log("Getting more info")
    return deepCheckUpLeft(parseInt(id)+9);
}

const convertDownRight = (id) =>{
    console.log(id)
    if (whoIsThere(id+9) != CURRENT_TURN){
        document.getElementById("mainBoard").childNodes[Math.floor(id/8)+1].childNodes[id%8+1].childNodes[0].style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1]
        WHO_IS_THERE[Math.floor(id/8)+1][id%8+1] = CURRENT_TURN;
        convertDownRight(id+9);
    }
}

const deepCheckDownLeft = (id) =>{
    if (id%8 == 7 || id < 8){
        if (id != 7){
            console.log(false, "se quedó sin espacio");
            return false;
        }
    }
    if (isEmpty(id+7)){
        return false;
    }
    if (checkUpRight(id) != CURRENT_TURN){
        console.log("We must go deeper, now checking", id) +7;
        return deepCheckDownLeft(parseInt(id) + 7 );
    }
    if (checkUpRight(id) == CURRENT_TURN){
        console.log(true, "CAN PLAY!!!!")
        return true;
    }
}

const startToCheckDownLeft = (id) =>{
    console.log(id, "currently checking");
    console.log(parseInt(id) + 7, "check if empty");
    console.log(isEmpty(id), "is empty");
    console.log(whoIsThere(id), "who is there");
    console.log(CURRENT_TURN, "played");
    if ((parseInt(id)%8 == 7) || parseInt(id) <8 || isEmpty(parseInt(id)+7) || checkUpRight(parseInt(id)) == CURRENT_TURN){
        console.log(false, "cannot play");
        return false;
    }
    console.log("Getting more info")
    return deepCheckDownLeft(parseInt(id)+7);
}

const convertUpRight = (id) =>{
    console.log(id)
    if (whoIsThere(id+7) != CURRENT_TURN){
        document.getElementById("mainBoard").childNodes[Math.floor(id/8)+1].childNodes[id%8-1].childNodes[0].style.backgroundColor = CURRENT_TURN ? playingColors[0]: playingColors[1]
        WHO_IS_THERE[Math.floor(id/8)+1][id%8-1] = CURRENT_TURN;
        convertUpRight(id+7);
    }
}

const isValid = (id) => {
    return isEmpty(id) && (startToCheckRight(id) || startToCheckLeft(id) || startToCheckUp(id) || startToCheckDown(id) || startToCheckUpRight(id) || startToCheckDownRight(id) || startToCheckUpLeft(id) ||startToCheckDownLeft(id));
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

const playingColors = ["DeepPink", "RebeccaPurple"];

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
