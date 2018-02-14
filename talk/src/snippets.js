export let gui = `
import React from 'react'
import _ from 'lodash/fp'
import * as F from 'futil-js'
import {observer} from 'mobx-react'
import Contexture from './contexture-mobx'
import {Flex} from './flex'
import {Facet, Range, Query, ResultCount} from './SearchComponents'

let tree = Contexture({
  key: 'searchRoot',
  type: 'group',
  join: 'and',
  schema: 'imdb',
  children: [
    {
      key: 'searchQuery',
      type: 'query',
      field: 'title',
      query: '',
    },
    {
      key: 'searchFacet',
      type: 'facet',
      field: 'genres.keyword',
      fieldMode: 'word',
      context: {
        options: [],
      },
    },
    {
      key: 'searchRange',
      type: 'number',
      field: 'metaScore',
      min: 0,
      max: 100,
    },
    {
      key: 'results',
      type: 'results',
      pageSize: 6,
      page: 1,
      context: {
        response: {
          results: [],
          totalRecords: null,
        },
      },
    },
  ],
})

let IMDBCards = observer(({node}) => (
  <Flex style={{flexWrap: 'wrap', justifyContent: 'center'}}>
    {_.map(
      ({_id, _source: {title, poster}}) => (
        <div key={_id} style={{margin: '5px', textAlign: 'center'}}>
          <img src={poster} width="180" height="270" />
          <div style={{width: '180px'}}>{title}</div>
        </div>
      ),
      node.context.response.results
    )}
  </Flex>
))

export default observer(() => (
  <div style={{fontSize: '18px'}}>
    <Query
      style={{
        width: '700px',
        fontSize: '18px',
      }}
      node={tree.getNode(['searchRoot', 'searchQuery'])}
      tree={tree}
    />
    <Flex>
      <div style={{flex: 1}}>
        <div style={{margin: '5px'}}>
          <b>MetaScore</b>
          <Range
            style={{padding: '10px'}}
            node={tree.getNode(['searchRoot', 'searchRange'])}
            tree={tree}
          />
        </div>
        <div style={{margin: '5px'}}>
          <b>Genre</b>
          <Facet
            style={{padding: '10px'}}
            node={tree.getNode(['searchRoot', 'searchFacet'])}
            tree={tree}
          />
        </div>
      </div>
      <div style={{flex: 4}}>
        <ResultCount node={tree.getNode(['searchRoot', 'results'])} />
        <IMDBCards node={tree.getNode(['searchRoot', 'results'])} />
      </div>
    </Flex>
  </div>
))

`
export let service = `
// Lifted from contexture-imdb

import _ from 'lodash/fp'
import Contexture from 'contexture'
import elasticsearch from 'elasticsearch-browser'
import contextureES from 'contexture-elasticsearch'
import contextureESTypes from 'contexture-elasticsearch/src/types'

export default Contexture({
  schemas: {
    imdb: {
      elasticsearch: {
        index: 'movies',
        type: 'movie',
      },
    },
  },
  providers: {
    elasticsearch: contextureES({
      getClient: _.memoize(() =>
        elasticsearch.Client({
          apiVersion: '6.0',
          host:
            'http://35.163.200.173:9200/'
            // 'https://y85ukgvi1w:4s1cvayng9@first-cluster-5089088915.us-east-1.bonsaisearch.net',
        })
      ),
      types: contextureESTypes(),
    }),
  },
})`

export let client = `
import _ from 'lodash/fp'
import {ContextTree} from 'contexture-client'
import {observable, toJS, extendObservable} from 'mobx'
import searchService from './searchService'
import types from './example-type-reactors'

export default _.flow(
  observable,
  ContextTree({
    service: async dto => ({
      data: await searchService(dto),
    }),
    debounce: 500,
    types,
    // debug: true,
    snapshot: toJS,
    extend: extendObservable,
  })
)
`

export let customType = `
// Custom type structure on the server
module.exports = {
  filter(node, schema) {
    // ...
    return { stuff }
  },
  async result(node, search, schema) {
    //...
    await search({ stuff })
    // ...
    return {
      stuff // <- goes in context
    }
  }
}
`