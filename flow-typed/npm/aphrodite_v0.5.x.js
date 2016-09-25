// flow-typed signature: a64cf90baeb3dca04068c4f24917df45
// flow-typed version: 7fc28637a1/aphrodite_v0.5.x/flow_>=v0.28.x

declare module 'aphrodite' {
  declare type DehydratedServerContent = {
    html: string,
    css: {
      content: string,
      renderedClassNames: Array<string>,
    },
  };

  declare type SheetDefinition = {
    [key: string]: Object,
  };

  declare type StyleDefinition = {
    [key: string]: {
      _name: string,
      _definition: Object,
    }
  };

  declare export var css: (...definitions: StyleDefinition[]) => string;

  declare export var StyleSheetServer :{
    renderStatic(renderFunc: Function): DehydratedServerContent;
  };

  declare export var StyleSheet: {
    create(sheetDefinition: SheetDefinition): {
      [key: string]: StyleDefinition
    }
  };

  declare export var StyleSheetTestUtils: {
    suppressStyleInjection: () => void;
    clearBufferAndResumeStyleInjection: () => void;
  };
};
