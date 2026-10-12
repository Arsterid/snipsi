import type { ScenePhase } from "../hooks/use-scene-timeline";
import type { YouTubeUrlError } from "../lib/youtube-url";

export type Locale = "en" | "ru";

type LinkCutterMessages = {
  dialogue: Record<ScenePhase, string>;
  emptyDialogue: string;
  emptyDescription: string;
  errorDialogue: string;
  errors: Record<YouTubeUrlError, string>;
  alreadyCleanDialogue: string;
  alreadyCleanDescription: string;
  originalLabel: string;
  cleanLabel: string;
  finalNote: string;
  copyLabel: string;
  copiedLabel: string;
  copyError: string;
};

export const messages = {
  en: {
    dialogue: {
      intro: "",
      notice: "Psst… tiny heads-up.",
      inspect: "See this little bit?",
      explain: "YouTube adds this to some shared links. The video usually works without it.",
      help: "No big deal. Let’s tidy it up.",
      cut: "Snip!",
      reveal: "There. Much tidier.",
      complete: "There. Much tidier.",
    },
    emptyDialogue: "Hey, got a YouTube link for me?",
    emptyDescription: "Open SnipSI with a YouTube URL after the # in the page address.",
    errorDialogue: "Hmm… that doesn’t look like a YouTube link.",
    errors: {
      empty: "The link is empty.",
      "invalid-url": "I couldn’t make sense of that URL.",
      "unsupported-protocol": "Only HTTP and HTTPS links are supported.",
      "not-youtube": "This isn’t a supported YouTube link.",
      "credentials-not-allowed": "Links containing a username or password aren’t supported.",
    },
    alreadyCleanDialogue: "Oh, look at that — already tidy!",
    alreadyCleanDescription: "No si parameter here. Nothing to snip.",
    originalLabel: "THE LINK",
    cleanLabel: "YOUR CLEAN LINK",
    finalNote:
      "Same video. We just removed the extra sharing parameter. Next time, you’ll spot it yourself.",
    copyLabel: "Copy clean link",
    copiedLabel: "Copied!",
    copyError: "Couldn’t copy automatically. You can select the link and copy it manually.",
  },
  ru: {
    dialogue: {
      intro: "",
      notice: "Псс… маленький нюанс.",
      inspect: "Видишь вот этот кусочек?",
      explain:
        "YouTube добавляет его к некоторым ссылкам для отправки. Обычно видео работает и без него.",
      help: "Ничего страшного. Давай уберём.",
      cut: "Чик!",
      reveal: "Вот. Уже аккуратнее.",
      complete: "Вот. Уже аккуратнее.",
    },
    emptyDialogue: "Эй, у тебя есть ссылка на YouTube?",
    emptyDescription: "Передай ссылку на YouTube после символа # в адресе страницы SnipSI.",
    errorDialogue: "Хм… кажется, это не ссылка на YouTube.",
    errors: {
      empty: "Ссылка пустая.",
      "invalid-url": "Не получилось распознать адрес.",
      "unsupported-protocol": "Поддерживаются только HTTP- и HTTPS-ссылки.",
      "not-youtube": "Нужна ссылка на YouTube.",
      "credentials-not-allowed": "Ссылки с именем пользователя или паролем не поддерживаются.",
    },
    alreadyCleanDialogue: "О, а тут уже всё аккуратно!",
    alreadyCleanDescription: "Параметра si нет. Ножницы сегодня отдыхают.",
    originalLabel: "ИСХОДНАЯ ССЫЛКА",
    cleanLabel: "ЧИСТАЯ ССЫЛКА",
    finalNote:
      "Видео осталось тем же. Мы просто убрали дополнительный параметр. В следующий раз уже сам заметишь.",
    copyLabel: "Скопировать чистую ссылку",
    copiedLabel: "Скопировано!",
    copyError:
      "Не получилось скопировать автоматически. Можно выделить ссылку и скопировать её вручную.",
  },
} satisfies Record<Locale, LinkCutterMessages>;
