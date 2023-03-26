// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup(...args) {
  const result = {}
  function TestComponent() {
    Object.assign(result, useCounter(...args))
    return null
  }
  render(<TestComponent />)
  return result
}
test('exposes the count and increment/decrement functions', async () => {
  const result = setup()
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('allows customization of the initial count', async () => {
  const startCount = 3
  const result = setup({initialCount: startCount})
  expect(result.count).toBe(startCount)
  act(() => result.increment())
  expect(result.count).toBe(startCount + 1)
  act(() => result.decrement())
  expect(result.count).toBe(startCount)
})

test('allows customization of the step', async () => {
  const stepSize = 3
  const result = setup({step: stepSize})
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(stepSize)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */
