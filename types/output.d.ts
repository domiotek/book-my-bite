type TForegroundOutputColor = "white" | "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "grey";
type TBackgroundOutputColor = "white" | "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "transparent";

type TForegroundColorName = `fg_${TForegroundOutputColor}`;
type TBackgroundColorName = `bg_${TBackgroundOutputColor}`;
type TColorName = TForegroundColorName | TBackgroundColorName;

type TClearingMode = -1 | 0 | 1;

interface IOutputController {
    /**
     * Sets font's foreground color.
     * @param color Color name
     * @returns this
     */
    fg(color: TForegroundOutputColor) : IOutputController

    /**
     * Sets font's background color.
     * @param color Color name
     * @returns this
     */
    bg(color: TBackgroundOutputColor) : IOutputController

    /**
     * Changes method which is used to write output into the console.
     * 'console' method utilizes 'console.log' function and inserts endline characters after each print call.
     * 'stdout' method uses 'process.stdout.write' function which doesn't do that therefore giving more control over
     * output formatting to programmer.
     */
    outputMethod(method: "console" | "stdout") : IOutputController

    /**
     * Clears text in most recent line.
     * @param mode What to clear.
     * * -1 - to the left of the cursor.
     * *  0 - whole line.
     * *  1 - to the right of the cursor.
     */
    clearLine(mode: TClearingMode=0): IOutputController;
    
    /**
     * Moves cursor to the given x coordinate.
     */
    cursorTo(x: number): IOutputController;

    /**
     * Prints text to the console and forwards it to the clients that are registered for subscription, if available.
     * @param text Text to print.
     * @param importance Importance of an internal message.
     * @param debugChannel Channel of debug message. Individual channels can be blocked from within environment config. 
     */
    print(text: string) : IOutputController
}