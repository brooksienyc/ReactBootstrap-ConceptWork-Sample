// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

// import React from 'react';
// import data from './data.json';
// import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
// //BOOTSTRAP COMPONENTS
// import Container from 'react-bootstrap/Container';
//
// //REACT COMPONENTS
// import CarouselContainer from './CarouselContainer';
//
// class App extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {};
// 		this.searchOptions = {
// 			key: process.env.REACT_APP_RIJKS_KEY,
// 			url: 'https://www.rijksmuseum.nl/api/en/',
// 			numberOfResults: 50,
// 		};
// 	}
// 	render() {
// 		return (
// 			<Container>
// 				<HashRouter basename='/'>
// 					<main>
// 						<CarouselContainer data={data} />
// 					</main>
// 				</HashRouter>
// 			</Container>
// 		);
// 	}
// }
//
// export default App;

// import React from 'react';
// import data from './data.json';
// import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
//
// //BOOTSTRAP COMPONENTS
// import Container from 'react-bootstrap/Container';

//REACT COMPONENTS
// import CarouselContainer from './CarouselContainer';
// import Navigation from './Navigation';
//
// class App extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {};
// 		this.searchOptions = {
// 			key: process.env.REACT_APP_RIJKS_KEY,
// 			url: 'https://www.rijksmuseum.nl/api/en',
// 			numberOfResults: 50,
// 		};
// 	}
// 	render() {
// 		return (
// 			<Container>
// 				<HashRouter basename='/'>
// 					<Navigation />
// 					<main>
// 						<Switch>
// 							<Route
// 								exact
// 								path='/home'
// 								render={() => <CarouselContainer data={data} />}
// 							/>{' '}
// 							<Redirect path='*' to='/home' />
// 						</Switch>
// 					</main>
// 				</HashRouter>
// 			</Container>
// 		);
// 	}
// }
//
// export default App;


import React from 'react';
import data from './data.json';
import artObjects from './artobjects.json';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';

//BOOTSTRAP COMPONENTS
import Container from 'react-bootstrap/Container';

//REACT COMPONENTS
import CarouselContainer from './CarouselContainer';
import Navigation from './Navigation';
import About from './About';
import Gallery from './Gallery.js';
import Search from './Search.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			galleryImages: artObjects,
		};
		this.searchOptions = {
			key: process.env.REACT_APP_RIJKS_KEY,
			url: 'https://www.rijksmuseum.nl/api/en',
			numberOfResults: 50,
		};
	}
    getGalleryImages = () => {
    	const url = `${this.searchOptions.url}/collection?key=${this.searchOptions.key}&ps=${this.searchOptions.numberOfResults}`;
    	fetch(url)
    		.then((res) => res.json())
    		.then((res) => this.setState({ galleryImages: res.artObjects }))
    		.catch((err) => console.error(err));
    };



	render() {
		return (
			<Container>
				<HashRouter basename='/'>
					<Navigation />
					<main>
						<Switch>
              <Route
                	exact
                	path='/search'
                	render={() => <Search searchOptions={this.searchOptions} />}
                />;
              <Route
								exact
								path='/home'
								render={() => <CarouselContainer data={data} />}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/gallery'
								render={() => (
                        <Gallery
                                  searchOptions={this.searchOptions}
                                  images={this.state.galleryImages}
                                  getGalleryImages={this.getGalleryImages}
		                    />
	               )}
/>;

							<Redirect path='*' to='/home' />
						</Switch>
					</main>
				</HashRouter>
			</Container>
		);
	}
}

export default App;
