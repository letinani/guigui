import globalState from './utils/state'

function savePanel(name) {
  let state = {
    name: name,
    rows: new Array()
  }
  globalState.panels.push(state)
  console.log('savePanel::', state)
  return state
}

function saveFolder(state, folderName, options) {
  console.log(state)
  state.rows.push({
    type: 'folder',
    name: folderName,
    options: options,
    rows: new Array()
  })
  console.log('saveFolder::', state)
  return (state.gui.length - 1)
}

function saveComponent(state, object, property, array, options) {
  // state.rows.push({
  //   type: 'component',
  //   object: object,
  //   property: property,
  //   array: array,
  //   options: options
  // })
  // console.log('saveComponent::', state)
}

function exportSaving() {
  const data = JSON.stringify(globalState.gui)
  console.log(data)
}

export { 
  saveFolder,
  savePanel,
  saveComponent,
  exportSaving
}