import loadable from '@loadable/component';

export const AsyncArticle = loadable(() => {
    return import('../../containers/Article/Article')
});

export const AsyncMenSection = loadable(() => {
    return import('../../containers/MenSection/MenSection');
})

export const AsyncWomenSection = loadable(() => {
    return import('../../containers/WomenSection/WomenSection');
})

export const AsyncSearchResults = loadable(() => {
    return import('../../containers/SearchResults/SearchResults');
})

export const AsyncFavorite = loadable(() => {
    return import('../../containers/Favorites/Favorites');
})

export const AsyncMyBasket = loadable(() => {
    return import('../../containers/MyBasket/MyBasket');
})