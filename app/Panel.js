import Folder from './Folder'
import { savePanel, saveFolder, saveComponent, saveColor } from './saveGui'

export default class Panel extends Folder {
  constructor (name = '') {
    const domString = `
      <div class="guigui-panel-head">
        <h2 class="guigui-panel-label">${name}</h2>
      </div>
      <div class="guigui-panel-content"></div>
    `
    super(
      name,
      {
        classNames: ['guigui-panel', 'guigui-panel--opened']
      },
      domString
    )

    this.state = savePanel(name)
    this.uid = this.state.uid
  }

  // addFolder(name, options = {}) {
  //   let folder = super.addFolder(name, options = {})
  //   console.log('addFolder', folder)
  //   folder.uid = saveFolder(this.state)
  //   return folder
  // }

  add(object, property, array, options) {
    let component = super.add(object, property, array, options)
    component.uid = saveComponent(this.state, component)
    return component
  }

  addColor(object, property, options) {
    let component = super.addColor(object, property, options)
    component.uid = saveColor(this.state, component)
    return component
  }
}
