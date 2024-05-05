export const secToTime = (sec: number) => new Date(sec * 1000).toISOString().substring(11, 19);

export const secondsToDhms = (seconds: string | number) => {
    const sec = Number(seconds);
    const timeComponents = [
        Math.floor(sec / (3600 * 24)),
        Math.floor((sec % (3600 * 24)) / 3600),
        Math.floor((sec % 3600) / 60),
        Math.floor(sec % 60)
    ];

    const timeStrings = timeComponents
        .map(component => `${component}`.padStart(2, "0"));

    return timeStrings.join(":");
};
