window.onload = function() 
{
    canvas = document.getElementById("page");
    context = canvas.getContext("2d");

    document.addEventListener("keydown", listener);
    setInterval(gameplay, 1000/10);

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

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
len = 2;

//Food coords

foodX = 9;
foodY = 9;

function gameplay()
{
    posX += dirX;
    posY += dirY;

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

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "red";

    for(let i = 0; i < snake.length; i++) 
    {
        context.fillRect(snake[i].x * gs, snake[i].y * gs, bs, bs); //(x, y, w, h)

        if(snake[i].x == posX && snake[i].y == posY) 
        {
           len = 2; //
        }
    }

    snake.push({x: posX, y: posY});

    if(snake.length > len) snake.shift();

    if(foodX == posX && foodY == posY)
    {
        len++;

        foodX = Math.floor(Math.random() * 11) + 1 
        foodY = Math.floor(Math.random() * 11) + 1 
    }

    context.fillStyle="yellow";
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