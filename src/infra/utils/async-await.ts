export const asyncAwait = (ms: number) => {
    return Promise.resolve(() => {
        setTimeout(() => { }, ms)
    })
}