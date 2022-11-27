import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

import ContainerCard from '../GameCard/ContainerCard'
import Footer from '../Footer/Footer';

export class games extends Component {
  render() {
    return (
      <div>
        <nav>
            <NavBar/>
        </nav>
        <div>
          <nav>
            
          </nav>
          <main>
            <ContainerCard/>
          </main>
        </div>
        <footer>
          <Footer/>
        </footer>
      </div>
    )
  }
}

export default games