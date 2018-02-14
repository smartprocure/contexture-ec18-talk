import React from 'react'
import {observable} from 'mobx'
import SearchRoot, {NewNode} from 'contexture-react/dist/components/SearchRoot'
import Types from 'contexture-react/dist/exampleTypes'
let Node = NewNode(Types)

export default () => (
  <div
    style={{
      height: '800px',
      padding: '10px',
      backgroundColor: '#f0f8ff',
      overflow: 'scroll',
    }}>
    <SearchRoot
      tree={observable({
        key: 'root',
        join: 'and',
        children: [
          Node('query', 'filter 1'),
          {
            key: 'group1',
            join: 'or',
            children: [
              Node('query', 'filter 2a'),
              Node('query', 'filter 2b'),
              {
                key: 'group2',
                join: 'and',
                children: [
                  Node('facet', 'filter 4a'),
                  Node('query', 'filter 4b'),
                ],
              },
            ],
          },
          Node('query', 'filter 3'),
          {
            key: 'group2',
            join: 'not',
            children: [Node('number', 'filter 5a'), Node('query', 'filter 5b')],
          },
          {
            key: 'group24',
            join: 'or',
            children: [
              {
                key: 'group2',
                join: 'and',
                children: [
                  Node('query', 'filter 4a'),
                  Node('text', 'txt filter 4b'),
                ],
              },
              Node('query', 'asdf'),
            ],
          },
        ],
      })}
      types={Types}
    />
  </div>
)
