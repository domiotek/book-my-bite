const colors = {
    "fg_white": 37,
    "fg_black": 30,
    "fg_red": 31,
    "fg_green": 32,
    "fg_yellow": 33,
    "fg_blue": 34,
    "fg_magenta": 35,
    "fg_cyan": 36,
    "fg_grey": 90,
    "bg_white": 47,
    "bg_black": 40,
    "bg_red": 41,
    "bg_green": 42,
    "bg_yellow": 43,
    "bg_blue": 44,
    "bg_magenta": 45,
    "bg_cyan": 46,
    "bg_transparent": -1,
}

/**
 * Translates colors name into ASCII code number associated with it.
 * @param color Color name
 */
function translateColor(color: TColorName) : number {
    return colors[color] ?? 0;
}


export default class Output implements IOutputController {

    public fgColor : TForegroundOutputColor = "white";
    
    public bgColor : TBackgroundOutputColor = "transparent";

    private _outputMethod: (text: string)=>void = console.log;

    public static init() {
        return new Output() as IOutputController;
    }
    
    public fg(color: TForegroundOutputColor) {
        this.fgColor = color;
        return this;
    }

    public bg(color: TBackgroundOutputColor) {
        this.bgColor = color;
        return this;
    }

    public outputMethod(method: "console" | "stdout") {
        switch(method) {
            case "console": this._outputMethod = console.log; break;
            case "stdout": this._outputMethod = text=>process.stdout.write.call(process.stdout, text); break;
            default: throw new Error("Invalid output method.");
        }
        return this;
    }

    public clearLine(mode : TClearingMode=0) {
        process.stdout.clearLine(mode);
        return this;
    }

    public cursorTo(x: number) {
        process.stdout.cursorTo(x);
        return this;
    }

    public print(text: string) {
        const formattedText = formatText(text, `fg_${this.fgColor}`, `bg_${this.bgColor}`)
        this._outputMethod(formattedText);

        return this;
    }
}

/**
 * Manages inserting colors into output strings.
 * @param color - Color code. Both foreground and background colors are supported.
 * @param text - Text which should be in specified color.
 */
export function insertColor(color: TColorName,text: string) : string {
    return `\x1b[${translateColor(color)}m${text}\x1b[0m`;
}

/**
 * Formats provided text with given colors in specified colors mode
 * @param mode Colors mode.
 * @param text Text to format.
 * @param foreground Color of font.
 * @param background Color of background.
 */
export function formatText(text: string,foreground: TForegroundColorName = "fg_white",background: TBackgroundColorName="bg_black") {
    return insertColor(foreground,background?insertColor(background,text):text); 
}