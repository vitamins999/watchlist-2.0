export const movieListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MOVIES':
      return action.payload;
    case 'RESET_MOVIE_LIST':
      return [];
    default:
      return state;
  }
};
