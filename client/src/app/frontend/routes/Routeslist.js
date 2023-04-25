import React from 'react'
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'

const Routeslist = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact component={Signin} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routeslist