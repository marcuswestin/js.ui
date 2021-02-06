# js.ui

js.ui provides an idiomatic approach to creating UI code in vanilla JS.
It is designed to address a set of specific shortcomings of JSX.
Notably, JSX falls short on two fronts:
  - The parameters API
      - Klunky and difficult to specify types
      - inability to pass on props wholesapce
      - does not fit neatly with typescript's types
  - Conditional rendering
      - it inevitably ends up leading to errors
      - TOD
It does however handle some things that we need to manually account for
  - Keys
     - without JSX, we need to manually name every element in the UI tree
     - JSX resolves this by auto-generating an incrementing number as key for every
         child element that has no key

### Development

  yarn
  yarn link
  # in other project using js.ui:
  yarn link js.ui
