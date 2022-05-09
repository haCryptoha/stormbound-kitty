import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
name,
"slug": slug.current,
id,
category,
"authors": coalesce(
  users[] -> { name, "slug": slug.current },
  user[] -> { name, "slug": slug.current }
),
date,
"cardId": card -> { "id": id.current }.id,
excerpt
`

export const MAPPER = guide => {
  guide.date = serializeDate(guide.date)

  return guide
}
