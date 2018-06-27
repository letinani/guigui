import test from 'ava'
import GuiExporter from 'GuiExporter'
import Panel from 'Panel'

test.beforeEach(t => {
  GuiExporter.data = []
})

test('save an empty panel', t => {
  // given
  const p = new Panel('settings')
  const index = 0
  // with
  GuiExporter.savePanel(p, index)
  // then
  t.is(p.folderName, 'settings') // normaly should be in a full test for Panel
  t.not(p.state, undefined)
  t.is(p.state.uid, '0')
  t.is(p.state.rows.length, 0)
  t.is(GuiExporter.data.length, 0)
})

test('save a panel with only 1 standard component', t => {
  // given
  let obj = {x: 10}
  const p = new Panel('settings')
  const index = 0
  // with
  GuiExporter.savePanel(p, index)
  let c = p.add(obj, 'x')
  // then
  t.not(p.state, undefined)
  t.not(c.uid, undefined)
  t.is(c.uid.split('-').length, 2)
  t.is(GuiExporter.data.length, 1)
  t.is(GuiExporter.data[0].value, 10)
  t.not(GuiExporter.data[0].uid, undefined)
})

test('save a panel with only 1 color component', t => {
  // given
  let obj = {color: '#FFFFFF'}
  const p = new Panel('settings')
  const index = 0
  // with
  GuiExporter.savePanel(p, index)
  let c = p.addColor(obj, 'color')
  // then
  t.not(p.state, undefined)
  t.not(c.uid, undefined)
  t.is(c.uid.split('-').length, 2)
  t.is(GuiExporter.data.length, 1)
  t.not(GuiExporter.data[0].value, undefined)
  t.not(GuiExporter.data[0].uid, undefined)
})

test('save a panel with 3 components of differents types: number, string and color', t => {
  // given
  let obj = {
    x: 10,
    name: 'toto',
    color: '#FFFFFF'
  }
  const p = new Panel('settings')

  // with
  GuiExporter.savePanel(p, 0)
  let c1 = p.addColor(obj, 'color')
  let c2 = p.add(obj, 'name')
  let c3 = p.add(obj, 'x')

  // then
  t.not(p.state, undefined)
  t.not(c1.uid, undefined)
  t.is(c1.uid.split('-').length, 2)
  t.is(c1.value, undefined)
  t.is(c2.uid.split('-').length, 2)
  t.is(c3.uid.split('-').length, 2)
  t.is(GuiExporter.data.length, 3)

  t.is(GuiExporter.data[0].type, 'color')
  t.is(GuiExporter.data[1].type, typeof c2.value)
  t.is(GuiExporter.data[2].type, typeof c3.value)

  GuiExporter.data.forEach((obj, i) => {
    t.not(obj.value, undefined)
    t.not(obj.uid, undefined)
  })
})

test('save a panel with only one empty folder', t => {
  // given
  const p = new Panel('settings')
  const index = 0
  // with
  GuiExporter.savePanel(p, index)
  let f = p.addFolder('folder')
  // then
  t.not(f.state, undefined)
  t.is(f.state.uid.split('-').length, 2)
  t.is(GuiExporter.data.length, 0)
})

test('save a panel with two empty folders', t => {
  // given
  const p = new Panel('settings')
  const index = 0
  // with
  GuiExporter.savePanel(p, index)
  let f1 = p.addFolder('folder1')
  let f2 = p.addFolder('folder2')
  // then
  t.not(f1.state, undefined)
  t.not(f2.state, undefined)
  t.is(f1.state.uid.split('-').length, 2)
  t.is(GuiExporter.data.length, 0)
})

test('save a panel with 1 folder containing 1 number component', t => {
  // given
  let obj = {
    x: 10
  }
  const p = new Panel('settings')
  const index = 0
  // with
  GuiExporter.savePanel(p, index)
  let f = p.addFolder('folder1')
  let c = f.add(obj, 'x')
  // then
  t.not(f.state, undefined)
  t.not(c.uid, undefined)
  t.is(f.state.uid.split('-').length, 2)
  t.is(c.uid.split('-').length, 3)
  t.is(GuiExporter.data.length, 1)
})

test('update a saved component of type: number', t => {
  // given
  let obj = { x: 10 }
  const p = new Panel('settings')
  const index = 0
  // with
  GuiExporter.savePanel(p, index)
  let c = p.add(obj, 'x')
  c.value = 15
  // then
  t.is(c.value, 15)
  t.is(GuiExporter.data[0].value, 15)
})

test('export saved panel with 2 components in json format', t => {
  // given
  let obj = {
    x: 10,
    color: '#FFFFFF'
  }
  const p = new Panel('settings')
  const index = 0
  // with
  GuiExporter.savePanel(p, index)
  p.add(obj, 'x')
  p.addColor(obj, 'color')
  const json = GuiExporter.dataToJson()
  const fileHref = GuiExporter.exportToJson()

  // then
  try {
    JSON.parse(json)
    t.pass()
  } catch (e) {
    t.fail()
  }
  t.is(decodeURIComponent(fileHref.replace('text/json;charset=utf-8,', '')), json)
})
