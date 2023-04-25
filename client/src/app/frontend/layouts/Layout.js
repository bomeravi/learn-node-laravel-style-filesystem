import React from "react"

const Layout = ({title="title",description="Description",className,children}) => (

    <div>
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
)

export default Layout