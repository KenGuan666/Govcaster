import { Button } from "frames.js/next";
import Image from "next/image"

export async function loreFrame(ctx:any) {
    let frame = {
        image: (
            // <div tw="flex flex-col">
            //     {/* TODO: display text overlaid on image */}
            //     <div tw="flex">
            //         Lore page for proposal {ctx.proposalId} page {ctx.id}. Hide text: {ctx.hideText.toString()}
            //     </div>
            // </div>

            <div style={{
                height: "100vh",
                width: "100vh",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                flexWrap: "nowrap",
                color: "white",
                // backgroundSize: "100px 100px",
            }}>
                <div tw="flex flex-col items-center w-full w-48 h-48 overflow-hidden">
                    <Image src={ctx.imageURL} alt="Descriptive Text" className="w-full h-auto" />
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                        <div className="text-white text-xl font-bold px-4 py-2 bg-black bg-opacity-50">
                            {ctx.sentence}
                        </div>
                    </div>
                </div>

            </div>
        ),
        buttons: [
            <Button
                action="post"
                target={{ query: { chain: ctx.chain, proposalId: ctx.proposalId, id: ctx.id, hideText: !ctx.hideText } }}
                key="button2"
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
                key="button3"
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
                key="button3"
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
                key="button1"
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
                key="button1"
            >
                Go Back
            </Button>
        ))
    }

    return frame
}
