import bsDraw from './commands/bsDraw'
import bsFill from './commands/bsFill'
import dbReset from './commands/dbReset'
import drCycle from './commands/drCycle'
import drDrawHand from './commands/drDrawHand'
import drEndTurn from './commands/drEndTurn'
import drPlay from './commands/drPlay'
import drReset from './commands/drReset'
import drSelect from './commands/drSelect'
import drSetRNG from './commands/drSetRNG'
import exportCollection from './commands/exportCollection'
import importCollection from './commands/importCollection'
import { restoreLocalStorage, saveLocalStorage } from './commands/localStorage'

Cypress.Commands.add('bsDraw', { prevSubject: false }, bsDraw)
Cypress.Commands.add('bsFill', { prevSubject: 'optional' }, bsFill)
Cypress.Commands.add('dbReset', { prevSubject: false }, dbReset)
Cypress.Commands.add('drCycle', { prevSubject: false }, drCycle)
Cypress.Commands.add('drDrawHand', { prevSubject: false }, drDrawHand)
Cypress.Commands.add('drEndTurn', { prevSubject: false }, drEndTurn)
Cypress.Commands.add('drPlay', { prevSubject: false }, drPlay)
Cypress.Commands.add('drReset', { prevSubject: false }, drReset)
Cypress.Commands.add('drSelect', { prevSubject: false }, drSelect)
Cypress.Commands.add('drSetRNG', { prevSubject: false }, drSetRNG)
Cypress.Commands.add(
  'exportCollection',
  { prevSubject: true },
  exportCollection
)
Cypress.Commands.add(
  'importCollection',
  { prevSubject: true },
  importCollection
)
Cypress.Commands.add(
  'restoreLocalStorage',
  { prevSubject: false },
  restoreLocalStorage
)
Cypress.Commands.add(
  'saveLocalStorage',
  { prevSubject: false },
  saveLocalStorage
)
