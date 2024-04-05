import { proposalNotIngestedFrame } from "../not_found"
import { coverFrame } from "./coverFrame"

import { getProposalMetadata } from "../../api/supabase"

export async function proposalCoverFrame(ctx:any) {

    const data = await getProposalMetadata(
        ctx.chain,
        ctx.proposalId,
    )
    ctx.n_sentences = parseInt(data.n_sentences)
    ctx.title = data.title
    // if proposal not found, return a 404 page
    if (!ctx.title) return proposalNotIngestedFrame()

    return coverFrame(ctx)
}
