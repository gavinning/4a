import color from 'colors'
import { prettyPrint } from '@base2/pretty-print-object'

const level = Number(process.env.Level || 5)

enum Level {
  error,
  warn,
  info,
  debug,
  log,
  gray,
}

enum Color {
  error = 'red',
  warn = 'yellow',
  debug = 'cyan',
  info = 'green',
  log = 'white',
  gray = 'gray',
}

enum Method {
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug',
  log = 'log',
  gray = 'log',
}

enum Logger {
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug',
  log = 'log',
  gray = 'gray',
}

interface Options {
  pretty: boolean
}

export class Asp {
  // Once pretty
  private $pretty: boolean = false
  private readonly option: Options

  constructor(options: Options = { pretty: false }) {
    this.option = options
  }

  pretty() {
    this.$pretty = true
    return this
  }

  gray(...args: any[]) {
    this.print(Logger.gray, args)
  }

  log(...args: any[]) {
    this.print(Logger.log, args)
  }

  info(...args: any[]) {
    this.print(Logger.info, args)
  }

  debug(...args: any[]) {
    this.print(Logger.debug, args)
  }

  warn(...args: any[]) {
    this.print(Logger.warn, args)
  }

  error(...args: any[]) {
    this.print(Logger.error, args)
  }

  private print(type: Logger, args: any[]) {
    level < Level[type] ||
      console[Method[type]](
        this.prefix(),
        ...this.stringify(args).map((item) => color[Color[type]](item))
      )
    this.$pretty = false
  }

  private prefix() {
    return color.gray(`[${this.timestamp()}]`)
  }

  private stringify(args: IArguments | any[]) {
    return Array.from(args).map((obj) => this.pretter(obj))
  }

  private pretter(obj: any) {
    if (!this.option.pretty && !this.$pretty) {
      return obj
    }
    return ['string'].includes(typeof obj)
      ? obj
      : prettyPrint(obj, {
          indent: '  ',
          singleQuotes: true,
        })
  }

  private timestamp() {
    const date = new Date()
    return new Date(Date.now() - date.getTimezoneOffset() * 60000)
      .toJSON()
      .slice(0, 19)
      .replace('T', ' ')
  }
}

export const asp = new Asp()
export default asp
