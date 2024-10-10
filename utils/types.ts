export type Contact = {
  resourceName: string;
  etag: string;
  names?: Array<{
    metadata: {
      primary: boolean;
      source: {
        type: string;
        id: string;
      };
      sourcePrimary?: boolean;
    };
    displayName: string;
    familyName?: string;
    givenName?: string;
    displayNameLastFirst?: string;
    unstructuredName?: string;
  }>;
  photos?: Array<{
    metadata: {
      primary?: boolean;
      source: {
        type: string;
        id: string;
      };
    };
    url: string;
    default?: boolean;
  }>;
  phoneNumbers?: Array<{
    metadata: {
      primary?: boolean;
      source: {
        type: string;
        id: string;
      };
    };
    value: string;
    canonicalForm?: string;
    type?: string;
    formattedType?: string;
  }>;
};
