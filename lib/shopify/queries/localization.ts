export const getLocalizationQuery = /* GraphQL */ `
  query getLocalization {
    localization {
      availableCountries {
        currency {
          isoCode
          name
          symbol
        }
        isoCode
        name
      }
      country {
        currency {
          isoCode
          name
          symbol
        }
        isoCode
        name
      }
    }
  }
`;
