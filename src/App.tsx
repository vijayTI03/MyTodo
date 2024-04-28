import React, { Fragment,memo } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';
import Box from './components/Box';
import Todo from './pages/Todo/Todo';

function App() {

  return (
    <Fragment>
		<Box 
			child={<Todo/>} 
			height="500px" 
			width="500px"
			className="customBox"
		/>
    </Fragment>
  )
}

export default memo(App);
