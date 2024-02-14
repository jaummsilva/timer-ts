import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  margin-bottom: 1rem;

  img {
    width: 3rem;
    height: 3rem;
  }

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${({ theme }) => theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      transition: all ease-in-out 250ms;

      &:hover {
        border-bottom: 3px solid ${({ theme }) => theme['green-500']};
      }
      &.active {
        color: ${({ theme }) => theme['green-500']};
      }
    }
  }
`
