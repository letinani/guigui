class GuiExporter {
  constructor () {
    this.data = []
  }

  savePanel (panel, position) {
    let state = {
      name: panel.folderName,
      uid: position.toString(),
      rows: []
    }
    panel.state = state
    console.log('SAVE::savepanel', state)
    return state
  }

  saveFolder (state, folder) {
    const folderData = {
      type: 'folder',
      uid: `${state.uid}-${state.rows.length}`,
      rows: []
    }
    state.rows.push(folderData)
    folder.state = folderData
  }

  saveComponent (state, component) {
    const componentData = {
      type: typeof component.value,
      uid: `${state.uid}-${state.rows.length}`,
      value: component.value
    }
    state.rows.push(componentData)
    component.uid = componentData.uid
    if (componentData.value !== undefined) this.data.push(componentData)
    console.log('SAVE::saveComponent::', this.data)
  }

  saveColor (state, component) {
    const componentData = {
      type: 'color',
      uid: `${state.uid}-${state.rows.length}`,
      value: component.getColor()
    }
    state.rows.push(componentData)
    component.uid = componentData.uid
    if (componentData.value !== undefined) this.data.push(componentData)
    console.log('SAVE::saveColor::', this.data)
  }

  updateSavedValue (uid, value) {
    if (value === undefined || uid === undefined) return
    for (let i = 0; i < this.data.length; i++) {
      let savedComponent = this.data[i]
      if (uid === savedComponent.uid) {
        savedComponent.value = value
        break
      }
    }
    console.log('SAVE::updateValue::', this.data)
  }

  exportToJson () {
    const json = JSON.stringify(this.data)
    console.log('SAVE::exportToJson', json)
    const data = 'text/json;charset=utf-8,' + encodeURIComponent(json)
    return data
  }
}

export default new GuiExporter()
