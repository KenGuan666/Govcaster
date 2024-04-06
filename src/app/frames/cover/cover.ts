import { proposalNotIngestedFrame } from "../not_found"
import { coverFrame } from "./coverFrame"

import { getProposalMetadata } from "../../api/supabase"

export async function prepareCoverFrame(ctx:any) {

    const data = await getProposalMetadata(
        ctx.chain,
        ctx.proposalId,
    )
    ctx.state = {
        n_sentences: parseInt(data.n_sentences),
        title: data.title,
    }
    // if proposal not found, return a 404 page
    if (!ctx.state || !ctx.state.title) return proposalNotIngestedFrame()

    return coverFrame(ctx)
}
