declare module '*.svg' {
    const content: any;
    export default content;
}
declare module '*.png' {
    const content: any;
    export default content;
}
declare module '*.jpg' {
    const content: any;
    export default content;
}

declare module '*.css' {
    const content: {[prop: string]: string}
    export default content;
}