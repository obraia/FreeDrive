declare module 'json!*' {
  let json: any;
  export = json;
}

declare module '*.json' {
  const value: any;
  export default value;
}
