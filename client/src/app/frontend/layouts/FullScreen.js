import React from "react"
import Wrapper from "../../../assets/wrappers/ErrorPage"

const FullScreen = ({title="title",description="Description",className='',children}) => (
  <Wrapper>
      <div>
          <div>
              <h2>{title}</h2>
              <p>{description}</p>
          </div>
          <div className={className}>{children}</div>
      </div>
    </Wrapper>
)

export default FullScreen