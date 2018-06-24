import globalState from './utils/state'

function savePanel(name) {
  console.log(globalState.panels.length)
  let state = {
    name: name,
    uid: globalState.panels.length.toString(),
    rows: new Array()
  }
  globalState.panels.push(state)
  console.log('savePanel::', state)
  return state
}

function saveComponentValue(uid, value) {
  if (!uid || !value) return
  let object = findInStoreByUid(uid)
  if (object.value !== undefined) object.value = value
}

function findInStoreByUid(uid) {
  if (!uid) return
  const parsedId = uid.split('-')
  let object = globalState.panels[parseInt(parsedId[0])]
  if (parsedId.length > 1) {
    object = loopThroughStore(object, 1, parsedId)
  }
  return object
}

function loopThroughStore(object, index, parsedId) {
  const currentBranch = parsedId[index]
  if (index === parsedId.length - 1) {
    return object.rows[currentBranch]
  } else {
    return loopThroughStore(object.rows[currentBranch], index + 1, parsedId)
  }
}

function saveFolder(state) {
  const folderData = {
    type: 'folder',
    uid: `${state.uid}-${state.rows.length}`,
    rows: new Array()
  }

  state.rows.push(folderData)
  console.log('saveFolder::', state)
  console.log('globalState::', globalState)
  return folderData.uid
}

function saveComponent(state, component) {
  const componentData = {
    type: 'component',
    uid: `${state.uid}-${state.rows.length}`,
    value: component.value
  }
  state.rows.push(componentData)
  console.log('saveComponent::', state)
  return componentData.uid
}

function saveColor(state, component)  {    
  const componentData = {
    type: 'component',
    uid: `${state.uid}-${state.rows.length}`,
    value: component.getColor()
  }
  state.rows.push(componentData)
  console.log('saveColor::', state)
  return componentData.uid
}

function exportSaving() {
  const json = JSON.stringify(globalState)
  console.log(json)
  const data = "text/json;charset=utf-8," + encodeURIComponent(json)
  return data
}

export { 
  saveFolder,
  savePanel,
  saveComponent,
  exportSaving,
  saveColor,
  saveComponentValue
}