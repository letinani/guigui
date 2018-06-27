export default class GuiUploader {
  constructor (panels) {
    this.panels = panels
  }

  parseJson (json) {
    return JSON.parse(json)
  }

  validateJson () {
    
  }

  updateGui(json) {
    const jsonParsed = this.parseJson(json)
    if (!jsonParsed) return
  
    for (let i = 0; i < jsonParsed.length; i++) {
      let data = jsonParsed[i]
      let ids = data.uid.split('-')
      const panel = this.panels[ids[0]]
      const component = this.lookThroughGui(panel, 1, ids)
      this.updataComponent(component, data)
    }
  }

  updataComponent(component, data) {
    // check uid
    if (data.uid !== component.uid) {
      return console.warn('this data does not exists in that gui: ', data)
    }
    // check type
    if (data.type !== component.type) {
      return console.warn('this data does not exists in that gui: ', data)
    }
    // ckeck value

    switch (data.type) {
      case 'color':
        component.colorPicker.setColor(data.value)
        break
    
      default:
        component.value = data.value
        break
    }
  }

  lookThroughGui(object, index, parsedUid) {
    const currentBranch = parsedUid[index]
    if (index === parsedUid.length - 1) {
      return object.components[currentBranch]
    } else {
      return this.lookThroughGui(object.folders[currentBranch], index + 1, parsedUid)
    }
  }
}
