function hitFood (snake_body_x: any[], snake_body_y: any[], food_location: any[]) {
    if (snake_body_x[0] == food_location[0] && snake_body_y[0] == food_location[1]) {
        return 1
    } else {
        return 0
    }
}
function endScreen () {
    while (!(input.buttonIsPressed(Button.AB))) {
        basic.showIcon(IconNames.Sad)
    }
    snakeBody_x3 = [2]
    snakeBody_y3 = [4]
    FacingDirection = [0, -1]
}
input.onButtonPressed(Button.A, function () {
    if (FacingDirection[0] == 0 && FacingDirection[1] == -1) {
        FacingDirection = [-1, 0]
    } else if (FacingDirection[0] == -1 && FacingDirection[1] == 0) {
        FacingDirection = [0, 1]
    } else if (FacingDirection[0] == 0 && FacingDirection[1] == 1) {
        FacingDirection = [1, 0]
    } else {
        FacingDirection = [0, -1]
    }
})
function hitWall (Snake_Body_X: number[], Snake_Body_Y: number[]) {
    if (Snake_Body_X[0] < 0 || Snake_Body_X[0] > 4) {
        return 1
    } else if (Snake_Body_Y[0] < 0 || Snake_Body_Y[0] > 4) {
        return 1
    } else {
        return 0
    }
}
function updateLocation (snakeBody_x: number[], snakeBody_y: number[], foodLocation: number[]) {
    basic.clearScreen()
    for (let index = 0; index <= snakeBody_x.length - 1; index++) {
        led.plot(snakeBody_x[index], snakeBody_y[index])
    }
    led.plot(foodLocation[0], foodLocation[1])
}
input.onButtonPressed(Button.B, function () {
    if (FacingDirection[0] == 0 && FacingDirection[1] == -1) {
        FacingDirection = [1, 0]
    } else if (FacingDirection[0] == 1 && FacingDirection[1] == 0) {
        FacingDirection = [0, 1]
    } else if (FacingDirection[0] == 0 && FacingDirection[1] == 1) {
        FacingDirection = [-1, 0]
    } else {
        FacingDirection = [0, -1]
    }
})
function snakeMove (snakeBody_x2: number[], snakeBody_y2: number[], Facing_Direction: number[]) {
    snakeBody_x2.unshift(snakeBody_x2[0] + Facing_Direction[0])
    snakeBody_y2.unshift(snakeBody_y2[0] + Facing_Direction[1])
    snakeBody_x2.pop()
    snakeBody_y2.pop()
}
function snakeMove2 (snakeBody_x2: number[], snakeBody_y2: number[], Facing_Direction: number[]) {
    snakeBody_x2.unshift(snakeBody_x2[0] + Facing_Direction[0])
    snakeBody_y2.unshift(snakeBody_y2[0] + Facing_Direction[1])
}
function generateFood2 (snakeBody_X: number[], snakeBody_Y: number[]) {
    if (snakeBody_X.length < 25) {
        freeSpace_X = []
        freeSpace_Y = []
        for (let positionX = 0; positionX <= 4; positionX++) {
            if (snakeBody_X.indexOf(positionX) == -1) {
                freeSpace_X.push(positionX)
            }
        }
        for (let positionY = 0; positionY <= 4; positionY++) {
            if (snakeBody_Y.indexOf(positionY) == -1) {
                freeSpace_Y.push(positionY)
            }
        }
        FoodLocation = [freeSpace_X._pickRandom(), freeSpace_Y._pickRandom()]
        return 1
    } else {
        return 0
    }
}
function winScreen () {
    while (!(input.buttonIsPressed(Button.AB))) {
        basic.showIcon(IconNames.Heart)
        basic.pause(500)
        basic.showIcon(IconNames.SmallHeart)
        basic.pause(500)
    }
    snakeBody_x3 = [2]
    snakeBody_y3 = [4]
    FacingDirection = [0, -1]
}
function generateFood (snakeBody_X: number[], snakeBody_Y: number[]) {
    freeSpace_X = []
    freeSpace_Y = []
    for (let positionX = 0; positionX <= 4; positionX++) {
        if (snakeBody_X.indexOf(positionX) == -1) {
            freeSpace_X.push(positionX)
        }
    }
    for (let positionY = 0; positionY <= 4; positionY++) {
        if (snakeBody_Y.indexOf(positionY) == -1) {
            freeSpace_Y.push(positionY)
        }
    }
    FoodLocation = [freeSpace_X._pickRandom(), freeSpace_Y._pickRandom()]
}
let freeSpace_Y: number[] = []
let freeSpace_X: number[] = []
let FoodLocation: number[] = []
let FacingDirection: number[] = []
let snakeBody_y3: number[] = []
let snakeBody_x3: number[] = []
snakeBody_x3 = [2]
snakeBody_y3 = [4]
FacingDirection = [0, -1]
FoodLocation = []
generateFood(snakeBody_x3, snakeBody_y3)
basic.forever(function () {
    updateLocation(snakeBody_x3, snakeBody_y3, FoodLocation)
    if (hitFood(snakeBody_x3, snakeBody_y3, FoodLocation) == 1) {
        snakeMove2(snakeBody_x3, snakeBody_y3, FacingDirection)
        if (snakeBody_x3.length < 25) {
            generateFood(snakeBody_x3, snakeBody_y3)
        } else {
            winScreen()
        }
    } else {
        snakeMove(snakeBody_x3, snakeBody_y3, FacingDirection)
    }
    basic.pause(1000)
    if (hitWall(snakeBody_x3, snakeBody_y3) == 1) {
        endScreen()
    }
})
