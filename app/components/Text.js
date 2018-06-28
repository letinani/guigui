import Component from '../Component'
import '../styles/components/text.css'
import exporter from '../Exporter'

export default class Text extends Component {
  constructor (object, property, options = {}) {
    let { label = property } = options

    const currentValue = object[property]

    const domString = `
      <div class="guigui-text-label">${label}</div>
      <input type="text" class="guigui-text-value" value="${currentValue}"/>
    `

    super(object, property, {classNames: ['guigui-text']}, domString)

    this.onInputChange = this.onInputChange.bind(this)

    this.isText = true
    this.$input = this.$el.querySelector('input')
    this.value = currentValue
    this.$input.addEventListener('input', this.onInputChange)
  }

  onInputChange () {
    this.value = this.$input.value
  }

  get value () {
    return this.$input.value
  }

  set value (value) {
    this.$input.value = value
    this._value = value
    this._targetObject[this._targetProperty] = value
    exporter.updateSavedValue(this.uid, value)
    this.emit('update', this.sliderValue)
  }
}
