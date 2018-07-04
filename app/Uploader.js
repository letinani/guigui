export default class Uploader {
  constructor (panels) {
    this.panels = panels || []
  }

  parseJson (json) {
    try {
      return JSON.parse(json)
    } catch (e) {
	    console.warn(e)
      return false
    }
  }

  updateGui (json) {
    // console.log('uup', json)
    const jsonParsed = this.parseJson(json)
    if (!jsonParsed) return
  
    for (let i = 0; i < jsonParsed.length; i++) {
      let data = jsonParsed[i]
      if (data.uid === undefined)
        console.warn('this data is not compatible that gui')
      let ids = data.uid.split('-')
      const panel = this.panels[ids[0]]
      const component = this.lookThroughGui(panel, 1, ids)
      this.updataComponent(component, data)
    }
  }

  updataComponent (component, data) {
    // check uid
    if (data.uid !== component.uid) {
      return console.warn('this data is not compatible that gui: ', data)
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

  lookThroughGui (object, index, parsedUid) {
    const currentBranch = parsedUid[index]
    if (index === parsedUid.length - 1) {
      return object.components[currentBranch]
    } else {
      return this.lookThroughGui(object.folders[currentBranch], index + 1, parsedUid)
    }
  }
}
