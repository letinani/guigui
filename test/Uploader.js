import test from 'ava'
import Uploader from 'Uploader'
import Panel from 'Panel'
import exporter from 'Exporter'

test.beforeEach(t => {
  exporter.data = []
})

test('update with json that is compatible with a gui with 1 number component ', t => {
  // given
  let obj = { x: 10 }
  const p = new Panel('settings')
  const index = 0
  const json = `[{"type":"number","uid":"0-0","value":20}]`
  const uploader = new Uploader()
  uploader.panels.push(p)
  // with
  exporter.savePanel(p, index)
  let c = p.add(obj, 'x')
  uploader.updateGui(json)

  // then
  t.is(c.value, 20)
})

test('update with json that is compatible with a gui with 2 number and color components ', t => {
  // given
  let obj = { 
    x: 10,
    color: "#000000"
  }
  const p = new Panel('settings')
  const index = 0
  const json = `[
    {"type":"number","uid":"0-0","value":20},
    {"type":"color","uid":"0-1","value":"#FFFFFF"}
  ]`
  const uploader = new Uploader()
  uploader.panels.push(p)
  //console.log(uploader.panels)
  // with
  exporter.savePanel(p, index)
  let c1 = p.add(obj, 'x')
  let c2 = p.addColor(obj, 'color')
  uploader.updateGui(json)

  // then
  t.is(c1.value, 20)
  t.is(c2.getColor(), "#FFFFFF")
})


test('update with json that is not compatible with a gui with 1 number component ', t => {
  // given
  let obj = { x: 10 }
  const p = new Panel('settings')
  const index = 0
  const json = `[{"type":"color","uid":"0-0","value":20}]`
  const uploader = new Uploader()
  uploader.panels.push(p)
  // with
  exporter.savePanel(p, index)
  let c = p.add(obj, 'x')
  uploader.updateGui(json)

  // then
  t.is(c.value, 10)
})