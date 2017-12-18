declare module "iohook" {
    type EventType = "mousemove" | "keydown" | "keyup" | "mouseclick" | "mousedown" | "mouseup" | "mousemove" | "mousedrag" | "mousewheel";

    interface Event {
        type: EventType,
        x: number,
        y: number,
        keychar: string,
        keycode: number,
        rawcode: number,
        clicks: number,
        button: number,
        amount: number,
        direction: number,
        rotation: number
    }

    function on(type: EventType, callback: (event: Event) => void): void;

    function start(debug?: boolean): void;

    function stop(): void;
}
