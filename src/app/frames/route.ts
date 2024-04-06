import { createFrames } from "frames.js/next";

import { badRequestFrame } from "./bad_request"
import { getProposalMetadata } from "../api/supabase"
import { prepareCoverFrame } from "./cover/cover";
import { prepareLoreFrame } from  "./lore/lore"

export type State = {
    title: string;
    n_sentences: number;
};

export const frames = createFrames<State>({
    basePath: "/frames",
});

// Frame entry point
// example cover frame link: /frames?chain=solana&proposalId=4bv3rK5qEhoFmFRtxJp2fh5342uwh3VKUfLbqkyuzYYV
// example lore frame link: /frames?chain=solana&proposalId=4bv3rK5qEhoFmFRtxJp2fh5342uwh3VKUfLbqkyuzYYV&id=0&showText=true
const handleRequest = frames(async (ctx) => {
    const searchParams = ctx.searchParams

    // sanitize params data
    // chain: name of blockchain in all lower case.
    const chain:string | null = searchParams.chain
    if (!chain) {
        return badRequestFrame('Bad frame URL. chain parameter must be provided as string. eg. "solana"')
    }

    // proposalId: id of the governance proposal. id is guaranteed unique per chain.
    const proposalId:string | null = searchParams.proposalId
    if (!proposalId) {
        return badRequestFrame('Bad frame URL. proposalId parameter must be provided as string. eg. "4bv3rK5qEhoFmFRtxJp2fh5342uwh3VKUfLbqkyuzYYV"')
    }

    // store 2 params in ctx for convenience of passing
    // this is not standard pattern
    ctx.chain = chain
    ctx.proposalId = proposalId

    // id: pagination id of lore frame request
    // If id=null, display the cover page
    const idAsString:string | null = searchParams.id
    if (!idAsString) {
        return await prepareCoverFrame(ctx)
    }

    // If id=n, display the n'th chunk of the lore story
    // ensure ctx is loaded
    if (!ctx.state) {
        console.log("Reloading metadata")
        const data = await getProposalMetadata(
            chain,
            proposalId,
        )
        ctx.state = {
            n_sentences: parseInt(data.n_sentences),
            title: data.title,
        }
    }

    // ensure id is a proper integer
    const id:number = parseInt(idAsString)
    if (Number.isNaN(id)) {
        return badRequestFrame('Bad frame URL. id parameter string must be a valid integer. eg. "0"')
    }
    // ensure id doesn't overflow
    if (id >= ctx.state.n_sentences) {
        return badRequestFrame('Bad frame URL. id index is greater than number of frames available. Try start with cover frame')
    }

    // hideText: whether to overlay story text on image.
    // False or null: show text over image
    // True: only show image
    const hideTextAsString:string | null = searchParams.hideText

    let hideText:boolean = false
    if (hideTextAsString && hideTextAsString === "true")  hideText = true

    // store 2 params in ctx for convenience of passing
    // this is not standard pattern
    ctx.id = id
    ctx.hideText = hideText
    return await prepareLoreFrame(ctx)
})

export const GET = handleRequest
export const POST = handleRequest
