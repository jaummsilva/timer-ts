import styled from 'styled-components'

export const DefaultLayoutContainer = styled.div`
  margin: 5rem auto;
  padding: 2.5rem;
  background-color: ${({ theme }) => theme['gray-800']};
  max-width: 74rem;
  height: calc(100vh - 10rem);
  border-radius: 8px;
  height: 100%;

  display: flex;
  flex-direction: column;
`
