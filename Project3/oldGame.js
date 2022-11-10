function setup() {
    frameRate(60)
    createCanvas(600, 600);
    gameState = 0;
    score = 0;
    isPlaying = false
    defaultTimer = 5
    countdownTimer = null
    lastObsSpawn = null
    playerX = null
    playerY = null
    initPlayerX = 60
    initPlayerY = 300
    DEBUG = false
    obSpeed = 0.1;
    isJumping = false
    doubleJumped = false
    maxJumpDistance = 200
    jumpStrength = 15
    gravityStrength = 5
    obstacles = []
    level = 1
    timeUntilSpawn = null
    gravity = -8.9
    playerVelocity = 40
    playerAcceleration = 0
    playerSize = 30
    obstacleSize = 30
    obstacleHeight = 100
    obstacleHeightHalfSize = obstacleHeight / 2
    playerHalfSize = playerSize / 2
    obstacleHalfSize = obstacleSize / 2
    gameStarted = 0
    isDead = false
    highScores = []
  }
  
  function initGame() {
    keyCode = 0
    level = 1
    timeUntilSpawn = int(random(1, 5 - level)) * 1000
    countdownTimer = defaultTimer
    score = 0
    isDead = false
    obstacles = []
    playerX = initPlayerX
    playerY = initPlayerY
    fill(0)
    textSize(36)
    textStyle(BOLDITALIC);
    textAlign(CENTER, CENTER)
    text('THE JUMPING GAME!\nPress Space to Start!', 200, 200)
    if (DEBUG || keyIsDown(32)) {
      gameState++;
    }
  
  }
  
  function drawHUD() {
    if (!isDead) {
      fill(0)
      textSize(26)
      textStyle(BOLD)
      textAlign(LEFT, TOP)
      text('SCORE: ' + score, 0, 0)
  
    }
  
    rectMode(CORNER)
    fill(0)
    rect(0, initPlayerY + 15, width, 100)
  
  }
  
  function countdown() {
    if (DEBUG || countdownTimer === 0) {
      lastObsSpawn = int(millis())
      gameStarted = int(millis())
      isPlaying = true
  
    } else {
      fill(0)
      textSize(64)
      textStyle(BOLDITALIC);
      textAlign(CENTER)
      text(countdownTimer, 200, 200)
      if (frameCount % 60 == 0 && countdownTimer > 0) {
        countdownTimer--
      }
      textSize(18)
      textStyle(ITALIC)
      text("Press SPACE to jump over the obstacles...\nAnd press again for a double jump", 200, 250)
    }
  }
  
  function keyPressed(){
    if (!isDead && gameState === 1 && keyCode === 32) {
      if (isJumping && doubleJumped) {
        playerVelocity = 10;
        doubleJumped = true
      }
      if (!isJumping) {
        playerVelocity = 10
        isJumping = true;
      }
    }
  }
  
  function drawPlayer() {
    rectMode(CENTER)
    strokeWeight(3)
    if (isDead) {
      fill(255, 0, 0)
    } else {
      fill(255)
    }
    dt = deltaTime / 100
    if (isJumping) {
      playerY -= playerVelocity * dt;
      playerVelocity += gravity * dt;
  
      /*
      if(keyIsDown(32) && !doubleJumped){
        playerVelocity += 10
        doubledJumped = true
      }  
  */
      if (playerY >= initPlayerY) {
        playerY = initPlayerY
        // playerVelocity = 0
        isJumping = false
        doubleJumped = false
      }
    }
  
    rect(playerX, playerY, playerSize)
  
    
    // if(keyIsDown(32) && playerY === initPlayerY){
    //   isJumping = true
    //   playerVelocity = 40
    // } 
    
        if(isJumping && playerY >= initPlayerY - maxJumpDistance){
          playerY-= jumpStrength  
        }
        
        if (!keyIsDown(32) || playerY <= initPlayerY-maxJumpDistance){
          isJumping = false
        }
    
        if(playerY <=initPlayerY){
          playerY += gravityStrength
          if(playerY >= initPlayerY) playerY = initPlayerY
      }
      
  }
  
  
  function playGame() {
    if (!isPlaying) {
      countdown()
    }
    else {
  
      if (int(millis()) - gameStarted > 10000) {
        level++
        gameStarted = int(millis())
      }
      drawHUD()
      drawPlayer()
      spawnObstacles()
      drawObstacles()
      if (isDead) {
        fill(255, 0, 0)
        textAlign(CENTER)
        textSize(55)
        textStyle(BOLDITALIC);
        text("DEAD!", 300, 300)
  
        if (keyIsDown(32)) {
          gameState++
        }
  
      }
      if (detectCollision()) {
        isDead = true
      }
    }
  }
  
  function detectCollision() {
    topOfObstacle = 100
    bottomOfObstacle = 0
    topOfPlayer = playerY - playerHalfSize
    // topOfPlayer = playerY - playerHalfSize
    // bottomOfPlayer = playerY + playerHalfSize
    playerRightSide = playerX + playerHalfSize
    playerLeftSide = playerX - playerHalfSize
  
    for (i = 0; i < obstacles.length; i++) {
  
      // if tthe obstacle is at the top
      // if (i % 2 == 0){
  
      //   topOfObstacle = 30 - obstacleHeightHalfSize
      //   bottomOfObstacle = 30 + obstacleHeightHalfSize
      //   topOfPlayer = playerY - playerHalfSize
      //   playerRightSide = playerX + playerHalfSize
      //   playerLeftSide = playerX - playerHalfSize    
  
      // }
  
      // obstacleLeftSide = (obstacles[i].x - 200) + 50
      obstacleLeftSide = obstacles[i].x+200
      obstacleRightSide = (obstacles[i].x + 200) + 50
  
      if (obstacleLeftSide == playerRightSide || obstacleLeftSide == playerLeftSide){// && obstacleRightSide >= playerLeftSide) {
        return true
      //   if (topOfPlayer <= topOfObstacle && topOfPlayer >= bottomOfObstacle){
      //     return true
      //   } else {
      //   return false;
      //   }
      }
      else {
        if (obstacleRightSide < playerLeftSide && obstacles[i].scored == false) {
          score++
          obstacles[i].scored = true
        }
  
  
      //   //print ("No overlap yet")
      //   if (obstacleLeftSide >= playerRightSide)
      //     // this, and all future obstacles in the array are too far away to check
      //     return false
      }
    }
  }
  
  
  function drawObstacles(){
    if (isDead) {
      return
    }
    dt = deltaTime / 100
    // let random = Math.random()
    for (i = 0; i < obstacles.length; i++){
      // obstacles[i] = Pipe(30)
      if (i % 2 == 0)
      {
        rectMode(RADIUS)
        strokeWeight(3)
        fill(255, 0, 0)
        rect(obstacles[i].x, 30, 15, 100)
        obstacles[i].x -= (15 * dt) + obstacles[i].speed   // wants to get faster as the game goes on
      } else {
        rectMode(RADIUS)
        strokeWeight(3)
        fill(255, 0, 0)
        rect(obstacles[i].x, initPlayerY-30, 15, 100)
        obstacles[i].x -= (15 * dt) + obstacles[i].speed   // wants to get faster as the game goes on
      }
    } 
  
    if (obstacles.length && obstacles[0].x < -1000) {
      obstacles.splice(0, 2)
    }
  }
  
  
  function spawnObstacles() {
    if (isDead) {
      return
    }
    if (int(millis() - lastObsSpawn) >= timeUntilSpawn) {
      if (obstacles.length < 8) {
        obstacles.push({ x: 410, scored: false, speed: int(random(max(1, level - 1), min(level * 2, 20))) })
        if (level < 5) {
          timeUntilSpawn = random(1, max(0.1, 2)) * (1000)
        } else if (level < 8) {
          timeUntilSpawn = random(1, max(0.1, 2)) * (800)
        } else if (level < 12) {
          timeUntilSpawn = random(1, max(0.1, 2)) * (720)
        } else {
          timeUntilSpawn = random(1, max(0.1, 2)) * (500 - (level * 2))
        }
        lastObsSpawn = millis()
      }
    }
  }
  
  function gameOver() {
    isPlaying = false
    fill(0)
    textAlign(LEFT, TOP)
    textStyle(BOLD)
    textAlign(CENTER, CENTER)
    textSize(32)
    text("Your Score: " + score, 200, 100)
    textSize(24)
    text("CLICK TO RESTART", 200, 200)
  }
  
  function mouseClicked() {
    if (gameState === 2) {
      gameState = 0
    }
  }
  
  function draw() {
    background(255);
    switch (gameState) {
      case 1: playGame()
  
        break
  
      case 2: gameOver()
        break
      default: initGame()
  
    }
  }