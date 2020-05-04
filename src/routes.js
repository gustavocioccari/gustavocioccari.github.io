import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Portfolio from './pages/Portfolio';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Portfolio}></Route>
            </Switch>
        </BrowserRouter>
    );
}
