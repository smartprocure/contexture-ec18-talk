_These notes were just things I used to keep track of specific talking points I wanted to remember_


# intro

- who am I / SP , what we do

- what is a DEI?

[SLIDE] - UNDERSTAND (e.g. USUALLY search + agg)
[SLIDE] - CONTEXT
- resturaunt: "How do I know what to order if I don't know what's on the menu"
- mulitple choice easier than essay questions
- the false promise of the search box
- Context each thing

[EXAMPLES] STOP AT ADMIN TOOLS

we built an ecosystem of tools to make this kind of interface easy to build

in this talk, we'll get you thinking about the kinds of ways you can give users more info in their filters

so before we get into anything about what we built, let dig into the _why_.

Let's design an interface together:





# journey
-- live search, no space
**FACETS EXCLUDE THEMSELVES**
** DEBOUNCE**

tabs/paused
dynaically add filters
in advanced, types change too



## Idea
what if we define some generic structures instead?
- first, could we combine filter/agg into some kind of *node*?
[node]
- could we have those *nodes* filter the data set, but also have an easy way to provide results _without_ that filter?
[provider]
- could we implement different *providers* to abstract the details about different databases, and just deal with some custom node *types*
[reactpr]
- and then, can we automate updating all of these *nodes* by just defining how to react to changes to some of those node properties?
  - with some generic *reactors* that say which nodes update? all the other nodes? just this one?


- And that is really main idea. 
[abstracting]
Contexture is about abstracting queries, filters, results, and aggregations into one tree

[features]
- and leveraging this generic structure to do interesting things like automating hyper targeted updates to nodes, pause.resume, cascading searches to perform joins across database, and all kinds of features





# Prereqs
hold on.
now, before we dive into the real technical stuff, let's make sure we're all on the same page.
I said some words that mean things, but lets be sure they mean the same things to me as they do to you

[search]
filter + query -> criteria
results + aggs -> context

[bool]
AND vs OR english
mention any/all/none

[tree]
data structure from cs
hiefrarchy
*bubble up*
FUTIL, lodash site, maintainers here


[DB]
table, collection, index -> model/schema
mention elasticsearch as a full text search db
could be keebler elves






# server
its a tree
leaves have results and filters
non leaves "groups" are and/or/not on children
operate on a "schema" (data service -> collection/tabel/index)


# client
**actions that dispatch events to reactors**
reactors
mention paused
