window.onload = function() 
{
    canvas = document.getElementById("page");
    context = canvas.getContext("2d");

    document.addEventListener("keydown", listener);
    setInterval(gameplay, 1000/10);

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

var audio = new Audio('../sounds/food.mp3');

//Coordinates

posX = 5;
posY = 5;

//Direction vectors

dirX = 1;
dirY = 0;

//Screen limit

scrLimit = 15;

//Box/Grid size

bs = 38;
gs = 40;

//Snake

snake = [];
len = 4;

//Food coords

foodX = 9;
foodY = 9;

function gameplay()
{
    posX += dirX;
    posY += dirY;

    //Screen constrains

    if(posX < 0)
    {
        posX = scrLimit - 1;
    }

    else if(posX >= scrLimit)
    {
        posX = 0;
    }

    if(posY < 0)
    {
        posY = scrLimit - 1;
    }

    else if(posY >= scrLimit)
    {
        posY = 0;
    }

    //Refresh screen

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Snake color

    context.fillStyle = "white";

    for(let i = 0; i < snake.length; i++) 
    {
        //Draw snake

        if(i == snake.length-1)
        {
            context.fillStyle = "yellow";
            context.fillRect(snake[i].x * gs, snake[i].y * gs, bs, bs); //(x, y, w, h)
            context.fillStyle = "white";
        }

        else context.fillRect(snake[i].x * gs, snake[i].y * gs, bs, bs); //(x, y, w, h)

        //If you hit the head

        if(snake[i].x == posX && snake[i].y == posY) 
        {
           len = 3; 
           document.getElementById("bs").innerHTML = Number(document.getElementById("s").innerHTML) > Number(document.getElementById("bs").innerHTML) ? document.getElementById("s").innerHTML : document.getElementById("bs").innerHTML; 
           document.getElementById("s").innerHTML = "0";
        }
    }
    
    //Move

    snake.push({x: posX, y: posY});

    //Set the snake length to len

    while(snake.length > len) snake.shift();

    //Create food

    if(foodX == posX && foodY == posY)
    {
        audio.play();
        document.getElementById("s").innerHTML = (Number(document.getElementById("s").innerHTML) + 1).toString();
        
        len++;

        foodX = Math.floor(Math.random() * 11) + 1; 
        foodY = Math.floor(Math.random() * 11) + 1;

        //Food can't spawn on the snake

        while(snake.some(e => e.x == foodX && e.y == foodY))
        {
            foodX = Math.floor(Math.random() * 11) + 1; 
            foodY = Math.floor(Math.random() * 11) + 1;
        }
    }

    //Draw food

    context.fillStyle = "red";
    context.fillRect(foodX * gs, foodY * gs, bs, bs);
}


function listener(event) 
{
    switch(event.keyCode) 
    {
        case 37:
            if(dirX != 1 && dirY != 0)
            {
                dirX = -1;
                dirY = 0;
            }
            break;

        case 38:
            if(dirX != 0 && dirY != 1)
            {
                dirX = 0;
                dirY = -1;
            }
            break;

        case 39:
            if(dirX != -1 && dirY != 0)
            {
                dirX = 1;
                dirY = 0;
            }
            break;

        case 40:
            if(dirX != 0 && dirY != -1)
            {
                dirX = 0;
                dirY = 1;
            }
            break;
    }
}