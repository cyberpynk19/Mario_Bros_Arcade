const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.height = 110
canvas.width = 70

//canvas.height = innerHeight 
//canvas.width = innerWidth

let mario = new Image()
mario.src = '/mario/img/sprite_mario_only.png'

let marioFrames = [90, 60, 30] // valores de marioSX para cada quadro
let currentFrame = 120 // índice do quadro atual

let marioWidth = 16
let marioHeight = 34
let marioX = 5
let marioY = 0
let marioScale = 3 // fator de escala para aumentar o tamanho do sprite

mario.addEventListener('load', ()=> {
		c.clearRect(0, 0, canvas.width, canvas.height) // limpa a tela
		c.drawImage(mario, 
			currentFrame, // usa o valor de marioSX correspondente ao quadro atual
			50, 
			marioWidth, 
			marioHeight, 
			marioX, 
			marioY, 
			marioWidth * marioScale, // multiplica a largura e altura pela escala para aumentar o tamanho
			marioHeight * marioScale)
		currentFrame = (currentFrame + 1) % marioFrames.length // incrementa o índice do quadro atual
	} // a cada 100ms
)









