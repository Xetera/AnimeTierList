const helpers = require('./helpers')
const scraper = require('mal-scraper');

const DEFAULT_MAL_PARAMS = {
    after: 0,
    type: "anime"
};

/**
 * Attaches metadata to a single anime
 * fetched from MAL
 * @param {MalAnimeResponse} anime 
 * @returns {Anime}
 */
const transformAnime = (anime) => ({
    score: anime.score,
    title: anime.animeTitle,
    image: anime.animeImagePath.replace('/r/96x136',''),
    url: `https://myanimelist.net${anime.animeUrl}`,
    tier: helpers.tiers[anime.score]
})


/**
 * Fetches a user's tier list from MAL with
 * added metadata
 * @param {String} user
 * @param {TierListOptions} options
 */
const fetchTierLists = async (user, { after , type } = DEFAULT_MAL_PARAMS) => {
    const tiers = await scraper.getWatchListFromUser(user, after, type);
    // console.log(tiers.map(transformAnime));
    return tiers.map(transformAnime);
}

module.exports = {
    fetchTierLists
}