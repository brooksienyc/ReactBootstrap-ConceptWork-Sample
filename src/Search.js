import React from 'react';
import SearchForm from './SearchForm';
import Container from 'react-bootstrap/Container';
import Gallery from './Gallery';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: '',
			lastSearch: '',
			galleryImages: '',
			setSearch: false,
			error: false,
		};
	}

	handleChange = (event) => {
		this.setState({ searchString: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.getData(this.state.searchString);
	};

	getData(searchString) {
		if (searchString) {
			const url = `${this.props.searchOptions.url}/collection?key=${this.props.searchOptions.key}&q=${this.state.searchString}&ps=50`;
			fetch(url)
				.then((res) => res.json())
				.then((res) => {
					console.log(res.artObjects);
					this.setState({
						error: false,
						galleryImages: res.artObjects,
						setSearch: true,
						searchString: '',
						lastSearch: this.state.searchString,
					});
				})
				.then((res) => {
					if (!this.state.galleryImages.length) {
						this.setState({ error: true });
					}
				})
				.catch((err) => {
					console.error(err);
					this.setState({ error: true });
				});
		}
	}

	render() {
		return (
			<Container>
				<SearchForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					searchString={this.state.searchString}
				/>
				{this.state.setSearch && !this.state.error && (
					<>
						<p>
							Showing results for{' '}
							<span style={{ fontStyle: 'italic' }}>
								{this.state.lastSearch}:
							</span>{' '}
						</p>
						<Gallery
							images={this.state.galleryImages}
							getGalleryImages={this.getData}
							searchOptions={this.props.searchOptions}
						/>
					</>
				)}
				{this.state.setSearch && this.state.error && (
					<p>
						No results found for{' '}
						<span style={{ fontStyle: 'italic' }}>{this.state.lastSearch}</span>
						. Please try another search
					</p>
				)}
			</Container>
		);
	}
}

export default Search;
