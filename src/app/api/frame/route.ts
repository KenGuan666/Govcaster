import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import OpenAI from "openai";

const LANGUAGE_SYSTEM_PROMPT = "You are an expert storyteller responsible for turning Web 3.0 governance proposals into digestible, engaging, and funny short stories for users to read on social media. You will be given a proposal and your job is to first, understand the proposal and what effect it will have. Then you must generate a short story (no more than 30 sentences). Your story should not contain any line breaks, but it should have a clear connection to the governance proposal you are given. Feel free to be as wild and fantastical as you desire. The story should be less than 200 words. It should NOT exceed one paragraph.";

export async function GET(request: NextRequest): Promise<NextResponse> {
    
    const supabaseUrl = process.env.SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from('proposals').select('*').eq('Proposal', '4bv3rK5qEhoFmFRtxJp2fh5342uwh3VKUfLbqkyuzYYV');
    if (data === null) return NextResponse.json({ error: error }, { status: 500 });

    const visionModelName = process.env.VISION_MODEL || '';
    const languageModelName = process.env.LANGUAGE_MODEL || '';
    const apiKey = process.env.OPENAI_API_KEY || '';
    const openai = new OpenAI({apiKey: apiKey});

    const proposalText = data[0]["Text"]
    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": LANGUAGE_SYSTEM_PROMPT},
            {"role": "user", "content": `Here is the governance proposal: ${proposalText}`}
        ],
        model: languageModelName
      });
    const rawStory = completion.choices[0];

    return NextResponse.json({ story: rawStory, originalProposal: proposalText }, { status: 200 })
}
