import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${({ theme }) => theme['gray-700']};
    padding: 2rem 1rem;
  }
  border-radius: 5px;
`

export const Separator = styled.div`
  padding: 1rem 0;
  color: ${({ theme }) => theme['green-500']};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StartCountdownButton = styled.button`
  width: 100%;
  border-radius: 8px;
  border: none;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme['green-500']};
  cursor: pointer;
  color: ${({ theme }) => theme['gray-100']};

  transition: all ease-in-out 250ms;

  &:not(:disabled):hover {
    color: ${({ theme }) => theme['green-500']};
    background-color: ${({ theme }) => theme['gray-100']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StopCountdownButton = styled.button`
  width: 100%;
  border-radius: 8px;
  border: none;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme['red-500']};
  cursor: pointer;
  color: ${({ theme }) => theme['gray-100']};

  transition: all ease-in-out 250ms;

  &:not(:disabled):hover {
    color: ${({ theme }) => theme['red-500']};
    background-color: ${({ theme }) => theme['gray-100']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
