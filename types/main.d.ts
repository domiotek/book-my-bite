declare namespace NodeJS  {
    interface Global {
        app: import("../src/server").default
    }
}