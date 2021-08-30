import React from 'react'
import DeckSuggestions from '~/components/DeckSuggestions'
import Layout from '~/components/Layout'
import DECKS from '~/data/decks'
import getNavigation from '~/helpers/getNavigation'

// This page uses server-side rendering instead of static rendering because it
// receives query parameters (for filtering) that need to be handled on the
// server. This matters both to avoid decks flashing when JavaScript mounts but
// also because the meta tags are based on the query parameters so the Discord
// embeds look alright.
export async function getServerSideProps() {
  return {
    props: { navigation: getNavigation(), decks: DECKS },
  }
}

const DeckSuggestionsPage = ({ navigation, ...props }) => (
  <Layout
    active={['COMMUNITY', 'META', 'DECK_SUGGESTIONS']}
    navigation={navigation}
  >
    <DeckSuggestions {...props} />
  </Layout>
)

export default DeckSuggestionsPage
