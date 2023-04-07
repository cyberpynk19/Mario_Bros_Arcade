const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.height = innerHeight 
canvas.width = innerWidth

const gravidade = 0.5


const chaves = {
    direita: {
        pressionado: false
    },
    esquerda: {
        pressionado: false
    }
}

console.log(chaves.direita.pressionado)

const marioParado_direita = new Image();
marioParado_direita.src = '/mario/img/mario-fica.png';

const mario_andando = new Image();
mario_andando.src = '/mario/img/mario-direita.png'

const marioAndandoEsquerda = new Image()
marioAndandoEsquerda.src = '/mario/img/mario-esquerda.png'

const marioParadoEsquerda = new Image()
marioParadoEsquerda.src = '/mario/img/mario-parado-esquerda.png'

let marioWidth = 16
let marioHeight = 32
let marioY = 50


class Jogador {
    constructor() {
        this.parametros = {
            x:100,
            y:100
        }
        
        this.velocidade = {
            x:0,
            y:0
        }

        this.height = 90
        this.width = 50
        this.noChao = false // adicionando a variável noChao

        this.sprites = {
            fica: {
                direita: marioParado_direita,
                primeiroFrame:0 ,
                primeiroY:0,
                larguraCorte: 20,
                segundoY:34
            },

            ficaEsq: {
                esquerda: marioParadoEsquerda,
                primeiroFrame: 0,
                primeiroY: 0,
                larguraCorte: 70,
                segundoY: 100
            },

            anda: {
                direita: mario_andando,
                primeiroFrame:25,
                primeiroY:50,
                larguraCorte:16,
                segundoY:32,
            },

            andaEsq: {
                esquerda: marioAndandoEsquerda,
                primeiroFrame:80,
                primeiroY:0,
                larguraCorte:80,
                segundoY:110,
            }
        }

        this.frame = 0
        this.spriteAtual = this.sprites.fica.direita
        this.primeiroFrame = this.sprites.fica.primeiroFrame
        this.primeiroY = this.sprites.fica.primeiroY
        this.larguraCorte = this.sprites.fica.larguraCorte
        this.segundoY = this.sprites.fica.segundoY

    }

    draw() {
        //c.fillStyle = 'red'
        //c.fillRect(this.parametros.x, this.parametros.y, this.width, this.height)
        c.drawImage(
            this.spriteAtual,
            this.primeiroFrame*this.frame,
            this.primeiroY,
            this.larguraCorte,
            this.segundoY,
            this.parametros.x, 
            this.parametros.y, 
            this.width, 
            this.height
            )
        }       

        atualizaFrame() {
            this.contador = 25
            setInterval(() => {
                this.contador++
                if(this.contador > 3000) this.contador = 0
            }, 500);
        }

    atualiza() {
        //botão direito
        if (this.contador % 5 == 0 && chaves.direita.pressionado) {
            if (this.frame < 1) {
                this.frame++            
            } else { this.frame = this.frame + 1.2         
            };

            if(this.frame > 3) this.frame = 0
        }
        //botão esquerdo
        if (this.contador % 5 == 0 && chaves.esquerda.pressionado) {
            if (this.frame < 1) {
                this.frame++            
            } else { this.frame = this.frame + 1.2         
            };
            
            if(this.frame > 3) this.frame = 0
        }

        this.draw()

        console.log('this.frame'+this.frame)

        this.parametros.y += this.velocidade.y


        // atualizando a variável noChao
        if (this.parametros.y + this.height  >= canvas.height) {
            this.noChao = true
            this.velocidade.y = 0
        } else {
            this.noChao = false
            this.velocidade.y += gravidade
        }

    }

}

class Plataforma {
    constructor({x,y}) {
        this.parametros = {
            x,
            y
        }

        this.height = 20
        this.width = 200
    }

    draw() {
        c.fillStyle = 'Blue'
        c.fillRect(this.parametros.x, this.parametros.y, this.width, this.height)
    }
    
}

const jogador = new Jogador()
const plataforma = [new Plataforma({x:200, y:200}), new Plataforma({x:500,y:250})]

function animacao() {
    requestAnimationFrame(animacao)
    c.clearRect(0, 0, canvas.width, canvas.height)
    jogador.atualiza()
    jogador.atualizaFrame()



    plataforma.forEach((plataforma) => {
        plataforma.draw()
    })
   

    if(chaves.direita.pressionado && jogador.parametros.x < 400) {
        jogador.velocidade.x = 15

    } else if (chaves.esquerda.pressionado && jogador.parametros.x > 10) {
        jogador.velocidade.x = -15

    } else {
        jogador.velocidade.x = 0

    if(chaves.direita.pressionado) {
      plataforma.forEach((plataforma) => {
          plataforma.parametros.x -=5
          console.log(plataforma.parametros.x)
      })

    } else if (chaves.esquerda.pressionado) {
      plataforma.forEach((plataforma) => {
          plataforma.parametros.x+=5
          console.log(plataforma.parametros.x)
      })
          
      }        
    }
    

    plataforma.forEach((plataforma) => {    
        if (jogador.parametros.y + jogador.height <= plataforma.parametros.y && 
            jogador.parametros.y + jogador.height + jogador.velocidade.y >= plataforma.parametros.y &&
            jogador.parametros.x + jogador.width >= plataforma.parametros.x && 
            jogador.parametros.x + jogador.width <= plataforma.parametros.x + plataforma.width) {
    
            jogador.velocidade.y = 0
            jogador.noChao = true
        }
    })
} 
    
animacao()


addEventListener('keydown' ,({keyCode}) => {
    console.log(keyCode)
    switch (keyCode) {
        case 87:
        case 38:    
            console.log('Cima')
            console.log("tamanho do canvas é: "+ canvas.height)
            console.log(jogador.parametros.y)
            if (jogador.noChao) { // adicionando a condição para pular somente quando estiver no chão
                jogador.velocidade.y -= 22
                jogador.noChao = false
            }

            break;   

        case 68:
        case 39:
            console.log('Direita')
            jogador.parametros.x += jogador.velocidade.x
            chaves.direita.pressionado = true
            jogador.spriteAtual = jogador.sprites.anda.direita
            jogador.primeiroFrame = jogador.sprites.anda.primeiroFrame
            jogador.primeiroY = jogador.sprites.fica.primeiroY
            jogador.larguraCorte = jogador.sprites.fica.larguraCorte
            jogador.segundoY = jogador.sprites.fica.segundoY
            
            //spriteY = 0* spriteHeight
            break; 
            
        case 65:
        case 37:     
            console.log('Esquerda')
            jogador.parametros.x += jogador.velocidade.x
            chaves.esquerda.pressionado = true
            console.log(jogador.parametros.x)

            if(jogador.frame < 1) {
                jogador.spriteAtual = jogador.sprites.ficaEsq.esquerda
                jogador.primeiroFrame = jogador.sprites.ficaEsq.primeiroFrame
                jogador.primeiroY = jogador.sprites.ficaEsq.primeiroY
                jogador.larguraCorte = jogador.sprites.ficaEsq.larguraCorte
                jogador.segundoY = jogador.sprites.ficaEsq.segundoY
            } else {
                jogador.spriteAtual = jogador.sprites.andaEsq.esquerda
                jogador.primeiroFrame = jogador.sprites.andaEsq.primeiroFrame
                jogador.primeiroY = jogador.sprites.andaEsq.primeiroY
                jogador.larguraCorte = jogador.sprites.andaEsq.larguraCorte
                jogador.segundoY = jogador.sprites.andaEsq.segundoY
            }

            //spriteY = 1* spriteHeight
            break;               
    }
}
)

addEventListener('keyup' ,({keyCode}) => {
    console.log(keyCode)
    switch (keyCode) {
        case 87:
        case 38:    
            console.log('Cima')
            console.log("tamanho do canvas é: "+ canvas.height)
            console.log(jogador.parametros.y)
            if (jogador.noChao) { // adicionando a condição para pular somente quando estiver no chão
                jogador.velocidade.y -= 22
                jogador.noChao = false
            }

            break;   

        case 68:
        case 39:
            console.log('Direita')
            jogador.parametros.x += jogador.velocidade.x
            chaves.direita.pressionado = false
            jogador.spriteAtual = jogador.sprites.fica.direita
            jogador.primeiroFrame = jogador.sprites.fica.primeiroFrame
            jogador.frame = 0
            //spriteY = 0* spriteHeight
            break; 
            
        case 65:
        case 37:     
            console.log('Esquerda')
            jogador.parametros.x += jogador.velocidade.x
            chaves.esquerda.pressionado = false
            console.log(jogador.parametros.x)
            //spriteY = 1* spriteHeight
            break;               
    }
}
)