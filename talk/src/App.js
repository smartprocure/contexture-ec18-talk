import _ from 'lodash/fp'
import * as F from 'futil-js'
import React from 'react'
import {Impress, Step} from 'react-impressjs'
import 'react-impressjs/styles/react-impressjs.css'
import Markdown from 'react-markdown'
import Highlight from 'react-highlight'
import 'highlight.js/styles/hybrid.css'

import AdvancedSearch from './advanced-search'
import SearchGUI from './tree'
import * as snippets from './snippets'
import {Flex} from './flex'

import {
  Transform,
  layout,
  circle,
  cylinder,
  OLayout,
  XLayout,
  YLayout,
  CLayout,
} from './layout'

let title = {
  color: '#EEE',
  textShadow: '0px 1px 1px black',
}
let Title = ({children, ...props}) => (
  <h1
    style={{
      textAlign: 'center',
      ...title,
    }}
    {...props}>
    {children}
  </h1>
)
let Subtitle = ({children, style, ...props}) => (
  <h4 style={{...title, ...style}} {...props}>
    {children}
  </h4>
)

let Card = ({children, style, ...props}) => (
  <div
    style={{
      backgroundColor: '#333',
      color: '#AAA',
      padding: '20px',
      borderRadius: '10px',
      ...style,
    }}
    {...props}>
    {children}
  </div>
)
let Combo = ({children = [], ...props}) => (
  <div {...props}>
    <h4 style={title}>{children[0]}</h4>
    <div style={{display: 'flex'}}>
      <Card
        style={{
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
          flex: '1',
        }}>
        {children[1]}
      </Card>
      <div
        style={{
          background: '#222',
          borderRadius: '10px',
          padding: '20px',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
          color: '#666',
          flex: '1',
        }}>
        {children[2]}
      </div>
    </div>
  </div>
)

let ImageSlide = ({name, src}) => (
  <div>
    <h4 style={title}>{name}</h4>
    <img width="900" src={src} />
  </div>
)

let colors = {
  green: {
    dark: '#143',
    light: '#175',
  },
  purple: {
    dark: '#449',
    light: '#6ad',
  },
  red: {
    dark: '#944',
    light: '#f8c',
  },
  grey: {
    dark: '#666',
    light: '#AAA',
  },
  default: {
    light: '#AAA',
  },
}
let R = 'red'
let P = 'purple'
let G = 'green'
let Y = 'grey'
let boxWidth = 50
let boxGutter = 5
let Box = ({color = 'default', style}) => (
  <div
    style={{
      background: colors[color].dark,
      border: `solid 3px ${colors[color].light}`,
      width: `${boxWidth}px`,
      height: '50px',
      borderRadius: '10px',
      margin: `${boxGutter}px`,
      ...style,
    }}
  />
)
let HighlightedTree = ({highlight = {}}) => (
  <div>
    <div
      style={{
        paddingLeft: `${1.5 * boxWidth + 4 * boxGutter + boxWidth / 2}px`,
      }}>
      <Box color={highlight[0]} />
    </div>
    <Flex
      style={{
        paddingLeft: `${boxWidth / 2 + 2 * boxGutter}px`,
      }}>
      <Box color={highlight[1]} />
      <div style={{paddingLeft: `${boxWidth + 2 * boxGutter + boxWidth}px`}}>
        <Box color={highlight[2]} />
      </div>
    </Flex>
    <Flex>
      <Box color={highlight[3]} />
      <Box color={highlight[4]} />
      <Box style={{marginLeft: `${boxWidth}px`}} color={highlight[5]} />
      <Box color={highlight[6]} />
    </Flex>
  </div>
)
let TreeExplanation = ({highlight = {}, active = ''}) => (
  <Combo className="fadesIn">
    <span>Trees</span>
    <div>
      <p style={{color: colors.grey[active == 'node' ? 'light' : 'dark']}}>
        Nodes
      </p>
      <p style={{color: colors.red[active == 'root' ? 'light' : 'dark']}}>
        Root
      </p>
      <p style={{color: colors.green[active == 'leaf' ? 'light' : 'dark']}}>
        Leaves
      </p>
      <p style={{color: colors.purple[active == 'walk' ? 'light' : 'dark']}}>
        Walking
      </p>
    </div>
    <div>
      <HighlightedTree highlight={highlight} />
      <div style={{textAlign: 'right', paddingTop: '50px'}}>
        <img
          width="100"
          src="https://user-images.githubusercontent.com/8062245/28718527-796382ac-7374-11e7-98a3-9791223042a4.png"
        />
      </div>
    </div>
  </Combo>
)

let boldIf = x => (x ? {fontWeight: 'bold'} : {})
let ReactorTree = ({highlight, active = ''}) => (
  <Combo className="fadesIn">
    <span>Client</span>
    <div>
      <div style={boldIf(active == 'others')}>Others Reactor</div>
      <div style={boldIf(active == 'self')}>Self Reactor</div>
    </div>
    <div>
      <HighlightedTree highlight={highlight} />
    </div>
  </Combo>
)

let SearchAnatomy = ({step = 0}) => (
  <Combo className="fadesIn">
    <span>Search Anatomy</span>
    <div>
      <p>Filters</p>
      {step > 0 && <p>Queries</p>}
      {step > 1 && <p>Results</p>}
      {step > 2 && <p>Aggregations</p>}
    </div>
    <div>
      <Flex>
        <Box />
        <Box />
        <Box />
        <Box color="red" />
      </Flex>
      {step > 0 && (
        <Flex>
          <Box />
          <Box />
          <Box color="purple" />
          <Box color="red" />
        </Flex>
      )}
      {step > 1 && (
        <Flex>
          <Box color="grey" />
          <Box color="grey" />
          <Box color="grey" />
          <Box />
        </Flex>
      )}
      {step > 2 && (
        <Flex>
          <Box color="green" style={{borderRadius: '10000px'}} />
        </Flex>
      )}
    </div>
  </Combo>
)

export default () => (
  <Impress progress={true}>
    {XLayout([
      <Card>
        <SearchGUI />
      </Card>,
      <Title>Building Highly Interactive Data Exploration Interfaces</Title>,
      <Title>Hi.</Title>,
      YLayout([
        <Subtitle className="fadesInOnly">
          <b>Understanding</b> data sets
        </Subtitle>,
        <Subtitle className="fadesInOnly">
          Choices with <b>context</b>
        </Subtitle>,
      ]),
      layout(i => ({z: i * -2000}))([
        <Title>Examples</Title>,
        <div />,
        CLayout([
          <ImageSlide
            name="Nested Operators"
            src="https://raw.githubusercontent.com/smartprocure/contexture-ec18-talk/master/screenshots/Nested-Operators.png"
          />,
          <ImageSlide
            name="Ecommerce Style Search"
            src="https://raw.githubusercontent.com/smartprocure/contexture-ec18-talk/master/screenshots/Ecommerce-Style-Search.png"
          />,
          <ImageSlide
            name="Nested Aggregations"
            src="https://raw.githubusercontent.com/smartprocure/contexture-ec18-talk/master/screenshots/Nested-Aggregations.png"
          />,
          <ImageSlide
            name="Field Picker"
            src="https://raw.githubusercontent.com/smartprocure/contexture-ec18-talk/master/screenshots/Field-Picker.png"
          />,
          <ImageSlide
            name="Charts"
            src="https://raw.githubusercontent.com/smartprocure/contexture-ec18-talk/master/screenshots/Charts.png"
          />,
          <ImageSlide
            name="Dashboard"
            src="https://raw.githubusercontent.com/smartprocure/contexture-ec18-talk/master/screenshots/Dashboard.png"
          />,
          <ImageSlide
            name="Advanced Wrench Menu"
            src="https://raw.githubusercontent.com/smartprocure/contexture-ec18-talk/master/screenshots/Advanced-Wrench-Menu.png"
          />,
          <ImageSlide
            name="Agg Builder"
            src="https://raw.githubusercontent.com/smartprocure/contexture-ec18-talk/master/screenshots/Agg-Builder.png"
          />,
          <ImageSlide
            name="Admin Tool"
            src="https://raw.githubusercontent.com/smartprocure/contexture-ec18-talk/master/screenshots/Admin-Tool.png"
          />,
        ]),
      ]),
      layout(i => ({}))([
        <Title className="popsIn">The Journey</Title>,
        <Card className="popsIn">
          <SearchGUI
            hide={{dateChart: true, actors: true, genre: true, score: true}}
          />
        </Card>,
        <Card className="popsIn">
          <SearchGUI hide={{dateChart: true, actors: true, genre: true}} />
        </Card>,
        <Card className="popsIn">
          <SearchGUI hide={{dateChart: true, facetFilter: true}} />
        </Card>,
        <Card className="popsIn">
          <SearchGUI hide={{dateChart: true}} />
        </Card>,
        <Card className="popsIn">
          <SearchGUI />
        </Card>,
        <Combo className="popsIn">
          <span>Operation</span>
          <div>
            <img
              width="400"
              src="http://bitterempire.com/wp-content/uploads/2015/01/hey-everybody.jpg"
            />
          </div>
          <div style={{fontSize: '24px'}}>
            <p>"The knee bone's connected to the... something.</p>
            <p>The something's connected to the red thing.</p>
            <p>The red thing's connected to my wristwatch. Uh oh."</p>
            <br />
            <p>- During Homer's Triple Bypass</p>
          </div>
        </Combo>,
      ]),
      YLayout([
        <Subtitle className="fadesInOnly">What if?</Subtitle>,
        <Subtitle className="fadesInOnly">
          just <b>node</b>s
        </Subtitle>,
        <Subtitle className="fadesInOnly">
          with <b>providers</b> for databases
        </Subtitle>,
        <Subtitle className="fadesInOnly">
          that update with <b>reactors</b>
        </Subtitle>,

        layout(i => ({x: i * 100 - 400, rotateZ: -90, y: 400}))([
          <Subtitle className="fadesInOnly" style={{textAlign: 'right'}}>
            abstracting
          </Subtitle>,
          <Subtitle className="fadesInOnly" style={{textAlign: 'right'}}>
            queries
          </Subtitle>,
          <Subtitle className="fadesInOnly" style={{textAlign: 'right'}}>
            filters
          </Subtitle>,
          <Subtitle className="fadesInOnly" style={{textAlign: 'right'}}>
            results
          </Subtitle>,
          <Subtitle className="fadesInOnly" style={{textAlign: 'right'}}>
            aggregations
          </Subtitle>,
          <Subtitle className="fadesInOnly" style={{textAlign: 'right'}}>
            into a <b>tree</b>
          </Subtitle>,
        ]),

        layout(i => ({y: -i * 100, rotateZ: 180, x: -900}))([
          <Subtitle className="fadesInOnly">
            using this to do cool things
          </Subtitle>,
          <Subtitle className="fadesInOnly">automatic updates</Subtitle>,
          <Subtitle className="fadesInOnly">pause/resume</Subtitle>,
          <Subtitle className="fadesInOnly">cascading (joins)</Subtitle>,
          <Subtitle className="fadesInOnly">so much more</Subtitle>,
        ]),
      ]),

      layout(i => ({z: i * 1000}))([
        <Title>Let's take a step back</Title>,
        OLayout([
          layout(_.noop)([
            <SearchAnatomy />,
            <SearchAnatomy step={1} />,
            <SearchAnatomy step={2} />,
            <SearchAnatomy step={3} />,
          ]),
          <Combo>
            <span>Boolean Logic</span>
            <div>
              <p>AND</p>
              <p>OR</p>
              <p>NOT</p>
            </div>
            <div>
              <p style={{color: colors.purple.light}}>All</p>
              <p style={{color: colors.green.light}}>Any</p>
              <p style={{color: colors.red.light}}>None</p>
            </div>
          </Combo>,
          layout()([
            <TreeExplanation />,
            <TreeExplanation
              active="node"
              highlight={{0: Y, 1: Y, 2: Y, 3: Y, 4: Y, 5: Y, 6: Y}}
            />,
            <TreeExplanation active="root" highlight={{0: R}} />,
            <TreeExplanation
              active="leaf"
              highlight={{3: G, 4: G, 5: G, 6: G}}
            />,
            <TreeExplanation active="walk" highlight={{0: P, 2: P, 5: P}} />,
          ]),
          <Combo>
            <span>Data Services</span>
            <div>
              <p>Relational DB</p>
              <p>Document DB</p>
              <p>Any API</p>
            </div>
            <div>
              <Flex>
                <Box />
                <Box color="green" />
                <Box />
                <Box color="purple" />
              </Flex>
              <Flex>
                <Box color="grey" />
                <Box />
                <Box color="red" />
                <Box />
              </Flex>
              <Flex>
                <Box />
                <Box color="purple" />
                <Box />
                <Box color="grey" />
              </Flex>
            </div>
          </Combo>,
        ]),
      ]),

      layout(i => ({rotateX: -i * 20, y: i * 100}))([
        <Subtitle>Server DSL</Subtitle>,
        <div />,
        <Card className="fadesInOnly">
          <Subtitle>Group</Subtitle>
          <Highlight className="js">{`{
  key: 'uniqueIdentifier',
  type: 'group',
  schema: 'schemaName',
  join: 'and|or|not',
  children: [Group|LeafNode],
}`}</Highlight>
        </Card>,
        <Card className="fadesInOnly">
          <Subtitle>LeafNode</Subtitle>
          <Highlight className="js">{`{
  key: 'uniqueIdentifier',
  type: 'typeName',
  schema: 'schemaName',
  typeFields: 'typeValues',
  context: {
    resultFields: 'resultValues'
  }
}`}</Highlight>
        </Card>,
        <Card className="fadesInOnly">
          <Subtitle>Example</Subtitle>
          <Highlight className="js text-xs">{`{
    key: 'searchRoot',
    type: 'group',
    join: 'and',
    schema: 'imdb',
    children: [{
        key: 'searchQuery',
        type: 'query',
        field: 'title',
        query: 'star',
    }, {
        key: 'searchFacet',
        type: 'facet',
        field: 'genres.keyword',
        values: ['Sci-Fi'],
        context: {
            options: [],
        },
    }, {
        key: 'searchRange',
        type: 'number',
        field: 'metaScore',
        min: 0,
        max: 100,
    }, {
        key: 'searchResults',
        type: 'results',
        pageSize: 6,
        page: 1,
        context: {
            results: [],
            totalRecords: null,
        },
    }],
}`}</Highlight>
        </Card>,
      ]),

      layout(i => ({}))([
        YLayout([
          <Title className="fadesIn">Client</Title>,
          <Subtitle className="fadesIn">
            Actions that <b>dispatch</b> events to <b>reactors</b>
          </Subtitle>,
        ]),
        <ReactorTree />,
        <ReactorTree active="others" highlight={{5: P}} />,
        <ReactorTree active="others" highlight={{2: P, 5: R, 6: G}} />,
        <ReactorTree
          active="others"
          highlight={{0: P, 1: G, 2: R, 3: G, 4: G, 5: R, 6: G}}
        />,
        <ReactorTree
          active="others"
          highlight={{0: R, 1: G, 2: R, 3: G, 4: G, 5: R, 6: G}}
        />,
        <ReactorTree active="self" highlight={{5: P}} />,
        <ReactorTree active="self" highlight={{2: P, 5: G, 6: R}} />,
        <ReactorTree
          active="self"
          highlight={{0: P, 1: R, 2: G, 3: R, 4: R, 5: G, 6: R}}
        />,
        <ReactorTree
          active="self"
          highlight={{0: G, 1: R, 2: G, 3: R, 4: R, 5: G, 6: R}}
        />,
        // PAUSE/RESUME????
      ]),

      YLayout([
        <Subtitle>Usage Notes</Subtitle>,
        ..._.map(
          x => (
            <Card
              className="text-xs fadesInOnly"
              style={{overflow: 'scroll', height: '600px'}}>
              <Highlight className="js">{x}</Highlight>
            </Card>
          ),
          [snippets.service, snippets.client, snippets.gui, snippets.customType]
        ),
      ]),

      layout(i => ({y: i * 100, rotateY: 2 * (i % 2 === 0 ? 1 : -1)}))([
        <Transform data={{y: -100}}>
          <Title>More Cool Stuff</Title>
        </Transform>,
        <Subtitle className="fadesInOnly">Global debouncing</Subtitle>,
        <Subtitle className="fadesInOnly">
          Dropping intermediate results
        </Subtitle>,
        <Subtitle className="fadesInOnly">State management/flags</Subtitle>,
        <Subtitle className="fadesInOnly">Example types</Subtitle>,
        <Subtitle className="fadesInOnly">Cascading (cross db joins)</Subtitle>,
        <Subtitle className="fadesInOnly">
          Providers (new dbs/services)
        </Subtitle>,
      ]),

      layout(i => ({y: i * 1000}))([
        <Subtitle>Implementation Notes</Subtitle>,
        <div>
          <Subtitle>
            Server Algorithm{' '}
            <a href="https://github.com/smartprocure/contexture">Github</a>
          </Subtitle>
          <Card className="text-xs alg">
            <Markdown
              source={`
For each of these steps, walk the tree in a parent-first DFS traversal, with each function optionally asynchronous by returning a promise. Along the way, intermediate data is added to contexts on an object called \`_meta\`. For each context, every type/processor combination is pulled on the fly, meaning it will use the correct local \`Provider\` and \`Type\` info even if some contexts have different schemas

- Clean/Prep everything (adding \`_meta\`, etc)
- Add \`materializedPaths\` (used later by \`relevantFilters\`)
- Run \`filter\` for each item if it \`hasValue\`
- Add \`relevantFilters\` for each item (all filters combined in their groups by the \`groupCombinator\` except for their own filters and any filters related to them in the tree via an \`OR\`
- Get \`result\` for each item if it \`hasValidContext\` and is not \`filterOnly\` (as determined by the client event architecture), passing a pre curried search function that includes \`relevantFilters\` so types don't need to worry about it - logging each request on \`_meta.requests\`
- Combine \`took\` values for all requests to get an accurate number and pass results to \`onResult\` as they come in if they are defined
- Unless in \`debug\` mode, scrub off \`_meta\` from the response
`}
            />
          </Card>
        </div>,
        <div>
          <Subtitle>
            Client Algorithm{' '}
            <a href="https://github.com/smartprocure/contexture-client">
              Github
            </a>
          </Subtitle>
          <Card className="text-xs alg">
            <Markdown
              source={`
- An action method is called at the top level which:
  - Interally mutates the tree
  - Makes one or more calls to \`dispatch\` with relevant event data
- For each dispatched event:
  - Validate the entire tree (an async operation)
  - Bubble up the tree from the affected node up to the root, and for each node in the path:
    - Determine affected nodes by calling the reactor for the current event type
    - Mark each affected node for update, or if it is currently paused, mark that it missed updates
  - Trigger an update (which is debounced so it does not run right away)
- When the debounce elapses, an update is triggered:
  - Check if the update should be blocked
    - There may be no affected nodes
    - Some nodes might have erros on validation
    - There may be no nodes that have values and the config doesn't allow blank searches
  - Prepare for update - on each node that's markedForUpdate:
    - Set the lastUpdateTime to now (to enable dropping stale results later in this process)
    - Set \`updating\` to true
  - Serialize the search, omitting all temporary state except lastUpdateTime (which the sever will effectively echo back) and deleting nodes that are filter only with no value
  - Execute an actual contexture search
  - For each node in the response:
    - If the path isn't found in the current tree, ignore it
    - If the response is empty, ignore it
    - If the response has a lastUpdateTime earlier than the node in the current tree, ignore it (because it's stale)
    - If not ignoring the update, mutate the node with the result and set \`updating\` to false
- After all of this, the promise for the action/dispatch resolves (so you can await the entire process)
`}
            />
          </Card>
        </div>,
      ]),

      layout(i => ({y: i * 1000}))([
        <Subtitle>Roadmap</Subtitle>,
        <Subtitle className="fadesInOnly">Example Types</Subtitle>,
        <Subtitle className="fadesInOnly">Native "in"</Subtitle>,
        <Subtitle className="fadesInOnly">CRUD + Autoform</Subtitle>,
        <Subtitle className="fadesInOnly">Kibana & Beyond</Subtitle>,
        <Card className="fadesInOnly" style={{fontSize: '16px'}}>
          <AdvancedSearch />
        </Card>,
      ]),

      <div>
        <p style={title}>
          Contexture
          <small>
            <a
              style={{marginLeft: '10px'}}
              href="http://github.com/smartprocure/contexture">
              Github
            </a>
            <a
              style={{marginLeft: '10px'}}
              href="http://npmjs.com/package/contexture">
              NPM
            </a>
          </small>
        </p>
        <p style={title}>
          Contexture Client
          <small>
            <a
              style={{marginLeft: '10px'}}
              href="http://github.com/smartprocure/contexture-client">
              Github
            </a>
            <a
              style={{marginLeft: '10px'}}
              href="http://npmjs.com/package/contexture-client">
              NPM
            </a>
          </small>
        </p>
        <p style={title}>
          Contexture Elasticsearch
          <small>
            <a
              style={{marginLeft: '10px'}}
              href="http://github.com/smartprocure/contexture-elasticsearch">
              Github
            </a>
            <a
              style={{marginLeft: '10px'}}
              href="http://npmjs.com/package/contexture-elasticsearch">
              NPM
            </a>
          </small>
        </p>
        <p style={title}>
          Contexture Mongo
          <small>
            <a
              style={{marginLeft: '10px'}}
              href="http://github.com/smartprocure/contexture-mongo">
              Github
            </a>
            <a
              style={{marginLeft: '10px'}}
              href="http://npmjs.com/package/contexture-mongo">
              NPM
            </a>
          </small>
        </p>
        <p style={title}>
          Contexture React
          <small>
            <a
              style={{marginLeft: '10px'}}
              href="http://github.com/smartprocure/contexture-react">
              Github
            </a>
            <a
              style={{marginLeft: '10px'}}
              href="http://npmjs.com/package/contexture-react">
              NPM
            </a>
          </small>
        </p>
        <p style={title}>
          Contexture IMDB
          <small>
            <a
              style={{marginLeft: '10px'}}
              href="http://github.com/smartprocure/contexture-imdb">
              Github
            </a>
          </small>
        </p>
        <p style={title}>
          Contexture Talk
          <small>
            <a
              style={{marginLeft: '10px'}}
              href="http://github.com/smartprocure/contexture-ec18-talk">
              Github
            </a>
          </small>
        </p>
        <p style={title}>
          Futil
          <small>
            <a
              style={{marginLeft: '10px'}}
              href="http://github.com/smartprocure/futil-js">
              Github
            </a>
          </small>
        </p>
      </div>,

      <Title>Thank you.</Title>,
      YLayout([
        <Subtitle>Questions?</Subtitle>,
        <Subtitle>Comments?</Subtitle>,
        <Subtitle>Snide Remarks?</Subtitle>,
      ]),
    ])({x: 0, y: 0})}
    <Step id={'overview'} data={{z: 10000, x: 10000}} />
  </Impress>
)
