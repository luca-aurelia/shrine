const Circle = {
  defaultElementOptions: {
    type: 'circle',
    x: 0,
    y: 0,
    radius: 1,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    fillStyle: 'pink'
  },

  make (shrine, element) {
    return Object.assign({}, this.defaultElementOptions, element)
  },

  draw (shrine, element) {
    const { context } = shrine.options

    context.beginPath()
    context.arc(
      element.x,
      element.y,
      element.radius,
      element.startAngle,
      element.endAngle
    )
  }
}

const Path = {
  defaultElementOptions: {
    type: 'path',
    points: [
      { x: 0, y: 0 },
      { x: 1, y: 1 }
    ],
    strokeStyle: 'pink'
  },

  make (shrine, element) {
    return Object.assign({}, this.defaultElementOptions, element)
  },

  draw (shrine, element) {
    const { context } = shrine.options

    const start = element.points[0]

    context.beginPath()
    context.moveTo(start.x, start.y)

    for (let i = 0; i < element.points.length; i++) {
      const point = element.points[i]
      context.lineTo(point.x, point.y)
    }
  }
}

const Ellipse = {
  defaultElementOptions: {
    type: 'ellipse',
    x: 0,
    y: 0,
    xRadius: 1,
    yRadius: 1,
    rotation: 0,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    fillStyle: 'pink'
  },

  make (shrine, element) {
    return Object.assign({}, this.defaultElementOptions, element)
  },

  draw (shrine, element) {
    const { context } = shrine.options

    context.beginPath()
    context.ellipse(
      element.x,
      element.y,
      element.xRadius,
      element.yRadius,
      element.rotation,
      element.startAngle,
      element.endAngle
    )
  }
}

const defaultElementTypes = {
  circle: Circle,
  path: Path,
  ellipse: Ellipse
}

function applyDefaultOptions (canvas, options) {
  options = { ...options }

  const width = canvas.width / window.devicePixelRatio
  const height = canvas.height / window.devicePixelRatio

  const context = canvas.getContext('2d')

  options.elementTypes = Object.assign(
    {},
    defaultElementTypes,
    options.elementTypes
  )

  const defaultOptions = {
    canvas,
    context,
    width,
    height,
    clearColor: 'white',
    elementTypes
  }

  return Object.assign({}, defaultOptions, options)
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

  make (elementTypeName, elementOptions) {
    const elementType = this.options.elementTypes[elementTypeName]
    return elementType.make(this, elementOptions)
  }

  drawElement (element) {
    this.options.context.strokeStyle = element.strokeStyle
    this.options.context.fillStyle = element.fillStyle

    const elementType = this.options.elementTypes[element.type]
    elementType.draw(this, element)

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

  draw (elements) {
    elements = makeSureIsArray(elements)

    for (let i = 0; i < elements.length; i++) {
      this.drawElement(elements[i])
    }
  }
}
