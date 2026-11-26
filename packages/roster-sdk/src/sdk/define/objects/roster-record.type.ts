export type rosterRecord<TObjectUniversalIdentifier extends string = string> =
  string & { readonly __object?: TObjectUniversalIdentifier };
