import React from 'react'
import _ from 'lodash/fp'
import * as F from 'futil-js'
import {observer, inject} from 'mobx-react'
import {Flex} from '../flex'
import './components.css'

export let InjectTreeNode = inject(
  ({tree}, {tree: tree2, path}) => ({
    tree: tree2 || tree,
    node: (tree2 || tree).getNode(path)
  })
)

export let Facet = InjectTreeNode(observer(({tree, node, hide = {}, ...props}) => (
  <div {...props}>
    {!hide.facetFilter && (
      <input
        className="contexture-search-box"
        type="text"
        value={node.optionsFilter}
        onChange={e => tree.mutate(node.path, {optionsFilter: e.target.value})}
      />
    )}
    {_.map(
      option => (
        <Flex
          key={option.name}
          style={{justifyContent: 'space-between', alignItems: 'baseline'}}>
          <input
            type="checkbox"
            onChange={() => {
              let value = option.name
              let values = _.result('data.values.slice', node) || []
              if (_.includes(value, values)) values = _.pull(value, values)
              else values.push(value)
              tree.mutate(node.path, {data: {values}})
            }}
          />
          <div style={{flex: 2, paddingLeft: '5px', paddingRight: '5px'}}>
            {option.name}
          </div>

          <div>{option.count}</div>
        </Flex>
      ),
      _.get('context.options', node)
    )}
  </div>
)))

export let Range = InjectTreeNode(observer(({tree, node, ...props}) => (
  <Flex {...props}>
    <input
      className="contexture-search-box"
      type="number"
      value={node.min}
      onChange={e => tree.mutate(node.path, {min: e.target.value})}
    />
    <div>-</div>
    <input
      className="contexture-search-box"
      type="number"
      value={node.max}
      onChange={e => tree.mutate(node.path, {max: e.target.value})}
    />
  </Flex>
)))

export let Query = InjectTreeNode(observer(({tree, node, style, ...props}) => (
  <input
    className="contexture-search-box"
    style={{padding: '15px', ...style}}
    value={node.query}
    onChange={e =>
      tree.mutate(node.path, {
        query: e.target.value,
      })
    }
    placeholder="Search"
    {...props}
  />
)))

export let ResultCount = InjectTreeNode(observer(({node, ...props}) => (
  <div style={{textAlign: 'center'}} {...props}>
    {node.context.response.results.length
      ? `Viewing records ${node.context.response.startRecord} - ${
          node.context.response.endRecord
        } out of ${node.context.response.totalRecords}`
      : 'No Results'}
  </div>
)))

export let DateHistogram = InjectTreeNode(observer(
  ({node, format, height = 100, background = () => '#ccc'}) => {
    let max = _.get('count', _.maxBy('count', node.context.entries))
    return (
      <Flex style={{alignItems: 'baseline', justifyContent: 'center'}}>
        {_.map(
          x => (
            <div key={x.key}>
              <div
                style={{
                  height: x.count / max * height,
                  background: background(x, max),
                }}
              />
              <div style={{padding: '5px'}}>{format(x.key)}</div>
            </div>
          ),
          node.context.entries
        )}
      </Flex>
    )
  }
))
