import { Button } from "frames.js/next";

export async function loreFrame(ctx:any) {
    let frame = {
        image: (
            <div tw="flex flex-col">
                {/* TODO: display text overlaid on image */}
                <div tw="flex">
                    Lore page for proposal {ctx.proposalId} page {ctx.id}. Hide text: {ctx.hideText.toString()}
                </div>
            </div>
        ),
        buttons: [
            <Button
                action="post"
                target={{ query: { chain: ctx.chain, proposalId: ctx.proposalId, id: ctx.id, hideText: !ctx.hideText } }}
            >
                {(ctx.hideText ? "Show " : "Hide ") + "Story Text"} 
            </Button>
        ],
        state: ctx.state,
    }

    if (ctx.id < ctx.state.n_sentences - 1) {
        // if not on the last frame, provide a button to go to next lore frame
        frame.buttons.push((
            <Button
                action="post"
                target={{ query: { chain: ctx.chain, proposalId: ctx.proposalId, id: ctx.id+1, hideText: ctx.hideText } }}
            >
                Next Page
            </Button>
        ))
    } else {
        // if on the last frame, provide a button to go back to cover frame
        frame.buttons.push((
            <Button
                action="post"
                // TODO: provide the proposal link
                target={{ query: { chain: ctx.chain, proposalId: ctx.proposalId } }}
            >
                THE END. Vote NOW!
            </Button>
        ))
    }


    if (ctx.id > 0) {
        // if not on the first frame, provide a button to go to previous lore frame
        frame.buttons.unshift((
            <Button
                action="post"
                target={{ query: { chain: ctx.chain, proposalId: ctx.proposalId, id: ctx.id-1, hideText: ctx.hideText } }}
            >
                Previous Page
            </Button>
        ))
    } else {
        // if on the first frame, provide a button to go to cover frame
        frame.buttons.unshift((
            <Button
                action="post"
                target={{ query: { chain: ctx.chain, proposalId: ctx.proposalId } }}
            >
                Go Back
            </Button>
        ))
    }

    return frame
}
