export function parseCommandOptions(options: any): string[] {
    const args = [];
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const element = options[key];
        args.push(`--${key}=${element}`);
      }
    }
  
    return args;
  }
  