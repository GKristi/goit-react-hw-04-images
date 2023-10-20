import React, { Component } from 'react';
import {
    SearchBarHeader,
    SearchButton,
    SearchForm,
    SearchInput,
} from './SearchBar.styled';

class Searchbar extends Component {
    state = {
        value: '',
    };

    addInputData = e => {
        e.preventDefault();
        if (this.state.value.length < 1) return;
        this.props.onSubmit(this.state.value.toLowerCase().trim());
    };

    getInputData = ({ target: { value } }) => {
        this.setState({ value });
    };

    render() {
        return (
            <SearchBarHeader>
                <SearchForm onSubmit={this.addInputData}>
                    <SearchButton type="submit"></SearchButton>
                    <SearchInput
                        name="searchQuery"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.getInputData}
                    />
                </SearchForm>
            </SearchBarHeader>
        );
    }
}

export default Searchbar;