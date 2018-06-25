import test from 'ava'
import GuiExporter from 'GuiExporter'
import Panel from 'Panel'

test('save an empty panel', t => {
  const p = new Panel('settings')
  t.is(p.folderName, 'settings')
  GuiExporter.savePanel(p, 0)
  t.not(p.state, undefined)
  t.is(p.state.uid, '0')
  t.is(p.state.rows.length, 0)
  t.is(GuiExporter.data.length, 0)
})

test('save a panel with only 1 component', t => {
  let obj = {x: 10}
  const p = new Panel('settings')
  t.is(p.folderName, 'settings')
  GuiExporter.savePanel(p, 0)
  t.not(p.state, undefined)
  let c = p.add(obj, 'x')
  // component uid was created
  t.not(c.uid, undefined)
  // component uid format is consistent
  t.is(c.uid.split('-').length, 2)
  t.is(GuiExporter.data.length, 1)
})

test('save a panel with multiple components', t => {
})

test('save a panel with only one empty folder', t => {
})

test('save a panel with multiple folders', t => {
})

test('save a panel with nested folders and components', t => {})
