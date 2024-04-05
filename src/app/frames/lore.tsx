import { Button } from "frames.js/next";

export async function loreFrame(ctx:any) {
    // TODO @Ken: implement this
    return {
        image: (
            <div tw="flex flex-col">
                <div tw="flex">
                    Lore page for proposal {ctx.proposalId} page {ctx.id}. Hide text: {ctx.hideText}
                </div>
            </div>
        )
    }
}
