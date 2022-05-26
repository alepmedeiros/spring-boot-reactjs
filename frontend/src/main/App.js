import React from 'react';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import { Rotas } from './rotas';
import NavBar from '../components/navbar';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

class App extends React.Component {
  render () {
    return(
      <>
        <NavBar />
        <div className='container'>
          <Rotas />
        </div>
      </>
    )
  }
}

export default App;
