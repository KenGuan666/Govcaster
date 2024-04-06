import { Button } from "frames.js/next";

export function coverFrame(ctx:any) {
    // A dummy cover page
    // TODO @Ken: fill with data
    return {
        image: (
            <div tw="flex flex-col">
                <div tw="flex">
                    {ctx.state.title}
                </div>
            </div>
        ),
        buttons: [
            <Button
                action="post"
                target={{ query: { chain: ctx.chain, proposalId: ctx.proposalId, id: 0, hideText: false } }}
            >
                Read Lore
            </Button>,
        ],
        state: ctx.state,
    }
}
