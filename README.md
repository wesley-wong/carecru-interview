# Carecru Tech Interview

### How to install:

  1. ``npm install``

  2. ``rethinkdb`` (assuming you have rethinkdb installed globally)

  3. ``npm run db-setup``

  4. ``npm start``

  5. navigate to [localhost:3001](http://localhost:3001/)


### My Thought process:

First off, I wanted to learn rethinkdb. I began with a tutorial. I went though a couple before I found Pulse.

I used the Pulse template from [GitHub](https://github.com/GordyD/3ree)

What I did:

  * converted some syntax to ES6, although most of it was already done, mostly require -> import
  * simplified library by removing unnecessary (for this project) files/code
    * removed production server
    * combined start-dev.js with server.babel.js
    * changed database name
      * in config/ & db-setup.js
      * change table names in server/api/service/event.js
    * redux-devtools, was visible by default on the development server, so I found a way to hide it on default. You can bring it up with ctrl-h
    * removed unnecessary components
      * otherEvents
      * eventTicker
      * asyncbar
  * in universal/components/EntryInput.js
    * added input for journal title, and added a handler to change state
    * modified input for journal entry to textarea
    * add wordcount to handler for textarea
    * added sentiment score calculation to both handlers for happiness rating and textarea change. This updates sentiment score stored in state
    * added live calculation of sentiment score
  * in universal/components/EntryItem.js
    * pass down title, wordcount, and sentiment value to to eventInput
    * displayed title
  * in universal components/EntryList.js
    * sorts journal entries by sentiment score

  * Changed Naming scheme
    * Pulse -> CareCru
    * pulseApp -> CareCruApp
    * myEvents -> journalEntries
    * EventInput -> EntryInput
    * EventItem -> EntryItem
    * EventList -> EntryList
    * EventTicker -> EntryTicker
    * PulseActions -> CareCruActions
    * ActionTypes -> converted all EVENTS -> ENTRIES and EVENT to ENTRY
    * pulse (a reducer) -> entryReducer
    * changed api function names

  * styled page
    * changed favicon, title
    * added image to header, centered with flexbox
    * styled textarea to be 5 rows
    * increased width to 100% for title input & textarea
    * added seperator

  * in universal/actions
    * changed superagent module to axios

While a lot of this code is taken from a secondary source, I believe that I have changed it significantly to display my knowledge and to meet the requirements given.

Thanks for your consideration.



