/**
 * @prettier
 */
import { List, Map } from "immutable"
import { createSelector } from "reselect"

import { safeBuildUrl } from "core/utils/url"
import { isOAS31 as isOAS31Fn } from "../fn"

const map = Map()

export const isOAS31 = createSelector(
  (state, system) => system.specSelectors.specJson(),
  isOAS31Fn
)

export const webhooks = () => (system) => {
  return system.specSelectors.specJson().get("webhooks", map)
}

/**
 * `specResolvedSubtree` selector is needed as input selector,
 * so that we regenerate the selected result whenever the lazy
 * resolution happens.
 */
export const selectWebhooksOperations = createSelector(
  (state, system) => system.specSelectors.webhooks(),
  (state, system) => system.specSelectors.validOperationMethods(),
  (state, system) => system.specSelectors.specResolvedSubtree(["webhooks"]),
  (webhooks, validOperationMethods) => {
    if (!Map.isMap(webhooks)) return {}

    return webhooks
      .reduce((allOperations, pathItem, pathItemName) => {
        if (!Map.isMap(pathItem)) return allOperations

        const pathItemOperations = pathItem
          .entrySeq()
          .filter(([key]) => validOperationMethods.includes(key))
          .map(([method, operation]) => ({
            operation: Map({ operation }),
            method,
            path: pathItemName,
            specPath: List(["webhooks", pathItemName, method]),
          }))

        return allOperations.concat(pathItemOperations)
      }, List())
      .groupBy((operationDTO) => operationDTO.path)
      .map((operations) => operations.toArray())
      .toObject()
  }
)

export const license = () => (system) => {
  return system.specSelectors.info().get("license", map)
}

export const selectLicenseNameField = () => (system) => {
  return system.specSelectors.license().get("name", "License")
}

export const selectLicenseUrlField = () => (system) => {
  return system.specSelectors.license().get("url")
}

export const selectLicenseUrl = createSelector(
  (state, system) => system.specSelectors.url(),
  (state, system) => system.oas3Selectors.selectedServer(),
  (state, system) => system.specSelectors.selectLicenseUrlField(),
  (specUrl, selectedServer, url) => {
    if (url) {
      return safeBuildUrl(url, specUrl, { selectedServer })
    }

    return undefined
  }
)

export const selectLicenseIdentifierField = () => (system) => {
  return system.specSelectors.license().get("identifier")
}

export const contact = () => (system) => {
  return system.specSelectors.info().get("contact", map)
}

export const selectContactNameField = () => (system) => {
  return system.specSelectors.contact().get("name", "the developer")
}

export const selectContactEmailField = () => (system) => {
  return system.specSelectors.contact().get("email")
}

export const selectContactUrlField = () => (system) => {
  return system.specSelectors.contact().get("url")
}

export const selectContactUrl = createSelector(
  (state, system) => system.specSelectors.url(),
  (state, system) => system.oas3Selectors.selectedServer(),
  (state, system) => system.specSelectors.selectContactUrlField(),
  (specUrl, selectedServer, url) => {
    if (url) {
      return safeBuildUrl(url, specUrl, { selectedServer })
    }

    return undefined
  }
)

export const selectInfoTitleField = () => (system) => {
  return system.specSelectors.info().get("title")
}

export const selectInfoSummaryField = () => (system) => {
  return system.specSelectors.info().get("summary")
}

export const selectInfoDescriptionField = () => (system) => {
  return system.specSelectors.info().get("description")
}

export const selectInfoTermsOfServiceField = () => (system) => {
  return system.specSelectors.info().get("termsOfService")
}

export const selectInfoTermsOfServiceUrl = createSelector(
  (state, system) => system.specSelectors.url(),
  (state, system) => system.oas3Selectors.selectedServer(),
  (state, system) => system.specSelectors.selectInfoTermsOfServiceField(),
  (specUrl, selectedServer, termsOfService) => {
    if (termsOfService) {
      return safeBuildUrl(termsOfService, specUrl, { selectedServer })
    }

    return undefined
  }
)

export const selectExternalDocsDescriptionField = () => (system) => {
  return system.specSelectors.externalDocs().get("description")
}

export const selectExternalDocsUrlField = () => (system) => {
  return system.specSelectors.externalDocs().get("url")
}

export const selectExternalDocsUrl = createSelector(
  (state, system) => system.specSelectors.url(),
  (state, system) => system.oas3Selectors.selectedServer(),
  (state, system) => system.specSelectors.selectExternalDocsUrlField(),
  (specUrl, selectedServer, url) => {
    if (url) {
      return safeBuildUrl(url, specUrl, { selectedServer })
    }

    return undefined
  }
)

export const selectJsonSchemaDialectField = () => (system) => {
  return system.specSelectors.specJson().get("jsonSchemaDialect")
}

export const selectJsonSchemaDialectDefault = () =>
  "https://spec.openapis.org/oas/3.1/dialect/base"
