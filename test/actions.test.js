import { h, app } from "../src"

const mockDelay = () => new Promise(resolve => setTimeout(resolve, 50))

beforeEach(() => {
  document.body.innerHTML = ""
})

test("sync updates", done => {
  const state = {
    value: 1
  }

  const actions = {
    up: () => state => ({ value: state.value + 1 })
  }

  const view = state =>
    h(
      "div",
      {
        oncreate() {
          expect(document.body.innerHTML).toBe(`<div>2</div>`)
          done()
        }
      },
      state.value
    )

  const main = app(state, actions, view, document.body)

  main.up()
})

test("async updates", done => {
  const state = {
    value: 2
  }

  const actions = {
    up: data => state => ({ value: state.value + data }),
    upAsync: data => (state, actions) =>
      mockDelay().then(() => actions.up(data))
  }

  const view = state =>
    h(
      "div",
      {
        oncreate() {
          expect(document.body.innerHTML).toBe(`<div>2</div>`)
        },
        onupdate() {
          expect(document.body.innerHTML).toBe(`<div>3</div>`)
          done()
        }
      },
      state.value
    )

  const main = app(state, actions, view, document.body)

  main.upAsync(1)
})

test("call action within action", done => {
  const state = {
    value: 1
  }

  const actions = {
    upAndFoo: () => (state, actions) => {
      actions.up()
      return {
        foo: true
      }
    },
    up: () => state => ({
      value: state.value + 1
    })
  }

  const view = state =>
    h(
      "div",
      {
        oncreate() {
          expect(state).toEqual({
            value: 2,
            foo: true
          })
          expect(document.body.innerHTML).toBe(`<div>2</div>`)
          done()
        }
      },
      state.value
    )

  const main = app(state, actions, view, document.body)

  main.upAndFoo()
})

test("actions receive current", done => {
  const state = { value: 1 }
  const actions = {
    up: () => (state, actions, { getState, getActions }) => {
      expect(getState().value).toBe(1)
      expect(Object.keys(getActions())).toEqual(["up"])
      done()
    }
  }
  const view = (state, actions) =>
    h("div", {
      oncreate() {
        actions.up()
      }
    })
  app(state, actions, view, document.body)
})
