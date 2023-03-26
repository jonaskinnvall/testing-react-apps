// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function UseCounterExample(props) {
  const {count, increment, decrement} = useCounter(props)
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<UseCounterExample />)

  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent('Current count: 0')

  await userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')

  await userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})

test('starts with specified initalCount', async () => {
  const startCount = 3
  render(<UseCounterExample initialCount={startCount} />)

  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent(`Current count: ${startCount}`)

  await userEvent.click(increment)
  expect(message).toHaveTextContent(`Current count: ${startCount + 1}`)

  await userEvent.click(decrement)
  expect(message).toHaveTextContent(`Current count: ${startCount}`)
})

test('increments and decrements with specified step', async () => {
  const startCount = 0
  const stepSize = 3
  render(<UseCounterExample initialCount={startCount} step={stepSize} />)

  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent(`Current count: ${startCount}`)

  await userEvent.click(increment)
  expect(message).toHaveTextContent(`Current count: ${startCount + stepSize}`)

  await userEvent.click(decrement)
  expect(message).toHaveTextContent(`Current count: ${startCount}`)
})

/* eslint no-unused-vars:0 */
