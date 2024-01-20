export type RouteType = {
  [name: string]: {
    route: string;
    name: string;
    indexFirst?: boolean;
    nested?: {
      [name: string]: {
        route: string;
        name: string;
      };
    };
    params?: {
      [name: string]: string;
    };
  };
};

const ROUTES: RouteType = {
  HOME: { route: '/', name: 'Home' },

  COLOR: {
    route: 'color',
    name: 'Color',
    params: {
      COLOR_NAME: 'colorName',
    },
  },
  REDIRECT: { route: 'redirect', name: 'Redirect' },
  UNIVERSITIES: { route: 'universities', name: 'Universities' },
  FLOWERS: {
    route: 'flowers',
    name: 'Flowers',
    indexFirst: true,
    nested: {
      TULIPS: { route: 'tulips', name: 'Tulips' },
      DAISIES: { route: 'daisies', name: 'Daisies' },
    },
  },
  ANIMAL: {
    route: 'animal',
    name: 'Animals',
    params: { ANIMAL_NAME: 'name', ANIMAL_TYPE: 'type' },
  },
  VERSION: { route: 'version', name: 'Version' },
};

export default ROUTES;
