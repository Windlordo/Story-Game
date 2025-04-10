const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "You open your eyes and notice you're in a empty white room with a pipe and button lying on the floor.",
    options: [
      {
        text: "Pick up the pipe",
        setState: { pipe: true },
        nextText: 3
      },
      {
        text: "Push the button.",
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "You hear a loud noise followed by everything going dark. You are dead.",
    options: [
      {
        text: "Restart",
        nextText:-1
      }
    ]
  },
  {
    id: 3,
    text: "As you pickup the pipe a mechanism opens up from the wall with space indicating somethine must be left there...",
    options: [
      {
        text: "Put the pipe within the space",
          setState: { pipe: false },
          nextText: 4
      },
      {
        text: "Smash the button from before with the pipe",
        nextText: 5
      },
      {
        text: "Wait for awhile...",
        nextText: 4
      }
    ]
  }
        
]

startGame()
