---
"swagger-typescript-api": patch
---

Fix handling of FormData inputs in Fetch HTTP client

Previously, when users passed a `FormData` object directly to the Fetch
client's `multipart/form-data` formatter, it would incorrectly attempt to use
`Object.keys()` on the FormData instance, which returns an empty array. This
caused the FormData to be processed incorrectly.

The fix adds a type check to return FormData instances unchanged, allowing
users to have full control over FormData construction when needed whilst
maintaining backwards compatibility for object inputs. This aligns the Fetch
client behaviour with the existing Axios client implementation.

This resolves issues where users needed to send multipart requests with
multiple entries for the same key, which is only possible with direct FormData
manipulation.
