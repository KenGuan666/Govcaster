import { loreFrame } from "./loreFrame";
import { getProposalLore } from "../../api/supabase"
import { proposalNotIngestedFrame } from "../not_found"

export async function prepareLoreFrame(ctx:any) {

    // TODO: if slow, cache in state
    const data = await getProposalLore(ctx.chain, ctx.proposalId, ctx.id)
        
    // TODO: data error handling
    if (data == null) return proposalNotIngestedFrame()

    // store 2 params in ctx to simplify param passing
    // this is not standard pattern
    ctx.imageURL = data.imageURL
    ctx.sentence = data.sentence

    return loreFrame(ctx)
}
