import serialisation from '~/helpers/serialisation'
import getCardFromSlug from '~/helpers/getCardFromSlug'
import getRawCardData from '~/helpers/getRawCardData'

const getInitialCardData = card => {
  if (!card) {
    return {}
  }

  const officialCard = getCardFromSlug(card)

  if (officialCard) {
    // Go through the serialisation on the official card data as it deals with
    // normalisation and resolution of properties like mana, strength and image.
    const resolvedCard = serialisation.card.deserialise(
      serialisation.card.serialise(getRawCardData(officialCard.id))
    )

    // Card serialisation doesn’t define the `token` key, so it can be resolved
    // from the ID. Not amazing but it does the job.
    if (card.startsWith('T')) resolvedCard.token = true

    return resolvedCard
  }

  const decodedData = decodeURIComponent(card)

  return serialisation.card.deserialise(decodedData)
}

export default getInitialCardData
