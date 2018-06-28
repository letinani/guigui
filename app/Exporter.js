class Exporter {
  constructor () {
    this.data = []
  }

  savePanel (panel, position) {
    let state = {
      name: panel.folderName,
      uid: position.toString(),
    }
    panel.state = state
    return state
  }

  saveFolder (state, folder, position) {
    const folderData = {
      type: 'folder',
      uid: `${state.uid}-${position}`,
    }
    folder.state = folderData
  }

  saveComponent (state, component, position) {
    const componentData = {
      type: typeof component.value,
      uid: `${state.uid}-${position}`,
      value: component.value
    }
    component.uid = componentData.uid
    component.type = componentData.type
    if (componentData.value !== undefined) this.data.push(componentData)
  }

  saveColor (state, component, position) {
    const componentData = {
      type: 'color',
      uid: `${state.uid}-${position}`,
      value: component.getColor()
    }
    component.uid = componentData.uid
    component.type = componentData.type
    if (componentData.value !== undefined) this.data.push(componentData)
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
  }

  dataToJson () {
    return JSON.stringify(this.data)
  }

  exportToJson () {
    const json = this.dataToJson()
    const data = 'text/json;charset=utf-8,' + encodeURIComponent(json)
    return data
  }
}

export default new Exporter()
