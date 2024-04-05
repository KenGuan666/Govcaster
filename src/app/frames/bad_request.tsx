
export function badRequestFrame(message: string) {
    return {
        image: (
            <div tw="flex flex-col">
                <div tw="flex">
                    {message}
                </div>
            </div>
        )
    }
}
