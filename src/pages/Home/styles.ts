import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme['gray-100']};
  font-size: 1.15rem;
  font-weight: bold;
  flex-wrap: wrap;
`

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

const BaseInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
  color: ${({ theme }) => theme['gray-100']};
  height: 2.5rem;
  font-size: 1.125rem;
  padding: 0 0.5rem;

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme['green-500']};
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
