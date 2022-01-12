export class Logger {
  public static log(content: any) {
    if (process.env.NODE_ENV === "test") {
      return;
    }

    /* istanbul ignore next */
    console.log(`${new Date().toLocaleString()} - ${content}`);
  }
}
