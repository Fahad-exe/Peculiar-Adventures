const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function GameLaunch() {
  state = {}
  showtext(1)
}

function selectoption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
      return GameLaunch()
    }
    state = Object.assign(state, option.setState)
    showtext(nextTextNodeId)
  }



function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function showtext(textNodeIndex) {
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
        button.addEventListener('click', () => selectoption(option))
        optionButtonsElement.appendChild(button)
      }
    })
  }


const textNodes = [
  {
    id: 1,
    text: 'You have awaken in a strange place and it does not feel like your own room just to realize you are in a different world. while looking around a game like UI appeared when looking through the plants with information about it; Would you like to pick it up?',
    options: [
      {
        text: 'Take the plants',
        setState: { plants: true },
        nextText: 2
      },
      {
        text: 'Leave the plants',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You start roaming around the forest and you find a Slime hiding behind the bushes .',
    options: [
      {
        text: 'Would you like to tame the slime by giving it the plants you found',
        requiredState: (currentState) => currentState.plants,
        setState: { plants: false, slime: true },
        nextText: 3
      },
      {
        text: 'Ignore the slime',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After wandering through the forest you hear a loud scream.',
    options: [
      {
        text: 'You start running towards the scream',
        nextText: 4
      },
      {
        text: 'Ignore it and walk away towards the city',
        nextText: 5
      },
      {
        text: 'Stay in the forest through the night.',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You and your Slime have found a carriage that is being attacked by bandits.',
    options: [
      {
        requiredState: (currentState) => currentState.slime,
        text: 'Try to save Them.',
        nextText: 7
      },
      {
        text: 'try to run away.',
        nextText:8
      }
    ]
  },
  {
    id: 5,
    text: 'You have been asked by the gaurds to give your ID card or pay the fee.',
    options: [
      {
        text: 'sell the plants to them and say you have been attacked by monsters and lost your id.',
        requiredState: (currentState) => currentState.plants,
        setState: { plants: false, ID: true },
        nextText: 9
      },
      {
        requiredState: (currentState) => currentState,
        setState:{plants:false},
        text:'As you dont have any money, you have been sent to jail',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You have been eaten by a pack of wolves in your sleep ',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'After a long fight with your slime you have finally saved the merchants,to reward your heroic achievement they have given you a bag full of Silver and some Gold.',
    options: [
         {
           text:'Accept the gift',
           nextText: 10
         }
    ]
  },
  {
    id: 8,
    text: 'Your attempt to run away was unsuccessful as they heard you run away and killed you with an arrow.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You have entered the city successfully. To continue the game, please wait until the full release.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'You have travelled with the merchants towards the town and have been stopped by the gaurds to check your id or pay for a new one.',
    options: [
      {
        text: 'Pay',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: 'You have entered the city successfully. To continue the game, please wait until the full release.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  }
    
]

GameLaunch()