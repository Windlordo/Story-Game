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
    text: "As you pickup the pipe, a mechanism opens up from the wall with space indicating something must be left there...",
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
  },
  {
    id: 4,
    text: "All of a sudden another mechanism from the floor rises containing...a zombie!!",
    options: [
      {
        text: "Smack the zombie on the head with your pipe",
        requiredState: (currentState) => currentState.pipe,
        nextText: 6
      },
      {
        text: "Run away!!!",
        nextText: 7
      },
      {
        text: "Punch the zombie",
        nextText: 8
      }
    ]
  },
  {
    id: 5,
    text: "The next moment you are blinded by a white light and...where am i again?",
    options: [
      {
        text: "Restart?",
        nextText: -4
      }
    ]
  },
  {
    id: 6,
    text: "The zombie goes down and seems to be dead (again). A doorway manifests with a scenary of a city in the distance. You have escaped?",
    options: [
      {
        text: "Go again?",
        nextText: -5
      }
    ]
  },
  {
    id: 7,
    text: "Alas there is no where to run and the zombie eventually catches you as you tire out and eats you.",
    options: [
      {
        text: "Restart",
        nextText: -6
      }
    ]
  },
  {
    id: 8,
    text: "You punch the zombie, unfortunatly it just seems to make it angrier. You are overpowered and eaten.",
    options: [
      {
        text: "Restart",
        nextText: -7
      }
    ]
  }
    
]

startGame()
