import { useState, useEffect } from "react"
import styled from "styled-components"

interface PaginationProps extends React.AllHTMLAttributes<HTMLDivElement> {
  pages: number
  setCurrentPage: any
}

function Pagination({ pages = 10, setCurrentPage, ...rest }: PaginationProps) {
  const numberOfPages: number[] = []
  for (let i: number = 1; i <= pages; i++) {
    numberOfPages.push(i)
  }

  const [currentButton, setCurrentButton] = useState<string | number>(1)
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState<(string | number)[]>([])

  useEffect(() => {
    let tempNumberOfPages: (string | number)[] = [...arrOfCurrButtons]

    let dotsInitial = "..."
    let dotsLeft = "... "
    let dotsRight = " ..."

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5)
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(+currentButton - 2, +currentButton)
      const sliced2 = numberOfPages.slice(+currentButton, +currentButton + 1)
      tempNumberOfPages = [1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]
    } else if (currentButton > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4)
      tempNumberOfPages = [1, dotsLeft, ...sliced]
    } else if (`${currentButton}` === dotsInitial) {
      setCurrentButton(+arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
    } else if (`${currentButton}` === dotsRight) {
      setCurrentButton(+arrOfCurrButtons[3] + 2)
    } else if (`${currentButton}` === dotsLeft) {
      setCurrentButton(+arrOfCurrButtons[3] - 2)
    }

    setArrOfCurrButtons(tempNumberOfPages)
    setCurrentPage(currentButton)
  }, [currentButton])

  return (
    <PaginationWrapper>
      <div {...rest} className={"pagination-wrapper"}>
        {arrOfCurrButtons.map((item, index) => {
          return (
            <a key={index} className={`${currentButton === item ? "active" : ""}`} onClick={() => setCurrentButton(item)}>
              {item}
            </a>
          )
        })}
      </div>
    </PaginationWrapper>
  )
}

export default Pagination
export const PaginationWrapper = styled.div`
  cursor: pointer;
  .pagination-wrapper {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  a {
    border-radius: 0.4rem;
    padding: 0.8rem;
    text-decoration: none;
    font-size: 1.6rem;
    background-color: #363636;
    color: #ffffff;
  }
`
