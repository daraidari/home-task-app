const filters = ['publication_year', 'cited_by_count', 'is_oa', 'default.search']

const example = 'query: artificial intelligence articles published after 2015 with exactly 100 citations, response: https://api.openalex.org/works?filter=default.search:artificial+intelligence,publication_year:>2015,cited_by_count:100'

export const source = 'https://api.openalex.org/'

export const chatRequest = `Generate a URL compatible with the ${source} using filters ${filters.join(',')} (if no keywords are found, filters are not applied) for the following query (return URL string only). Example: ${example}. Return error text message if request seems incorrect. Text query:`