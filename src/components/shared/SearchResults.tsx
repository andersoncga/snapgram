import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document[];
}

function SearchResults({ isSearchFetching, searchedPosts }: SearchResultsProps) {
    if(isSearchFetching) return <Loader />

    if(searchedPosts && searchedPosts.documents.length > 0) {
        return (
            <GridPostList posts={searchedPosts.documents} />
        )
    }
  return (
    <p>Nenhum resultadi encontrado.</p>
  )
}

export default SearchResults