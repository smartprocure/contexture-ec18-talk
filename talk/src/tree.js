import React from 'react'
import _ from 'lodash/fp'
import * as F from 'futil-js'
import {observer, Provider} from 'mobx-react'
import Contexture from './contexture/contexture-mobx'
import {Flex} from './flex'
import {
  Facet,
  Range,
  Query,
  ResultCount,
  DateHistogram,
} from './contexture/components'

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
      optionsFilter: '',
      context: {
        options: [],
      },
    },
    {
      key: 'searchActors',
      type: 'facet',
      field: 'actors.keyword',
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
    {
      key: 'releases',
      type: 'dateHistogram',
      key_field: 'released',
      value_field: 'imdbVotes',
      interval: '3650d',
      context: {
        entries: [],
        maxDate: null,
        minDate: null,
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
let formatYear = x => new Date(x).getFullYear() + 1

export default observer(({hide = {}}) => (
  <Provider tree={tree}>
    <div style={{fontSize: '18px'}}>
      <Query
        style={{
          width: '700px',
          fontSize: '18px',
        }}
        node={tree.getNode(['searchRoot', 'searchQuery'])}
      />
      <Flex>
        <div style={{flex: 1}}>
          {!hide.score && (
            <div style={{margin: '5px'}}>
              <b>MetaScore</b>
              <Range
                style={{padding: '10px'}}
                node={tree.getNode(['searchRoot', 'searchRange'])}
              />
            </div>
          )}
          {!hide.genre && (
            <div style={{margin: '5px'}}>
              <b>Genre</b>
              <Facet
                hide={hide}
                style={{padding: '10px'}}
                node={tree.getNode(['searchRoot', 'searchFacet'])}
              />
            </div>
          )}
          {!hide.actors && (
            <div style={{margin: '5px'}}>
              <b>Actors</b>
              <Facet
                hide={hide}
                style={{padding: '10px'}}
                node={tree.getNode(['searchRoot', 'searchActors'])}
              />
            </div>
          )}
        </div>
        <div style={{flex: 4}}>
          <ResultCount node={tree.getNode(['searchRoot', 'results'])} />
          {!hide.dateChart && (
            <DateHistogram
              node={tree.getNode(['searchRoot', 'releases'])}
              format={formatYear}
            />
          )}
          <IMDBCards node={tree.getNode(['searchRoot', 'results'])} />
        </div>
      </Flex>
    </div>
  </Provider>
))
