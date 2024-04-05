import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || '';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export async function getProposalMetadata(chain: string, proposalId: string): Promise<any> {
    // TODO: please implement the correct database lookup
    return {
        "title": "proposal title",
        "n_sentences": 3,
    }
}

export async function getProposalLore(chain: string, proposalId: string, id: number): Promise<any> {
    if (supabaseUrl === "" || supabaseKey === "") {
        console.log("Supabase client cannot be initiated. Please check environment variables. ")
        return {}
    }

    // TODO @cooper: please implement the correct database lookup
    // const { data, error } = await supabase.from('proposals').select('*').eq('Proposal', )
    let data = {
        "frameIndex": 0,
        "sentence": "In the bustling metropolis of Orca, where digital streams flowed faster than water and ideas sparkled brighter than stars, a curious council gathered under the neon glow of the governance tower. .",
        "imageURL": "https://govcaster.s3.us-east-2.amazonaws.com/D8RTabVpEyXvdj2h2XSeh34jmjNUQJdXoXNagb8uEdYN_0.png"
    }
    let error = null

    if (data === null) console.log(`Failed to fetch proposal metadata from Supabase: ${error}. chain=${chain}, proposalId=${proposalId}, id=${id}`)
    return data
}
