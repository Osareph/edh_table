/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screen/edhTable`; params?: Router.UnknownInputParams; } | { pathname: `/screen/home`; params?: Router.UnknownInputParams; } | { pathname: `/screen/numberPlayer`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/screen/edhTable`; params?: Router.UnknownOutputParams; } | { pathname: `/screen/home`; params?: Router.UnknownOutputParams; } | { pathname: `/screen/numberPlayer`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/screen/edhTable${`?${string}` | `#${string}` | ''}` | `/screen/home${`?${string}` | `#${string}` | ''}` | `/screen/numberPlayer${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screen/edhTable`; params?: Router.UnknownInputParams; } | { pathname: `/screen/home`; params?: Router.UnknownInputParams; } | { pathname: `/screen/numberPlayer`; params?: Router.UnknownInputParams; };
    }
  }
}
