import { OpenAPIV3 } from "openapi-types";
import { MediaTypeContainer } from "./components/MediaTypeContainer";
import { fromRecord } from "./Component";

export enum TransferContentKind {
  Unknown = "Unknown",
  Json = "Json",
  FormData = "FormData",
}

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
const transferKindsByMediaType: Record<
  Exclude<TransferContentKind, TransferContentKind.Unknown>,
  string[]
> = {
  [TransferContentKind.FormData]: ["multipart/form-data"],
  [TransferContentKind.Json]: [
    "application/json-patch+json",
    "application/json",
    "text/json",
    "application/*+json",
  ],
};

export class TransferContent {
  value: Record<string, MediaTypeContainer>;
  kind: TransferContentKind;

  constructor(content: Record<string, OpenAPIV3.MediaTypeObject>) {
    this.value = fromRecord(MediaTypeContainer, content);
    this.kind = TransferContent.getTransferContentKind(this.value);
  }

  static getTransferContentKind(value: TransferContent["value"]): TransferContentKind {
    const transferKeys = Object.keys(value || {});

    if (transferKeys.some((key) => transferKindsByMediaType.FormData.includes(key))) {
      return TransferContentKind.FormData;
    }

    if (transferKeys.some((key) => transferKindsByMediaType.Json.includes(key))) {
      return TransferContentKind.Json;
    }

    return TransferContentKind.Unknown;
  }

  getActualMediaType(): MediaTypeContainer {
    if (this.is(TransferContentKind.FormData)) {
      for (const kind of transferKindsByMediaType[TransferContentKind.FormData]) {
        if (this.value[kind]) {
          return this.value[kind];
        }
      }
    }

    if (this.is(TransferContentKind.Json)) {
      for (const kind of transferKindsByMediaType[TransferContentKind.Json]) {
        if (this.value[kind]) {
          return this.value[kind];
        }
      }
    }
  }

  getActualSchema() {
    const mediaType = this.getActualMediaType();

    if (mediaType) {
      return mediaType.schema;
    }
    return null;
  }

  is(kind: TransferContentKind) {
    return this.kind === kind;
  }
}
