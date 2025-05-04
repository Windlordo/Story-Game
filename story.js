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

const story1 = [
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
        text: "Next Chapter",
        nextText: story1b,
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
const story1b = [
  {
    id: 1,
    text: "As you work through the doorway you are greeted with a dense jungle and dirt path. You ponder on the supposed city scape you saw before but are immediately interrupted by the growls of a tiger!",
    options: [
      {
        text: "Use the pipe, it worked before...",
        nextText: 2
      },
      {
        text: "Retreat back through the doorway!",
        nextText: 3
      },
      {
        text: "Reason with the tiger?",
        nextText: 4
      },
      {
        text: "Retreat into the dense jungle!",
        nextText: 5
      },
    ]
  },
  {
    id: 2,
    text: "With gusto you swing your trusty pipe at the tiger only for the beast to lunge at you. With a quick swipe from it's claws you meet your end.",
    options: [
      {
        text: "Restart",
        nextText: -1
      },
    ],
  },
  {
    id: 3,
    text: "As you rush through the doorway you turn to see the Jungle is not there, you are back in the white room and the doorway now appears to hold a sci-fi like interior",
    options: [
      {
        text: "Walk through once more?",
        nextText: 6
      },
      {
        text: "Stay in the white room you've had enough adventuring",
        nextText: 7
      },
    ],
  },
  {
    id: 4,
    text: "With all thats happened lately maybe this is a creature with intelligence? As you think this the beast has already lunged at you for it's next meal",
    options: [
      {
        text: "Restart",
        nextText: -1
      },
    ],
  },
  {
    id: 5,
    text: "You run and run but it gets harder to move through the dense foilage as the growls get closer until all of a sudden it fades to black",
    options: [
      {
        text: "Restart",
        nextText: -1
      },
    ],
  },
  {
    id: 6,
    text: "You begrudgingly walk through once more only to wake up on a medical bed in what appears to be a science lab. A man in a lab coat walks in and says that the experiment was a success. He explained that you were a willing test subject in ongoing realistic virtual reality tests",
    options: [
      {
        text: "To be continued..."
      },
    ],
  },
  {
    id: 7,
    text: "You sit down after being exhausted from the whole ordeal. Hours, Days and even Months go by yet nothing changes. For some reason, thirst and hunger do not effect you but the same cannot be said about your mind...",
    options: [
      {
        text: "Subject 001 Failed - Restart Program",
        nextText: -1
      },
    ],
  },
];
  

startGame()
