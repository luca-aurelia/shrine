const circleRenderer = {
  render (options, element) {
    const { context } = options

    context.beginPath()
    context.arc(
      element.point.x,
      element.point.y,
      element.radius,
      element.startAngle,
      element.endAngle
    )
  }
}

const pathRenderer = {
  render (options, element) {
    const { context } = options

    const start = element.points[0]

    context.beginPath()
    context.moveTo(start.x, start.y)

    for (let i = 0; i < element.points.length; i++) {
      const point = element.points[i]
      context.lineTo(point.x, point.y)
    }
  }
}

const ellipseRenderer = {
  render (options, element) {
    const { context } = options

    context.beginPath()
    context.ellipse(
      element.point.x,
      element.point.y,
      element.xRadius,
      element.yRadius,
      element.rotation,
      element.startAngle,
      element.endAngle
    )
  }
}

const defaultRenderers = {
  circle: circleRenderer,
  path: pathRenderer,
  ellipse: ellipseRenderer
}

function applyDefaultOptions (canvas, options) {
  const width = canvas.width / window.devicePixelRatio
  const height = canvas.height / window.devicePixelRatio

  const context = canvas.getContext('2d')

  const renderers = Object.assign({}, defaultRenderers, options.renderers)

  const defaultOptions = {
    canvas,
    context,
    width,
    height,
    clearColor: 'white',
    renderers
  }

  Object.assign({}, defaultOptions, options)
}

function makeSureIsArray (x) {
  if (Array.isArray(x)) {
    return x
  }

  return [x]
}

export default class Shrine {
  constructor (canvas, options = {}) {
    this.options = applyDefaultOptions(canvas, options)
  }

  renderElement (element) {
    this.options.context.strokeStyle = element.strokeStyle
    this.options.context.fillStyle = element.fillStyle

    const renderer = this.options.renderers[element.type]
    renderer.render(this.options, element)

    if (element.strokeStyle) {
      this.options.context.stroke()
    }

    if (element.fillStyle) {
      this.options.context.fill()
    }
  }

  clearCanvas () {
    this.options.context.fillStyle = this.options.clearColor
    this.options.context.fillRect(0, 0, this.options.width, this.options.height)
  }

  render (elements) {
    elements = makeSureIsArray(elements)

    for (let i = 0; i < elements.length; i++) {
      this.renderElement(elements[i])
    }
  }
}
