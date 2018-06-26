import Renderable from '../Renderable'
import GuiExporter from '../GuiExporter'

export default class ExportButton extends Renderable {
  constructor ($container, containerClass) {
    const domString = `
      <a class="guigui-upload-text" href="" download="guigui.json">
        <svg height='200' width='200' fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" version="1.1" x="0px" y="0px"><title>Download s5.4</title><desc>Created with Sketch.</desc><g stroke="none" stroke-width="1" fill-rule="evenodd"><g><path d="M52.051729,34.8836144 L68.0700334,51.1268227 C70.8900113,53.9550205 66.6600445,58.1983174 63.8390694,55.3701195 L54.4100011,45.9126972 C53.6220001,45.1223266 52.9919266,45.3829518 52.9919266,46.4840216 L52.9919266,79.2497901 C52.9919266,80.906906 51.6527362,82.25 50.0004366,82.25 C48.3481369,82.25 47.0089466,80.906906 47.0089466,79.2497901 L47.0089466,46.4840216 C47.0089466,45.3845155 46.3739946,45.1271612 45.5907417,45.9126972 L36.1608066,55.3701195 C33.3408287,58.1983174 29.1098647,53.9550205 31.9298426,51.1268227 L47.8441495,34.8926292 C49.0028373,33.7106512 50.8888241,33.7043818 52.051729,34.8836144 Z M30,24 C28.3431458,24 27,22.6568542 27,21 C27,19.3431458 28.3431458,18 30,18 L70,18 C71.6568542,18 73,19.3431458 73,21 C73,22.6568542 71.6568542,24 70,24 L30,24 Z" transform="translate(50.000000, 50.125000) rotate(-180.000000) translate(-50.000000, -50.125000) "></path></g></g></svg>
      </a>
    `

    super(
      {
        classNames: ['guigui-button', 'guigui-upload']
      },
      domString
    )

    this.toggle = this.toggle.bind(this)
    this.$container = $container
    this.containerClass = containerClass

    this.$el.addEventListener('click', this.toggle)
  }

  toggle () {
    const data = GuiExporter.exportToJson()
    let link = this.$el.querySelector('a')
    link.href = `data:'${data}'`
  }
}
