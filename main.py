def hitFood(snake_body_x: List[any], snake_body_y: List[any], food_location: List[any]):
    if snake_body_x[0] == food_location[0] and snake_body_y[0] == food_location[1]:
        return 1
    else:
        return 0
def endScreen():
    global snakeBody_x3, snakeBody_y3, FacingDirection
    while not (input.button_is_pressed(Button.AB)):
        basic.show_icon(IconNames.HEART)
    snakeBody_x3 = [2]
    snakeBody_y3 = [2]
    FacingDirection = [0, -1]

def on_button_pressed_a():
    global FacingDirection
    if FacingDirection[0] == 0 and FacingDirection[1] == -1:
        FacingDirection = [-1, 0]
    elif FacingDirection[0] == -1 and FacingDirection[1] == 0:
        FacingDirection = [0, 1]
    elif FacingDirection[0] == 0 and FacingDirection[1] == 1:
        FacingDirection = [1, 0]
    else:
        FacingDirection = [0, -1]
input.on_button_pressed(Button.A, on_button_pressed_a)

def hitWall(Snake_Body_X: List[number], Snake_Body_Y: List[number]):
    if Snake_Body_X[0] < 0 or Snake_Body_X[0] > 4:
        return 1
    elif Snake_Body_Y[0] < 0 or Snake_Body_Y[0] > 4:
        return 1
    else:
        return 0
def updateLocation(snakeBody_x: List[any], snakeBody_y: List[number], foodLocation: List[number]):
    basic.clear_screen()
    index = 0
    while index < len(snakeBody_x):
        led.plot(snakeBody_x[index], snakeBody_y[index])
        index += 1
    led.plot(foodLocation[0], foodLocation[1])

def on_button_pressed_b():
    global FacingDirection
    if FacingDirection[0] == 0 and FacingDirection[1] == -1:
        FacingDirection = [1, 0]
    elif FacingDirection[0] == 1 and FacingDirection[1] == 0:
        FacingDirection = [0, 1]
    elif FacingDirection[0] == 0 and FacingDirection[1] == 1:
        FacingDirection = [-1, 0]
    else:
        FacingDirection = [0, -1]
input.on_button_pressed(Button.B, on_button_pressed_b)

def snakeMove(snakeBody_x2: List[number], snakeBody_y2: List[number], Facing_Direction: List[number]):
    snakeBody_x2.unshift(snakeBody_x2[0] + Facing_Direction[0])
    snakeBody_y2.unshift(snakeBody_y2[0] + Facing_Direction[1])
    snakeBody_x2.pop()
    snakeBody_y2.pop()
def snakeMove2(snakeBody_x22: List[number], snakeBody_y22: List[number], Facing_Direction2: List[number]):
    snakeBody_x22.unshift(snakeBody_x22[0] + Facing_Direction2[0])
    snakeBody_y22.unshift(snakeBody_y22[0] + Facing_Direction2[1])
def generateFood(snakeBody_X: List[number], snakeBody_Y: List[number]):
    global freeSpace_X, freeSpace_Y, FoodLocation
    freeSpace_X = []
    freeSpace_Y = []
    for positionX in range(5):
        if snakeBody_X.index(positionX) == -1:
            freeSpace_X.append(positionX)
    for positionY in range(5):
        if snakeBody_Y.index(positionY) == -1:
            freeSpace_Y.append(positionY)
    FoodLocation = [freeSpace_X._pick_random(), freeSpace_Y._pick_random()]
freeSpace_Y: List[number] = []
freeSpace_X: List[number] = []
FoodLocation: List[number] = []
FacingDirection: List[number] = []
snakeBody_y3: List[number] = []
snakeBody_x3: List[number] = []
snakeBody_x3 = [2]
snakeBody_y3 = [4]
FacingDirection = [0, -1]
FoodLocation = []
generateFood(snakeBody_x3, snakeBody_y3)

def on_forever():
    updateLocation(snakeBody_x3, snakeBody_y3, FoodLocation)
    if hitFood(snakeBody_x3, snakeBody_y3, FoodLocation) == 1:
        snakeMove2(snakeBody_x3, snakeBody_y3, FacingDirection)
        generateFood(snakeBody_x3, snakeBody_y3)
    else:
        snakeMove(snakeBody_x3, snakeBody_y3, FacingDirection)
    basic.pause(1000)
    if hitWall(snakeBody_x3, snakeBody_y3) == 1:
        endScreen()
basic.forever(on_forever)
