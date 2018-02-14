import _ from 'lodash/fp'
import React from 'react'
import {Step} from 'react-impressjs'

let flatMapIndexed = _.flatMap.convert({cap: false})

export let Transform = ({children, data}) => children
export let blend = _.mergeWith(_.add)
export let layout = (getTransform = _.noop) => children => origin =>
  flatMapIndexed((child, i) => {
    let data = blend(origin, getTransform(i, children))
    if (child.type == Transform) data = blend(data, child.props.data)

    if (_.isFunction(child)) return child(data)
    return (
      <Step key={i} data={data}>
        {child}
      </Step>
    )
  }, children)

export let circle = (r, count, i) => ({
  x: r * Math.cos(i * 2 * Math.PI / count + 1.5 * Math.PI), // 1.5 PI for rotate
  y: r * Math.sin(i * 2 * Math.PI / count + 1.5 * Math.PI),
  rotateZ: 360 / count * i,

  // Alternate up/down
  z: i % 2 && 250,
})
export let cylinder = (r, count, i) => ({
  x: r * Math.cos(i * 2 * Math.PI / count + 1.5 * Math.PI), // 1.5 PI for rotate
  y: r * Math.sin(i * 2 * Math.PI / count + 1.5 * Math.PI),
  rotateZ: 360 / count * i,

  // Tilt away from center
  rotateX: (1 - ((360 / count * i) % 90) / 90) * 30,
  rotateY: ((360 / count * i) % 90) / 90 * 30,
})
export let OLayout = layout((i, children) => circle(1000, children.length, i))
export let XLayout = layout(i => ({x: i * 1500}))
export let YLayout = layout(i => ({y: i * 100}))
export let CLayout = layout((i, children) => cylinder(1500, children.length, i))