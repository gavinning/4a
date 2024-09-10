export enum WechatNoticeType {
  text = 'text',
  markdown = 'markdown',
  image = 'image',
  news = 'news',
  voice = 'voice',
  file = 'file',
  template_card = 'template_card',
}

export type Item = Record<string, any>

interface TextContent {
  content: string
  mentioned_list?: string[]
  mentioned_mobile_list?: string[]
}

interface MarkdownContent {
  content: string
}

interface ImageContent {
  md5: string
  base64: string
}

export type SendData = TextContent | MarkdownContent

class WechatNotice {
  public static webhook: string

  constructor(readonly type: WechatNoticeType) {}

  async send(data: Item = {}) {
    if (!WechatNotice.webhook) {
      throw new Error('请先调用 createWechatNotice 方法设置 webhook')
    }
    const res = await fetch(WechatNotice.webhook, {
      method: 'POST',
      body: JSON.stringify({
        msgtype: this.type,
        // @ts-ignore
        [this.type]: data,
      })
    })

    if (res.status >= 400) {
      return {
        error: true,
        status: res.status,
        message: await res.text(),
      }
    }
    return res.json()
  }

  static text() {
    return new WechatNotice(WechatNoticeType.text)
  }

  static markdown() {
    return new WechatNotice(WechatNoticeType.markdown)
  }
}

export const createWechatNotice = (wechatWebHook: string) => {
  WechatNotice.webhook = wechatWebHook
  return WechatNotice
}
