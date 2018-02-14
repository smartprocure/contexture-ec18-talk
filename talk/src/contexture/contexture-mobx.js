import _ from 'lodash/fp'
import {ContextTree, exampleTypes} from 'contexture-client'
import {observable, toJS, extendObservable} from 'mobx'
import service from './service'

export default _.flow(
  observable,
  ContextTree({
    service: async dto => ({
      data: await service(dto),
    }),
    debounce: 500,
    types: _.omit(['default'], exampleTypes),
    // debug: true,
    snapshot: toJS,
    extend: extendObservable,
  })
)
