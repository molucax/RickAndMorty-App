import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getCharacters, setName, setPage } from "../Redux/action";

const SearchInput = styled.input`

`

const Search = () => {
	const dispatch = useDispatch();
	
	const [input, setInput] = useState("");

	const handleOnChange = (e) => {
		e.preventDefault();
		setInput(e.target.value);
	}

	const onSubmit = (e) => {
		e.preventDefault()
		dispatch(settingName(input)) // guardamos en el store el name
		dispatch(getCharacters({ page: 1, name: input })) // buscamos efectivamente
		dispatch(settingPage(1))
		setInput("")
	}

	return (
		<form onSubmit={onSubmit}>
			<SearchInput type="text" placeholder="Search..." onChange={handleOnChange} value={input} />
			<button type="submit">🔦</button>
		</form>
	)
}

export default Search;