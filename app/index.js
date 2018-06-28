import Panel from './Panel'
import CloseButton from './buttons/CloseButton'
import ExportButton from './buttons/ExportButton'
import UploadButton from './buttons/UploadButton'
import { createElement, appendElement } from './utils/dom'
import './styles/main.css'
import exporter from './Exporter'
import Uploader from './Uploader'

// TODO USE BUBLE ISTEAD OF BABEL
// TODO USE MIT instead of component/emitter ?

function addPanel (name = '') {
  if (name === '') {
    name = 'Settings'
    if (panels.length > 0) {
      name += ' ' + (panels.length + 1)
    }
  }

  const panel = new Panel(name)
  panels.push(panel)
  panel.appendTo($content)

  exporter.savePanel(panel, panels.length - 1)
  uploader.panels = panels
  return panel
}

function add (...args) {
  return getFirstPanel().add(...args)
}

function addColor (...args) {
  return getFirstPanel().addColor(...args)
}

function addFolder (...args) {
  return getFirstPanel().addFolder(...args)
}

function addColorPicker (...args) {
  return getFirstPanel().addColor(...args)
}

function getPanel (index) {
  if (index < panels.length) {
    return panels[index]
  }
  return null
}

function getFirstPanel () {
  return getPanel(0) || addPanel()
}

function update (json) {
  uploader.updateGui(json)
  return json
}

const uploader = new Uploader()
const panels = []
const $el = createElement('div', 'guigui')
const $content = createElement('div', 'guigui-container')
const closeButton = new CloseButton($content, 'guigui-container')
const exportButton = new ExportButton($content, 'guigui-container')
const uploadButton = new UploadButton($content, 'guigui-container', uploader)

appendElement($el)
appendElement($content, $el)
closeButton.appendTo($el)
exportButton.appendTo($content)
uploadButton.appendTo($content)

module.exports = {
  addPanel,
  addFolder,
  add,
  addColor,
  addColorPicker,
  getPanel,
  update
}
