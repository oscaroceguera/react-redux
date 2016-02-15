export function selectBook(book){
	// Selecbook is an ActionCreator, it needs to return an ActionCreator
	// an object with a type property.
	return {
		type : 'BOOK_SELECTED',
		payload : book
	}
}
