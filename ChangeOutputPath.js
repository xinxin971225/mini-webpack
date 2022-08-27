export class ChangeOutputPath {
  apply(hooks) {
    hooks.emitFile.tap("changePath", (context) => {
      console.log("changePath");
      context.changeOutPath("./dist/ziyu.js");
    });
  }
}
